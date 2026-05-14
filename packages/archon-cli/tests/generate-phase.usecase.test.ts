import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mkdtempSync, rmSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

describe('GeneratePhaseUseCase', () => {
  let testDir: string;

  beforeEach(() => {
    testDir = mkdtempSync(join(tmpdir(), 'archon-generate-test-'));
    mkdirSync(join(testDir, '.archon'), { recursive: true });
  });

  afterEach(() => {
    if (existsSync(testDir)) {
      rmSync(testDir, { recursive: true, force: true });
    }
    vi.restoreAllMocks();
  });

  describe('execute()', () => {
    it('should return error for invalid phase', async () => {
      const { GeneratePhaseUseCase } = await import('../src/application/generate-phase.usecase.js');
      const usecase = new GeneratePhaseUseCase();

      const result = usecase.execute({
        projectPath: testDir,
        phase: 99,
      });

      expect(result.error).toContain('Invalid phase');
      expect(result.phase).toBe(99);
    });

    it('should return error when no template lock found', async () => {
      const { GeneratePhaseUseCase } = await import('../src/application/generate-phase.usecase.js');
      const usecase = new GeneratePhaseUseCase();

      const result = usecase.execute({
        projectPath: testDir,
        phase: 0,
      });

      expect(result.error).toContain('No template lock found');
    });

    it('should return error when template folder not found', async () => {
      const { templateResolver } = await import('../src/infrastructure/cache/template-resolver.js');
      vi.spyOn(templateResolver, 'getLockedTemplatePath').mockReturnValue('/nonexistent/path');

      const { GeneratePhaseUseCase } = await import('../src/application/generate-phase.usecase.js');
      const usecase = new GeneratePhaseUseCase();

      const result = usecase.execute({
        projectPath: testDir,
        phase: 0,
      });

      expect(result.error).toContain('Template folder not found');
    });

    it('should generate files when template exists', async () => {
      const templateDir = join(testDir, 'template-cache');
      const phaseDir = join(templateDir, '01-templates', '00-documentation-planning');
      mkdirSync(phaseDir, { recursive: true });
      writeFileSync(join(phaseDir, 'README.md'), '# Test Template');

      const { templateResolver } = await import('../src/infrastructure/cache/template-resolver.js');
      vi.spyOn(templateResolver, 'getLockedTemplatePath').mockReturnValue(templateDir);

      const { GeneratePhaseUseCase } = await import('../src/application/generate-phase.usecase.js');
      const usecase = new GeneratePhaseUseCase();

      const result = usecase.execute({
        projectPath: testDir,
        phase: 0,
      });

      expect(result.error).toBeUndefined();
      expect(result.files.length).toBeGreaterThan(0);
      expect(result.files[0]?.action).toBe('created');
    });

    it('should skip existing files without force', async () => {
      const templateDir = join(testDir, 'template-cache');
      const phaseDir = join(templateDir, '01-templates', '00-documentation-planning');
      mkdirSync(phaseDir, { recursive: true });
      writeFileSync(join(phaseDir, 'README.md'), '# Test Template');

      const destDir = join(testDir, 'docs', '00-documentation-planning');
      mkdirSync(destDir, { recursive: true });
      writeFileSync(join(destDir, 'README.md'), '# Existing');

      const { templateResolver } = await import('../src/infrastructure/cache/template-resolver.js');
      vi.spyOn(templateResolver, 'getLockedTemplatePath').mockReturnValue(templateDir);

      const { GeneratePhaseUseCase } = await import('../src/application/generate-phase.usecase.js');
      const usecase = new GeneratePhaseUseCase();

      const result = usecase.execute({
        projectPath: testDir,
        phase: 0,
        force: false,
      });

      expect(result.files[0]?.action).toBe('skipped');
    });

    it('should overwrite existing files with force', async () => {
      const templateDir = join(testDir, 'template-cache');
      const phaseDir = join(templateDir, '01-templates', '00-documentation-planning');
      mkdirSync(phaseDir, { recursive: true });
      writeFileSync(join(phaseDir, 'README.md'), '# New Content');

      const destDir = join(testDir, 'docs', '00-documentation-planning');
      mkdirSync(destDir, { recursive: true });
      writeFileSync(join(destDir, 'README.md'), '# Old Content');

      const { templateResolver } = await import('../src/infrastructure/cache/template-resolver.js');
      vi.spyOn(templateResolver, 'getLockedTemplatePath').mockReturnValue(templateDir);

      const { GeneratePhaseUseCase } = await import('../src/application/generate-phase.usecase.js');
      const usecase = new GeneratePhaseUseCase();

      const result = usecase.execute({
        projectPath: testDir,
        phase: 0,
        force: true,
      });

      expect(result.files[0]?.action).toBe('overwritten');
    });
  });
});