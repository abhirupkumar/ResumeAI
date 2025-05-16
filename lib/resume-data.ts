import { ResumeData, ATSAnalysis, TemplateType, Template } from "./types";

// Mock resume data
export const sampleResumeData: ResumeData = {
  basics: {
    name: "Alex Morgan",
    label: "Senior Software Engineer",
    email: "alex.morgan@example.com",
    phone: "(555) 123-4567",
    url: "https://alexmorgan.dev",
    location: {
      address: "123 Tech Lane",
      city: "San Francisco",
      state: "CA",
      zip: "94107",
      country: "USA",
    },
    summary:
      "Experienced software engineer with 8+ years of expertise in developing scalable web applications. Proficient in React, Node.js, and cloud infrastructure. Passionate about creating efficient, user-friendly solutions that drive business growth.",
  },
  education: [
    {
      institution: "University of California, Berkeley",
      degree: "Master of Computer Science",
      fieldOfStudy: "Computer Science",
      startDate: "2013-08",
      endDate: "2015-05",
      description: "Specialized in Artificial Intelligence and Machine Learning",
      location: "Berkeley, CA",
    },
    {
      institution: "Stanford University",
      degree: "Bachelor of Science",
      fieldOfStudy: "Computer Engineering",
      startDate: "2009-09",
      endDate: "2013-06",
      description: "Graduated with honors. Member of ACM student chapter.",
      location: "Stanford, CA",
    },
  ],
  work: [
    {
      company: "TechCorp Inc.",
      position: "Senior Software Engineer",
      startDate: "2019-03",
      endDate: "Present",
      description:
        "Lead a team of 5 engineers in developing and maintaining multiple web applications. Implemented microservices architecture that improved system reliability by 40% and reduced deployment time by 60%.",
      location: "San Francisco, CA",
      highlights: [
        "Designed and implemented RESTful APIs serving 2M+ daily requests",
        "Reduced infrastructure costs by 35% through cloud optimization",
        "Led migration from monolith to microservices architecture",
        "Mentored junior developers and conducted technical interviews",
      ],
    },
    {
      company: "Innovate Solutions",
      position: "Software Engineer",
      startDate: "2015-06",
      endDate: "2019-02",
      description:
        "Developed and maintained features for a SaaS platform serving 500+ enterprise clients. Collaborated with product managers and designers to implement user-facing features.",
      location: "Mountain View, CA",
      highlights: [
        "Implemented responsive frontend using React, Redux, and TypeScript",
        "Built CI/CD pipelines that reduced release cycles from weeks to days",
        "Created performance monitoring tools that identified and fixed critical bottlenecks",
        "Collaborated with UX team to improve accessibility compliance",
      ],
    },
  ],
  skills: [
    { name: "JavaScript", level: "Expert", category: "Programming Languages" },
    { name: "TypeScript", level: "Expert", category: "Programming Languages" },
    { name: "React", level: "Expert", category: "Frontend" },
    { name: "Node.js", level: "Advanced", category: "Backend" },
    { name: "AWS", level: "Advanced", category: "Cloud" },
    { name: "Docker", level: "Intermediate", category: "DevOps" },
    { name: "Kubernetes", level: "Intermediate", category: "DevOps" },
    { name: "GraphQL", level: "Advanced", category: "API" },
    { name: "SQL", level: "Advanced", category: "Databases" },
    { name: "MongoDB", level: "Intermediate", category: "Databases" },
    { name: "CI/CD", level: "Advanced", category: "DevOps" },
    { name: "Agile Methodology", level: "Expert", category: "Process" },
  ],
  projects: [
    {
      name: "E-commerce Platform",
      description:
        "Built a full-stack e-commerce platform with React, Node.js, and MongoDB",
      startDate: "2020-01",
      endDate: "2020-06",
      url: "https://github.com/alexmorgan/ecommerce",
      highlights: [
        "Implemented secure payment processing with Stripe",
        "Designed responsive UI with 100% mobile compatibility",
        "Built admin dashboard for product and order management",
      ],
    },
    {
      name: "AI-Powered Content Recommender",
      description:
        "Developed a content recommendation system using machine learning algorithms",
      startDate: "2018-05",
      endDate: "2018-12",
      url: "https://github.com/alexmorgan/content-recommender",
      highlights: [
        "Used natural language processing for content analysis",
        "Improved recommendation accuracy by 27%",
        "Integrated with existing CMS via API",
      ],
    },
  ],
  certifications: [
    {
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2021-03",
      url: "https://aws.amazon.com/certification/",
    },
    {
      name: "Google Cloud Professional Developer",
      issuer: "Google",
      date: "2020-06",
      url: "https://cloud.google.com/certification/",
    },
  ],
  languages: [
    { name: "English", proficiency: "Native" },
    { name: "Spanish", proficiency: "Professional" },
    { name: "Mandarin", proficiency: "Elementary" },
  ],
  interests: [
    {
      name: "Open Source",
      keywords: ["Contributor", "GitHub", "Community"],
    },
    {
      name: "Tech Conferences",
      keywords: ["Speaker", "Attendee", "Networking"],
    },
  ],
  references: [
    {
      name: "Jane Smith",
      position: "CTO",
      company: "TechCorp Inc.",
      reference:
        "Alex is an exceptional engineer who consistently delivers high-quality code and innovative solutions.",
    },
  ],
};

// Mock ATS analysis
export const sampleATSAnalysis: ATSAnalysis = {
  overallScore: 76,
  keywordMatches: [
    { keyword: "JavaScript", present: true, importance: "high" },
    { keyword: "React", present: true, importance: "high" },
    { keyword: "Node.js", present: true, importance: "high" },
    { keyword: "TypeScript", present: true, importance: "medium" },
    { keyword: "AWS", present: true, importance: "medium" },
    { keyword: "CI/CD", present: true, importance: "medium" },
    { keyword: "API", present: true, importance: "medium" },
    { keyword: "REST", present: false, importance: "high", suggestions: ["Add REST experience to work descriptions"] },
    { keyword: "Python", present: false, importance: "medium", suggestions: ["Consider adding Python skills if relevant"] },
    { keyword: "Agile", present: true, importance: "medium" },
  ],
  sectionScores: [
    { name: "Contact Information", score: 10, max: 10 },
    { name: "Summary", score: 8, max: 10, feedback: ["Make summary more concise"] },
    { name: "Work Experience", score: 24, max: 30, feedback: ["Add more quantifiable achievements", "Use more action verbs"] },
    { name: "Education", score: 9, max: 10 },
    { name: "Skills", score: 18, max: 20, feedback: ["Group similar skills together"] },
    { name: "Projects", score: 7, max: 10, feedback: ["Add more recent projects if available"] },
    { name: "Formatting", score: 8, max: 10, feedback: ["Ensure consistent date formatting"] },
  ],
  suggestions: [
    "Add more quantifiable results and metrics to your work experiences",
    "Include REST API development explicitly in your experience section",
    "Consider adding Python to your skill set if you have experience with it",
    "Make your summary more concise and focused on your key strengths",
    "Ensure consistent date formatting throughout the document",
    "Add more recent project examples if available",
  ],
  strengths: [
    "Strong skill set that matches job requirements",
    "Good use of action verbs in experience descriptions",
    "Detailed project descriptions with concrete outcomes",
    "Comprehensive education section with relevant details",
    "Well-structured layout that is easy to scan",
  ],
  improvementAreas: [
    "Missing some important keywords that appear in job descriptions",
    "Summary could be more focused and concise",
    "Could include more quantifiable achievements",
    "Project section could be expanded with more recent examples",
    "Some inconsistencies in formatting",
  ],
};

// Resume templates
export const resumeTemplates: Template[] = [
  {
    id: TemplateType.Professional,
    name: "Professional",
    description: "Clean, structured layout suitable for traditional industries.",
    previewImage: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    atsScore: 95,
  },
  {
    id: TemplateType.Modern,
    name: "Modern",
    description: "Contemporary design with a balanced layout and subtle color accents.",
    previewImage: "https://images.pexels.com/photos/373076/pexels-photo-373076.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    atsScore: 90,
  },
  {
    id: TemplateType.Creative,
    name: "Creative",
    description: "Distinctive design with unique elements for creative industries.",
    previewImage: "https://images.pexels.com/photos/8867434/pexels-photo-8867434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    atsScore: 80,
  },
  {
    id: TemplateType.Minimal,
    name: "Minimal",
    description: "Streamlined and efficient layout that focuses on content.",
    previewImage: "https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    atsScore: 92,
  },
  {
    id: TemplateType.Executive,
    name: "Executive",
    description: "Premium design for senior professionals and executives.",
    previewImage: "https://images.pexels.com/photos/6457579/pexels-photo-6457579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    atsScore: 88,
  },
];