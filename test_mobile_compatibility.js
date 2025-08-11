#!/usr/bin/env node

/**
 * Mobile Compatibility Test Script for El Poeta vs La Maquina Pages
 * Tests all 12 pages in books/el_poeta_vs_la_maquina/ for mobile responsiveness
 */

const fs = require('fs');
const path = require('path');

// Test results storage
const testResults = {
  totalPages: 0,
  passedPages: 0,
  failedPages: 0,
  pageResults: []
};

// Test configuration
const PAGES_DIR = './books/el_poeta_vs_la_maquina';
const EXPECTED_PAGES = 12; // Pages 0-11

/**
 * Parse HTML content and extract relevant elements
 */
function parseHTML(content) {
  const results = {
    viewportMeta: null,
    videoElements: [],
    mediaQueries: [],
    responsiveUnits: [],
    touchFriendlyElements: []
  };

  // Check for viewport meta tag
  const viewportMatch = content.match(/<meta\s+name=["']viewport["'][^>]*>/i);
  if (viewportMatch) {
    results.viewportMeta = viewportMatch[0];
  }

  // Check for video elements and their attributes
  const videoMatches = content.matchAll(/<video[^>]*>/gi);
  for (const match of videoMatches) {
    const videoTag = match[0];
    results.videoElements.push({
      tag: videoTag,
      hasControls: /controls/i.test(videoTag),
      hasPlaysinline: /playsinline/i.test(videoTag),
      hasPreload: /preload/i.test(videoTag)
    });
  }

  // Check for media queries in style tags
  const styleMatches = content.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi);
  for (const match of styleMatches) {
    const styleContent = match[1];
    const mediaQueryMatches = styleContent.matchAll(/@media[^{]*{[^}]*}/gi);
    for (const mqMatch of mediaQueryMatches) {
      results.mediaQueries.push(mqMatch[0].trim());
    }
  }

  // Check for responsive units (vw, vh, %, clamp, etc.)
  const responsiveUnitMatches = content.matchAll(/(?:width|height|font-size|padding|margin|top|left|right|bottom):\s*(?:clamp\([^)]+\)|[\d.]+(?:vw|vh|%|vmin|vmax))/gi);
  for (const match of responsiveUnitMatches) {
    results.responsiveUnits.push(match[0].trim());
  }

  // Check for touch-friendly CSS properties
  const touchFriendlyMatches = content.matchAll(/(?:touch-action|user-select|cursor:\s*pointer)/gi);
  for (const match of touchFriendlyMatches) {
    results.touchFriendlyElements.push(match[0].trim());
  }

  return results;
}

/**
 * Test individual page for mobile compatibility
 */
function testPage(pageNumber, htmlContent) {
  const pageResult = {
    page: pageNumber,
    passed: true,
    issues: [],
    features: {
      viewportMeta: false,
      responsiveDesign: false,
      mobileVideo: false,
      touchFriendly: false
    },
    details: {}
  };

  const parsed = parseHTML(htmlContent);
  pageResult.details = parsed;

  // Test 1: Viewport Meta Tag
  if (parsed.viewportMeta) {
    pageResult.features.viewportMeta = true;
    if (!/width=device-width/i.test(parsed.viewportMeta)) {
      pageResult.issues.push('Viewport meta tag missing width=device-width');
      pageResult.passed = false;
    }
    if (!/initial-scale=1/i.test(parsed.viewportMeta)) {
      pageResult.issues.push('Viewport meta tag missing initial-scale=1');
    }
  } else {
    pageResult.issues.push('Missing viewport meta tag');
    pageResult.passed = false;
  }

  // Test 2: Responsive Design Patterns
  const hasMediaQueries = parsed.mediaQueries.length > 0;
  const hasResponsiveUnits = parsed.responsiveUnits.length > 0;
  const hasFlexibleLayout = /(?:flex|grid|100vw|100vh|windowWidth|windowHeight)/i.test(htmlContent);
  const isRedirectPage = /meta.*refresh.*url\s*=/i.test(htmlContent);

  if (hasMediaQueries || hasResponsiveUnits || hasFlexibleLayout) {
    pageResult.features.responsiveDesign = true;
  } else if (isRedirectPage) {
    // Redirect pages don't need complex responsive design patterns
    pageResult.features.responsiveDesign = true;
    pageResult.details.pageType = 'redirect';
  } else {
    pageResult.issues.push('No responsive design patterns detected');
    pageResult.passed = false;
  }

  // Test 3: Mobile Video Attributes (for pages with video)
  if (parsed.videoElements.length > 0) {
    let hasProperVideoAttributes = true;
    parsed.videoElements.forEach((video, index) => {
      if (!video.hasControls) {
        pageResult.issues.push(`Video ${index + 1} missing controls attribute`);
        hasProperVideoAttributes = false;
      }
      if (!video.hasPlaysinline) {
        pageResult.issues.push(`Video ${index + 1} missing playsinline attribute`);
        hasProperVideoAttributes = false;
      }
    });
    
    // Check for responsive video container
    const hasResponsiveVideoContainer = /video-container|aspect-ratio:\s*16\/9/i.test(htmlContent);
    if (!hasResponsiveVideoContainer) {
      pageResult.issues.push('Video lacks responsive container with aspect ratio');
      hasProperVideoAttributes = false;
    }

    pageResult.features.mobileVideo = hasProperVideoAttributes;
    if (!hasProperVideoAttributes) {
      pageResult.passed = false;
    }
  } else {
    // Check for video redirects (which are problematic for mobile)
    if (/meta.*refresh.*\.mp4/i.test(htmlContent)) {
      pageResult.issues.push('Page uses video redirect instead of responsive video player');
      pageResult.passed = false;
    } else {
      pageResult.features.mobileVideo = true; // No video = no video issues
    }
  }

  // Test 4: Touch-Friendly Controls
  if (parsed.touchFriendlyElements.length > 0 || /touch-action|cursor:\s*pointer/i.test(htmlContent)) {
    pageResult.features.touchFriendly = true;
  }

  // Additional checks for specific page types
  if (/p5\.min\.js/i.test(htmlContent)) {
    // p5.js pages should have windowResized function (check in HTML or external JS files)
    let hasWindowResized = /windowResized/i.test(htmlContent);
    
    if (!hasWindowResized) {
      // Check external JavaScript files referenced in the HTML
      const jsFileMatches = htmlContent.matchAll(/<script\s+src=["']([^"']+\.js)["']/gi);
      for (const match of jsFileMatches) {
        const jsFilePath = match[1];
        // Handle relative paths
        const fullJsPath = jsFilePath.startsWith('/') ? 
          path.join('.', jsFilePath) : 
          path.join(PAGES_DIR, pageNumber.toString(), jsFilePath);
        
        if (fs.existsSync(fullJsPath)) {
          try {
            const jsContent = fs.readFileSync(fullJsPath, 'utf8');
            if (/windowResized/i.test(jsContent)) {
              hasWindowResized = true;
              break;
            }
          } catch (error) {
            // Ignore file read errors for external JS files
          }
        }
      }
    }
    
    if (!hasWindowResized) {
      pageResult.issues.push('p5.js page missing windowResized() function');
      pageResult.passed = false;
    }
  }

  return pageResult;
}

/**
 * Main test function
 */
function runMobileCompatibilityTests() {
  console.log('🔍 Starting Mobile Compatibility Tests for El Poeta vs La Maquina');
  console.log('=' .repeat(70));

  // Check if pages directory exists
  if (!fs.existsSync(PAGES_DIR)) {
    console.error(`❌ Pages directory not found: ${PAGES_DIR}`);
    return;
  }

  // Test each page (0-11)
  for (let i = 0; i < EXPECTED_PAGES; i++) {
    const pagePath = path.join(PAGES_DIR, i.toString(), 'index.html');
    
    if (!fs.existsSync(pagePath)) {
      console.log(`⚠️  Page ${i}: File not found at ${pagePath}`);
      testResults.failedPages++;
      continue;
    }

    try {
      const htmlContent = fs.readFileSync(pagePath, 'utf8');
      const pageResult = testPage(i, htmlContent);
      testResults.pageResults.push(pageResult);
      testResults.totalPages++;

      if (pageResult.passed) {
        testResults.passedPages++;
        console.log(`✅ Page ${i}: PASSED`);
      } else {
        testResults.failedPages++;
        console.log(`❌ Page ${i}: FAILED`);
        pageResult.issues.forEach(issue => {
          console.log(`   - ${issue}`);
        });
      }

      // Show features summary
      const features = pageResult.features;
      const featureStatus = [
        features.viewportMeta ? '✓' : '✗',
        features.responsiveDesign ? '✓' : '✗',
        features.mobileVideo ? '✓' : '✗',
        features.touchFriendly ? '✓' : '✗'
      ].join(' ');
      console.log(`   Features: [Viewport ${featureStatus.split(' ')[0]}] [Responsive ${featureStatus.split(' ')[1]}] [Video ${featureStatus.split(' ')[2]}] [Touch ${featureStatus.split(' ')[3]}]`);

    } catch (error) {
      console.error(`❌ Page ${i}: Error reading file - ${error.message}`);
      testResults.failedPages++;
    }

    console.log(''); // Empty line for readability
  }

  // Print summary
  console.log('=' .repeat(70));
  console.log('📊 MOBILE COMPATIBILITY TEST SUMMARY');
  console.log('=' .repeat(70));
  console.log(`Total Pages Tested: ${testResults.totalPages}`);
  console.log(`✅ Passed: ${testResults.passedPages}`);
  console.log(`❌ Failed: ${testResults.failedPages}`);
  console.log(`📈 Success Rate: ${((testResults.passedPages / testResults.totalPages) * 100).toFixed(1)}%`);

  // Detailed feature analysis
  console.log('\n📋 FEATURE ANALYSIS:');
  const featureCounts = {
    viewportMeta: 0,
    responsiveDesign: 0,
    mobileVideo: 0,
    touchFriendly: 0
  };

  testResults.pageResults.forEach(result => {
    Object.keys(featureCounts).forEach(feature => {
      if (result.features[feature]) featureCounts[feature]++;
    });
  });

  console.log(`Viewport Meta Tags: ${featureCounts.viewportMeta}/${testResults.totalPages} pages`);
  console.log(`Responsive Design: ${featureCounts.responsiveDesign}/${testResults.totalPages} pages`);
  console.log(`Mobile Video Support: ${featureCounts.mobileVideo}/${testResults.totalPages} pages`);
  console.log(`Touch-Friendly Controls: ${featureCounts.touchFriendly}/${testResults.totalPages} pages`);

  // Recommendations
  console.log('\n💡 RECOMMENDATIONS:');
  if (testResults.failedPages === 0) {
    console.log('🎉 All pages passed mobile compatibility tests!');
  } else {
    console.log('Consider addressing the issues identified above to improve mobile compatibility.');
  }

  return testResults;
}

// Run tests if this script is executed directly
if (require.main === module) {
  runMobileCompatibilityTests();
}

module.exports = { runMobileCompatibilityTests, testPage, parseHTML };


