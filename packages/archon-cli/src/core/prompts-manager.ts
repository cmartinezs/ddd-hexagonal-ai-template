import { join } from 'node:path';
import { existsSync, readdirSync, readFileSync, writeFileSync, statSync, mkdirSync, unlinkSync } from 'node:fs';

export interface PromptRecord {
  id: string;
  phase: number;
  phaseName: string;
  createdAt: string;
  size: number;
  context: string;
  agent: string;
  fileName: string;
  description?: string;
  tags?: string[];
  lastAccessed?: string;
  accessCount: number;
}

export class PromptsManager {
  private promptsDir: string;
  private metadataDir: string;

  constructor(projectPath: string) {
    this.promptsDir = join(projectPath, '.archon', 'prompts');
    this.metadataDir = join(this.promptsDir, 'metadata');
    mkdirSync(this.metadataDir, { recursive: true });
  }

  list(): PromptRecord[] {
    if (!existsSync(this.promptsDir)) return [];

    const files = readdirSync(this.promptsDir)
      .filter((f) => (f.endsWith('.md') || f.endsWith('.txt')) && !f.startsWith('.'));

    return files
      .map((file) => this.readPromptRecord(file))
      .filter((r): r is PromptRecord => r !== null)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  private readPromptRecord(file: string): PromptRecord | null {
    const filePath = join(this.promptsDir, file);
    const metaPath = join(this.metadataDir, file.replace(/\.(md|txt)$/, '') + '.json');
    const stats = statSync(filePath);

    let meta: Partial<PromptRecord> = {};
    if (existsSync(metaPath)) {
      try {
        meta = JSON.parse(readFileSync(metaPath, 'utf-8'));
      } catch {
        // skip
      }
    }

    const phaseMatch = file.match(/phase-(\d+)-/);
    const phase = phaseMatch ? parseInt(phaseMatch[1]!, 10) : -1;

    const metadata: PromptRecord = {
      id: file.replace(/\.(md|txt)$/, ''),
      phase,
      phaseName: meta.phaseName ?? this.getPhaseName(phase),
      createdAt: meta.createdAt ?? stats.mtime.toISOString(),
      size: stats.size,
      context: meta.context ?? 'full',
      agent: meta.agent ?? 'unknown',
      fileName: file,
      description: meta.description,
      tags: meta.tags,
      lastAccessed: meta.lastAccessed,
      accessCount: meta.accessCount ?? 0,
    };

    return metadata;
  }

  private getPhaseName(phase: number): string {
    const names = [
      'Documentation Planning', 'Discovery', 'Requirements', 'Design',
      'Data Model', 'Planning', 'Development', 'Testing',
      'Deployment', 'Operations', 'Monitoring', 'Feedback',
    ];
    return names[phase] ?? 'Unknown Phase';
  }

  rank(criteria: 'date' | 'size' | 'phase' | 'access' = 'date'): PromptRecord[] {
    const records = this.list();
    switch (criteria) {
      case 'size':
        return records.sort((a, b) => b.size - a.size);
      case 'phase':
        return records.sort((a, b) => a.phase - b.phase);
      case 'access':
        return records.sort((a, b) => b.accessCount - a.accessCount);
      default:
        return records;
    }
  }

  compress(id: string): boolean {
    const record = this.list().find((r) => r.id === id);
    if (!record) return false;

    const filePath = join(this.promptsDir, record.fileName);
    if (!existsSync(filePath)) return false;

    try {
      const raw = readFileSync(filePath, 'utf-8');
      const compressed = this.doCompress(raw);
      const compressedName = record.fileName.replace('.md', '-compressed.md');
      writeFileSync(join(this.promptsDir, compressedName), compressed, 'utf-8');

      const meta = this.readMetadata(record.id);
      meta.description = `Compressed from ${record.fileName}`;
      meta.tags = ['compressed', ...(meta.tags ?? [])];
      this.writeMetadata(record.id, meta);

      return true;
    } catch {
      return false;
    }
  }

  private doCompress(text: string): string {
    const sections = text.split(/^##\s+/m);
    if (sections.length <= 2) return text;

    const first = sections[0];
    const last = sections[sections.length - 1];
    const middle = sections.slice(1, -1);

    const compressed: string[] = [first ?? ''];
    compressed.push('## Compressed Summary');
    compressed.push('');
    compressed.push(`*Compressed from ${middle.length} intermediate sections*`);
    compressed.push('');
    compressed.push('## Original Sections (removed):');
    for (let i = 0; i < middle.length; i++) {
      const lines = middle[i]!.split('\n');
      const title = lines[0]?.trim() ?? `Section ${i + 1}`;
      compressed.push(`- ${title}`);
    }
    compressed.push('');
    compressed.push(last ?? '');

    return compressed.join('\n');
  }

  merge(id1: string, id2: string): string | null {
    const records = this.list();
    const r1 = records.find((r) => r.id === id1);
    const r2 = records.find((r) => r.id === id2);
    if (!r1 || !r2) return null;

    const path1 = join(this.promptsDir, r1.fileName);
    const path2 = join(this.promptsDir, r2.fileName);
    if (!existsSync(path1) || !existsSync(path2)) return null;

    const raw1 = readFileSync(path1, 'utf-8');
    const raw2 = readFileSync(path2, 'utf-8');

    const merged = [
      `# Merged Prompt — ${r1.phaseName} + ${r2.phaseName}`,
      '',
      `**Merged from:** ${r1.fileName}, ${r2.fileName}`,
      `**Created:** ${new Date().toISOString()}`,
      '',
      '---',
      '',
      '## Part 1',
      raw1,
      '',
      '---',
      '',
      '## Part 2',
      raw2,
    ].join('\n');

    const mergedName = `merged-${r1.phase}-${r2.phase}-${Date.now()}.md`;
    writeFileSync(join(this.promptsDir, mergedName), merged, 'utf-8');

    return mergedName;
  }

  expand(id: string): boolean {
    const records = this.list();
    const record = records.find((r) => r.id.includes('compressed') && r.id.startsWith(id));
    if (!record) return false;

    try {
      const raw = readFileSync(join(this.promptsDir, record.fileName), 'utf-8');
      const expanded = raw.replace('-compressed', '-expanded');
      const expandedName = record.fileName.replace('-compressed', '-expanded');
      writeFileSync(join(this.promptsDir, expandedName), expanded, 'utf-8');
      return true;
    } catch {
      return false;
    }
  }

  export(id: string, outputPath: string): boolean {
    const record = this.list().find((r) => r.id === id);
    if (!record) return false;

    const filePath = join(this.promptsDir, record.fileName);
    if (!existsSync(filePath)) return false;

    try {
      writeFileSync(outputPath, readFileSync(filePath), 'utf-8');
      return true;
    } catch {
      return false;
    }
  }

  clean(olderThanDays = 30): number {
    const records = this.list();
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - olderThanDays);
    let count = 0;

    for (const record of records) {
      const created = new Date(record.createdAt);
      if (created < cutoff) {
        const filePath = join(this.promptsDir, record.fileName);
        const metaPath = join(this.metadataDir, record.id + '.json');
        try {
          if (existsSync(filePath)) unlinkSync(filePath);
          if (existsSync(metaPath)) unlinkSync(metaPath);
          count++;
        } catch {
          // skip
        }
      }
    }

    return count;
  }

  private readMetadata(id: string): Partial<PromptRecord> {
    const metaPath = join(this.metadataDir, id + '.json');
    if (!existsSync(metaPath)) return {};
    try {
      return JSON.parse(readFileSync(metaPath, 'utf-8'));
    } catch {
      return {};
    }
  }

  private writeMetadata(id: string, meta: Partial<PromptRecord>): void {
    const metaPath = join(this.metadataDir, id + '.json');
    writeFileSync(metaPath, JSON.stringify(meta, null, 2), 'utf-8');
  }

  recordAccess(id: string): void {
    const meta = this.readMetadata(id);
    meta.lastAccessed = new Date().toISOString();
    meta.accessCount = (meta.accessCount ?? 0) + 1;
    this.writeMetadata(id, meta);
  }
}
