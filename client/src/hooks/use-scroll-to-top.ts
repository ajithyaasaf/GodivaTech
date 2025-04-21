import { useEffect } from 'react';
import { useLocation } from 'wouter';

/**
 * Hook to automatically scroll to the top when the route changes
 */
export const useScrollToTop = () => {
  const [location] = useLocation();
  
  useEffect(() => {
    // Scroll to the top of the page whenever the location changes
    window.scrollTo(0, 0);
  }, [location]);
  
  return null;
};