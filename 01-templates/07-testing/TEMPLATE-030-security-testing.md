[← Index](./README.md] | [< Anterior](./TEMPLATE-029-test-plan.md) | [Siguiente >](../08-deployment/README.md)

---

# Security Testing

Security validation approach, penetration testing, and vulnerability assessment.

## Contents

1. [Security Testing Categories](#security-testing-categories)
2. [OWASP Top 10](#owasp-top-10)
3. [Testing Tools](#testing-tools)
4. [Security Checklist](#security-checklist)
5. [Vulnerability Management](#vulnerability-management)

---

## Security Testing Categories

| Category | Description | Frequency |
|----------|-------------|-----------|
| **Static Analysis** | SAST - Code scanning | Every commit |
| **Dynamic Analysis** | DAST - Runtime testing | Weekly |
| **Penetration Testing** | Manual exploitation testing | Quarterly |
| **Dependency Scanning** | Vulnerable dependencies | Every build |
| **Secret Scanning** | Exposed credentials | Every commit |

---

## OWASP Top 10

### 2021 OWASP Top 10

| # | Category | Testing Approach |
|---|----------|------------------|
| A01 | Broken Access Control | Authorization tests |
| A02 | Cryptographic Failures | Configuration review |
| A03 | Injection | Input validation tests |
| A04 | Insecure Design | Architecture review |
| A05 | Security Misconfiguration | Config tests |
| A06 | Vulnerable Components | Dependency scanning |
| A07 | Auth Failures | Authentication tests |
| A08 | Data Integrity Failures | Integrity validation |
| A09 | Logging Failures | Log analysis |
| A10 | SSRF | URL validation tests |

---

## Testing Tools

### Static Analysis (SAST)

| Tool | Language | Purpose |
|------|----------|---------|
| SonarQube | Multi | Code quality + security |
| CodeQL | Multi | Security queries |
| Semgrep | Multi | Pattern matching |
| GoSec | Go | Go security |

### Dynamic Analysis (DAST)

| Tool | Purpose |
|------|---------|
| OWASP ZAP | Web app scanning |
| Burp Suite | Manual testing |
| Nuclei | Vulnerability templates |

### Dependency Scanning

| Tool | Purpose |
|------|---------|
| Snyk | Dependency vulnerabilities |
| Dependabot | GitHub integrated |
| Renovate | Update automation |

### Secret Scanning

| Tool | Purpose |
|------|---------|
| GitLeaks | Secrets in git |
| TruffleHog | Historical secrets |
| GitHub Secret Scanning | Platform scanning |

---

## Security Checklist

### Authentication
- [ ] Strong password policy enforced
- [ ] MFA available and tested
- [ ] Session timeout configured
- [ ] Account lockout after failed attempts
- [ ] Secure password reset flow

### Authorization
- [ ] Role-based access control
- [ ] Resource-level permissions
- [ ] Privilege escalation prevented
- [ ] Direct object reference protected

### Input Validation
- [ ] All input validated
- [ ] SQL injection prevented
- [ ] XSS prevented
- [ ] CSRF tokens implemented
- [ ] File upload validation

### Data Protection
- [ ] Sensitive data encrypted at rest
- [ ] TLS for data in transit
- [ ] Secrets not in code
- [ ] Data masking in logs

### API Security
- [ ] Rate limiting implemented
- [ ] Proper authentication required
- [ ] Input/output validation
- [ ] Error messages sanitized

---

## Vulnerability Management

### Vulnerability Severity

| Severity | Response Time | Example |
|----------|---------------|---------|
| **Critical** | 24 hours | RCE, data breach |
| **High** | 7 days | SQL injection |
| **Medium** | 30 days | XSS, CSRF |
| **Low** | 90 days | Information disclosure |

### Remediation Process

```
Discovery → Triage → Assign → Fix → Verify → Close
   ↓          ↓        ↓       ↓       ↓        ↓
  Scan     Severity  Owner   Code    Test    Deploy
```

---

## Example Security Test Cases

### Authentication Security

| Test Case | Description |
|-----------|-------------|
| **SEC-AUTH-001** | SQL injection in login form |
| **SEC-AUTH-002** | Brute force attack simulation |
| **SEC-AUTH-003** | Session fixation after login |
| **SEC-AUTH-004** | MFA bypass attempts |

### Authorization Security

| Test Case | Description |
|-----------|-------------|
| **SEC-AUTHZ-001** | Privilege escalation attempt |
| **SEC-AUTHZ-002** | IDOR on resource access |
| **SEC-AUTHZ-003** | Authorization bypass |

### Input Validation

| Test Case | Description |
|-----------|-------------|
| **SEC-INPUT-001** | SQL injection in search |
| **SEC-INPUT-002** | XSS in user input |
| **SEC-INPUT-003** | Path traversal attempt |

---

## Security Testing Process

### Pre-Development
- [ ] Security requirements defined
- [ ] Threat model created
- [ ] Secure coding guidelines

### During Development
- [ ] SAST in CI/CD
- [ ] Dependency scanning
- [ ] Secret scanning
- [ ] Code review for security

### Pre-Release
- [ ] DAST scan
- [ ] Manual penetration testing
- [ ] Security acceptance tests

### Post-Release
- [ ] Regular vulnerability scans
- [ ] Incident response plan
- [ ] Bug bounty program (optional)

---

## Completion Checklist

### Deliverables

- [ ] Security testing strategy defined
- [ ] Tools selected and configured
- [ ] OWASP Top 10 covered
- [ ] Security checklist complete
- [ ] Vulnerability process defined

### Sign-Off

- [ ] Prepared by: [Name, Date]
- [ ] Reviewed by: [Security Engineer, Date]
- [ ] Approved by: [CISO, Date]

---

## Tips

1. **Automate scanning**: Every commit should be scanned
2. **Stay updated**: OWASP changes; so should tests
3. **Prioritize critical**: Fix high/critical first
4. **Test regularly**: Not just before release
5. **Train developers**: Security is everyone's job

---

[← Index](./README.md] | [< Anterior](./TEMPLATE-029-test-plan.md) | [Siguiente >](../08-deployment/README.md)
