import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mkdtempSync, rmSync, writeFileSync, readFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

describe('TemplateResolver', () => {
  let testDir: string;

  beforeEach(() => {
    testDir = mkdtempSync(join(tmpdir(), 'archon-resolver-test-'));
    delete process.env.ARCHON_DEV_TEMPLATE_PATH;
  });

  afterEach(() => {
    if (existsSync(testDir)) {
      rmSync(testDir, { recursive: true, force: true });
    }
    delete process.env.ARCHON_DEV_TEMPLATE_PATH;
  });

  describe('getDevTemplatePath()', () => {
    it('should return null when no dev path configured', async () => {
      const { TemplateResolver } = await import('../src/infrastructure/cache/template-resolver.js');
      const resolver = new TemplateResolver();
      expect(resolver.getDevTemplatePath()).toBeNull();
    });

    it('should return env variable when set', async () => {
      process.env.ARCHON_DEV_TEMPLATE_PATH = '/custom/path';
      const { TemplateResolver } = await import('../src/infrastructure/cache/template-resolver.js');
      const resolver = new TemplateResolver();
      expect(resolver.getDevTemplatePath()).toBe('/custom/path');
      delete process.env.ARCHON_DEV_TEMPLATE_PATH;
    });

    it('should return instance path when set', async () => {
      const { TemplateResolver } = await import('../src/infrastructure/cache/template-resolver.js');
      const resolver = new TemplateResolver();
      resolver.setDevTemplatePath('/instance/path');
      expect(resolver.getDevTemplatePath()).toBe('/instance/path');
    });
  });

  describe('isDevMode()', () => {
    it('should return false when not in dev mode', async () => {
      const { TemplateResolver } = await import('../src/infrastructure/cache/template-resolver.js');
      const resolver = new TemplateResolver();
      expect(resolver.isDevMode()).toBe(false);
    });

    it('should return true when dev path is set', async () => {
      const { TemplateResolver } = await import('../src/infrastructure/cache/template-resolver.js');
      const resolver = new TemplateResolver();
      resolver.setDevTemplatePath('/dev/path');
      expect(resolver.isDevMode()).toBe(true);
    });

    it('should return true when env var is set', async () => {
      process.env.ARCHON_DEV_TEMPLATE_PATH = '/env/path';
      const { TemplateResolver } = await import('../src/infrastructure/cache/template-resolver.js');
      const resolver = new TemplateResolver();
      expect(resolver.isDevMode()).toBe(true);
      delete process.env.ARCHON_DEV_TEMPLATE_PATH;
    });
  });

  describe('getDefaultVersion()', () => {
    it('should return default version from registry', async () => {
      const { globalCache } = await import('../src/infrastructure/cache/global-cache.js');
      globalCache.registerTemplate('ddd-hexagonal-ai-template', '0.2.0', {
        ref: 'v0.2.0',
        source: 'test',
        defaultVersion: '0.2.0',
      });

      const { TemplateResolver } = await import('../src/infrastructure/cache/template-resolver.js');
      const resolver = new TemplateResolver();
      expect(resolver.getDefaultVersion('ddd-hexagonal-ai-template')).toBe('0.2.0');
    });

    it('should return 0.1.0 when no default version', async () => {
      const { TemplateResolver } = await import('../src/infrastructure/cache/template-resolver.js');
      const resolver = new TemplateResolver();
      expect(resolver.getDefaultVersion('unknown-template')).toBe('0.1.0');
    });
  });

  describe('findLatestInstalled()', () => {
    it('should return null when no versions installed', async () => {
      const { TemplateResolver } = await import('../src/infrastructure/cache/template-resolver.js');
      const resolver = new TemplateResolver();
      expect(resolver.findLatestInstalled('nonexistent')).toBeNull();
    });
  });

  describe('resolve()', () => {
    it('should throw when template not found', async () => {
      const { TemplateResolver } = await import('../src/infrastructure/cache/template-resolver.js');
      const resolver = new TemplateResolver();
      expect(() => resolver.resolve('nonexistent')).toThrow('not found in cache');
    });

    it('should return dev path when in dev mode', async () => {
      const { TemplateResolver } = await import('../src/infrastructure/cache/template-resolver.js');
      const resolver = new TemplateResolver();
      resolver.setDevTemplatePath('/dev/template');

      const result = resolver.resolve('any-template');
      expect(result.path).toBe('/dev/template');
      expect(result.isDev).toBe(true);
      expect(result.version).toBe('dev');
    });
  });

  describe('createTemplateLock()', () => {
    it('should create lock file', async () => {
      const { TemplateResolver } = await import('../src/infrastructure/cache/template-resolver.js');
      const resolver = new TemplateResolver();

      mkdirSync(join(testDir, '.archon'), { recursive: true });
      resolver.createTemplateLock(testDir, 'test-template', '1.0.0', '/cache/path');

      const lockPath = join(testDir, '.archon', 'template.lock.json');
      expect(existsSync(lockPath)).toBe(true);

      const lock = JSON.parse(readFileSync(lockPath, 'utf-8'));
      expect(lock.template.id).toBe('test-template');
      expect(lock.template.version).toBe('1.0.0');
      expect(lock.template.ref).toBe('v1.0.0');
      expect(lock.template.cachePath).toBe('/cache/path');
    });
  });

  describe('readTemplateLock()', () => {
    it('should return null when lock does not exist', async () => {
      const { TemplateResolver } = await import('../src/infrastructure/cache/template-resolver.js');
      const resolver = new TemplateResolver();
      expect(resolver.readTemplateLock(testDir)).toBeNull();
    });

    it('should read existing lock', async () => {
      const { TemplateResolver } = await import('../src/infrastructure/cache/template-resolver.js');
      const resolver = new TemplateResolver();

      mkdirSync(join(testDir, '.archon'), { recursive: true });
      resolver.createTemplateLock(testDir, 'test-template', '1.0.0', '/cache/path');
      const lock = resolver.readTemplateLock(testDir);

      expect(lock).not.toBeNull();
      expect(lock?.template.id).toBe('test-template');
    });
  });

  describe('getLockedTemplatePath()', () => {
    it('should return null when no lock', async () => {
      const { TemplateResolver } = await import('../src/infrastructure/cache/template-resolver.js');
      const resolver = new TemplateResolver();
      expect(resolver.getLockedTemplatePath(testDir)).toBeNull();
    });

    it('should return cache path from lock', async () => {
      const { TemplateResolver } = await import('../src/infrastructure/cache/template-resolver.js');
      const resolver = new TemplateResolver();

      mkdirSync(join(testDir, '.archon'), { recursive: true });
      resolver.createTemplateLock(testDir, 'test-template', '1.0.0', '/cache/path');
      expect(resolver.getLockedTemplatePath(testDir)).toBe('/cache/path');
    });
  });
});