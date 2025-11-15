# Security Policy

## Supported Versions

The following versions of js2uri are currently supported with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.15.x  | :white_check_mark: |

## Reporting a Vulnerability

**For security vulnerabilities, please use private disclosure:**

1. **Preferred:** Report via [GitHub Security Advisories](https://github.com/mobilemind/js2uri/security/advisories/new)
   - This allows for private, coordinated disclosure
   - You'll receive credit for the discovery
   - We can work together on a fix before public disclosure

2. **Alternative:** If you cannot use GitHub Security Advisories, create a private issue or email the maintainer directly (see package.json for contact info)

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
- **Fix Timeline:** Depends on severity, but typically within 30 days for high/critical issues

## Maintainer Security Practices

To ensure the integrity of published packages:

- **2FA Required:** All package maintainers must enable two-factor authentication on their npm accounts
- **Publishing:** Packages are published with npm provenance attestation for supply chain transparency
- **Signed Commits:** All commits to the main branch must be GPG signed
- **Code Review:** All changes require review and approval before merging
