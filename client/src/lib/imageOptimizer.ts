/**
 * Image optimization utilities
 * Helps improve loading times for images by generating appropriate srcsets,
 * lazy loading, and optimizing images based on viewport size
 */

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  className?: string;
  fetchPriority?: 'high' | 'low' | 'auto';
}

/**
 * Generates optimized image attributes for responsive images
 */
export function getOptimizedImageProps({
  src,
  alt,
  width,
  height,
  sizes = '100vw',
  loading = 'lazy',
  className = '',
  fetchPriority = 'auto'
}: OptimizedImageProps): React.ImgHTMLAttributes<HTMLImageElement> {
  // Handle Cloudinary-specific optimizations
  if (src && src.includes('cloudinary.com') && src.includes('/upload/')) {
    // Create multiple sizes for responsive images
    const widths = [400, 600, 800, 1200, 1600, 2000];
    const srcset = widths
      .map((w) => {
        const optimizedUrl = src.replace(
          '/upload/',
          `/upload/c_scale,w_${w},q_auto,f_auto/`
        );
        return `${optimizedUrl} ${w}w`;
      })
      .join(', ');

    // Generate smaller preview image for faster initial loading
    const lowQualityPreview = src.replace(
      '/upload/',
      '/upload/c_scale,w_20,e_blur:500,q_30,f_auto/'
    );

    return {
      src: src.replace('/upload/', '/upload/q_auto,f_auto/'),
      srcSet: srcset,
      sizes,
      alt,
      width,
      height,
      loading,
      className,
      fetchPriority,
      style: {
        backgroundImage: `url(${lowQualityPreview})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      },
      onLoad: (e) => {
        // Remove background image once the full image loads
        if (e.currentTarget) {
          e.currentTarget.style.backgroundImage = 'none';
        }
      }
    };
  }

  // For regular images (non-Cloudinary)
  return {
    src,
    alt,
    width,
    height,
    loading,
    className,
    fetchPriority
  };
}

/**
 * Preloads critical images to improve LCP times
 */
export function preloadCriticalImages(images: string[]): void {
  if (typeof document === 'undefined') return;

  images.forEach(imageSrc => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = imageSrc.includes('cloudinary.com') 
      ? imageSrc.replace('/upload/', '/upload/q_auto,f_auto/') 
      : imageSrc;
    document.head.appendChild(link);
  });
}

/**
 * Determines if an image should be lazy loaded based on importance
 */
export function shouldLazyLoad(importance: 'high' | 'medium' | 'low'): 'lazy' | 'eager' {
  return importance === 'high' ? 'eager' : 'lazy';
}

/**
 * Gets appropriate fetchPriority value based on importance
 */
export function getImageFetchPriority(importance: 'high' | 'medium' | 'low'): 'high' | 'low' | 'auto' {
  switch (importance) {
    case 'high': return 'high';
    case 'low': return 'low'; 
    default: return 'auto';
  }
}