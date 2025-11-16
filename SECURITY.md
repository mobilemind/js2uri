# Security Policy

## Supported Versions

The following versions of js2uri are currently supported with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.17.x  | :white_check_mark: |

## Reporting a Vulnerability

**For security vulnerabilities, please use private disclosure:**

1. **Preferred:** Report via [GitHub Security Advisories](https://github.com/mobilemind/js2uri/security/advisories/new)
   - Enables confidential, coordinated disclosure
   - Reporter receives recognition for discovery
   - Allows collaborative fix development before public announcement

2. **Alternative:** If you cannot use GitHub Security Advisories, create a private issue or contact the maintainer directly (see package.json for contact info)

**Please do not report security vulnerabilities via public GitHub issues** as this may put users at risk before a fix is available.

### What to Include

When reporting a vulnerability, please include:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if you have one)

### Response Timeline

- **Initial Response:** Within 48 hours
- **Status Update:** Within 7 days
- **Fix Timeline:** Typically within 30 days for high/critical severity issues

## Maintainer Security Practices

### Access & Publishing

- **2FA Required:** All package maintainers must enable two-factor authentication on their npm accounts
- **Automated Publishing:** Packages are published from GitHub Actions with npm provenance attestation for supply chain transparency
  - Publishing triggered via GitHub Releases (on: release)
  - Uses granular access token with 90-day expiry (rotated quarterly)
  - Provenance attestation provides cryptographic proof of build origin
  - Published packages can be verified at: `npm view js2uri@<version> --json`
  - SBOM (Software Bill of Materials) attached to each release in CycloneDX format
- **Token Rotation:** npm publishing token rotated every 90 days

### Code Integrity

- **Signed Commits:** All commits to the main branch must be GPG signed
- **Code Review:** All changes require review and approval before merging (via CODEOWNERS)
- **Dependencies:** Zero production dependencies eliminate dependency vulnerabilities
- **Dependency Monitoring:** Dependabot monitors for future dependency issues
- **Lockfile Protection:** `npm ci` validates package-lock.json integrity (fails if corrupted or mismatched)

## Branch Protection Rules

The main branch has the following protections enabled:

### Required Checks

- **Pull Request Reviews:** One CODEOWNERS approval required
- **Dismiss Stale Reviews:** Approvals dismissed on new commits
- **Status Checks Must Pass:**
  - CodeQL security analysis
  - Node.js 22.x build
  - Code linting

### Commit Requirements

- **GPG-Signed Commits:** Mandatory for all commits
- **Linear History:** Merge commits prevented to maintain clean history

### Branch Restrictions

- **Admin Enforcement:** Branch protection rules apply equally to administrators
- **Force Push Protection:** Force pushes disabled
- **Deletion Protection:** Branch deletions disabled

## Repository Security Features

The following GitHub security features are enabled:

- **Vulnerability Alerts:** Dependabot alerts for known vulnerabilities
- **Automated Security Updates:** Dependabot automatically creates PRs for security fixes
- **Secret Scanning:** Detects exposed credentials and tokens
- **Push Protection:** Blocks commits containing secrets
- **Private Vulnerability Reporting:** Via GitHub Security Advisories

## Verification

Users and consumers can verify the integrity of published packages:

```bash
# View provenance attestation
npm view js2uri@<version> --json

# Download and inspect SBOM
gh release download <version> --pattern sbom.json --repo mobilemind/js2uri
```

Each release includes:
- GPG-signed commits and tags
- Software Bill of Materials (SBOM) in CycloneDX format
- npm provenance attestation
- Security audit results from CI pipeline
