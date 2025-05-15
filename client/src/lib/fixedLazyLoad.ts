import React, { lazy, Suspense } from 'react';
import type { ComponentType, LazyExoticComponent } from 'react';

/**
 * Creates a lazy loaded component with preloading capability
 */
export function lazyLoad<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>
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
 * Wrapper component for lazy loaded components that provides
 * suspense fallback handling
 */
export function LazyComponent<T extends ComponentType<any>>({
  component,
  fallback = null,
  ...props
}: {
  component: LazyExoticComponent<T>;
  fallback?: React.ReactNode;
  [key: string]: any;
}) {
  const Component = component;
  return (
    <Suspense fallback={fallback}>
      <Component {...props} />
    </Suspense>
  );
}

/**
 * Preload a lazy component ahead of time
 */
export function preloadComponent(component: LazyExoticComponent<any> & { preload?: () => Promise<any> }): void {
  if (typeof component.preload === 'function') {
    component.preload().catch(() => {
      // Silent catch - we don't want preload failures to crash the app
    });
  }
}

/**
 * Hook to preload component on hover or other events
 */
export function usePreloadOnHover(component: LazyExoticComponent<any> & { preload?: () => Promise<any> }) {
  return {
    onMouseEnter: () => preloadComponent(component),
    onFocus: () => preloadComponent(component),
  };
}