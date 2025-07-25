#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { PERFORMANCE_BUDGETS } = require('../performance-budget.config.cjs');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  bold: '\x1b[1m',
};

function colorize(text, color) {
  return `${colors[color] || ''}${text}${colors.reset}`;
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

function getFileSize(filePath) {
  try {
    return fs.statSync(filePath).size;
  } catch (error) {
    return 0;
  }
}

function getGzippedSize(filePath) {
  try {
    const gzipOutput = execSync(`gzip -c "${filePath}" | wc -c`, { encoding: 'utf8' });
    return parseInt(gzipOutput.trim());
  } catch (error) {
    return 0;
  }
}

function findFiles(pattern, directory = 'dist/assets') {
  try {
    const output = execSync(`find ${directory} -name "${pattern}" 2>/dev/null || true`, { encoding: 'utf8' });
    return output.trim().split('\n').filter(file => file.length > 0);
  } catch (error) {
    return [];
  }
}

function checkBudget(actual, budget, label, isGzipped = false) {
  const status = actual <= budget;
  const percentage = budget > 0 ? ((actual / budget) * 100).toFixed(1) : 0;
  const sizeType = isGzipped ? 'gzipped' : 'raw';
  
  console.log(`  ${status ? '✅' : '❌'} ${label}:`);
  console.log(`    ${colorize(formatBytes(actual), status ? 'green' : 'red')} (${sizeType}) / ${formatBytes(budget)} budget`);
  console.log(`    ${colorize(`${percentage}%`, status ? 'green' : 'red')} of budget used`);
  
  return status;
}

async function runPerformanceCheck() {
  console.log(colorize('\n🎯 Performance Budget Check', 'bold'));
  console.log('============================\n');
  
  // Check if dist directory exists
  if (!fs.existsSync('dist')) {
    console.log(colorize('❌ No dist directory found. Please run "npm run build" first.\n', 'red'));
    process.exit(1);
  }
  
  let allPassed = true;
  
  // Check vendor bundle
  console.log(colorize('📦 Vendor Bundle Analysis:', 'blue'));
  const vendorFiles = findFiles('*vendor*.js');
  if (vendorFiles.length > 0) {
    const vendorFile = vendorFiles[0];
    const vendorSize = getFileSize(vendorFile);
    const vendorGzipped = getGzippedSize(vendorFile);
    
    const vendorPassed = checkBudget(vendorGzipped, PERFORMANCE_BUDGETS.BUNDLE_SIZES.VENDOR_CHUNK, 'Vendor chunk', true);
    allPassed = allPassed && vendorPassed;
  } else {
    console.log('  ⚠️  No vendor bundle found');
  }
  
  // Check main app bundle
  console.log(colorize('\n📱 Main App Bundle Analysis:', 'blue'));
  const mainFiles = findFiles('index-*.js');
  if (mainFiles.length > 0) {
    const mainFile = mainFiles[0];
    const mainSize = getFileSize(mainFile);
    const mainGzipped = getGzippedSize(mainFile);
    
    const mainPassed = checkBudget(mainGzipped, PERFORMANCE_BUDGETS.BUNDLE_SIZES.MAIN_APP, 'Main app bundle', true);
    allPassed = allPassed && mainPassed;
  } else {
    console.log('  ⚠️  No main bundle found');
  }
  
  // Check component chunks
  console.log(colorize('\n🧩 Component Chunks Analysis:', 'blue'));
  const allJsFiles = findFiles('*.js');
  const componentFiles = allJsFiles.filter(file => 
    !file.includes('vendor') && 
    !file.includes('index-') && 
    !file.includes('icons-')
  );
  
  if (componentFiles.length > 0) {
    let componentsPassed = true;
    componentFiles.forEach(file => {
      const fileName = path.basename(file);
      const size = getFileSize(file);
      const gzipped = getGzippedSize(file);
      
      const passed = checkBudget(gzipped, PERFORMANCE_BUDGETS.BUNDLE_SIZES.COMPONENT_CHUNK, fileName, true);
      componentsPassed = componentsPassed && passed;
    });
    allPassed = allPassed && componentsPassed;
  } else {
    console.log('  ℹ️  No component chunks found');
  }
  
  // Check icons chunk
  console.log(colorize('\n🎨 Icons Chunk Analysis:', 'blue'));
  const iconFiles = findFiles('*icons*.js');
  if (iconFiles.length > 0) {
    const iconFile = iconFiles[0];
    const iconSize = getFileSize(iconFile);
    const iconGzipped = getGzippedSize(iconFile);
    
    const iconPassed = checkBudget(iconGzipped, PERFORMANCE_BUDGETS.BUNDLE_SIZES.ICON_CHUNK, 'Icons chunk', true);
    allPassed = allPassed && iconPassed;
  } else {
    console.log('  ⚠️  No icons chunk found');
  }
  
  // Check CSS bundle
  console.log(colorize('\n🎨 CSS Bundle Analysis:', 'blue'));
  const cssFiles = findFiles('*.css');
  if (cssFiles.length > 0) {
    const cssFile = cssFiles[0];
    const cssSize = getFileSize(cssFile);
    const cssGzipped = getGzippedSize(cssFile);
    
    const cssPassed = checkBudget(cssGzipped, PERFORMANCE_BUDGETS.BUNDLE_SIZES.CSS_BUNDLE, 'CSS bundle', true);
    allPassed = allPassed && cssPassed;
  } else {
    console.log('  ⚠️  No CSS bundle found');
  }
  
  // Check total build size
  console.log(colorize('\n📊 Total Build Analysis:', 'blue'));
  try {
    const totalSizeOutput = execSync('du -sb dist/', { encoding: 'utf8' });
    const totalSize = parseInt(totalSizeOutput.split('\t')[0]);
    
    const totalPassed = checkBudget(totalSize, PERFORMANCE_BUDGETS.BUNDLE_SIZES.TOTAL_BUILD, 'Total build size');
    allPassed = allPassed && totalPassed;
  } catch (error) {
    console.log('  ❌ Could not calculate total build size');
    allPassed = false;
  }
  
  // Summary
  console.log(colorize('\n📋 Summary:', 'bold'));
  console.log('===========');
  
  if (allPassed) {
    console.log(colorize('✅ All performance budgets passed!', 'green'));
    console.log(colorize('🎉 Your build is optimized and ready for production.', 'green'));
  } else {
    console.log(colorize('❌ Some performance budgets failed!', 'red'));
    console.log(colorize('🔧 Please optimize your build before committing.', 'yellow'));
    console.log('\nOptimization tips:');
    console.log('- Check for new dependencies that might increase bundle size');
    console.log('- Ensure tree-shaking is working correctly');
    console.log('- Consider code splitting for large features');
    console.log('- Review lazy loading implementation');
    console.log('- Use the performance analyzer: npm run performance:analyze');
  }
  
  // Bundle analysis summary
  console.log(colorize('\n📈 Bundle Analysis Summary:', 'blue'));
  try {
    execSync('ls -lh dist/assets/', { stdio: 'inherit' });
  } catch (error) {
    console.log('Could not list build assets');
  }
  
  console.log('\n');
  
  if (!allPassed) {
    process.exit(1);
  }
}

// Handle CLI arguments
const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
${colorize('Performance Budget Checker', 'bold')}

Usage: node scripts/performance-check.js [options]

Options:
  --help, -h    Show this help message
  --quiet, -q   Run in quiet mode (less output)
  --verbose, -v Run in verbose mode (more output)

This script checks your build output against performance budgets
and helps identify potential performance regressions.

Performance Budgets:
- Vendor Bundle: ${formatBytes(PERFORMANCE_BUDGETS.BUNDLE_SIZES.VENDOR_CHUNK)} (gzipped)
- Main App: ${formatBytes(PERFORMANCE_BUDGETS.BUNDLE_SIZES.MAIN_APP)} (gzipped)
- Component Chunks: ${formatBytes(PERFORMANCE_BUDGETS.BUNDLE_SIZES.COMPONENT_CHUNK)} each (gzipped)
- Icons Chunk: ${formatBytes(PERFORMANCE_BUDGETS.BUNDLE_SIZES.ICON_CHUNK)} (gzipped)
- CSS Bundle: ${formatBytes(PERFORMANCE_BUDGETS.BUNDLE_SIZES.CSS_BUNDLE)} (gzipped)
- Total Build: ${formatBytes(PERFORMANCE_BUDGETS.BUNDLE_SIZES.TOTAL_BUILD)}
  `);
  process.exit(0);
}

// Run the performance check
runPerformanceCheck().catch(error => {
  console.error(colorize(`\n❌ Error running performance check: ${error.message}`, 'red'));
  process.exit(1);
});