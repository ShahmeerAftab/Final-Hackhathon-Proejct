/**
 * lib/data.js
 * Dummy static data for the Helplytics AI platform.
 * Replace with real API calls when backend is ready.
 */

/* ─── Help Requests ─── */
export const requests = [
  {
    id: "1",
    title: "How do I implement JWT authentication in a Node.js + Express app?",
    description:
      "I'm building a REST API and need to secure my routes using JWT tokens. I've tried using jsonwebtoken but I'm confused about how to handle token expiry and refresh tokens. Can someone walk me through the full flow?",
    tags: ["Node.js", "Express", "JWT", "Authentication"],
    category: "Backend",
    urgency: "high",
    status: "open",
    author: "alex_dev",
    avatar: "AD",
    createdAt: "2 hours ago",
    helperCount: 3,
    views: 142,
  },
  {
    id: "2",
    title: "React useEffect causing infinite re-render loop — how to fix?",
    description:
      "My component keeps re-rendering endlessly. I have a useEffect that fetches data and updates state, but I think I'm missing something in the dependency array. I've tried adding dependencies but it only makes it worse.",
    tags: ["React", "useEffect", "Hooks", "JavaScript"],
    category: "Frontend",
    urgency: "high",
    status: "open",
    author: "sara_react",
    avatar: "SR",
    createdAt: "4 hours ago",
    helperCount: 5,
    views: 289,
  },
  {
    id: "3",
    title: "Best practices for structuring a large Next.js project with App Router?",
    description:
      "My Next.js project is growing and I'm starting to lose track of files. What are the best folder structure practices for large-scale Next.js apps using the App Router? Especially around data fetching patterns.",
    tags: ["Next.js", "Architecture", "App Router"],
    category: "Frontend",
    urgency: "medium",
    status: "open",
    author: "next_builder",
    avatar: "NB",
    createdAt: "1 day ago",
    helperCount: 8,
    views: 415,
  },
  {
    id: "4",
    title: "PostgreSQL query optimization — slow JOIN on 1M+ rows",
    description:
      "My query with a JOIN across two large tables is taking 8+ seconds. I've added indexes but performance hasn't improved much. Looking for help understanding EXPLAIN ANALYZE output.",
    tags: ["PostgreSQL", "SQL", "Performance", "Database"],
    category: "Database",
    urgency: "high",
    status: "open",
    author: "db_wizard",
    avatar: "DW",
    createdAt: "5 hours ago",
    helperCount: 2,
    views: 98,
  },
  {
    id: "5",
    title: "How to set up CI/CD pipeline with GitHub Actions for a MERN stack app?",
    description:
      "I want to automatically deploy my MERN app to a VPS whenever I push to main. I've heard GitHub Actions is good for this but I'm not sure how to set it up with SSH and environment variables.",
    tags: ["GitHub Actions", "CI/CD", "MERN", "DevOps"],
    category: "DevOps",
    urgency: "medium",
    status: "solved",
    author: "devops_learner",
    avatar: "DL",
    createdAt: "2 days ago",
    helperCount: 6,
    views: 321,
  },
  {
    id: "6",
    title: "Tailwind CSS v4 — how to define custom theme colors in CSS?",
    description:
      "In Tailwind v4, there's no tailwind.config.js anymore. How do I define custom colors like brand-primary and brand-secondary using the new CSS-first configuration approach?",
    tags: ["Tailwind CSS", "CSS", "Design System"],
    category: "Frontend",
    urgency: "low",
    status: "open",
    author: "css_enthusiast",
    avatar: "CE",
    createdAt: "3 days ago",
    helperCount: 4,
    views: 203,
  },
  {
    id: "7",
    title: "Python async/await — understanding asyncio event loop",
    description:
      "I'm trying to build a Python web scraper using asyncio and aiohttp. I keep getting 'RuntimeError: This event loop is already running'. Not sure what's causing this or how to fix it.",
    tags: ["Python", "asyncio", "async/await", "Web Scraping"],
    category: "Backend",
    urgency: "medium",
    status: "open",
    author: "py_async_noob",
    avatar: "PN",
    createdAt: "6 hours ago",
    helperCount: 1,
    views: 67,
  },
  {
    id: "8",
    title: "Docker container can't connect to MongoDB running on host machine",
    description:
      "My Node.js app is running in a Docker container and I'm trying to connect to MongoDB running on my host machine. Connection keeps timing out even with host.docker.internal.",
    tags: ["Docker", "MongoDB", "Networking", "Node.js"],
    category: "DevOps",
    urgency: "high",
    status: "open",
    author: "container_newbie",
    avatar: "CN",
    createdAt: "1 hour ago",
    helperCount: 0,
    views: 34,
  },
];

/* ─── Categories ─── */
export const categories = [
  "All",
  "Frontend",
  "Backend",
  "Database",
  "DevOps",
  "Mobile",
  "AI/ML",
  "Design",
];

/* ─── Urgency Levels ─── */
export const urgencyLevels = ["All", "high", "medium", "low"];

/* ─── Dashboard Stats ─── */
export const dashboardStats = [
  {
    label: "Help Requests",
    value: "12",
    change: "+3 this week",
    positive: true,
    icon: "📝",
  },
  {
    label: "Contributions",
    value: "47",
    change: "+12 this month",
    positive: true,
    icon: "🤝",
  },
  {
    label: "Solved",
    value: "8",
    change: "67% solve rate",
    positive: true,
    icon: "✅",
  },
  {
    label: "Reputation",
    value: "340",
    change: "+25 this week",
    positive: true,
    icon: "⭐",
  },
];

/* ─── Community Stats (Landing Page) ─── */
export const communityStats = [
  { label: "Active Users", value: "12,400+" },
  { label: "Questions Answered", value: "89,200+" },
  { label: "Expert Helpers", value: "3,800+" },
  { label: "Topics Covered", value: "250+" },
];

/* ─── Features (Landing Page) ─── */
export const features = [
  {
    icon: "🧠",
    title: "AI-Powered Matching",
    description:
      "Our AI automatically matches your question with the most qualified helpers based on their skills and past contributions.",
  },
  {
    icon: "⚡",
    title: "Fast Responses",
    description:
      "Get help within minutes, not days. Our active community ensures urgent issues are prioritized and resolved quickly.",
  },
  {
    icon: "🏷️",
    title: "Smart Tagging",
    description:
      "Organize questions with intelligent tags and categories so the right experts find your requests instantly.",
  },
  {
    icon: "🔒",
    title: "Verified Experts",
    description:
      "All helpers are community-vetted with a transparent reputation system based on quality of help provided.",
  },
  {
    icon: "📊",
    title: "Progress Tracking",
    description:
      "Track your learning journey, contributions, and growth over time with a beautiful personal dashboard.",
  },
  {
    icon: "🌍",
    title: "Global Community",
    description:
      "Connect with developers, designers, and learners from around the world across dozens of skill categories.",
  },
];

/* ─── Recent Dashboard Requests ─── */
export const recentRequests = requests.slice(0, 5);

/* ─── Helpers for a specific request ─── */
export const helpers = [
  {
    id: "h1",
    name: "Maria Chen",
    avatar: "MC",
    role: "Senior Backend Engineer",
    reputation: 1240,
    message:
      "I've dealt with this exact issue before. The key is to separate your access token (short-lived, 15 min) from your refresh token (long-lived, 7 days). Happy to share a working example.",
  },
  {
    id: "h2",
    name: "James Okoro",
    avatar: "JO",
    role: "Full-Stack Developer",
    reputation: 890,
    message:
      "Check out the `express-jwt` package alongside `jsonwebtoken`. It simplifies middleware setup. I'll walk you through the full implementation.",
  },
  {
    id: "h3",
    name: "Priya Sharma",
    avatar: "PS",
    role: "Node.js Specialist",
    reputation: 2100,
    message:
      "The token refresh flow is often the tricky part. I can show you a pattern using interceptors that handles it gracefully on the client side too.",
  },
];
