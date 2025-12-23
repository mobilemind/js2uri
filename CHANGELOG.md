# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 1.18.1

- Streamline .npmignore & .npmrc
- Whitelist files to include in published package (reduce size)

## 1.18.0

- Refine publishing to use OIDC
- Require npm 11.5.1 to support OIDC
- Discontinue use of token for publishing
- Update GitHub Actions workflows (OIDC, checkout v6)

## 1.17.0

### BREAKING CHANGES

#### Zero Dependencies Philosophy

This release removes ALL npm dependencies (both dependencies and
devDependencies) to achieve zero-dependency status. This significantly reduces
supply chain risk, eliminates transitive dependency vulnerabilities, and
simplifies maintenance.

#### Node.js Version Requirements

- **Minimum Node.js version:** `>=22.12.0` (previously `>=20.19.5`)
- **Minimum npm version:** `>=10.9.0` (previously `>=10.8.2`)
- **Dropped support for:** Node.js 20.x and 21.x


#### Test Framework Migration
- **Removed:** `grunt-contrib-nodeunit` (replaced with Node.js built-in test
  runner)
- **New test command:** `node --test test/js2uri*.js`
- Tests now use Node.js native `node:test` and `node:assert/strict` modules
- `grunt` remains available as a peerDependency for users who want
  `npx grunt test`

### Changed

#### Dependencies

- Removed `grunt` from devDependencies (now peerDependency only)
- Removed `grunt-contrib-nodeunit` from devDependencies
- **devDependencies:** Now empty `{}`

#### Testing

- Migrated from nodeunit to Node.js built-in test runner
- Updated test files to use `describe()` and `test()` from `node:test`
- Updated assertions to use `assert` from `node:assert/strict`
- Tests no longer require `grunt` module (use `package.json` directly)

#### Package Scripts

- **Updated:** `test` script now runs `node --test test/js2uri*.js`
  (previously `npx grunt test`)
- **Added:** `audit` script for security audits (`npm audit --omit=dev --audit-level=moderate`)
- **Added:** `audit:fix` script for fixing audit issues
  (`npm audit fix --omit=dev`)

#### Build Configuration

- Updated `Gruntfile.js` to use Node.js `child_process.spawn()` for test
  execution
- Removed nodeunit configuration from Gruntfile
- Tests still work with `npx grunt test` for users with grunt installed

#### CI/CD

- Updated GitHub Actions to skip `npm install` (zero dependencies)
- Added explanatory comments about zero-dependency approach
- Updated security audit steps with peerDependency vulnerability handling
- Removed Node.js 20.x from CI test matrix (now tests 22.x, 24.x, 25.x)
- Updated publish workflow to use Node.js 22.x (previously 20.x)

#### Dependabot

- Simplified to monthly checks only (previously daily security + weekly
  versions)
- Removed grouping configuration (minimal dependencies to update)
- Added comments explaining zero-dependency safety net approach

### Migration Guide

#### For Package Users

If you're using js2uri as a dependency:

1. Update to Node.js >=22.12.0
2. No changes needed to your code - the public API is unchanged
3. If you see `npm audit` warnings about grunt's js-yaml, these are
   peerDependencies (not our responsibility)

#### For Contributors/Developers

If you're contributing to js2uri:

1. Update to Node.js >=22.12.0 and npm >=10.9.0
2. Run `npm install` (installs nothing - we have zero dependencies!)
3. Tests now use `npm test` or `npx grunt test` (if you have grunt installed
   globally or via npx)
4. Test files now use Node.js built-in test framework instead of nodeunit

### Why Zero Dependencies?

**Benefits:**

- **Security:** No transitive dependency vulnerabilities
- **Reliability:** No dependency chain breakage
- **Performance:** Faster installs (nothing to download!)
- **Maintenance:** No dependency updates or compatibility issues
- **Transparency:** Easier security audits and supply chain verification

**Trade-offs:**

- Requires Node.js >=22.12.0 (dropped older versions)
- grunt remains as peerDependency for users who want it

---

## Previous Releases

See README.md "Release History" section for versions 1.0.0 through 1.16.2.
