import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
  readdirSync,
  rmSync,
  statSync,
} from 'node:fs';
import { resolve, join } from 'node:path';
import { homedir } from 'node:os';

export const ARCHON_CACHE_DIR = resolve(homedir(), '.archon');
export const TEMPLATES_DIR = join(ARCHON_CACHE_DIR, 'templates');
export const REGISTRY_FILE = join(ARCHON_CACHE_DIR, 'registry.json');

export interface TemplateInfo {
  id: string;
  source: string;
  versions: Record<string, TemplateVersionInfo>;
  defaultVersion: string;
}

export interface TemplateVersionInfo {
  ref: string;
  source?: string;
  commitSha?: string;
  installedAt: string;
  path: string;
  size: number;
}

function getDefaultRegistry(): Record<string, TemplateInfo> {
  return {
    'ddd-hexagonal-ai-template': {
      id: 'ddd-hexagonal-ai-template',
      source: 'github:cmartinezs/ddd-hexagonal-ai-template',
      versions: {},
      defaultVersion: '',
    },
  };
}

export class GlobalCache {
  ensureCache(): void {
    mkdirSync(TEMPLATES_DIR, { recursive: true });
    if (!existsSync(REGISTRY_FILE)) {
      this.saveRegistry(getDefaultRegistry());
    }
  }

  getRegistry(): Record<string, TemplateInfo> {
    this.ensureCache();
    try {
      const raw = readFileSync(REGISTRY_FILE, 'utf-8');
      return JSON.parse(raw);
    } catch {
      return getDefaultRegistry();
    }
  }

  saveRegistry(registry: Record<string, TemplateInfo>): void {
    writeFileSync(REGISTRY_FILE, JSON.stringify(registry, null, 2), 'utf-8');
  }

  getTemplatePath(id: string, version: string): string {
    return join(TEMPLATES_DIR, id, version);
  }

  isInstalled(id: string, version: string): boolean {
    const path = this.getTemplatePath(id, version);
    return existsSync(path) && existsSync(join(path, '01-templates'));
  }

  getInstalledVersions(id: string): string[] {
    const templateDir = join(TEMPLATES_DIR, id);
    if (!existsSync(templateDir)) return [];

    try {
      return readdirSync(templateDir).filter((v) => {
        const p = join(templateDir, v);
        return statSync(p).isDirectory();
      });
    } catch {
      return [];
    }
  }

  registerTemplate(id: string, version: string, info: Omit<TemplateVersionInfo, 'installedAt' | 'path' | 'size'>): void {
    const registry = this.getRegistry();

    if (!registry[id]) {
      registry[id] = {
        id,
        source: info.source || 'unknown',
        versions: {},
        defaultVersion: version,
      };
    }

    const templatePath = this.getTemplatePath(id, version);
    let size = 0;
    try {
      size = this.calculateSize(templatePath);
    } catch {
      size = 0;
    }

    registry[id].versions[version] = {
      ...info,
      installedAt: new Date().toISOString(),
      path: templatePath,
      size,
    };

    if (!registry[id].defaultVersion || this.compareVersions(version, registry[id].defaultVersion) > 0) {
      registry[id].defaultVersion = version;
    }

    this.saveRegistry(registry);
  }

  private calculateSize(dir: string): number {
    let total = 0;
    try {
      const entries = readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = join(dir, entry.name);
        if (entry.isDirectory()) {
          total += this.calculateSize(fullPath);
        } else {
          try {
            total += statSync(fullPath).size;
          } catch {
            // skip
          }
        }
      }
    } catch {
      // skip
    }
    return total;
  }

  compareVersions(a: string, b: string): number {
    const pa = a.split('.').map(Number);
    const pb = b.split('.').map(Number);
    for (let i = 0; i < 3; i++) {
      const na = pa[i] ?? 0;
      const nb = pb[i] ?? 0;
      if (na > nb) return 1;
      if (na < nb) return -1;
    }
    return 0;
  }

  getCacheSize(): number {
    return this.calculateSize(TEMPLATES_DIR);
  }

  cleanCache(olderThanDays?: number): string[] {
    const registry = this.getRegistry();
    const removed: string[] = [];

    for (const [id, info] of Object.entries(registry)) {
      const toRemove: string[] = [];
      for (const [version, vinfo] of Object.entries(info.versions)) {
        if (olderThanDays) {
          const installed = new Date(vinfo.installedAt);
          const cutoff = new Date();
          cutoff.setDate(cutoff.getDate() - olderThanDays);
          if (installed < cutoff && info.defaultVersion !== version) {
            toRemove.push(version);
          }
        }
      }

      for (const v of toRemove) {
        const path = this.getTemplatePath(id, v);
        if (existsSync(path)) {
          rmSync(path, { recursive: true, force: true });
          delete info.versions[v];
          removed.push(id + '@' + v);
        }
      }
    }

    this.saveRegistry(registry);
    return removed;
  }
}

export const globalCache = new GlobalCache();