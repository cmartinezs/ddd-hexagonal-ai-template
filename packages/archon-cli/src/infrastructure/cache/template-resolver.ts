import { existsSync, mkdirSync, readFileSync, writeFileSync, cpSync } from 'node:fs';
import { join } from 'node:path';
import { globalCache, ARCHON_CACHE_DIR } from './global-cache.js';
import type { TemplateLock } from '../../domain/template/template.types.js';

const DEV_CONFIG_FILE = join(ARCHON_CACHE_DIR, 'dev.json');

export class TemplateResolver {
  private devTemplatePath: string | null = null;

  setDevTemplatePath(path: string | null): void {
    this.devTemplatePath = path;
  }

  getDevTemplatePath(): string | null {
    if (process.env['ARCHON_DEV_TEMPLATE_PATH']) {
      return process.env['ARCHON_DEV_TEMPLATE_PATH'];
    }
    if (this.devTemplatePath) {
      return this.devTemplatePath;
    }
    try {
      if (existsSync(DEV_CONFIG_FILE)) {
        const raw = readFileSync(DEV_CONFIG_FILE, 'utf-8');
        const config = JSON.parse(raw) as { linkedTemplatePath?: string | null };
        return config.linkedTemplatePath ?? null;
      }
    } catch {
      // ignore
    }
    return null;
  }

  isDevMode(): boolean {
    return this.getDevTemplatePath() !== null;
  }

  resolve(id: string, version?: string): { path: string; version: string; isDev: boolean } {
    const devPath = this.getDevTemplatePath();
    if (devPath) {
      return { path: devPath, version: version || 'dev', isDev: true };
    }

    const resolvedVersion = version || this.getDefaultVersion(id);
    const cachedPath = globalCache.getTemplatePath(id, resolvedVersion);

    if (globalCache.isInstalled(id, resolvedVersion)) {
      return { path: cachedPath, version: resolvedVersion, isDev: false };
    }

    const latest = this.findLatestInstalled(id);
    if (latest) {
      return { path: globalCache.getTemplatePath(id, latest), version: latest, isDev: false };
    }

    throw new Error(
      'Template ' + id + (version ? '@' + version : '') + ' not found in cache. ' +
      'Run `archon templates pull ' + id + '` to download it.'
    );
  }

  getDefaultVersion(id: string): string {
    const registry = globalCache.getRegistry();
    const info = registry[id];
    if (!info || !info.defaultVersion) {
      return '0.1.0';
    }
    return info.defaultVersion;
  }

  findLatestInstalled(id: string): string | null {
    const versions = globalCache.getInstalledVersions(id);
    if (versions.length === 0) return null;

    return versions.sort((a, b) => globalCache.compareVersions(b, a))[0] ?? null;
  }

  installToCache(id: string, sourcePath: string, version: string): void {
    const dest = globalCache.getTemplatePath(id, version);
    mkdirSync(dest, { recursive: true });
    cpSync(sourcePath, dest, { recursive: true });

    globalCache.registerTemplate(id, version, {
      ref: 'v' + version,
      source: 'local',
    });
  }

  createTemplateLock(projectPath: string, id: string, version: string, cachePath: string): TemplateLock {
    const lock: TemplateLock = {
      template: {
        id,
        version,
        source: 'ddd-hexagonal-ai-template',
        ref: 'v' + version,
        cachePath,
        embeddedSnapshot: false,
        resolvedAt: new Date().toISOString(),
      },
    };

    const lockPath = join(projectPath, '.archon', 'template.lock.json');
    writeFileSync(lockPath, JSON.stringify(lock, null, 2), 'utf-8');

    return lock;
  }

  readTemplateLock(projectPath: string): TemplateLock | null {
    const lockPath = join(projectPath, '.archon', 'template.lock.json');
    if (!existsSync(lockPath)) return null;

    try {
      const raw = readFileSync(lockPath, 'utf-8');
      return JSON.parse(raw) as TemplateLock;
    } catch {
      return null;
    }
  }

  getLockedTemplatePath(projectPath: string): string | null {
    const lock = this.readTemplateLock(projectPath);
    if (!lock) return null;
    return lock.template.cachePath;
  }
}

export const templateResolver = new TemplateResolver();
