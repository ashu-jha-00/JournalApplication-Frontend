/**
 * This script fixes oversized SVG elements that are causing display issues
 * Enhanced to handle different SVG contexts better
 */
(function() {
  // Execute when DOM is fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    // Fix for any standalone SVGs that don't have specific classes
    const standalonesSvgs = document.querySelectorAll(
      'svg:not(.icon-xs):not(.icon-sm):not(.icon-md):not(.icon-lg):not(.message-icon):not(.user-icon):not(.lock-icon):not(.spinner-icon)'
    );
    
    standalonesSvgs.forEach(svg => {
      // Check if this SVG is inside the login container
      const isInLoginContainer = svg.closest('.login-container');
      
      // Check if this is a large SVG without proper constraints
      const viewBox = svg.getAttribute('viewBox');
      const isSmallIcon = viewBox && (viewBox.includes('0 0 24 24') || viewBox.includes('0 0 20 20'));
      
      // Handle different cases appropriately
      if (isInLoginContainer && isSmallIcon) {
        // These are form icons and should be small
        svg.style.width = '20px';
        svg.style.height = '20px';
        svg.style.minWidth = '20px';
        svg.style.display = 'inline-block';
        svg.style.flexShrink = '0';
      } else if (isInLoginContainer) {
        // Other SVGs in login container should still be small
        svg.style.maxWidth = '100%';
        svg.style.maxHeight = '100%';
        svg.style.width = 'auto';
        svg.style.height = 'auto';
      } else {
        // Set reasonable size constraints for standalone SVGs
        svg.style.maxWidth = '250px';
        svg.style.maxHeight = '250px';
        svg.style.height = 'auto';
        svg.style.width = 'auto';
        svg.style.display = 'block';
        svg.style.margin = '0 auto';
      }
    });
    
    // Handle SVGs that are direct children of body or root
    const directSvgs = Array.from(document.body.children).filter(el => el.tagName === 'svg');
    directSvgs.forEach(svg => {
      // These are likely the problematic SVGs
      svg.style.maxWidth = '250px';
      svg.style.maxHeight = '250px';
      svg.style.width = 'auto';
      svg.style.height = 'auto';
      svg.style.position = 'relative';
      svg.style.margin = '20px auto';
      svg.style.display = 'block';
    });
    
    // Special handling for input icons
    document.querySelectorAll('.input-icon svg').forEach(svg => {
      svg.style.width = '18px';
      svg.style.height = '18px';
      svg.style.minWidth = '18px';
      svg.style.minHeight = '18px';
      svg.style.maxWidth = '18px';
      svg.style.maxHeight = '18px';
      svg.style.display = 'block';
      svg.style.flexShrink = '0';
    });
  });
    // Re-apply fixes after a short delay to catch any dynamically loaded SVGs
  setTimeout(function() {
    // Find any SVGs that are still too large
    const allSvgs = document.querySelectorAll('svg');
    allSvgs.forEach(svg => {
      // Skip SVGs that are in the login container but apply special styling
      if (svg.closest('.login-container')) {
        // If it's an input icon
        if (svg.closest('.input-icon')) {
          svg.style.width = '18px';
          svg.style.height = '18px';
          svg.style.minWidth = '18px';
          svg.style.maxWidth = '18px';
          svg.style.flexShrink = '0';
          svg.style.display = 'inline-block';
        } 
        // If it's a message icon
        else if (svg.closest('.message-container')) {
          svg.style.width = '20px';
          svg.style.height = '20px';
          svg.style.minWidth = '20px';
          svg.style.maxWidth = '20px';
          svg.style.flexShrink = '0';
          svg.style.display = 'inline-block';
        }
        // Other SVGs in login container
        else {
          svg.style.width = '20px';
          svg.style.height = '20px';
          svg.style.maxWidth = '20px';
          svg.style.maxHeight = '20px';
          svg.style.flexShrink = '0';
        }
        return;
      }
      
      // Skip SVGs with specific classes that should maintain their size
      if (svg.classList.contains('icon-xs') || 
          svg.classList.contains('icon-sm') || 
          svg.classList.contains('icon-md') || 
          svg.classList.contains('icon-lg') ||
          svg.classList.contains('message-icon') ||
          svg.classList.contains('user-icon') ||
          svg.classList.contains('lock-icon') ||
          svg.classList.contains('spinner-icon')) {
        return;
      }
      
      // For standalone SVGs or those causing layout issues
      const rect = svg.getBoundingClientRect();
      if (rect.width > 300 || rect.height > 300) {
        svg.style.maxWidth = '250px';
        svg.style.maxHeight = '250px';
        svg.style.width = 'auto';
        svg.style.height = 'auto';
        svg.style.display = 'block';
        svg.style.margin = '0 auto';
        svg.style.position = 'relative';
        svg.style.zIndex = '0'; // Keep it below content
      }
    });
    
    // Apply an additional fix to direct children SVGs that might load later
    document.querySelectorAll('body > svg, #root > svg').forEach(svg => {
      svg.style.maxWidth = '250px';
      svg.style.maxHeight = '250px';
      svg.style.width = 'auto';
      svg.style.height = 'auto';
      svg.style.position = 'relative';
      svg.style.zIndex = '0';
      svg.style.margin = '20px auto';
      svg.style.display = 'block';
    });
  }, 500);
})();
