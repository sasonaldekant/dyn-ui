// Simplified PostCSS configuration for DYN UI
// Uses only basic plugins that are commonly available
module.exports = {
  plugins: {
    // Basic autoprefixer for vendor prefixes
    autoprefixer: {
      flexbox: 'no-2009',
      grid: 'autoplace'
    }
  }
};