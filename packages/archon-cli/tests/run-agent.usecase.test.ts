import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mkdtempSync, rmSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

describe('RunAgentUseCase', () => {
  let testDir: string;

  beforeEach(() => {
    testDir = mkdtempSync(join(tmpdir(), 'archon-run-test-'));
    mkdirSync(join(testDir, '.archon'), { recursive: true });
    writeFileSync(
      join(testDir, '.archon', 'state.json'),
      JSON.stringify({
        projectName: 'TestProject',
        projectSlug: 'test-project',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        archonVersion: '0.1.0',
        agent: 'opencode',
        mode: 'project',
        currentPhase: 0,
        phases: {},
        warnings: [],
      })
    );
    writeFileSync(
      join(testDir, '.archon', 'state.checksum'),
      'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855\n'
    );
  });

  afterEach(() => {
    if (existsSync(testDir)) {
      rmSync(testDir, { recursive: true, force: true });
    }
    vi.restoreAllMocks();
  });

  describe('execute()', () => {
    it('should return error for planned agent cursor', async () => {
      const { RunAgentUseCase } = await import('../src/application/run-agent.usecase.js');
      const usecase = new RunAgentUseCase();

      const result = await usecase.execute({
        projectPath: testDir,
        agent: 'cursor',
        phase: 0,
        transport: 'stdio',
        promptFilePath: '/fake/path.md',
        contextFiles: [],
        title: 'Test',
        archonSessionId: 'test-session',
      });

      expect(result.error).toContain('No adapter found');
      expect(result.dryRun).toBe(false);
    });

    it('should return error for planned agent gemini', async () => {
      const { RunAgentUseCase } = await import('../src/application/run-agent.usecase.js');
      const usecase = new RunAgentUseCase();

      const result = await usecase.execute({
        projectPath: testDir,
        agent: 'gemini',
        phase: 0,
        transport: 'stdio',
        promptFilePath: '/fake/path.md',
        contextFiles: [],
        title: 'Test',
        archonSessionId: 'test-session',
      });

      expect(result.error).toContain('No adapter found');
      expect(result.dryRun).toBe(false);
    });

    it('should return error when no adapter found for unknown agent', async () => {
      const { RunAgentUseCase } = await import('../src/application/run-agent.usecase.js');
      const usecase = new RunAgentUseCase();

      const result = await usecase.execute({
        projectPath: testDir,
        agent: 'unknown-agent' as any,
        phase: 0,
        transport: 'stdio',
        promptFilePath: '/fake/path.md',
        contextFiles: [],
        title: 'Test',
        archonSessionId: 'test-session',
      });

      expect(result.error).toContain('No adapter found');
    });

    it('should return error for manual agent (no adapter)', async () => {
      const { RunAgentUseCase } = await import('../src/application/run-agent.usecase.js');
      const usecase = new RunAgentUseCase();

      const result = await usecase.execute({
        projectPath: testDir,
        agent: 'manual',
        phase: 0,
        transport: 'stdio',
        promptFilePath: '/fake/path.md',
        contextFiles: [],
        title: 'Test',
        archonSessionId: 'test-session',
      });

      expect(result.error).toContain('No adapter found');
    });
  });

  describe('getFileSizes()', () => {
    it('should return empty map for empty array', async () => {
      const { RunAgentUseCase } = await import('../src/application/run-agent.usecase.js');
      const usecase = new RunAgentUseCase();

      const sizes = usecase.getFileSizes([]);
      expect(sizes.size).toBe(0);
    });

    it('should return size for existing file', async () => {
      const testFile = join(testDir, 'test.txt');
      writeFileSync(testFile, 'hello world');

      const { RunAgentUseCase } = await import('../src/application/run-agent.usecase.js');
      const usecase = new RunAgentUseCase();

      const sizes = usecase.getFileSizes([testFile]);
      expect(sizes.get(testFile)).toBeGreaterThan(0);
    });

    it('should return 0 for non-existing file', async () => {
      const { RunAgentUseCase } = await import('../src/application/run-agent.usecase.js');
      const usecase = new RunAgentUseCase();

      const sizes = usecase.getFileSizes(['/nonexistent/file.txt']);
      expect(sizes.get('/nonexistent/file.txt')).toBe(0);
    });
  });
});