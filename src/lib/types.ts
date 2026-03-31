export type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert" | "Master";
export type SkillCategory = "DSA" | "Frontend" | "Backend" | "ML" | "Design" | "DevOps" | "Security" | "System Design";

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  skills: string[];
  uploadedAt: string;
  status: "analyzing" | "verified" | "pending";
  files: ProjectFile[];
  evaluation?: Evaluation;
  html_url?: string;
}

export interface ProjectFile {
  name: string;
  type: "code" | "video" | "document" | "design";
  size: string;
  language?: string;
}

export interface Evaluation {
  overallScore: number;
  efficiency: number;
  creativity: number;
  problemSolving: number;
  codeQuality: number;
  feedback: EvaluationFeedback[];
}

export interface EvaluationFeedback {
  agent: string;
  finding: string;
  severity: "info" | "warning" | "positive";
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  confidence: number;
  evidence: string;
  snippet: string;
  color: string;
  verifiedAt: string;
  projectId: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  level: SkillLevel;
  category: SkillCategory;
  icon: string;
  earnedAt: string;
  criteria: string;
  verificationCount: number;
}

export interface User {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  role: "student" | "mentor" | "recruiter";
  skills: Skill[];
  badges: Badge[];
  projects: number;
  verifiedAchievements: number;
  joinedAt: string;
}

export interface Review {
  id: string;
  reviewer: User;
  targetProjectId: string;
  rating: number;
  comment: string;
  type: "peer" | "mentor" | "ai";
  createdAt: string;
  helpful: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: SkillCategory;
  difficulty: SkillLevel;
  timeLimit: string;
  skillsVerified: string[];
  status: "available" | "in_progress" | "completed" | "locked";
  completionRate: number;
  submissions: number;
}

export interface AnalyticsData {
  skillGrowth: SkillGrowthPoint[];
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  totalProjects: number;
  totalSkills: number;
  averageScore: number;
  weeklyActivity: number[];
}

export interface SkillGrowthPoint {
  date: string;
  score: number;
  skill: string;
}
