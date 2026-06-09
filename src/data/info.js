// ============================================================================
//  EDIT YOUR CONTENT HERE
//  Everything the site displays comes from this file. Update text, links,
//  projects, and skills below   no need to touch the components.
// ============================================================================

export const profile = {
  name: 'Aditi Agrawal',
  initials: 'AA',
  // photoUrl: drop a square photo in /public (e.g. public/me.jpg) and set
  // this to './me.jpg' to show it inside the hero avatar ring. Leave null
  // to show the animated initials badge instead.
  photoUrl: './my.jpg.jpeg',
  roles: [
    'Full-Stack Developer',
    'MERN Stack Specialist',
    'React.js Developer',
    'Problem Solver',
  ],
  tagline:
    'I build fast, scalable, and reliable web applications   from pixel-perfect React interfaces to production-grade APIs deployed on the cloud.',
  email: 'aditiagrawalsofficial@gmail.com',
  location: 'Jaipur, India',
  resume: 'https://drive.google.com/file/d/1KPr9ztEv-xE16khPIkdcGVQIOH0uMs5A/view?usp=sharing', // Google Drive link
}

export const socials = {
  github: 'https://github.com/agrawal-aditi18',
  // TODO: replace with your real profile URLs (these are best guesses).
  linkedin: 'https://www.linkedin.com/in/aditiagrawal001/',
  leetcode: 'https://leetcode.com/u/aditiagrawal/',
  email: `mailto:aditiagrawalsofficial@gmail.com`,
}

export const about = {
  heading: 'About Me',
  points: [
    'Full-Stack Developer and final-year B.Tech Computer Science (AI) student at SKIT, Jaipur with 9.6 CGPA',
    'MERN stack specialization   crafting responsive React interfaces with Redux and Tailwind on the front end',
    'Engineering RESTful APIs with Node.js, Express, and MongoDB on the back',
    'Shipped full-stack platforms to AWS EC2 across two production internships',
    'Written 20+ production-grade APIs with comprehensive edge-case validation and testing',
    'Owned complete SDLC   from requirement analysis through testing, deployment, and production debugging',
    'AI integrations expertise   leveraging APIs like Gemini for intelligent features and recommendations',
    'Passionate about clean architecture, fast UIs, and transforming ambitious ideas into real, working products',
  ],
  stats: [
    { value: '9.6', label: 'CGPA / 10' },
    { value: '200+', label: 'DSA Problems Solved' },
    { value: '12', label: 'Coding Events' },
    { value: '10', label: 'Projects' },
  ],
}

export const services = [
  {
    title: 'Full-Stack (MERN)',
    subtitle: 'End-to-end web platforms',
    desc: 'Architecting complete applications   from React front ends to Node/Express APIs and MongoDB   deployed and debugged in production on AWS EC2.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
    icon: 'layers',
  },
  {
    title: 'Frontend Engineering',
    subtitle: 'Fast, responsive interfaces',
    desc: 'Building accessible, pixel-perfect UIs with React, Redux Toolkit, and Tailwind   optimised with memoization and debouncing for buttery-smooth UX.',
    tech: ['React.js', 'Redux', 'Tailwind', 'JavaScript'],
    icon: 'code',
  },
  {
    title: 'Backend & APIs',
    subtitle: 'Robust server-side systems',
    desc: 'Designing RESTful APIs with edge-case validation, JWT auth, and thorough Postman testing   structured around clean, maintainable patterns.',
    tech: ['Express', 'REST', 'JWT', 'MongoDB'],
    icon: 'server',
  },
  {
    title: 'Cloud & Deployment',
    subtitle: 'Ship to production',
    desc: 'Deploying and scaling apps on AWS EC2 with Nginx, optimising cloud-side performance, and managing the full release lifecycle end to end.',
    tech: ['AWS EC2', 'Nginx', 'Git', 'Firebase'],
    icon: 'cloud',
  },
]

export const timeline = [
  {
    period: 'PRESENT',
    title: 'B.Tech — Computer Science (AI)',
    org: 'SKIT, Jaipur · CGPA 9.6 / 10',
    desc: 'Final-year student specialising in Artificial Intelligence, with a strong foundation in DSA, DBMS, OS, and full-stack web development.',
  },
  {
    period: '2025',
    title: 'Software Developer Intern',
    org: 'Compucom Software Limited',
    desc: 'Built & deployed a full-stack MERN platform on AWS EC2 — engineering 11+ RESTful APIs across 10+ modules and cutting latency by 15% through cloud-side optimisation. Architected Redux state and owned the full SDLC.',
  },
  {
    period: '2024',
    title: 'Frontend Developer Intern',
    org: 'KisTechnoSoftware Pvt. Ltd.',
    desc: 'Worked in an Agile team to ship a responsive web app with 10+ dynamic pages — contributing to UI/UX, manual testing, and debugging under sprint-based delivery.',
  },
  {
    period: '2023',
    title: 'Started B.Tech & Dev Journey',
    org: 'SKIT, Jaipur',
    desc: 'Began Computer Science engineering, diving deep into C++, data structures, and the fundamentals of building real software.',
  },
]

export const projects = [
  {
    id: '01',
    name: 'NetflixGPT',
    category: 'AI / Movie Recommendation',
    desc: 'An AI-powered movie platform integrating the Gemini API for intelligent recommendations, with Firebase auth, Redux Toolkit (memoized state), TMDB real-time data, and protected routing for a robust, production-ready UI.',
    tech: ['React.js', 'Redux Toolkit', 'Firebase', 'Gemini API', 'TailwindCSS', 'TMDB API'],
    gradient: 'from-rose-500/30 via-red-500/10 to-transparent',
    image: './netflix.png',
    links: { github: 'https://github.com/agrawal-aditi18', live: 'https://netflixgpt-805e6.web.app/' },
  },
  {
    id: '02',
    name: 'DEVenue',
    category: 'MERN / Social Platform',
    desc: "A developers' networking platform deployed on AWS EC2 with Nginx for load handling. Features JWT authentication, connection-building, and real-time live chat — built end to end across the complete SDLC.",
    tech: ['React.js', 'Redux', 'Node.js', 'Express', 'MongoDB', 'AWS EC2', 'JWT'],
    gradient: 'from-cyan-500/30 via-blue-500/10 to-transparent',
    image: './Devenue.png',
    links: { github: 'https://github.com/agrawal-aditi18', live: '#' },
  },
  {
    id: '03',
    name: 'YouTube Clone',
    category: 'Video Streaming App',
    desc: 'A YouTube-inspired streaming app using the YouTube Data API, with debounced API calls to cut redundant requests and a live-chat simulation powered by centralised Redux Toolkit state — tuned for smooth performance.',
    tech: ['React.js', 'Redux Toolkit', 'TailwindCSS', 'React Router', 'YouTube API'],
    gradient: 'from-violet-500/30 via-fuchsia-500/10 to-transparent',
    image: './YouTubeClone.png',
    links: { github: 'https://github.com/agrawal-aditi18', live: '#' },
  },
]

// Skill tiles for the Tech Stack grid. `icon` maps to an entry in
// components/TechStack.jsx's icon registry.
export const skills = [
  { name: 'C++', icon: 'cpp' },
  { name: 'JavaScript', icon: 'js' },
  { name: 'HTML5', icon: 'html' },
  { name: 'CSS3', icon: 'css' },
  { name: 'React', icon: 'react' },
  { name: 'Redux', icon: 'redux' },
  { name: 'Tailwind', icon: 'tailwind' },
  { name: 'Node.js', icon: 'node' },
  { name: 'Express', icon: 'express' },
  { name: 'MongoDB', icon: 'mongodb' },
  { name: 'MySQL', icon: 'mysql' },
  { name: 'Firebase', icon: 'firebase' },
  { name: 'AWS', icon: 'aws' },
  { name: 'Nginx', icon: 'nginx' },
  { name: 'Git', icon: 'git' },
  { name: 'GitHub', icon: 'github' },
  { name: 'Postman', icon: 'postman' },
  { name: 'npm', icon: 'npm' },
]

export const achievements = [
  '200+ DSA problems solved on LeetCode and other competitive platforms',
  'Meritorious Student   top academic performance in Semester 1',
  'Team Leader   shortlisted for Smart India Hackathon (SIH) Prelims 2025',
  'International Mathematics Olympiad (IMO) Medalist   9th grade',
]

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]
