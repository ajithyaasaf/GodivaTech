/**
 * Performance monitoring utilities
 * Helps track and analyze performance metrics for the application
 */

// Main performance metrics
interface PerformanceMetrics {
  lcp: number | null; // Largest Contentful Paint
  fid: number | null; // First Input Delay
  cls: number | null; // Cumulative Layout Shift
  fcp: number | null; // First Contentful Paint
  ttfb: number | null; // Time to First Byte
  loadTime: number | null; // Page Load Time
}

// Initial empty metrics object
const metrics: PerformanceMetrics = {
  lcp: null,
  fid: null,
  cls: null,
  fcp: null,
  ttfb: null,
  loadTime: null,
};

/**
 * Initialize performance monitoring
 * Sets up observers for web vitals and logs them when they occur
 */
export function initPerformanceMonitoring(): void {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return;
  }

  // Monitor LCP (Largest Contentful Paint)
  try {
    const lcpObserver = new PerformanceObserver((entries) => {
      const lcpEntry = entries.getEntries().at(-1);
      if (lcpEntry) {
        const lcp = lcpEntry.startTime;
        metrics.lcp = lcp;
        console.log('LCP:', lcp);
        console.log(`LCP time: ${lcp}ms`);
      }
    });
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (e) {
    console.warn('LCP monitoring failed:', e);
  }

  // Monitor FID (First Input Delay)
  try {
    const fidObserver = new PerformanceObserver((entries) => {
      const fidEntry = entries.getEntries()[0];
      if (fidEntry) {
        const fid = fidEntry.processingStart - fidEntry.startTime;
        metrics.fid = fid;
        console.log(`FID: ${fid}ms`);
      }
    });
    fidObserver.observe({ type: 'first-input', buffered: true });
  } catch (e) {
    console.warn('FID monitoring failed:', e);
  }

  // Monitor CLS (Cumulative Layout Shift)
  try {
    let clsValue = 0;
    let clsEntries: PerformanceEntry[] = [];
    
    const clsObserver = new PerformanceObserver((entries) => {
      for (const entry of entries.getEntries()) {
        // Only count layout shifts without recent user input
        if (!(entry as any).hadRecentInput) {
          const currentEntry = entry as any;
          clsValue += currentEntry.value;
          clsEntries.push(currentEntry);
        }
      }
      
      console.log('CLS:', clsValue);
      metrics.cls = clsValue;
    });
    
    clsObserver.observe({ type: 'layout-shift', buffered: true });
  } catch (e) {
    console.warn('CLS monitoring failed:', e);
  }

  // Track page load time
  window.addEventListener('load', () => {
    if (performance && performance.timing) {
      const { navigationStart, loadEventEnd } = performance.timing;
      const loadTime = loadEventEnd - navigationStart;
      metrics.loadTime = loadTime;
      console.log(`Page load time: ${loadTime}ms`);
    }
  });

  // Track JS bundle load and execution time
  if (performance && performance.getEntriesByType) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const scripts = performance.getEntriesByType('resource')
          .filter(resource => resource.initiatorType === 'script')
          .map(entry => ({
            name: entry.name.split('/').pop() || entry.name,
            duration: entry.duration,
            size: entry.transferSize,
          }));

        console.log('[Bundle Metrics] main-bundle:', {
          loadTime: scripts[0]?.duration || 0,
          executionTime: performance.now(),
          size: scripts[0]?.size || null,
          timestamp: Date.now()
        });
      }, 0);
    });
  }

  // Report long tasks
  try {
    const longTaskObserver = new PerformanceObserver((entries) => {
      entries.getEntries().forEach(entry => {
        console.warn(`Long task detected: ${entry.duration.toFixed(2)}ms`);
      });
    });
    longTaskObserver.observe({ type: 'longtask', buffered: true });
  } catch (e) {
    console.warn('Long task monitoring failed:', e);
  }

  // Track slow resource loads
  try {
    const resourceObserver = new PerformanceObserver((entries) => {
      entries.getEntries().forEach(entry => {
        if (entry.duration > 1000) { // Threshold of 1000ms (1s)
          console.warn(`Slow resource load: ${entry.name} (${entry.duration.toFixed(0)}ms)`);
        }
      });
    });
    resourceObserver.observe({ type: 'resource', buffered: true });
  } catch (e) {
    console.warn('Resource monitoring failed:', e);
  }
}

/**
 * Get the current performance metrics
 */
export function getPerformanceMetrics(): PerformanceMetrics {
  return { ...metrics };
}

/**
 * Report performance metrics to an analytics service
 * This is a placeholder for future implementation
 */
export function reportPerformanceMetrics(): void {
  // In the future, this could send metrics to an analytics service
  console.log('Performance metrics:', metrics);
}