import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mkdtempSync, rmSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

describe('StateManager', () => {
  let testDir: string;

  beforeEach(() => {
    testDir = mkdtempSync(join(tmpdir(), 'archon-test-'));
  });

  afterEach(() => {
    if (existsSync(testDir)) {
      rmSync(testDir, { recursive: true, force: true });
    }
  });

  describe('exists()', () => {
    it('should return false when state file does not exist', async () => {
      const { StateManager } = await import('../src/infrastructure/state/state-manager.js');
      const sm = new StateManager(testDir);
      expect(sm.exists()).toBe(false);
    });

    it('should return true when state file exists', async () => {
      const { StateManager } = await import('../src/infrastructure/state/state-manager.js');
      const sm = new StateManager(testDir);
      sm.create({
        projectName: 'TestProject',
        projectSlug: 'test-project',
        agent: 'opencode',
      });
      expect(sm.exists()).toBe(true);
    });
  });

  describe('create()', () => {
    it('should create state with correct defaults', async () => {
      const { StateManager } = await import('../src/infrastructure/state/state-manager.js');
      const sm = new StateManager(testDir);
      const state = sm.create({
        projectName: 'MyProject',
        projectSlug: 'my-project',
        agent: 'claude',
      });

      expect(state.projectName).toBe('MyProject');
      expect(state.projectSlug).toBe('my-project');
      expect(state.agent).toBe('claude');
      expect(state.mode).toBe('project');
      expect(state.currentPhase).toBe(0);
      expect(state.phases).toEqual({});
      expect(state.warnings).toEqual([]);
    });

    it('should create .archon directory and files', async () => {
      const { StateManager } = await import('../src/infrastructure/state/state-manager.js');
      const sm = new StateManager(testDir);
      sm.create({
        projectName: 'Test',
        projectSlug: 'test',
        agent: 'opencode',
      });

      expect(existsSync(join(testDir, '.archon'))).toBe(true);
      expect(existsSync(join(testDir, '.archon', 'state.json'))).toBe(true);
      expect(existsSync(join(testDir, '.archon', 'state.checksum'))).toBe(true);
    });

    it('should return created state', async () => {
      const { StateManager } = await import('../src/infrastructure/state/state-manager.js');
      const sm = new StateManager(testDir);
      const state = sm.create({
        projectName: 'Test',
        projectSlug: 'test',
        agent: 'opencode',
      });

      expect(state.projectName).toBe('Test');
    });
  });

  describe('load()', () => {
    it('should throw when state file not found', async () => {
      const { StateManager } = await import('../src/infrastructure/state/state-manager.js');
      const sm = new StateManager(testDir);
      expect(() => sm.load()).toThrow('State file not found');
    });

    it('should load existing state', async () => {
      const { StateManager } = await import('../src/infrastructure/state/state-manager.js');
      const sm = new StateManager(testDir);
      sm.create({
        projectName: 'Test',
        projectSlug: 'test',
        agent: 'opencode',
      });

      const sm2 = new StateManager(testDir);
      const state = sm2.load();
      expect(state.projectName).toBe('Test');
    });

    it('should cache state after first load', async () => {
      const { StateManager } = await import('../src/infrastructure/state/state-manager.js');
      const sm = new StateManager(testDir);
      sm.create({
        projectName: 'Test',
        projectSlug: 'test',
        agent: 'opencode',
      });

      const state1 = sm.load();
      state1.projectName = 'Modified';

      const state2 = sm.load();
      expect(state2.projectName).toBe('Modified');
    });
  });

  describe('save()', () => {
    it('should throw when no state loaded', async () => {
      const { StateManager } = await import('../src/infrastructure/state/state-manager.js');
      const sm = new StateManager(testDir);
      expect(() => sm.save()).toThrow('No state loaded');
    });

    it('should update updatedAt timestamp', async () => {
      const { StateManager } = await import('../src/infrastructure/state/state-manager.js');
      const sm = new StateManager(testDir);
      sm.create({
        projectName: 'Test',
        projectSlug: 'test',
        agent: 'opencode',
      });

      const state1 = sm.load();
      const firstUpdated = state1.updatedAt;

      await new Promise((resolve) => setTimeout(resolve, 10));
      sm.save();

      const sm2 = new StateManager(testDir);
      const state2 = sm2.load();
      expect(state2.updatedAt > firstUpdated).toBe(true);
    });

    it('should write checksum file', async () => {
      const { StateManager } = await import('../src/infrastructure/state/state-manager.js');
      const sm = new StateManager(testDir);
      sm.create({
        projectName: 'Test',
        projectSlug: 'test',
        agent: 'opencode',
      });

      const checksumPath = join(testDir, '.archon', 'state.checksum');
      expect(existsSync(checksumPath)).toBe(true);
      const checksum = readFileSync(checksumPath, 'utf-8').trim();
      expect(checksum).toHaveLength(64);
    });
  });

  describe('validate()', () => {
    it('should return false when state file missing', async () => {
      const { StateManager } = await import('../src/infrastructure/state/state-manager.js');
      const sm = new StateManager(testDir);
      expect(sm.validate()).toBe(false);
    });

    it('should return true when state is valid', async () => {
      const { StateManager } = await import('../src/infrastructure/state/state-manager.js');
      const sm = new StateManager(testDir);
      sm.create({
        projectName: 'Test',
        projectSlug: 'test',
        agent: 'opencode',
      });

      expect(sm.validate()).toBe(true);
    });

    it('should return false when checksum does not match', async () => {
      const { StateManager } = await import('../src/infrastructure/state/state-manager.js');
      const sm = new StateManager(testDir);
      sm.create({
        projectName: 'Test',
        projectSlug: 'test',
        agent: 'opencode',
      });

      const statePath = join(testDir, '.archon', 'state.json');
      const stateContent = readFileSync(statePath, 'utf-8');
      const modified = stateContent.replace('"projectName": "Test"', '"projectName": "Modified"');
      writeFileSync(statePath, modified);

      expect(sm.validate()).toBe(false);
    });
  });

  describe('updatePhase()', () => {
    it('should update phase status', async () => {
      const { StateManager } = await import('../src/infrastructure/state/state-manager.js');
      const sm = new StateManager(testDir);
      sm.create({
        projectName: 'Test',
        projectSlug: 'test',
        agent: 'opencode',
      });

      sm.updatePhase(1, { status: 'completed', phase: 1 });

      const sm2 = new StateManager(testDir);
      const state = sm2.load();
      expect(state.phases['phase-01']).toEqual({ status: 'completed', phase: 1 });
    });

    it('should update currentPhase when status is in_progress', async () => {
      const { StateManager } = await import('../src/infrastructure/state/state-manager.js');
      const sm = new StateManager(testDir);
      sm.create({
        projectName: 'Test',
        projectSlug: 'test',
        agent: 'opencode',
      });

      sm.updatePhase(3, { status: 'in_progress', phase: 3 });

      const sm2 = new StateManager(testDir);
      const state = sm2.load();
      expect(state.currentPhase).toBe(3);
    });
  });

  describe('getProjectName()', () => {
    it('should return project name', async () => {
      const { StateManager } = await import('../src/infrastructure/state/state-manager.js');
      const sm = new StateManager(testDir);
      sm.create({
        projectName: 'MyProject',
        projectSlug: 'my-project',
        agent: 'opencode',
      });

      expect(sm.getProjectName()).toBe('MyProject');
    });
  });

  describe('getAgent()', () => {
    it('should return agent type', async () => {
      const { StateManager } = await import('../src/infrastructure/state/state-manager.js');
      const sm = new StateManager(testDir);
      sm.create({
        projectName: 'Test',
        projectSlug: 'test',
        agent: 'claude',
      });

      expect(sm.getAgent()).toBe('claude');
    });
  });

  describe('getCurrentPhase()', () => {
    it('should return current phase', async () => {
      const { StateManager } = await import('../src/infrastructure/state/state-manager.js');
      const sm = new StateManager(testDir);
      sm.create({
        projectName: 'Test',
        projectSlug: 'test',
        agent: 'opencode',
      });

      expect(sm.getCurrentPhase()).toBe(0);
    });
  });
});