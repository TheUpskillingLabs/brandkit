// Support for Claude Design HTML interactivity
(function() {
  // Handle style-hover attributes for interactive states
  document.addEventListener('DOMContentLoaded', function() {
    const elementsWithHover = document.querySelectorAll('[style-hover]');
    elementsWithHover.forEach(el => {
      const originalStyle = el.getAttribute('style') || '';
      const hoverStyle = el.getAttribute('style-hover') || '';

      el.addEventListener('mouseenter', function() {
        const styles = hoverStyle.split(';').filter(s => s.trim());
        styles.forEach(style => {
          const [prop, val] = style.split(':').map(s => s.trim());
          if (prop && val) {
            el.style[prop.replace(/-([a-z])/g, (g) => g[1].toUpperCase())] = val;
          }
        });
      });

      el.addEventListener('mouseleave', function() {
        el.setAttribute('style', originalStyle);
      });
    });

    // Initialize hex labels and copy functionality
    window.hexLabels = {};
    const hexButtons = document.querySelectorAll('button[data-hexid]');
    hexButtons.forEach(btn => {
      const hexId = btn.getAttribute('data-hexid');
      window.hexLabels[hexId] = 'Copy';

      btn.addEventListener('click', function(e) {
        const hex = this.getAttribute('data-hex');
        if (hex) {
          navigator.clipboard.writeText(hex).then(() => {
            this.textContent = 'Copied!';
            setTimeout(() => {
              this.textContent = 'Copy';
            }, 2000);
          }).catch(() => {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = hex;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            this.textContent = 'Copied!';
            setTimeout(() => {
              this.textContent = 'Copy';
            }, 2000);
          });
        }
      });
    });
  });
})();
