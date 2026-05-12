import {
  readFileSync,
  writeFileSync,
  existsSync,
  mkdirSync,
  chmodSync,
} from 'node:fs';
import { resolve } from 'node:path';
import type { ArchonConfig, AgentType, InteractiveMode, TransportMode } from './types.js';

const DEFAULT_CONFIG: ArchonConfig = {
  agent: {
    type: 'opencode',
    transport: 'file-attachment',
    preferences: {},
    doctorChecked: false,
  },
  defaults: {},
  interactiveMode: 'missing',
  autoUpgrade: false,
  checksumValidation: 'warn',
};

export class ConfigManager {
  private config: ArchonConfig | null = null;
  private projectPath: string;
  private configPath: string;

  constructor(projectPath?: string) {
    this.projectPath = projectPath || process.cwd();
    this.configPath = resolve(this.projectPath, '.archon', 'config.json');
  }

  load(): ArchonConfig {
    if (this.config) return this.config;

    if (existsSync(this.configPath)) {
      try {
        const raw = readFileSync(this.configPath, 'utf-8');
        const parsed = JSON.parse(raw);
        this.config = { ...DEFAULT_CONFIG, ...parsed };
      } catch {
        this.config = { ...DEFAULT_CONFIG };
      }
    } else {
      this.config = { ...DEFAULT_CONFIG };
    }

    if (!this.config!.agent) {
      this.config!.agent = DEFAULT_CONFIG.agent;
    }

    return this.config!;
  }

  save(): void {
    if (!this.config) {
      throw new Error('No config loaded. Call load() first.');
    }

    const dir = resolve(this.projectPath, '.archon');
    mkdirSync(dir, { recursive: true });
    writeFileSync(this.configPath, JSON.stringify(this.config, null, 2), 'utf-8');
    chmodSync(this.configPath, 0o644);
  }

  get<K extends keyof ArchonConfig>(key: K): ArchonConfig[K] {
    const cfg = this.load();
    return cfg[key];
  }

  set<K extends keyof ArchonConfig>(key: K, value: ArchonConfig[K]): void {
    const cfg = this.load();
    (cfg as unknown as Record<string, unknown>)[key] = value;
    this.config = cfg;
    this.save();
  }

  getDefault(key: string): string | boolean | number | undefined {
    const cfg = this.load();
    return cfg.defaults[key];
  }

  setDefault(key: string, value: string | boolean | number): void {
    const cfg = this.load();
    cfg.defaults[key] = value;
    this.config = cfg;
    this.save();
  }

  deleteDefault(key: string): void {
    const cfg = this.load();
    delete cfg.defaults[key];
    this.config = cfg;
    this.save();
  }

  listDefaults(): Record<string, string | boolean | number> {
    return this.load().defaults;
  }

  setAgent(type: AgentType, transport?: TransportMode): void {
    const cfg = this.load();
    cfg.agent.type = type;
    if (transport) {
      cfg.agent.transport = transport;
    }
    this.config = cfg;
    this.save();
  }

  getAgent(): AgentType {
    return this.load().agent.type;
  }

  getTransport(): TransportMode {
    return this.load().agent.transport;
  }

  setInteractiveMode(mode: InteractiveMode): void {
    const cfg = this.load();
    cfg.interactiveMode = mode;
    this.config = cfg;
    this.save();
  }

  getInteractiveMode(): InteractiveMode {
    return this.load().interactiveMode;
  }

  setAutoUpgrade(enabled: boolean): void {
    const cfg = this.load();
    cfg.autoUpgrade = enabled;
    this.config = cfg;
    this.save();
  }

  isAutoUpgradeEnabled(): boolean {
    return this.load().autoUpgrade;
  }

  markDoctorChecked(): void {
    const cfg = this.load();
    cfg.agent.doctorChecked = true;
    cfg.agent.lastDoctorCheck = new Date().toISOString();
    this.config = cfg;
    this.save();
  }
}