import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mkdtempSync, rmSync, mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

describe('Validator', () => {
  let testDir: string;

  beforeEach(() => {
    testDir = mkdtempSync(join(tmpdir(), 'archon-validator-test-'));
  });

  afterEach(() => {
    if (existsSync(testDir)) {
      rmSync(testDir, { recursive: true, force: true });
    }
  });

  describe('constructor()', () => {
    it('should use default options', async () => {
      const { Validator } = await import('../src/core/validator.js');
      const validator = new Validator();
      expect(validator).toBeDefined();
    });

    it('should accept custom basePath', async () => {
      const { Validator } = await import('../src/core/validator.js');
      const validator = new Validator({ basePath: testDir });
      expect(validator).toBeDefined();
    });

    it('should accept strict mode', async () => {
      const { Validator } = await import('../src/core/validator.js');
      const validator = new Validator({ strict: true });
      expect(validator).toBeDefined();
    });
  });

  describe('validate()', () => {
    it('should return validation result for valid phase', async () => {
      const { Validator } = await import('../src/core/validator.js');
      const validator = new Validator({ basePath: testDir });

      const result = validator.validate(0);

      expect(result.phase).toBe(0);
      expect(result.constraints).toBeDefined();
      expect(Array.isArray(result.errors)).toBe(true);
      expect(Array.isArray(result.warnings)).toBe(true);
      expect(Array.isArray(result.suggestions)).toBe(true);
    });

    it('should warn when phase folder does not exist', async () => {
      const { Validator } = await import('../src/core/validator.js');
      const validator = new Validator({ basePath: testDir });

      const result = validator.validate(0);

      const missingFolderWarnings = result.constraints.filter(
        (c) => c.id === 'missing-folder'
      );
      expect(missingFolderWarnings.length).toBeGreaterThan(0);
    });

    it('should detect missing dependency folders', async () => {
      const { Validator } = await import('../src/core/validator.js');
      const validator = new Validator({ basePath: testDir });

      mkdirSync(join(testDir, 'docs', '00-documentation-planning'), { recursive: true });

      const result = validator.validate(1);

      const depWarnings = result.constraints.filter(
        (c) => c.id === 'missing-dependency-folder'
      );
      expect(depWarnings.length).toBe(0);
    });

    it('should detect agnostic violations in phase 0-5', async () => {
      const { Validator } = await import('../src/core/validator.js');
      const validator = new Validator({ basePath: testDir });

      const phase0Path = join(testDir, 'docs', '00-documentation-planning');
      mkdirSync(phase0Path, { recursive: true });
      writeFileSync(
        join(phase0Path, 'README.md'),
        'This project uses React and PostgreSQL for the backend.'
      );

      const result = validator.validate(0);

      const violations = result.constraints.filter((c) => c.id === 'agnostic-violation');
      expect(violations.length).toBeGreaterThan(0);
    });

    it('should not detect agnostic violations in non-agnostic phases', async () => {
      const { Validator } = await import('../src/core/validator.js');
      const validator = new Validator({ basePath: testDir, strict: true });

      const phase6Path = join(testDir, 'docs', '06-development');
      mkdirSync(phase6Path, { recursive: true });
      writeFileSync(
        join(phase6Path, 'README.md'),
        'This project uses React and Node.js.'
      );

      const result = validator.validate(6);

      const violations = result.constraints.filter((c) => c.id === 'agnostic-violation');
      expect(violations.length).toBe(0);
    });

    it('should respect omit list for agnostic violations', async () => {
      const { Validator } = await import('../src/core/validator.js');
      const validator = new Validator({
        basePath: testDir,
        strict: true,
        omit: ['React'],
      });

      const phase0Path = join(testDir, 'docs', '00-documentation-planning');
      mkdirSync(phase0Path, { recursive: true });
      writeFileSync(join(phase0Path, 'README.md'), 'This project uses React.');

      const result = validator.validate(0);

      const violations = result.constraints.filter((c) => c.id === 'agnostic-violation');
      expect(violations.length).toBe(0);
    });

    it('should use strict mode to keep agnostic violations as errors', async () => {
      const { Validator } = await import('../src/core/validator.js');
      const validator = new Validator({ basePath: testDir, strict: true });

      const phase0Path = join(testDir, 'docs', '00-documentation-planning');
      mkdirSync(phase0Path, { recursive: true });
      writeFileSync(join(phase0Path, 'README.md'), 'Using PostgreSQL database.');

      const result = validator.validate(0);

      const violations = result.constraints.filter(
        (c) => c.id === 'agnostic-violation' && c.severity === 'error'
      );
      expect(violations.length).toBeGreaterThan(0);
    });
  });

  describe('validateAll()', () => {
    it('should validate all 12 phases', async () => {
      const { Validator } = await import('../src/core/validator.js');
      const validator = new Validator({ basePath: testDir });

      const results = validator.validateAll({});

      expect(results.length).toBe(12);
      results.forEach((result, index) => {
        expect(result.phase).toBe(index);
      });
    });
  });
});