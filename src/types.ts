export interface Question {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number; // 0-based
  explanation: string;
  articleRef: string; // e.g. "Art. 135 LEC"
  difficulty: "Fácil" | "Medio" | "Difícil";
  block: "Organización" | "Procedimiento Civil" | "Procedimiento Penal" | "Especiales";
  convocatoria: string; // e.g. "Convocatoria 2023 - Libre" or "Convocatoria 2024 - Libre"
  trickType?: string; // e.g. "Confusión de Órganos", "Plazos Trampa", "Falsas Excepciones"
}

export interface Exam {
  id: string;
  name: string;
  year: number;
  type: "Libre" | "Promoción Interna";
  questions: Question[];
}

export interface Theme {
  id: number;
  title: string;
  block: string;
  laws: string[];
  summary: string;
  keyArticles: string[];
}

export interface TrickPattern {
  id: string;
  name: string;
  description: string;
  exampleQuestion: string;
  exampleSolution: string;
  howToDetect: string;
  lawsAffected: string[];
}

export interface ArticleAnalysis {
  article: string;
  title: string;
  text: string;
  usedInExams: string[];
  susceptibilityReason: string;
  trickIdeas: string[];
}

export interface MemoryTechnique {
  id: string;
  name: string;
  description: string;
  example: string;
  steps: string[];
}

export interface Recommendation {
  id: string;
  title: string;
  phase: string;
  tip: string;
  actionItem: string;
}
