import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mkdtempSync, rmSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

describe('ModeDetector', () => {
  let testDir: string;

  beforeEach(() => {
    testDir = mkdtempSync(join(tmpdir(), 'archon-mode-test-'));
    delete process.env.ARCHON_DEV_TEMPLATE_PATH;
    delete process.env.ARCHON_MODE;
    vi.spyOn(process, 'cwd').mockReturnValue(testDir);
    vi.spyOn(process, 'argv', 'get').mockReturnValue(['node', 'archon']);
  });

  afterEach(() => {
    if (existsSync(testDir)) {
      rmSync(testDir, { recursive: true, force: true });
    }
    delete process.env.ARCHON_DEV_TEMPLATE_PATH;
    delete process.env.ARCHON_MODE;
    vi.restoreAllMocks();
  });

  describe('detectMode()', () => {
    it('should return user mode when no project and no env vars', async () => {
      const { detectMode } = await import('../src/infrastructure/fs/mode-detector.js');
      const result = detectMode();
      expect(result.mode).toBe('user');
    });

    it('should return project mode when state.json exists', async () => {
      mkdirSync(join(testDir, '.archon'), { recursive: true });
      writeFileSync(
        join(testDir, '.archon', 'state.json'),
        JSON.stringify({ projectName: 'TestProject', projectSlug: 'test' })
      );

      const { detectMode } = await import('../src/infrastructure/fs/mode-detector.js');
      const result = detectMode();
      expect(result.mode).toBe('project');
      expect(result.projectName).toBe('TestProject');
      expect(result.projectPath).toBe(testDir);
    });

    it('should return project mode even with ARCHON_DEV_TEMPLATE_PATH set', async () => {
      process.env.ARCHON_DEV_TEMPLATE_PATH = '/some/dev/path';
      mkdirSync(join(testDir, '.archon'), { recursive: true });
      writeFileSync(
        join(testDir, '.archon', 'state.json'),
        JSON.stringify({ projectName: 'TestProject', projectSlug: 'test' })
      );

      const { detectMode } = await import('../src/infrastructure/fs/mode-detector.js');
      const result = detectMode();

      expect(result.mode).toBe('project');
      expect(result.projectName).toBe('TestProject');
    });

    it('should return dev mode when no project but ARCHON_DEV_TEMPLATE_PATH set', async () => {
      process.env.ARCHON_DEV_TEMPLATE_PATH = '/dev/template';

      const { detectMode } = await import('../src/infrastructure/fs/mode-detector.js');
      const result = detectMode();

      expect(result.mode).toBe('dev');
      expect(result.templatePath).toBe('/dev/template');
    });

    it('should return template-cache mode for templates command', async () => {
      vi.spyOn(process, 'argv', 'get').mockReturnValue(['node', 'archon', 'templates']);

      const { detectMode } = await import('../src/infrastructure/fs/mode-detector.js');
      const result = detectMode();

      expect(result.mode).toBe('template-cache');
    });

    it('should return template-cache mode when ARCHON_MODE=template-cache', async () => {
      process.env.ARCHON_MODE = 'template-cache';

      const { detectMode } = await import('../src/infrastructure/fs/mode-detector.js');
      const result = detectMode();

      expect(result.mode).toBe('template-cache');
    });

    it('should detect project in parent directory', async () => {
      const parentDir = mkdtempSync(join(tmpdir(), 'archon-parent-'));
      mkdirSync(join(parentDir, '.archon'), { recursive: true });
      writeFileSync(
        join(parentDir, '.archon', 'state.json'),
        JSON.stringify({ projectName: 'ParentProject', projectSlug: 'parent' })
      );

      const childDir = join(parentDir, 'subdir');
      mkdirSync(childDir, { recursive: true });
      vi.spyOn(process, 'cwd').mockReturnValue(childDir);

      const { detectMode } = await import('../src/infrastructure/fs/mode-detector.js');
      const result = detectMode();

      expect(result.mode).toBe('project');
      expect(result.projectName).toBe('ParentProject');

      rmSync(parentDir, { recursive: true, force: true });
    });
  });

  describe('detectProjectFromCwd()', () => {
    it('should return project when state.json exists', async () => {
      mkdirSync(join(testDir, '.archon'), { recursive: true });
      writeFileSync(
        join(testDir, '.archon', 'state.json'),
        JSON.stringify({ projectName: 'MyProject', projectSlug: 'my-project' })
      );

      const { detectProjectFromCwd } = await import('../src/infrastructure/fs/mode-detector.js');
      const result = detectProjectFromCwd();

      expect(result.mode).toBe('project');
      expect(result.projectName).toBe('MyProject');
    });

    it('should return user when no project', async () => {
      const { detectProjectFromCwd } = await import('../src/infrastructure/fs/mode-detector.js');
      const result = detectProjectFromCwd();

      expect(result.mode).toBe('user');
    });
  });

  describe('requireProject()', () => {
    it('should throw when no project', async () => {
      const { requireProject } = await import('../src/infrastructure/fs/mode-detector.js');
      expect(() => requireProject()).toThrow('No Archon project found');
    });

    it('should return project path when project exists', async () => {
      mkdirSync(join(testDir, '.archon'), { recursive: true });
      writeFileSync(
        join(testDir, '.archon', 'state.json'),
        JSON.stringify({ projectName: 'Test', projectSlug: 'test' })
      );

      const { requireProject } = await import('../src/infrastructure/fs/mode-detector.js');
      const result = requireProject();

      expect(result).toBe(testDir);
    });
  });
});