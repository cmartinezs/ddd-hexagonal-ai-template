export type TemplateVersion = string;

export interface TemplateLock {
  template: {
    id: string;
    version: string;
    source: string;
    ref: string;
    commitSha?: string;
    cachePath: string;
    embeddedSnapshot: boolean;
    resolvedAt: string;
  };
}
