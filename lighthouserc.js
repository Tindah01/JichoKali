module.exports = {
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
        // Performance category (target: 85+)
        'categories:performance': ['error', {minScore: 0.85}],
        'categories:accessibility': ['error', {minScore: 0.9}],
        'categories:best-practices': ['error', {minScore: 0.9}],
        'categories:seo': ['error', {minScore: 0.9}],
        
        // Core Web Vitals thresholds
        'first-contentful-paint': ['error', {maxNumericValue: 2000}], // 2 seconds
        'largest-contentful-paint': ['error', {maxNumericValue: 3000}], // 3 seconds
        'cumulative-layout-shift': ['error', {maxNumericValue: 0.1}], // 0.1 CLS
        'total-blocking-time': ['error', {maxNumericValue: 500}], // 500ms
        'speed-index': ['error', {maxNumericValue: 3000}], // 3 seconds
        
        // Additional performance metrics
        'interactive': ['warn', {maxNumericValue: 4000}], // 4 seconds
        'first-meaningful-paint': ['warn', {maxNumericValue: 2500}], // 2.5 seconds
        
        // Resource optimization
        'uses-optimized-images': ['warn', {}],
        'uses-webp-images': ['warn', {}],
        'uses-responsive-images': ['warn', {}],
        'efficiently-encode-images': ['warn', {}],
        
        // JavaScript optimizations
        'unused-javascript': ['warn', {maxNumericValue: 20}], // < 20KB unused JS
        'legacy-javascript': ['warn', {}],
        'duplicated-javascript': ['error', {}],
        
        // CSS optimizations
        'unused-css-rules': ['warn', {maxNumericValue: 10}], // < 10KB unused CSS
        'unminified-css': ['error', {}],
        
        // Caching and compression
        'uses-long-cache-ttl': ['warn', {}],
        'uses-text-compression': ['error', {}],
        
        // Bundle size warnings
        'total-byte-weight': ['warn', {maxNumericValue: 300000}], // 300KB total
        
        // Security
        'is-on-https': ['error', {}],
        'uses-http2': ['warn', {}],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};