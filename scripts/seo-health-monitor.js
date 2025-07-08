#!/usr/bin/env node

/**
 * Advanced SEO Health Monitor for GodivaTech
 * Monitors URL health, redirects, and SEO performance
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://godivatech.com';
const MONITORING_CONFIG = {
  checkInterval: 24 * 60 * 60 * 1000, // 24 hours
  maxRetries: 3,
  timeout: 10000,
  logFile: 'seo-health-log.json'
};

// Critical URLs to monitor
const CRITICAL_URLS = [
  '/',
  '/about',
  '/services',
  '/portfolio',
  '/blog',
  '/contact',
  '/services/web-development',
  '/services/digital-marketing',
  '/services/app-development',
  '/blog/category/digital-marketing'
];

// Known redirects to test
const REDIRECT_TESTS = [
  { from: '/about-us', to: '/about', type: 'permanent' },
  { from: '/about-us/', to: '/about', type: 'permanent' },
  { from: '/portfolio/logo-design', to: '/portfolio', type: 'permanent' },
  { from: '/portfolio/logo-design/', to: '/portfolio', type: 'permanent' },
  { from: '/our-services', to: '/services', type: 'permanent' },
  { from: '/contact-us', to: '/contact', type: 'permanent' }
];

/**
 * Check URL with comprehensive analysis
 */
async function checkUrlHealth(url) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    
    const req = https.get(url, (res) => {
      const responseTime = Date.now() - startTime;
      
      resolve({
        url,
        status: res.statusCode,
        responseTime,
        headers: {
          location: res.headers.location,
          'content-type': res.headers['content-type'],
          'cache-control': res.headers['cache-control'],
          'x-robots-tag': res.headers['x-robots-tag']
        },
        success: res.statusCode >= 200 && res.statusCode < 400,
        timestamp: new Date().toISOString()
      });
    });

    req.on('error', (err) => {
      resolve({
        url,
        status: 'ERROR',
        error: err.message,
        success: false,
        timestamp: new Date().toISOString()
      });
    });

    req.setTimeout(MONITORING_CONFIG.timeout, () => {
      req.destroy();
      resolve({
        url,
        status: 'TIMEOUT',
        success: false,
        timestamp: new Date().toISOString()
      });
    });
  });
}

/**
 * Test redirect functionality
 */
async function testRedirect(redirect) {
  const url = DOMAIN + redirect.from;
  const result = await checkUrlHealth(url);
  
  return {
    ...result,
    redirectTest: {
      expectedDestination: redirect.to,
      actualDestination: result.headers.location,
      isCorrect: result.headers.location && result.headers.location.includes(redirect.to),
      type: redirect.type
    }
  };
}

/**
 * SEO Performance Analysis
 */
function analyzeSeoPerformance(results) {
  const analysis = {
    totalUrls: results.length,
    successfulUrls: results.filter(r => r.success).length,
    failedUrls: results.filter(r => !r.success).length,
    averageResponseTime: 0,
    issues: [],
    recommendations: []
  };

  // Calculate average response time
  const responseTimes = results.filter(r => r.responseTime).map(r => r.responseTime);
  if (responseTimes.length > 0) {
    analysis.averageResponseTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
  }

  // Identify issues
  results.forEach(result => {
    if (!result.success) {
      analysis.issues.push({
        url: result.url,
        issue: `Status ${result.status}`,
        severity: 'high'
      });
    }
    
    if (result.responseTime > 3000) {
      analysis.issues.push({
        url: result.url,
        issue: `Slow response time: ${result.responseTime}ms`,
        severity: 'medium'
      });
    }
    
    if (result.headers && !result.headers['cache-control']) {
      analysis.issues.push({
        url: result.url,
        issue: 'Missing cache-control header',
        severity: 'low'
      });
    }
  });

  // Generate recommendations
  if (analysis.failedUrls > 0) {
    analysis.recommendations.push('Fix broken URLs immediately - they harm SEO rankings');
  }
  
  if (analysis.averageResponseTime > 2000) {
    analysis.recommendations.push('Optimize page load times - target under 2 seconds');
  }
  
  if (analysis.issues.some(i => i.issue.includes('cache-control'))) {
    analysis.recommendations.push('Implement proper caching headers for better performance');
  }

  return analysis;
}

/**
 * Generate SEO health report
 */
function generateReport(urlResults, redirectResults, analysis) {
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      overallHealth: analysis.failedUrls === 0 ? 'HEALTHY' : 'NEEDS_ATTENTION',
      totalUrls: analysis.totalUrls,
      successRate: Math.round((analysis.successfulUrls / analysis.totalUrls) * 100),
      averageResponseTime: Math.round(analysis.averageResponseTime)
    },
    urlHealth: urlResults,
    redirectTests: redirectResults,
    analysis: analysis
  };

  return report;
}

/**
 * Save report to file
 */
function saveReport(report) {
  const logPath = path.join(__dirname, MONITORING_CONFIG.logFile);
  
  let logs = [];
  if (fs.existsSync(logPath)) {
    try {
      logs = JSON.parse(fs.readFileSync(logPath, 'utf8'));
    } catch (e) {
      logs = [];
    }
  }
  
  logs.push(report);
  
  // Keep only last 30 days of logs
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  logs = logs.filter(log => new Date(log.timestamp) > thirtyDaysAgo);
  
  fs.writeFileSync(logPath, JSON.stringify(logs, null, 2));
}

/**
 * Main monitoring function
 */
async function runSeoHealthMonitor() {
  console.log('🔍 Starting SEO Health Monitor for', DOMAIN);
  console.log('='.repeat(60));

  try {
    // Check critical URLs
    console.log('\n📊 Checking Critical URLs...');
    const urlPromises = CRITICAL_URLS.map(path => checkUrlHealth(DOMAIN + path));
    const urlResults = await Promise.all(urlPromises);
    
    urlResults.forEach(result => {
      const status = result.success ? '✅' : '❌';
      const time = result.responseTime ? `${result.responseTime}ms` : 'N/A';
      console.log(`${status} ${result.url} - ${result.status} (${time})`);
    });

    // Test redirects
    console.log('\n🔄 Testing Redirects...');
    const redirectPromises = REDIRECT_TESTS.map(testRedirect);
    const redirectResults = await Promise.all(redirectPromises);
    
    redirectResults.forEach(result => {
      const status = result.redirectTest.isCorrect ? '✅' : '❌';
      const destination = result.redirectTest.actualDestination || 'None';
      console.log(`${status} ${result.url} → ${destination}`);
    });

    // Analyze performance
    console.log('\n📈 SEO Performance Analysis...');
    const analysis = analyzeSeoPerformance([...urlResults, ...redirectResults]);
    
    console.log(`Overall Health: ${analysis.failedUrls === 0 ? '✅ HEALTHY' : '⚠️ NEEDS ATTENTION'}`);
    console.log(`Success Rate: ${Math.round((analysis.successfulUrls / analysis.totalUrls) * 100)}%`);
    console.log(`Average Response Time: ${Math.round(analysis.averageResponseTime)}ms`);
    
    if (analysis.issues.length > 0) {
      console.log('\n🚨 Issues Found:');
      analysis.issues.forEach(issue => {
        console.log(`  ${issue.severity.toUpperCase()}: ${issue.issue} (${issue.url})`);
      });
    }
    
    if (analysis.recommendations.length > 0) {
      console.log('\n💡 Recommendations:');
      analysis.recommendations.forEach(rec => {
        console.log(`  - ${rec}`);
      });
    }

    // Generate and save report
    const report = generateReport(urlResults, redirectResults, analysis);
    saveReport(report);
    
    console.log('\n✅ SEO Health Monitor Complete!');
    console.log(`Report saved to: ${MONITORING_CONFIG.logFile}`);
    
    return report;
    
  } catch (error) {
    console.error('❌ SEO Health Monitor failed:', error);
    throw error;
  }
}

// Run the monitor
if (require.main === module) {
  runSeoHealthMonitor().catch(console.error);
}

module.exports = { runSeoHealthMonitor, checkUrlHealth, testRedirect };