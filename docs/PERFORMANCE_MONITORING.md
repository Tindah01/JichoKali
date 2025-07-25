# Performance Monitoring & CI/CD Budgets

This document explains the comprehensive performance monitoring system implemented for the JichoKali Kenya application, including CI/CD performance budgets, automated regression detection, and local testing tools.

## Overview

The performance monitoring system ensures that:
- Bundle sizes stay within defined limits
- Performance regressions are caught early
- Core Web Vitals remain optimized
- Developers get immediate feedback on performance impact

## Performance Budgets

### Current Budget Limits

| Asset Type | Budget (Gzipped) | Purpose |
|------------|------------------|---------|
| **Vendor Bundle** | 150 KB | React, ReactDOM, and third-party libraries |
| **Main App Bundle** | 15 KB | Core application logic and routing |
| **Component Chunks** | 12 KB each | Individual lazy-loaded components |
| **Icons Chunk** | 8 KB | Lucide React icons library |
| **CSS Bundle** | 25 KB | All stylesheets (Tailwind CSS) |
| **Total Build** | 250 KB | Complete application build |

### Core Web Vitals Thresholds

| Metric | Threshold | Description |
|--------|-----------|-------------|
| **First Contentful Paint** | 2.0s | Time to first visible content |
| **Largest Contentful Paint** | 3.0s | Time to largest content element |
| **Cumulative Layout Shift** | 0.1 | Visual stability score |
| **Total Blocking Time** | 500ms | Main thread blocking time |
| **Speed Index** | 3.0s | Visual completion speed |
| **Time to Interactive** | 4.0s | Time to full interactivity |

### Lighthouse Scores

| Category | Minimum Score | Target |
|----------|---------------|---------|
| **Performance** | 85 | 90+ |
| **Accessibility** | 90 | 95+ |
| **Best Practices** | 90 | 95+ |
| **SEO** | 90 | 95+ |

## CI/CD Integration

### GitHub Actions Workflows

#### 1. Performance Budget Check (`.github/workflows/performance-budget.yml`)

**Triggers:** Every push and pull request to `main` or `develop` branches

**What it does:**
- Builds the application
- Analyzes bundle sizes
- Checks against performance budgets
- Runs Lighthouse CI audits
- Generates performance reports
- Posts results as PR comments

**Budget Violations:** Fails the build if any budget is exceeded

#### 2. Performance Regression Detection (`.github/workflows/performance-regression.yml`)

**Triggers:** Pull requests only

**What it does:**
- Builds both PR branch and base branch
- Compares bundle sizes between branches
- Calculates percentage changes
- Detects regressions above 5% threshold
- Posts detailed comparison reports
- Fails PR if significant regression detected

**Regression Threshold:** 5% increase in any bundle size

### Automated Reporting

Both workflows automatically post detailed reports to pull requests including:

- 📊 Bundle size analysis
- 📈 Performance metrics
- 🎯 Budget compliance status
- ⚠️ Regression warnings
- 💡 Optimization recommendations

## Local Development Tools

### 1. Performance Budget Checker

**Command:** `npm run performance:budget`

**Purpose:** Local validation of performance budgets

**Features:**
- Colored console output
- Detailed budget analysis
- Optimization recommendations
- Pre-commit hook integration

**Example Output:**
```bash
🎯 Performance Budget Check
============================

📦 Vendor Bundle Analysis:
  ✅ Vendor chunk:
    136.0 KB (gzipped) / 150.0 KB budget
    90.7% of budget used

📱 Main App Bundle Analysis:
  ✅ Main app bundle:
    10.3 KB (gzipped) / 15.0 KB budget
    68.7% of budget used

📋 Summary:
===========
✅ All performance budgets passed!
🎉 Your build is optimized and ready for production.
```

### 2. Bundle Analyzer

**Command:** `npm run performance:analyze`

**Purpose:** Visual analysis of bundle composition

**What it provides:**
- Interactive bundle visualization
- Module dependency analysis
- Size impact assessment
- Optimization opportunities

### 3. Full Performance Suite

**Command:** `npm run performance:full`

**Purpose:** Complete performance validation (build + budget check)

**When to use:**
- Before committing changes
- After adding new dependencies
- When optimizing performance
- For comprehensive testing

## Pre-commit Hooks

### Automatic Performance Validation

The pre-commit hook (`.husky/pre-commit`) automatically:

1. Runs full performance suite
2. Validates all budgets
3. Prevents commits if budgets fail
4. Provides optimization guidance

**To bypass (not recommended):**
```bash
git commit --no-verify -m "your message"
```

## Configuration

### Central Configuration File

**Location:** `performance-budget.config.js`

**Purpose:** Single source of truth for all performance thresholds

**Key sections:**
- `BUNDLE_SIZES`: File size limits
- `CORE_WEB_VITALS`: Performance metric thresholds
- `LIGHTHOUSE_SCORES`: Audit score requirements
- `RESOURCE_LIMITS`: Resource optimization limits
- `REGRESSION_THRESHOLDS`: Change detection limits

### Customizing Budgets

To adjust performance budgets:

1. Edit `performance-budget.config.js`
2. Update the relevant threshold values
3. Test locally with `npm run performance:full`
4. Commit changes to update CI/CD

### Tool-Specific Configurations

- **Lighthouse CI:** `lighthouserc.js`
- **Bundlesize:** `package.json` bundlesize section
- **Vite Build:** `vite.config.ts`

## Troubleshooting

### Common Issues

#### 1. Budget Exceeded

**Problem:** Bundle size exceeds performance budget

**Solutions:**
- Run `npm run performance:analyze` to identify large modules
- Check for accidentally imported large libraries
- Ensure tree-shaking is working correctly
- Consider lazy loading heavy components
- Review Tailwind CSS purging configuration

#### 2. Lighthouse CI Failures

**Problem:** Performance scores below thresholds

**Common causes:**
- Large bundle sizes
- Inefficient code splitting
- Missing optimizations
- Resource loading issues

**Solutions:**
- Optimize bundle sizes first
- Review Core Web Vitals specifically
- Check network conditions in CI
- Ensure proper resource hints

#### 3. False Positive Regressions

**Problem:** Regression detected due to CI variations

**Solutions:**
- Check if change is consistent across runs
- Review actual file changes
- Consider baseline calibration
- Temporary budget adjustment if justified

### Performance Optimization Checklist

When budgets fail, check:

- [ ] **Dependencies:** New packages or version updates?
- [ ] **Tree-shaking:** Are imports properly optimized?
- [ ] **Code splitting:** Are components properly lazy-loaded?
- [ ] **Asset optimization:** Are images/fonts optimized?
- [ ] **CSS purging:** Is Tailwind CSS properly purged?
- [ ] **Build configuration:** Are all optimizations enabled?

## Monitoring & Alerts

### Continuous Monitoring

The system provides multiple layers of monitoring:

1. **Local Development:** Pre-commit hooks
2. **PR Review:** Automated regression detection
3. **Deployment:** Production budget validation
4. **Trending:** Performance metric tracking

### Performance Metrics Dashboard

Key metrics to monitor:

- Bundle size trends over time
- Performance score history
- Regression frequency
- Optimization impact

### Alert Conditions

Alerts are triggered for:

- ❌ Budget violations
- ⚠️ Performance regressions > 5%
- 📊 Lighthouse score drops > 2%
- 🚨 Total build size > 250KB

## Best Practices

### Development Workflow

1. **Before Making Changes:**
   - Run `npm run performance:full` to establish baseline
   - Note current bundle sizes

2. **During Development:**
   - Add new dependencies carefully
   - Test performance impact incrementally
   - Use lazy loading for heavy components

3. **Before Committing:**
   - Run `npm run performance:full` locally
   - Review bundle analyzer output
   - Optimize if budgets exceeded

4. **During PR Review:**
   - Check automated performance reports
   - Verify no significant regressions
   - Address any budget violations

### Performance-First Development

- **Dependency Selection:** Choose lightweight alternatives
- **Code Splitting:** Split routes and heavy features
- **Lazy Loading:** Load components on demand
- **Tree Shaking:** Use ES modules and named imports
- **Asset Optimization:** Optimize images and fonts
- **Caching Strategy:** Leverage long-term caching

## Advanced Features

### Custom Performance Metrics

Extend monitoring by adding custom metrics:

1. **Component Load Times:** Track lazy loading performance
2. **User Interaction Metrics:** Measure interaction delays
3. **Memory Usage:** Monitor JavaScript heap size
4. **Network Efficiency:** Track resource loading patterns

### Performance Regression Tracking

Advanced regression detection includes:

- **Historical Comparison:** Multi-baseline comparison
- **Trend Analysis:** Performance trend identification
- **Impact Assessment:** Change impact quantification
- **Automatic Optimization:** Suggested improvements

### Integration with Monitoring Services

Consider integrating with:

- **Real User Monitoring (RUM):** Track actual user performance
- **Synthetic Monitoring:** Automated performance testing
- **Performance Dashboards:** Visual performance tracking
- **Alert Systems:** Proactive performance notifications

## Conclusion

This comprehensive performance monitoring system ensures that the JichoKali Kenya application maintains excellent performance standards while preventing regressions and providing developers with the tools they need to build performant features.

The combination of automated CI/CD checks, local development tools, and comprehensive monitoring creates a robust performance culture that scales with the development team.