export interface TraceTerm {
  term: string;
  definedInPhase: number;
  definedInFile: string;
  referencedInPhases: number[];
  referencedInFiles: string[];
}

export interface TraceLink {
  fromPhase: number;
  fromFile: string;
  toPhase: number;
  term: string;
}

export interface TraceMatrix {
  terms: TraceTerm[];
  links: TraceLink[];
  coverage: Record<number, number>;
  totalTerms: number;
  tracedTerms: number;
}
