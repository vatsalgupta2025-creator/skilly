import { Project, Skill, Badge, User, Review, Challenge, AnalyticsData } from "./types";

export const MOCK_PROJECTS: Project[] = [
  {
    id: "PRJ-001",
    title: "Real-Time Collaborative Editor",
    description: "WebSocket-based collaborative text editor with operational transformation for conflict resolution.",
    category: "Frontend",
    skills: ["React", "WebSocket", "CRDT", "TypeScript"],
    uploadedAt: "2026-03-15",
    status: "verified",
    files: [
      { name: "editor.tsx", type: "code", size: "12KB", language: "TypeScript" },
      { name: "crdt-engine.ts", type: "code", size: "8KB", language: "TypeScript" },
      { name: "architecture.pdf", type: "document", size: "2.4MB" },
    ],
    evaluation: {
      overallScore: 94,
      efficiency: 96,
      creativity: 91,
      problemSolving: 95,
      codeQuality: 93,
      feedback: [
        { agent: "Syntactical Judge", finding: "Clean component hierarchy with proper separation of concerns", severity: "positive" },
        { agent: "Performance Analyzer", finding: "Efficient use of requestAnimationFrame for render batching", severity: "positive" },
        { agent: "Security Scanner", finding: "Input sanitization could be more rigorous on paste events", severity: "warning" },
      ],
    },
  },
  {
    id: "PRJ-002",
    title: "Distributed Task Queue System",
    description: "Redis-backed task queue with priority scheduling, retry logic, and dead letter handling.",
    category: "Backend",
    skills: ["Node.js", "Redis", "Docker", "System Design"],
    uploadedAt: "2026-03-10",
    status: "verified",
    files: [
      { name: "queue-manager.ts", type: "code", size: "15KB", language: "TypeScript" },
      { name: "worker.ts", type: "code", size: "9KB", language: "TypeScript" },
      { name: "docker-compose.yml", type: "code", size: "2KB", language: "YAML" },
    ],
    evaluation: {
      overallScore: 91,
      efficiency: 94,
      creativity: 88,
      problemSolving: 93,
      codeQuality: 90,
      feedback: [
        { agent: "Data Structures", finding: "Exponential backoff with jitter properly implemented for retries", severity: "positive" },
        { agent: "Performance Analyzer", finding: "Connection pooling configured optimally for Redis", severity: "positive" },
        { agent: "Security Scanner", finding: "No critical vulnerabilities found", severity: "positive" },
      ],
    },
  },
  {
    id: "PRJ-003",
    title: "Neural Style Transfer Pipeline",
    description: "GPU-accelerated style transfer using PyTorch with custom VGG19 feature extraction layers.",
    category: "ML",
    skills: ["Python", "PyTorch", "CNN", "Computer Vision"],
    uploadedAt: "2026-02-28",
    status: "verified",
    files: [
      { name: "model.py", type: "code", size: "18KB", language: "Python" },
      { name: "train.py", type: "code", size: "11KB", language: "Python" },
      { name: "results.mp4", type: "video", size: "45MB" },
    ],
    evaluation: {
      overallScore: 97,
      efficiency: 95,
      creativity: 99,
      problemSolving: 96,
      codeQuality: 98,
      feedback: [
        { agent: "ML Evaluator", finding: "Novel loss function combining perceptual and gram matrix losses", severity: "positive" },
        { agent: "Performance Analyzer", finding: "Mixed precision training reduces memory by 40%", severity: "positive" },
        { agent: "Code Style", finding: "Excellent docstring coverage with mathematical formulations", severity: "positive" },
      ],
    },
  },
  {
    id: "PRJ-004",
    title: "E-Commerce Design System",
    description: "Comprehensive component library with 60+ tokens, dark/light themes, and accessibility compliance.",
    category: "Design",
    skills: ["Figma", "Design Tokens", "Accessibility", "CSS"],
    uploadedAt: "2026-03-20",
    status: "verified",
    files: [
      { name: "design-system.fig", type: "design", size: "34MB" },
      { name: "tokens.json", type: "code", size: "15KB", language: "JSON" },
      { name: "documentation.pdf", type: "document", size: "8.2MB" },
    ],
    evaluation: {
      overallScore: 92,
      efficiency: 90,
      creativity: 95,
      problemSolving: 89,
      codeQuality: 94,
      feedback: [
        { agent: "UI/UX Analyzer", finding: "WCAG 2.1 AAA compliance across all components", severity: "positive" },
        { agent: "Code Style", finding: "Semantic token naming with proper scale relationships", severity: "positive" },
        { agent: "Data Structures", finding: "Well-structured component API with proper prop interfaces", severity: "positive" },
      ],
    },
  },
  {
    id: "PRJ-005",
    title: "Kubernetes Auto-Scaler",
    description: "Custom HPA controller with ML-based predictive scaling using historical metrics.",
    category: "DevOps",
    skills: ["Kubernetes", "Go", "Prometheus", "ML"],
    uploadedAt: "2026-03-01",
    status: "verified",
    files: [
      { name: "controller.go", type: "code", size: "22KB", language: "Go" },
      { name: "predictor.go", type: "code", size: "14KB", language: "Go" },
      { name: "helm-chart.tar.gz", type: "document", size: "1.1MB" },
    ],
    evaluation: {
      overallScore: 89,
      efficiency: 92,
      creativity: 87,
      problemSolving: 90,
      codeQuality: 88,
      feedback: [
        { agent: "Performance Analyzer", finding: "Predictive scaling reduces cold start latency by 60%", severity: "positive" },
        { agent: "Security Scanner", finding: "RBAC permissions properly scoped to required resources", severity: "positive" },
        { agent: "Syntactical Judge", finding: "Consider adding circuit breaker for API server failures", severity: "warning" },
      ],
    },
  },
  {
    id: "PRJ-006",
    title: "Zero-Knowledge Proof Auth",
    description: "Passwordless authentication using zk-SNARKs for proof of identity without revealing credentials.",
    category: "Security",
    skills: ["Cryptography", "Rust", "zk-SNARKs", "WebAuthn"],
    uploadedAt: "2026-03-22",
    status: "pending",
    files: [
      { name: "prover.rs", type: "code", size: "19KB", language: "Rust" },
      { name: "verifier.rs", type: "code", size: "12KB", language: "Rust" },
      { name: "circuit.plonk", type: "code", size: "5KB", language: "Rust" },
    ],
  },
];

export const MOCK_SKILLS: Skill[] = [
  { id: "SKL-901", name: "React Render Optimization", category: "Frontend", level: "Expert", confidence: 99.2, evidence: "Unified React state memoization with aggressive component isolation bypassing virtual DOM bloat.", snippet: "useMemo(() => computeExpensiveGraph(), [deps])\nmemo(ComplexNode, (prev, next) => prev.id === next.id)", color: "neon-cyan", verifiedAt: "2026-03-15", projectId: "PRJ-001" },
  { id: "SKL-902", name: "Zero-Trust Architecture", category: "Security", level: "Advanced", confidence: 97.4, evidence: "Rigorous JWT validation layered with strict IP throttling and hardware-level signing.", snippet: 'if (!verifySignature(req.header("x-hardware-sign"))) throw NotAuthorized;', color: "neon-magenta", verifiedAt: "2026-03-10", projectId: "PRJ-002" },
  { id: "SKL-903", name: "Color Theory & Aesthetic Logic", category: "Design", level: "Master", confidence: 98.9, evidence: "Harmonic use of OKLCH color spaces with constraint mapping across 14 breakpoints.", snippet: "color: oklch(0.7 0.1 250);", color: "neon-green", verifiedAt: "2026-03-20", projectId: "PRJ-004" },
  { id: "SKL-904", name: "State Machine Design", category: "Frontend", level: "Advanced", confidence: 95.0, evidence: "Explicit XState modeling for complex checkout flow, handling 15 distinct error branches.", snippet: 'createMachine({ id: "checkout", initial: "idle", states: {...} })', color: "white", verifiedAt: "2026-03-15", projectId: "PRJ-001" },
  { id: "SKL-905", name: "Distributed Systems", category: "Backend", level: "Expert", confidence: 96.7, evidence: "Redis-backed task queue with priority scheduling and dead letter handling.", snippet: "queue.process('high', async (job) => await processWithRetry(job, { maxRetries: 3 }))", color: "neon-cyan", verifiedAt: "2026-03-10", projectId: "PRJ-002" },
  { id: "SKL-906", name: "Neural Network Architecture", category: "ML", level: "Master", confidence: 98.1, evidence: "Custom VGG19 feature extraction with novel perceptual + gram matrix loss combination.", snippet: "loss = alpha * perceptual_loss(features) + beta * gram_matrix_loss(style_features)", color: "neon-magenta", verifiedAt: "2026-02-28", projectId: "PRJ-003" },
  { id: "SKL-907", name: "Operational Transformation", category: "Frontend", level: "Expert", confidence: 94.3, evidence: "Real-time collaborative editing with conflict-free concurrent operations.", snippet: "transform(op1: Operation, op2: Operation): [Operation, Operation]", color: "neon-green", verifiedAt: "2026-03-15", projectId: "PRJ-001" },
  { id: "SKL-908", name: "Container Orchestration", category: "DevOps", level: "Advanced", confidence: 91.5, evidence: "Custom Kubernetes HPA controller with predictive ML-based scaling.", snippet: "func (c *Controller) predictReplicas(metrics []Metric) int", color: "white", verifiedAt: "2026-03-01", projectId: "PRJ-005" },
  { id: "SKL-909", name: "Graph Algorithms", category: "DSA", level: "Expert", confidence: 97.8, evidence: "Efficient implementation of Dijkstra with Fibonacci heap achieving O(E + V log V).", snippet: "func dijkstra(g *Graph, src Vertex) map[Vertex]int", color: "neon-cyan", verifiedAt: "2026-03-05", projectId: "PRJ-002" },
  { id: "SKL-910", name: "Cryptographic Protocols", category: "Security", level: "Master", confidence: 99.0, evidence: "zk-SNARK proof generation with PLONK proving system for identity verification.", snippet: "fn prove(witness: &Witness, pk: &ProvingKey) -> Result<Proof>", color: "neon-magenta", verifiedAt: "2026-03-22", projectId: "PRJ-006" },
];

export const MOCK_BADGES: Badge[] = [
  { id: "BDG-001", name: "Problem Solver - Advanced", description: "Demonstrated advanced problem-solving through complex algorithm implementation", level: "Advanced", category: "DSA", icon: "brain", earnedAt: "2026-03-05", criteria: "Complete 3+ DSA challenges with 90%+ efficiency", verificationCount: 5 },
  { id: "BDG-002", name: "Frontend Developer - Expert", description: "Expert-level frontend skills verified through production-quality project submissions", level: "Expert", category: "Frontend", icon: "layout", earnedAt: "2026-03-15", criteria: "Submit 2+ frontend projects scoring 90%+", verificationCount: 8 },
  { id: "BDG-003", name: "ML Engineer - Master", description: "Master-level machine learning engineering with novel architecture design", level: "Master", category: "ML", icon: "brain", earnedAt: "2026-02-28", criteria: "Submit ML project with novel approach scoring 95%+", verificationCount: 12 },
  { id: "BDG-004", name: "Security Specialist - Advanced", description: "Advanced security implementation with cryptographic protocol expertise", level: "Advanced", category: "Security", icon: "shield", earnedAt: "2026-03-22", criteria: "Demonstrate security skills across 2+ projects", verificationCount: 6 },
  { id: "BDG-005", name: "System Architect - Expert", description: "Expert-level distributed system design and implementation", level: "Expert", category: "System Design", icon: "server", earnedAt: "2026-03-10", criteria: "Build and verify distributed system project", verificationCount: 4 },
  { id: "BDG-006", name: "Design Systems - Master", description: "Master-level design system creation with accessibility compliance", level: "Master", category: "Design", icon: "palette", earnedAt: "2026-03-20", criteria: "Submit comprehensive design system with AAA compliance", verificationCount: 7 },
  { id: "BDG-007", name: "DevOps Engineer - Intermediate", description: "Intermediate DevOps skills with container orchestration experience", level: "Intermediate", category: "DevOps", icon: "container", earnedAt: "2026-03-01", criteria: "Deploy and verify Kubernetes-based project", verificationCount: 3 },
  { id: "BDG-008", name: "Backend Developer - Expert", description: "Expert backend development with scalable architecture patterns", level: "Expert", category: "Backend", icon: "server", earnedAt: "2026-03-10", criteria: "Submit backend project with 90%+ across all metrics", verificationCount: 9 },
];

export const MOCK_USERS: User[] = [
  {
    id: "USR-001", name: "Alex Chen", handle: "alex_dev", avatar: "A", role: "student",
    skills: MOCK_SKILLS.slice(0, 5), badges: MOCK_BADGES.slice(0, 4), projects: 6, verifiedAchievements: 14, joinedAt: "2025-09-15",
  },
  {
    id: "USR-002", name: "Maya Rodriguez", handle: "maya_ml", avatar: "M", role: "student",
    skills: MOCK_SKILLS.slice(2, 7), badges: MOCK_BADGES.slice(2, 6), projects: 4, verifiedAchievements: 9, joinedAt: "2025-11-02",
  },
  {
    id: "USR-003", name: "Kai Nakamura", handle: "kai_sys", avatar: "K", role: "student",
    skills: MOCK_SKILLS.slice(4, 9), badges: MOCK_BADGES.slice(4, 8), projects: 5, verifiedAchievements: 11, joinedAt: "2025-10-20",
  },
  {
    id: "USR-004", name: "Sarah Kim", handle: "sarah_mentor", avatar: "S", role: "mentor",
    skills: MOCK_SKILLS, badges: MOCK_BADGES, projects: 0, verifiedAchievements: 0, joinedAt: "2025-08-01",
  },
  {
    id: "USR-005", name: "James Park", handle: "james_recruit", avatar: "J", role: "recruiter",
    skills: [], badges: [], projects: 0, verifiedAchievements: 0, joinedAt: "2025-12-01",
  },
];

export const MOCK_REVIEWS: Review[] = [
  { id: "REV-001", reviewer: MOCK_USERS[3], targetProjectId: "PRJ-001", rating: 5, comment: "Exceptional implementation of OT. The conflict resolution logic handles edge cases I haven't seen in open-source alternatives. Code quality is production-ready.", type: "mentor", createdAt: "2026-03-16", helpful: 24 },
  { id: "REV-002", reviewer: MOCK_USERS[1], targetProjectId: "PRJ-001", rating: 4, comment: "Really solid collaborative editor. The cursor synchronization is smooth. Would love to see selection highlighting across users.", type: "peer", createdAt: "2026-03-17", helpful: 12 },
  { id: "REV-003", reviewer: MOCK_USERS[3], targetProjectId: "PRJ-003", rating: 5, comment: "Novel approach to combining loss functions. The perceptual quality results are state-of-the-art for the computational budget. Excellent documentation.", type: "mentor", createdAt: "2026-03-02", helpful: 31 },
  { id: "REV-004", reviewer: MOCK_USERS[2], targetProjectId: "PRJ-002", rating: 4, comment: "Clean architecture for the task queue. The retry mechanism with jitter is well thought out. Consider adding metrics export for Prometheus.", type: "peer", createdAt: "2026-03-12", helpful: 18 },
  { id: "REV-005", reviewer: MOCK_USERS[3], targetProjectId: "PRJ-004", rating: 5, comment: "This design system sets a new standard. The token architecture is incredibly well-structured and the accessibility compliance is exemplary.", type: "mentor", createdAt: "2026-03-21", helpful: 27 },
  { id: "REV-006", reviewer: MOCK_USERS[0], targetProjectId: "PRJ-003", rating: 5, comment: "The training pipeline is optimized beautifully. Mixed precision implementation is textbook perfect. Would be interested in seeing inference benchmarks.", type: "peer", createdAt: "2026-03-03", helpful: 15 },
  { id: "REV-007", reviewer: MOCK_USERS[3], targetProjectId: "PRJ-005", rating: 3, comment: "Good concept but needs more robust error handling. The predictive scaling model needs validation against more workload patterns.", type: "mentor", createdAt: "2026-03-04", helpful: 8 },
];

export const MOCK_CHALLENGES: Challenge[] = [
  { id: "CHL-001", title: "Build a REST API", description: "Design and implement a RESTful API with authentication, CRUD operations, pagination, and error handling.", category: "Backend", difficulty: "Intermediate", timeLimit: "4 hours", skillsVerified: ["REST API Design", "Authentication", "Database Modeling"], status: "completed", completionRate: 78, submissions: 342 },
  { id: "CHL-002", title: "Solve 5 DSA Problems (Timed)", description: "Solve 5 algorithmic problems covering graphs, dynamic programming, and trees under time pressure.", category: "DSA", difficulty: "Advanced", timeLimit: "2 hours", skillsVerified: ["Graph Algorithms", "Dynamic Programming", "Tree Traversal"], status: "completed", completionRate: 45, submissions: 891 },
  { id: "CHL-003", title: "Responsive Dashboard UI", description: "Build a responsive analytics dashboard with charts, filters, and real-time data updates.", category: "Frontend", difficulty: "Intermediate", timeLimit: "6 hours", skillsVerified: ["React", "Data Visualization", "Responsive Design"], status: "in_progress", completionRate: 62, submissions: 215 },
  { id: "CHL-004", title: "Deploy to Kubernetes", description: "Containerize an application and deploy to Kubernetes with proper health checks, scaling, and monitoring.", category: "DevOps", difficulty: "Advanced", timeLimit: "3 hours", skillsVerified: ["Docker", "Kubernetes", "Monitoring"], status: "available", completionRate: 53, submissions: 178 },
  { id: "CHL-005", title: "Train a Classification Model", description: "Build and train a text classification model achieving 90%+ accuracy on a provided dataset.", category: "ML", difficulty: "Expert", timeLimit: "8 hours", skillsVerified: ["NLP", "PyTorch", "Model Evaluation"], status: "available", completionRate: 34, submissions: 156 },
  { id: "CHL-006", title: "Security Audit Challenge", description: "Identify and fix 10 security vulnerabilities in a provided web application codebase.", category: "Security", difficulty: "Expert", timeLimit: "5 hours", skillsVerified: ["OWASP Top 10", "Code Review", "Penetration Testing"], status: "available", completionRate: 28, submissions: 98 },
  { id: "CHL-007", title: "Design a Component Library", description: "Create a reusable component library with design tokens, documentation, and accessibility compliance.", category: "Design", difficulty: "Advanced", timeLimit: "6 hours", skillsVerified: ["Design Systems", "Accessibility", "Documentation"], status: "locked", completionRate: 41, submissions: 134 },
  { id: "CHL-008", title: "Implement a Cache Layer", description: "Build an LRU cache with TTL support, thread-safe operations, and cache invalidation strategies.", category: "Backend", difficulty: "Advanced", timeLimit: "3 hours", skillsVerified: ["Data Structures", "Concurrency", "System Design"], status: "available", completionRate: 56, submissions: 267 },
];

export const MOCK_ANALYTICS: AnalyticsData = {
  skillGrowth: [
    { date: "2025-10", score: 62, skill: "Frontend" },
    { date: "2025-11", score: 68, skill: "Frontend" },
    { date: "2025-12", score: 75, skill: "Frontend" },
    { date: "2026-01", score: 82, skill: "Frontend" },
    { date: "2026-02", score: 88, skill: "Frontend" },
    { date: "2026-03", score: 94, skill: "Frontend" },
    { date: "2025-10", score: 55, skill: "Backend" },
    { date: "2025-11", score: 61, skill: "Backend" },
    { date: "2025-12", score: 70, skill: "Backend" },
    { date: "2026-01", score: 76, skill: "Backend" },
    { date: "2026-02", score: 85, skill: "Backend" },
    { date: "2026-03", score: 91, skill: "Backend" },
    { date: "2025-10", score: 45, skill: "ML" },
    { date: "2025-11", score: 52, skill: "ML" },
    { date: "2025-12", score: 64, skill: "ML" },
    { date: "2026-01", score: 78, skill: "ML" },
    { date: "2026-02", score: 90, skill: "ML" },
    { date: "2026-03", score: 97, skill: "ML" },
    { date: "2025-10", score: 50, skill: "DSA" },
    { date: "2025-11", score: 58, skill: "DSA" },
    { date: "2025-12", score: 65, skill: "DSA" },
    { date: "2026-01", score: 72, skill: "DSA" },
    { date: "2026-02", score: 85, skill: "DSA" },
    { date: "2026-03", score: 93, skill: "DSA" },
    { date: "2025-10", score: 40, skill: "Security" },
    { date: "2025-11", score: 48, skill: "Security" },
    { date: "2025-12", score: 58, skill: "Security" },
    { date: "2026-01", score: 68, skill: "Security" },
    { date: "2026-02", score: 80, skill: "Security" },
    { date: "2026-03", score: 92, skill: "Security" },
  ],
  strengths: ["React Performance Optimization", "Neural Network Architecture", "Algorithm Design", "Code Quality"],
  weaknesses: ["System Design Interviews", "Distributed Consensus", "GraphQL Schema Design"],
  recommendations: [
    "Focus on system design - practice designing URL shorteners, chat systems, and rate limiters",
    "Strengthen recursion skills with tree and graph backtracking problems",
    "Explore advanced distributed patterns: CRDT, Raft consensus, event sourcing",
    "Consider building a full-stack project to improve end-to-end architecture skills",
  ],
  totalProjects: 6,
  totalSkills: 10,
  averageScore: 93.4,
  weeklyActivity: [3, 5, 2, 7, 4, 6, 1],
};

export const SKILL_CATEGORIES = ["All", "DSA", "Frontend", "Backend", "ML", "Design", "DevOps", "Security", "System Design"] as const;
export const SKILL_LEVELS = ["All", "Beginner", "Intermediate", "Advanced", "Expert", "Master"] as const;

export const CATEGORY_COLORS: Record<string, string> = {
  DSA: "neon-cyan",
  Frontend: "neon-green",
  Backend: "neon-magenta",
  ML: "neon-cyan",
  Design: "neon-green",
  DevOps: "white",
  Security: "neon-magenta",
  "System Design": "neon-cyan",
};

export const LEVEL_ORDER: Record<string, number> = {
  Beginner: 1,
  Intermediate: 2,
  Advanced: 3,
  Expert: 4,
  Master: 5,
};
