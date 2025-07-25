// Performance monitoring utility for Core Web Vitals
export const measurePerformance = () => {
  // Measure First Contentful Paint (FCP)
  if ('web-vitals' in window || typeof window !== 'undefined') {
    // Log performance metrics
    if (window.performance) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          
          if (perfData) {
            console.log('Performance Metrics:', {
              domContentLoaded: Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart),
              loadComplete: Math.round(perfData.loadEventEnd - perfData.fetchStart),
              firstPaint: Math.round(perfData.responseEnd - perfData.fetchStart),
              domInteractive: Math.round(perfData.domInteractive - perfData.fetchStart),
            });
          }
        }, 0);
      });
    }
  }
};

// Preload critical resources
export const preloadCriticalResources = () => {
  const link = document.createElement('link');
  link.rel = 'modulepreload';
  link.href = '/src/components/HomePage.tsx';
  document.head.appendChild(link);
};

// Lazy load images with intersection observer
export const createLazyImageObserver = () => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach((img) => {
      imageObserver.observe(img);
    });

    return imageObserver;
  }
  return null;
};