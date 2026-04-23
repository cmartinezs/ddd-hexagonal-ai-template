[← Index](./README.md] | [< Anterior](./TEMPLATE-032-environments.md) | [Siguiente >](../09-operations/README.md)

---

# Release Process

Step-by-step procedure for releasing to production with rollback procedures.

## Contents

1. [Release Checklist](#release-checklist)
2. [Release Procedure](#release-procedure)
3. [Rollback Procedure](#rollback-procedure)
4. [Post-Release](#post-release)

---

## Release Checklist

### Pre-Release
- [ ] All code merged to release branch
- [ ] Code review completed (2+ approvals)
- [ ] All tests passing in CI/CD
- [ ] Security scan passed
- [ ] Performance tests within thresholds
- [ ] Release notes prepared
- [ ] Database migrations tested

### Pre-Deployment
- [ ] Stakeholder notification sent
- [ ] On-call team notified
- [ ] Rollback plan reviewed
- [ ] Maintenance window confirmed

### Post-Deployment
- [ ] Smoke tests passing
- [ ] Error rates normal
- [ ] Latency within thresholds
- [ ] Monitoring alerts verified
- [ ] Customer notification (if needed)

---

## Release Procedure

### Step 1: Preparation
```
1. Create release branch from main
2. Update version numbers
3. Update changelog
4. Run full test suite locally
5. Create PR for release
```

### Step 2: Validation
```
1. CI/CD runs all tests
2. Deploy to staging
3. Run E2E tests on staging
4. Run performance tests
5. Get sign-off from QA
```

### Step 3: Approval
```
1. Submit release PR
2. Get approval from tech lead
3. Get approval from product manager (if feature release)
4. Schedule maintenance window
```

### Step 4: Deployment
```
1. Merge release branch to main
2. CI/CD builds and pushes image
3. Deploy to production (blue-green)
4. Run smoke tests
5. Switch traffic
6. Monitor metrics
```

### Step 5: Verification
```
1. Verify error rates normal
2. Verify latency normal
3. Check monitoring dashboards
4. Verify critical features work
5. Confirm with stakeholders
```

---

## Rollback Procedure

### When to Rollback
- [ ] Error rate > 5%
- [ ] Latency p99 > 5 seconds
- [ ] Critical feature broken
- [ ] Security vulnerability discovered
- [ ] Data corruption detected

### Rollback Steps
```
1. Stop deployment
2. Revert to previous version
3. Deploy previous Docker image
4. Run smoke tests
5. Verify recovery
6. Notify team
7. Document incident
```

### Rollback Checklist
- [ ] Previous image available
- [ ] Database rollback script ready
- [ ] Communication plan ready

---

## Post-Release

### Monitoring (First 24 hours)
| Metric | Threshold | Action |
|--------|-----------|--------|
| Error Rate | < 1% | Page if exceeded |
| Latency p95 | < 500ms | Page if exceeded |
| CPU | < 80% | Monitor |
| Memory | < 85% | Monitor |

### Communication
- [ ] Update status page
- [ ] Send release notes to team
- [ ] Update documentation
- [ ] Close release ticket

### Review
- [ ] Schedule post-mortem (if issues)
- [ ] Document lessons learned
- [ ] Update release process (if needed)

---

## Release Types

### Hotfix Release
**Timeline**: < 1 hour
- Critical bug fix
- Security patch
- Direct main → production

### Regular Release
**Timeline**: 1-2 days
- Feature release
- Bug fixes
- Standard process

### Major Release
**Timeline**: 1-2 weeks
- New features
- Breaking changes
- Extended testing

---

## Example Release Timeline

### Day 1: Preparation
- Morning: Final testing complete
- Afternoon: Release approval

### Day 2: Deployment
- 10:00 AM: Deploy to staging
- 2:00 PM: QA sign-off
- 4:00 PM: Production deployment

### Day 3: Monitoring
- Morning: Monitor metrics
- Afternoon: Resolve issues
- Evening: Release notes

---

## Completion Checklist

### Deliverables

- [ ] Release checklist documented
- [ ] Rollback procedure defined
- [ ] Communication plan set
- [ ] Post-release monitoring configured

### Sign-Off

- [ ] Prepared by: [Name, Date]
- [ ] Reviewed by: [Release Manager, Date]
- [ ] Approved by: [Tech Lead, Date]

---

## Tips

1. **Automate**: Everything in CI/CD
2. **Test rollback**: Practice before you need it
3. **Communicate**: Keep everyone informed
4. **Monitor**: Watch metrics closely post-release
5. **Document**: Write down what went wrong

---

[← Index](./README.md] | [< Anterior](./TEMPLATE-032-environments.md) | [Siguiente >](../09-operations/README.md)
