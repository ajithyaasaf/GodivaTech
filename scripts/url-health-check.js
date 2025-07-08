#!/usr/bin/env node

/**
 * URL Health Check Script
 * Monitors for URL mismatches and 404 errors
 * Run this monthly to catch URL issues early
 */

const https = require('https');
const http = require('http');

const DOMAIN = 'https://godivatech.com';

// List of all expected URLs on the website
const EXPECTED_URLS = [
  '/',
  '/about',
  '/services',
  '/portfolio', 
  '/blog',
  '/contact',
  '/auth',
  '/admin',
  '/sitemap'
];

// Known problematic URLs that should redirect
const REDIRECT_URLS = [
  { from: '/about-us', to: '/about' },
  { from: '/about-us/', to: '/about' },
  { from: '/portfolio/logo-design', to: '/portfolio' },
  { from: '/portfolio/logo-design/', to: '/portfolio' }
];

/**
 * Check if a URL returns the expected status code
 */
function checkUrl(url) {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https:') ? https : http;
    
    const req = protocol.get(url, (res) => {
      resolve({
        url,
        status: res.statusCode,
        location: res.headers.location,
        success: res.statusCode >= 200 && res.statusCode < 400
      });
    });

    req.on('error', (err) => {
      resolve({
        url,
        status: 'ERROR',
        error: err.message,
        success: false
      });
    });

    req.setTimeout(10000, () => {
      req.destroy();
      resolve({
        url,
        status: 'TIMEOUT',
        success: false
      });
    });
  });
}

/**
 * Main health check function
 */
async function runHealthCheck() {
  console.log('🔍 Starting URL Health Check for', DOMAIN);
  console.log('='.repeat(50));

  // Check expected URLs
  console.log('\n📋 Checking Expected URLs:');
  for (const path of EXPECTED_URLS) {
    const url = DOMAIN + path;
    const result = await checkUrl(url);
    
    if (result.success) {
      console.log(`✅ ${path} - ${result.status}`);
    } else {
      console.log(`❌ ${path} - ${result.status} ${result.error || ''}`);
    }
  }

  // Check redirect URLs  
  console.log('\n🔄 Checking Redirect URLs:');
  for (const redirect of REDIRECT_URLS) {
    const url = DOMAIN + redirect.from;
    const result = await checkUrl(url);
    
    if (result.status >= 300 && result.status < 400) {
      if (result.location && result.location.includes(redirect.to)) {
        console.log(`✅ ${redirect.from} → ${redirect.to} (${result.status})`);
      } else {
        console.log(`⚠️  ${redirect.from} redirects to ${result.location} (expected ${redirect.to})`);
      }
    } else {
      console.log(`❌ ${redirect.from} - ${result.status} (should redirect to ${redirect.to})`);
    }
  }

  console.log('\n✨ Health Check Complete!');
  console.log('\n💡 Next Steps:');
  console.log('- Fix any ❌ errors shown above');
  console.log('- Update redirects for ⚠️ warnings');
  console.log('- Run this check monthly');
}

// Run the health check
if (require.main === module) {
  runHealthCheck().catch(console.error);
}

module.exports = { checkUrl, runHealthCheck };