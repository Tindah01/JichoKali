// Performance Budget Configuration
// Centralized configuration for all performance monitoring tools

const PERFORMANCE_BUDGETS = {
  // Bundle size limits (in bytes)
  BUNDLE_SIZES: {
    VENDOR_CHUNK: 153600,      // 150KB - React, ReactDOM, and other vendor libraries
    MAIN_APP: 15360,           // 15KB - Main application code
    COMPONENT_CHUNK: 12288,     // 12KB - Individual lazy-loaded components
    ICON_CHUNK: 8192,          // 8KB - Icon library chunk
    CSS_BUNDLE: 25600,         // 25KB - All CSS combined
    TOTAL_BUILD: 256000,       // 250KB - Total build size limit
  },

  // Core Web Vitals thresholds (in milliseconds)
  CORE_WEB_VITALS: {
    FIRST_CONTENTFUL_PAINT: 2000,     // 2 seconds
    LARGEST_CONTENTFUL_PAINT: 3000,   // 3 seconds
    CUMULATIVE_LAYOUT_SHIFT: 0.1,     // 0.1 CLS score
    TOTAL_BLOCKING_TIME: 500,         // 500ms
    SPEED_INDEX: 3000,                // 3 seconds
    TIME_TO_INTERACTIVE: 4000,        // 4 seconds
    FIRST_MEANINGFUL_PAINT: 2500,     // 2.5 seconds
  },

  // Lighthouse performance thresholds (0-1 scale)
  LIGHTHOUSE_SCORES: {
    PERFORMANCE: 0.85,         // 85+ performance score
    ACCESSIBILITY: 0.9,        // 90+ accessibility score
    BEST_PRACTICES: 0.9,       // 90+ best practices score
    SEO: 0.9,                  // 90+ SEO score
  },

  // Resource optimization limits
  RESOURCE_LIMITS: {
    UNUSED_JAVASCRIPT: 20480,   // 20KB unused JS
    UNUSED_CSS: 10240,         // 10KB unused CSS
    TOTAL_BYTE_WEIGHT: 307200, // 300KB total resources
    IMAGE_SIZE_LIMIT: 51200,   // 50KB per image
  },

  // Performance regression thresholds
  REGRESSION_THRESHOLDS: {
    BUNDLE_SIZE_INCREASE: 0.05,    // 5% increase threshold
    PERFORMANCE_SCORE_DROP: 0.02,  // 2% score drop threshold
    LOAD_TIME_INCREASE: 200,       // 200ms increase threshold
  },
};

// Export configurations for different tools
module.exports = {
  PERFORMANCE_BUDGETS,

  // Bundlesize configuration
  getBundlesizeConfig: () => [
    {
      path: './dist/assets/*vendor*.js',
      maxSize: `${Math.floor(PERFORMANCE_BUDGETS.BUNDLE_SIZES.VENDOR_CHUNK / 1024)} kB`,
      compression: 'gzip',
    },
    {
      path: './dist/assets/index-*.js',
      maxSize: `${Math.floor(PERFORMANCE_BUDGETS.BUNDLE_SIZES.MAIN_APP / 1024)} kB`,
      compression: 'gzip',
    },
    {
      path: './dist/assets/*.css',
      maxSize: `${Math.floor(PERFORMANCE_BUDGETS.BUNDLE_SIZES.CSS_BUNDLE / 1024)} kB`,
      compression: 'gzip',
    },
  ],

  // Lighthouse CI configuration
  getLighthouseCIConfig: () => ({
    ci: {
      collect: {
        url: ['http://localhost:4173'],
        startServerCommand: 'npm run preview',
        startServerReadyPattern: 'Local:',
        startServerReadyTimeout: 30000,
        numberOfRuns: 3,
        settings: {
          chromeFlags: '--no-sandbox --disable-dev-shm-usage',
        },
      },
      assert: {
        assertions: {
          'categories:performance': ['error', { minScore: PERFORMANCE_BUDGETS.LIGHTHOUSE_SCORES.PERFORMANCE }],
          'categories:accessibility': ['error', { minScore: PERFORMANCE_BUDGETS.LIGHTHOUSE_SCORES.ACCESSIBILITY }],
          'categories:best-practices': ['error', { minScore: PERFORMANCE_BUDGETS.LIGHTHOUSE_SCORES.BEST_PRACTICES }],
          'categories:seo': ['error', { minScore: PERFORMANCE_BUDGETS.LIGHTHOUSE_SCORES.SEO }],
          'first-contentful-paint': ['error', { maxNumericValue: PERFORMANCE_BUDGETS.CORE_WEB_VITALS.FIRST_CONTENTFUL_PAINT }],
          'largest-contentful-paint': ['error', { maxNumericValue: PERFORMANCE_BUDGETS.CORE_WEB_VITALS.LARGEST_CONTENTFUL_PAINT }],
          'cumulative-layout-shift': ['error', { maxNumericValue: PERFORMANCE_BUDGETS.CORE_WEB_VITALS.CUMULATIVE_LAYOUT_SHIFT }],
          'total-blocking-time': ['error', { maxNumericValue: PERFORMANCE_BUDGETS.CORE_WEB_VITALS.TOTAL_BLOCKING_TIME }],
          'speed-index': ['error', { maxNumericValue: PERFORMANCE_BUDGETS.CORE_WEB_VITALS.SPEED_INDEX }],
          'interactive': ['warn', { maxNumericValue: PERFORMANCE_BUDGETS.CORE_WEB_VITALS.TIME_TO_INTERACTIVE }],
          'unused-javascript': ['warn', { maxNumericValue: PERFORMANCE_BUDGETS.RESOURCE_LIMITS.UNUSED_JAVASCRIPT }],
          'unused-css-rules': ['warn', { maxNumericValue: PERFORMANCE_BUDGETS.RESOURCE_LIMITS.UNUSED_CSS }],
          'total-byte-weight': ['warn', { maxNumericValue: PERFORMANCE_BUDGETS.RESOURCE_LIMITS.TOTAL_BYTE_WEIGHT }],
        },
      },
      upload: {
        target: 'temporary-public-storage',
      },
    },
  }),

  // Webpack Bundle Analyzer configuration
  getBundleAnalyzerConfig: () => ({
    analyzerMode: 'static',
    reportFilename: 'bundle-report.html',
    openAnalyzer: false,
    generateStatsFile: true,
    statsFilename: 'bundle-stats.json',
  }),
};