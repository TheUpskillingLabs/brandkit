/**
 * Claude Design .dc.html Runtime
 * Implements the x-dc custom element, template resolution, sc-for loops,
 * style-hover handlers, onClick bindings, and brand image fallbacks.
 */
(function () {
  'use strict';

  // ── Brand image fallback map (.png refs → .svg files) ─────────────────────
  const IMG_FALLBACKS = {
    'assets/logo-lockup-light.png': 'assets/logo-lockup-light.svg',
    'assets/orb-mark.png': 'assets/orb-mark.svg',
    'assets/dcpl-knockout-logo.png': 'assets/dcpl-knockout-logo.svg',
    'assets/levy-strategic-design-white.png': 'assets/levy-strategic-design-white.svg',
    'assets/cohort-grid-sample.png': 'assets/cohort-grid-sample.svg',
    'assets/sample-square-event.png': 'assets/sample-square-event.svg',
    'assets/sample-workshop-recap.png': 'assets/sample-workshop-recap.svg',
    'assets/sample-alumni-spotlight.png': 'assets/sample-alumni-spotlight.svg',
    'assets/sample-slide-build-cycle.png': 'assets/sample-slide-build-cycle.svg',
  };

  function applyImageFallbacks(root) {
    (root || document).querySelectorAll('img[src]').forEach(img => {
      const src = img.getAttribute('src');
      const fallback = IMG_FALLBACKS[src];
      if (fallback) {
        img.setAttribute('src', fallback);
      } else {
        img.addEventListener('error', function onErr() {
          img.removeEventListener('error', onErr);
          const s = img.getAttribute('src');
          if (IMG_FALLBACKS[s]) img.setAttribute('src', IMG_FALLBACKS[s]);
        });
      }
    });
  }

  // ── DCLogic base class ─────────────────────────────────────────────────────
  class DCLogic {
    constructor() {
      this.state = {};
      this._listeners = [];
    }
    setState(updater) {
      const patch = typeof updater === 'function' ? updater(this.state) : updater;
      this.state = Object.assign({}, this.state, patch);
      this._listeners.forEach(fn => fn());
    }
    _subscribe(fn) {
      this._listeners.push(fn);
    }
  }
  window.DCLogic = DCLogic;

  // ── Template expression helpers ───────────────────────────────────────────
  function getVal(expr, ...scopes) {
    const parts = expr.trim().split('.');
    for (const scope of scopes) {
      let v = scope;
      let ok = true;
      for (const p of parts) {
        if (v == null) { ok = false; break; }
        v = v[p];
      }
      if (ok && v !== undefined) return v;
    }
    return undefined;
  }

  function interpolate(str, ...scopes) {
    return str.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_, expr) => {
      const v = getVal(expr, ...scopes);
      return v != null ? String(v) : '';
    });
  }

  // ── DOM processing ────────────────────────────────────────────────────────
  function processHover(root) {
    root.querySelectorAll('[style-hover]').forEach(el => {
      if (el._dc_hover) return;
      el._dc_hover = true;
      const base = el.getAttribute('style') || '';
      const hover = el.getAttribute('style-hover') || '';

      function parseStyles(str) {
        const map = {};
        str.split(';').forEach(s => {
          const idx = s.indexOf(':');
          if (idx < 0) return;
          const k = s.slice(0, idx).trim();
          const v = s.slice(idx + 1).trim();
          if (k) map[k] = v;
        });
        return map;
      }

      el.addEventListener('mouseenter', () => {
        const merged = Object.assign(parseStyles(base), parseStyles(hover));
        el.setAttribute('style', Object.entries(merged).map(([k, v]) => `${k}:${v}`).join(';'));
      });
      el.addEventListener('mouseleave', () => {
        el.setAttribute('style', base);
      });
    });
  }

  function processTextNodes(root, ...scopes) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    let n;
    while ((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(node => {
      if (!node.textContent.includes('{{')) return;
      node.textContent = interpolate(node.textContent, ...scopes);
    });
  }

  function processAttrs(el, ...scopes) {
    // Attributes except onclick (handled separately)
    Array.from(el.attributes).forEach(attr => {
      if (attr.name === 'onclick') return;
      if (!attr.value.includes('{{')) return;
      attr.value = interpolate(attr.value, ...scopes);
    });
  }

  function processOnClick(el, vals, localScope) {
    const raw = el.getAttribute('onclick') || '';
    if (!raw.includes('{{')) return;
    const match = raw.match(/\{\{\s*([\w.]+)\s*\}\}/);
    if (!match) return;
    const fn = getVal(match[1], localScope || {}, vals);
    if (typeof fn === 'function') {
      el.removeAttribute('onclick');
      el.addEventListener('click', fn);
      el._dc_click = true;
    }
  }

  function processSubtree(root, vals, localScope) {
    const scope = localScope || {};

    // Process text nodes
    processTextNodes(root, scope, vals);

    // Process elements
    const all = [root, ...root.querySelectorAll('*')];
    all.forEach(el => {
      if (el._dc_done) return;
      processAttrs(el, scope, vals);
      if (el.hasAttribute('onclick')) processOnClick(el, vals, scope);
      processHover(el.parentElement || root);
    });
  }

  // ── sc-for expansion ──────────────────────────────────────────────────────
  function processScFor(container, vals) {
    container.querySelectorAll('sc-for').forEach(scFor => {
      const listExpr = (scFor.getAttribute('list') || '').replace(/\{\{\s*([\w.]+)\s*\}\}/, '$1');
      const asName = scFor.getAttribute('as') || 'item';
      const list = getVal(listExpr, vals);
      if (!Array.isArray(list)) { scFor.remove(); return; }

      const tpl = scFor.innerHTML;
      const frag = document.createDocumentFragment();

      list.forEach(item => {
        const wrap = document.createElement('div');
        wrap.style.display = 'contents';
        wrap.innerHTML = tpl;

        // Resolve text and attributes with item scope
        processSubtree(wrap, vals, { [asName]: item });
        applyImageFallbacks(wrap);

        Array.from(wrap.childNodes).forEach(child => frag.appendChild(child));
      });

      scFor.parentNode.insertBefore(frag, scFor);
      scFor.remove();
    });
  }

  // ── x-dc Custom Element ───────────────────────────────────────────────────
  class XDCElement extends HTMLElement {
    connectedCallback() {
      // Wait for full DOM parse before initialising
      Promise.resolve().then(() => this._init());
    }

    _init() {
      // 1. Move <helmet> children into <head>
      const helmet = this.querySelector('helmet');
      if (helmet) {
        Array.from(helmet.childNodes).forEach(child => {
          if (child.nodeType === Node.ELEMENT_NODE) {
            // Skip script tags (already executed or will execute); clone link/style
            if (child.tagName === 'SCRIPT') return;
            document.head.appendChild(child.cloneNode(true));
          }
        });
        helmet.remove();
      }

      // 2. Find and parse the component script
      const scriptEl = this.querySelector('script[type="text/x-dc"][data-dc-script]');
      if (!scriptEl) {
        // No component script — just apply visual enhancements
        processHover(this);
        applyImageFallbacks(this);
        return;
      }

      const scriptBody = scriptEl.textContent;
      scriptEl.remove();

      let ComponentClass;
      try {
        // Execute in a closure that exposes DCLogic
        ComponentClass = new Function('DCLogic', `${scriptBody}; return Component;`)(DCLogic);
      } catch (e) {
        console.error('[x-dc] Component parse error:', e);
        processHover(this);
        applyImageFallbacks(this);
        return;
      }

      // 3. Instantiate component
      const instance = new ComponentClass();

      // 4. Render loop
      const container = this;
      const render = () => {
        const vals = instance.renderVals ? instance.renderVals() : {};
        // Expand sc-for first (clones template with item scope)
        processScFor(container, vals);
        // Then resolve remaining templates and wire events
        processSubtree(container, vals, {});
        // Hover styles (including newly created sc-for children)
        processHover(container);
        // Image fallbacks
        applyImageFallbacks(container);
      };

      instance._subscribe(render);
      render();
    }
  }

  if (!customElements.get('x-dc')) {
    customElements.define('x-dc', XDCElement);
  }

  // ── Apply image fallbacks on initial load ─────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => applyImageFallbacks());
  } else {
    applyImageFallbacks();
  }

})();
