import { Request, Response, NextFunction } from 'express';

/**
 * Comprehensive SEO Redirect Middleware
 * Handles all URL redirects for optimal SEO performance
 */

// Comprehensive redirect mapping for SEO
const REDIRECT_MAP: Record<string, string> = {
  // Known Google-indexed mismatches
  '/about-us': '/about',
  '/about-us/': '/about',
  '/portfolio/logo-design': '/portfolio',
  '/portfolio/logo-design/': '/portfolio',
  
  // Common variations that might be indexed
  '/our-services': '/services',
  '/our-services/': '/services',
  '/contact-us': '/contact',
  '/contact-us/': '/contact',
  '/our-work': '/portfolio',
  '/our-work/': '/portfolio',
  '/our-team': '/about',
  '/our-team/': '/about',
  '/news': '/blog',
  '/news/': '/blog',
  '/articles': '/blog',
  '/articles/': '/blog',
  
  // Service-specific redirects
  '/services/website-development': '/services/web-development',
  '/services/website-design': '/services/web-development',
  '/services/mobile-app-development': '/services/app-development',
  '/services/digital-marketing-services': '/services/digital-marketing',
  '/services/logo-design': '/services/branding',
  '/services/brand-design': '/services/branding',
  
  // Blog category redirects
  '/blog/categories/digital-marketing': '/blog/category/digital-marketing',
  '/blog/categories/web-development': '/blog/category/web-development',
  '/blog/categories/technology': '/blog/category/technology',
  
  // Common trailing slash variations
  '/home': '/',
  '/home/': '/',
  '/index.html': '/',
  '/index.php': '/',
  '/default.html': '/',
};

// Patterns for dynamic redirects
const DYNAMIC_REDIRECTS = [
  {
    pattern: /^\/portfolio\/([^\/]+)$/,
    replacement: '/portfolio'
  },
  {
    pattern: /^\/services\/([^\/]+)\/([^\/]+)\/([^\/]+)$/,
    replacement: '/services/$1/$2/$3'
  }
];

/**
 * SEO-optimized redirect middleware
 */
export function seoRedirectMiddleware(req: Request, res: Response, next: NextFunction) {
  const originalUrl = req.path;
  const normalizedUrl = originalUrl.toLowerCase();
  
  // Check exact matches first
  const exactRedirect = REDIRECT_MAP[originalUrl] || REDIRECT_MAP[normalizedUrl];
  if (exactRedirect) {
    console.log(`SEO Redirect: ${originalUrl} → ${exactRedirect}`);
    return res.redirect(301, exactRedirect);
  }
  
  // Check dynamic patterns
  for (const { pattern, replacement } of DYNAMIC_REDIRECTS) {
    if (pattern.test(originalUrl)) {
      const newUrl = originalUrl.replace(pattern, replacement);
      console.log(`SEO Dynamic Redirect: ${originalUrl} → ${newUrl}`);
      return res.redirect(301, newUrl);
    }
  }
  
  // Handle trailing slash normalization
  if (originalUrl.endsWith('/') && originalUrl !== '/') {
    const withoutSlash = originalUrl.slice(0, -1);
    console.log(`SEO Trailing Slash Redirect: ${originalUrl} → ${withoutSlash}`);
    return res.redirect(301, withoutSlash);
  }
  
  // Continue to next middleware
  next();
}

/**
 * Add a new redirect rule programmatically
 */
export function addRedirectRule(from: string, to: string) {
  REDIRECT_MAP[from] = to;
  console.log(`Added redirect rule: ${from} → ${to}`);
}

/**
 * Get all active redirect rules
 */
export function getRedirectRules() {
  return { ...REDIRECT_MAP };
}

/**
 * SEO-friendly 404 handler
 */
export function seo404Handler(req: Request, res: Response) {
  console.log(`SEO 404: ${req.path} - potential redirect candidate`);
  
  // Log for future redirect analysis
  const logEntry = {
    timestamp: new Date().toISOString(),
    path: req.path,
    userAgent: req.get('User-Agent'),
    referer: req.get('Referer')
  };
  
  // In production, you'd want to log this to a monitoring service
  console.log('404 Analysis:', logEntry);
  
  // Return 404 but don't break SPA routing
  res.status(404).json({
    error: 'Page not found',
    suggestion: 'This URL may have moved. Check our sitemap at /sitemap.xml'
  });
}

export default seoRedirectMiddleware;