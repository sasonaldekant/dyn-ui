// PostCSS configuration for DYN UI - CSS class name optimization
module.exports = {
  plugins: {
    // CSS Modules configuration with short class names
    'postcss-modules': {
      generateScopedName: (name, filename, css) => {
        // Production: ultra-short hashes
        if (process.env.NODE_ENV === 'production') {
          // Generate deterministic short hash based on component name + class name
          const componentName = filename.match(/([A-Z][a-z]+)/g)?.[0] || 'Dyn';
          const shortComponent = componentName.substring(0, 3).toLowerCase(); // Dyn -> dyn, But -> but
          
          // Create short hash from original name
          let hash = 0;
          for (let i = 0; i < name.length; i++) {
            hash = ((hash << 5) - hash + name.charCodeAt(i)) & 0xffffffff;
          }
          const shortHash = Math.abs(hash).toString(36).substring(0, 3);
          
          return `${shortComponent}-${shortHash}`; // e.g., "dyn-a1b", "but-x2y"
        }
        
        // Development: readable but shorter names
        const componentName = filename.match(/([A-Z][a-z]+)/g)?.[0] || 'Dyn';
        return `${componentName.toLowerCase()}-${name}`.replace(/([A-Z])/g, '-$1').toLowerCase();
      },
      
      // Don't transform these patterns
      globalModulePaths: [
        /\.global\.(css|scss)$/,
        /node_modules/,
      ],
      
      // Export settings
      exportOnlyLocals: false,
      localsConvention: 'camelCaseOnly'
    },
    
    // Optimize CSS output
    'postcss-preset-env': {
      stage: 3,
      features: {
        'nesting-rules': true,
        'custom-properties': true,
        'color-functional-notation': true
      }
    },
    
    // Minify CSS in production
    ...(process.env.NODE_ENV === 'production' && {
      cssnano: {
        preset: ['advanced', {
          // Aggressive optimizations for smaller bundle
          discardComments: { removeAll: true },
          normalizeWhitespace: true,
          colormin: true,
          convertValues: true,
          discardDuplicates: true,
          discardEmpty: true,
          mergeIdents: true,
          mergeLonghand: true,
          mergeRules: true,
          minifyFontValues: true,
          minifyGradients: true,
          minifyParams: true,
          minifySelectors: true,
          normalizeCharset: true,
          normalizeDisplayValues: true,
          normalizePositions: true,
          normalizeRepeatStyle: true,
          normalizeString: true,
          normalizeTimingFunctions: true,
          normalizeUnicode: true,
          normalizeUrl: true,
          orderedValues: true,
          reduceIdents: true,
          reduceInitial: true,
          reduceTransforms: true,
          svgo: true,
          uniqueSelectors: true
        }]
      }
    }),
    
    // Automatically add vendor prefixes
    autoprefixer: {
      flexbox: 'no-2009',
      grid: 'autoplace'
    }
  }
};