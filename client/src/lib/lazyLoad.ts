import { lazy, Suspense } from 'react';
import type { ComponentType, LazyExoticComponent } from 'react';

/**
 * Utility for lazy loading components with better error handling
 * @param importFn - Dynamic import function for the component
 * @param fallback - Optional fallback component to show while loading
 * @returns LazyComponent with loading state handled
 */
export function lazyLoadComponent<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  fallback: React.ReactNode = null
): LazyExoticComponent<T> & { preload: () => Promise<T> } {
  const LazyComponent = lazy(importFn) as LazyExoticComponent<T> & { preload: () => Promise<T> };
  
  // Add preload function to allow prefetching when needed
  LazyComponent.preload = async () => {
    try {
      const module = await importFn();
      return module.default;
    } catch (error) {
      console.error('Failed to preload component:', error);
      throw error;
    }
  };
  
  return LazyComponent;
}

/**
 * Wrapper to use the lazy loaded component with suspense
 */
export function withSuspense<T extends ComponentType<any>>(
  LazyComponent: LazyExoticComponent<T>,
  fallback: React.ReactNode = null
) {
  return (props: any) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
}

/**
 * Utility to preload components when hovering over links
 * or when components are likely to be needed soon
 */
export function preloadComponent(LazyComponent: LazyExoticComponent<any> & { preload?: () => Promise<any> }) {
  if (typeof LazyComponent.preload === 'function') {
    LazyComponent.preload().catch(() => {
      // Silently catch errors during preloading
    });
  }
}