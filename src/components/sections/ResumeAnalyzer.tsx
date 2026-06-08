"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import SectionWrapper from "@/components/SectionWrapper";
import InteractiveCard from "@/components/InteractiveCard";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Upload, FileText, CheckCircle2, AlertTriangle, Sparkles, RotateCcw, 
  Loader2, Briefcase, Award, ShieldAlert, Cpu, Check, X, FileEdit, HelpCircle
} from "lucide-react";

// ==========================================
// TECHNICAL DICTIONARIES & KEYWORDS
// ==========================================
const TECHNICAL_KEYWORDS = {
  languages: [
    "java", "python", "javascript", "typescript", "c\\+\\+", "c#", "rust", "go", "ruby", "php", 
    "swift", "kotlin", "html", "css", "sql", "bash", "shell", "r", "scala", "dart"
  ],
  frameworks: [
    "react", "next\\.js", "nextjs", "angular", "vue", "express", "spring boot", "springboot", 
    "django", "flask", "laravel", "rails", "svelte", "nuxt", "nest\\.js", "nestjs", "fastapi"
  ],
  databases: [
    "mysql", "postgresql", "postgres", "mongodb", "redis", "supabase", "sqlite", "oracle", 
    "mariadb", "cassandra", "dynamodb", "firebase firestore", "firestore"
  ],
  cloud: [
    "aws", "gcp", "azure", "vercel", "netlify", "cloudflare", "firebase", "heroku", "digitalocean"
  ],
  tools: [
    "docker", "kubernetes", "git", "github", "jira", "figma", "postman", "jenkins", "gitlab", 
    "webpack", "vite", "npm", "yarn", "pnpm", "maven", "gradle", "ansible", "terraform"
  ],
  aiml: [
    "pytorch", "tensorflow", "keras", "opencv", "nltk", "spacy", "scikit-learn", "pandas", 
    "numpy", "llm", "gemini", "openai", "gpt", "rag", "langchain", "prompt engineering"
  ]
};

const ACTION_VERBS = [
  "built", "developed", "implemented", "optimized", "designed", "integrated", "led", "managed",
  "created", "achieved", "orchestrated", "engineered", "streamlined", "automated", "refactored",
  "deployed", "launched", "executed", "collaborated", "facilitated", "improved", "increased"
];

// ==========================================
// TYPES & INTERFACES
// ==========================================
interface SectionsMap {
  contact: string;
  summary: string;
  skills: string;
  experience: string;
  projects: string;
  education: string;
  certifications: string;
  achievements: string;
}

interface SkillValidationResult {
  name: string;
  category: string;
  sections: string[];
  confidence: "High" | "Medium" | "Low";
}

interface AnalysisResult {
  overallScore: number;
  breakdown: {
    "Section Structure & Completeness": number;
    "Skill Alignment & Density": number;
    "Impact & Action Verbs": number;
    "Formatting & ATS Readability": number;
  };
  skillValidation: SkillValidationResult[];
  strengths: string[];
  improvements: string[];
}

interface JobMatchResult {
  matchScore: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  recommendations: string[];
}

// ==========================================
// PARSING & ANALYSIS UTILITIES
// ==========================================

// Escape regex special chars except backslashes already in keywords
function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, (match) => {
    // If it's already escaped, don't escape it again
    if (match === "\\") return match;
    return "\\" + match;
  });
}

function matchKeyword(text: string, keyword: string): boolean {
  const lowerText = text.toLowerCase();
  const lowerKeyword = keyword.toLowerCase();

  // For keywords like c++ or next.js, match directly in string
  if (lowerKeyword.includes("+") || lowerKeyword.includes(".") || lowerKeyword.includes("#")) {
    return lowerText.includes(lowerKeyword.replace(/\\/g, ""));
  }

  // Use word boundaries for normal keywords to prevent partial matching (e.g. "go" in "google")
  try {
    const regex = new RegExp(`\\b${lowerKeyword}\\b`, "i");
    return regex.test(lowerText);
  } catch (e) {
    return lowerText.includes(lowerKeyword);
  }
}

// Segment resume text into logical sections based on common headings
function segmentResumeText(text: string): SectionsMap {
  const lines = text.split(/\r?\n/);
  const sections: SectionsMap = {
    contact: "",
    summary: "",
    skills: "",
    experience: "",
    projects: "",
    education: "",
    certifications: "",
    achievements: ""
  };

  let currentSection: keyof SectionsMap = "contact";

  const headerMatchers = [
    { key: "summary" as const, terms: ["summary", "profile", "professional summary", "professional profile", "about me", "objective", "career objective"] },
    { key: "skills" as const, terms: ["skills", "technical skills", "skills & tools", "core competencies", "technologies", "expertise", "technical expertise", "skills and tools"] },
    { key: "experience" as const, terms: ["experience", "work history", "employment", "professional experience", "work experience", "internships", "internship", "employment history"] },
    { key: "projects" as const, terms: ["projects", "personal projects", "academic projects", "key projects", "notable projects", "academic works"] },
    { key: "education" as const, terms: ["education", "academic history", "qualification", "degrees", "degree", "university", "college", "school"] },
    { key: "certifications" as const, terms: ["certifications", "licenses", "courses", "credentials", "certification", "accomplishments", "certifications & coding profiles", "certifications and coding profiles"] },
    { key: "achievements" as const, terms: ["achievements", "awards", "honors", "accomplishments", "extracurricular"] }
  ];

  for (const line of lines) {
    const trimmed = line.trim();
    const lower = trimmed.toLowerCase();
    if (!trimmed) continue;

    let foundHeader = false;
    if (trimmed.length < 35) {
      for (const matcher of headerMatchers) {
        if (matcher.terms.includes(lower) || 
            matcher.terms.some(t => lower === t + ":" || lower === "### " + t || lower === "## " + t || lower === "1. " + t)) {
          currentSection = matcher.key;
          foundHeader = true;
          break;
        }
      }
    }

    if (!foundHeader) {
      sections[currentSection] += line + "\n";
    }
  }

  return sections;
}

// Weighted scoring engine
function calculateScores(sections: SectionsMap, fullText: string) {
  const lowerFull = fullText.toLowerCase();

  // 1. Section Completeness & Structure (20 points max)
  let structureScore = 0;
  const hasSummary = sections.summary.trim().length > 10 || lowerFull.includes("summary") || lowerFull.includes("profile") || lowerFull.includes("objective");
  const hasExperience = sections.experience.trim().length > 15 || lowerFull.includes("experience") || lowerFull.includes("employment") || lowerFull.includes("work history");
  const hasSkills = sections.skills.trim().length > 10 || lowerFull.includes("skills") || lowerFull.includes("competencies") || lowerFull.includes("technologies");
  const hasEducation = sections.education.trim().length > 10 || lowerFull.includes("education") || lowerFull.includes("academic") || lowerFull.includes("degree");

  if (hasSummary) structureScore += 5;
  if (hasExperience) structureScore += 5;
  if (hasSkills) structureScore += 5;
  if (hasEducation) structureScore += 5;

  // 2. Skill Alignment & Density (30 points max)
  let techKeywordsCount = 0;
  Object.values(TECHNICAL_KEYWORDS).flat().forEach(keyword => {
    if (matchKeyword(lowerFull, keyword)) {
      techKeywordsCount++;
    }
  });

  const softKeywords = [
    "problem solving", "collaboration", "communication", "teamwork", "team collaboration",
    "agile", "leadership", "adaptability", "testing", "debugging", "management"
  ];
  let softKeywordsCount = 0;
  softKeywords.forEach(kw => {
    if (lowerFull.includes(kw)) {
      softKeywordsCount++;
    }
  });

  // Balanced skill score with baseline floor score of 12 points
  let skillScore = 12;
  skillScore += Math.min(12, techKeywordsCount * 1.0); // Up to 12 points (12 keywords gets max)
  skillScore += Math.min(6, softKeywordsCount * 1.5);   // Up to 6 points (4 soft skills gets max)
  skillScore = Math.min(30, skillScore);

  // 3. Impact & Action Verbs (25 points max)
  let verbCount = 0;
  ACTION_VERBS.forEach(verb => {
    if (matchKeyword(lowerFull, verb)) {
      verbCount++;
    }
  });

  // Action verb points (Max 13, baseline floor of 5 points if any verb exists)
  let verbScore = 0;
  if (verbCount > 0) {
    verbScore = Math.min(13, 5 + verbCount * 2.0); // e.g., 4 verbs = 5 + 8 = 13 points
  }

  // Quantifiable outcomes (Max 12, baseline floor of 7 points to avoid strict penalty)
  const hasMetrics = /\d+%|\d+\s*(users|clients|projects|apps|teams|repositories|hours|months|years|dollars)/i.test(fullText);
  const outcomeScore = hasMetrics ? 12 : 7;

  const impactScore = Math.min(25, verbScore + outcomeScore);

  // 4. Formatting, Parsability, & ATS Readability (25 points max)
  const words = fullText.trim().split(/\s+/).length;
  let wordScore = 5;
  if (words >= 300 && words <= 1000) {
    wordScore = 10;
  } else if (words >= 150 && words <= 1500) {
    wordScore = 8;
  }

  let parsableScore = 8;
  if (fullText.includes("  |  ") || fullText.includes(" \u2022 ")) {
    parsableScore = 8;
  }

  const hasDates = /\b(19|20)\d{2}\b/i.test(lowerFull) || lowerFull.includes("present");
  const dateScore = hasDates ? 7 : 4;

  const formattingScore = Math.min(25, wordScore + parsableScore + dateScore);

  const overall = Math.round(structureScore + skillScore + impactScore + formattingScore);

  // Return clean sub-scores
  return {
    structure: structureScore,
    skills: skillScore,
    impact: impactScore,
    formatting: formattingScore,
    overall: Math.min(100, Math.max(30, overall))
  };
}

// Validate skill occurrences in different sections to establish confidence
function validateSkills(sections: SectionsMap): SkillValidationResult[] {
  const result: SkillValidationResult[] = [];

  Object.entries(TECHNICAL_KEYWORDS).forEach(([category, keywords]) => {
    keywords.forEach(kw => {
      const displayKw = kw.replace(/\\/g, "");
      const sectionsFound: string[] = [];

      if (matchKeyword(sections.skills, kw)) sectionsFound.push("Skills");
      if (matchKeyword(sections.projects, kw)) sectionsFound.push("Projects");
      if (matchKeyword(sections.experience, kw)) sectionsFound.push("Experience");
      if (matchKeyword(sections.certifications, kw)) sectionsFound.push("Certifications");

      if (sectionsFound.length > 0) {
        let confidence: "High" | "Medium" | "Low" = "Low";
        if (sectionsFound.length >= 3) {
          confidence = "High";
        } else if (sectionsFound.length === 2) {
          confidence = "Medium";
        }

        result.push({
          name: displayKw.toUpperCase(),
          category: category.charAt(0).toUpperCase() + category.slice(1),
          sections: sectionsFound,
          confidence
        });
      }
    });
  });

  return result;
}

// Generate strengths and weaknesses dynamically
function generateStrengthsAndImprovements(scores: any, sections: SectionsMap, validatedSkills: SkillValidationResult[]) {
  const strengths: string[] = [];
  const improvements: string[] = [];

  // Contact info feedback
  if (scores.contact >= 7) {
    strengths.push("Professional contact information complete (email, phone, LinkedIn/GitHub present).");
  } else {
    improvements.push("Ensure your email, phone, and professional GitHub/LinkedIn URLs are fully details on the header.");
  }

  // Summary feedback
  if (scores.summary >= 5) {
    strengths.push("Professional summary section is present and describes core expertise.");
  } else {
    improvements.push("Add a targeted 3-4 sentence professional summary to clarify your career objective.");
  }

  // Skills section and confidence checks
  const highConfidenceSkills = validatedSkills.filter(s => s.confidence === "High");
  if (highConfidenceSkills.length >= 2) {
    strengths.push(`Excellent skill validation: technical skills like ${highConfidenceSkills.slice(0, 3).map(s => s.name).join(", ")} are supported across multiple project and work details.`);
  } else if (validatedSkills.length > 0) {
    improvements.push("Support your technical skill list by mentioning those technologies directly inside your project and work descriptions.");
  }

  // Experience and verbs check
  if (scores.experience >= 15) {
    strengths.push("Work/Internship descriptions contain strong action verbs and quantifiable results.");
  } else {
    if (!sections.experience.trim()) {
      improvements.push("Work/Internship experience section is missing or too short. Detail roles, duties, and tools used.");
    } else {
      improvements.push("Integrate metric-oriented achievements (e.g., optimized loading speeds by 20%, supported 50+ users) and use action-oriented verbs.");
    }
  }

  // Projects count check
  if (scores.projects >= 10) {
    strengths.push("Strong projects section detailing multiple software implementations.");
  } else {
    improvements.push("Expand on project technicalities: outline the structure, database configurations, and specific problems solved.");
  }

  // Education check
  if (scores.education < 8) {
    improvements.push("Clearly state your college name, degree (e.g., B.Tech, B.S.), major, and graduation year.");
  }

  // Formatting checklist
  if (scores.formatting >= 8) {
    strengths.push("Excellent resume length and formatting balance for applicant tracking scanner parsers.");
  } else {
    improvements.push("Format section headers with clean bold layouts to improve readability for standard ATS parser models.");
  }

  return {
    strengths: strengths.slice(0, 5),
    improvements: improvements.slice(0, 5)
  };
}

// Compare Resume vs Job Description
function compareResumeWithJd(resumeText: string, jdText: string): JobMatchResult {
  const jdTextLower = jdText.toLowerCase();
  const foundJdKeywords: string[] = [];

  // Match keywords inside the JD text
  Object.values(TECHNICAL_KEYWORDS).flat().forEach(keyword => {
    if (matchKeyword(jdTextLower, keyword)) {
      foundJdKeywords.push(keyword.replace(/\\/g, ""));
    }
  });

  // Unique JD keywords
  const uniqueJdKeywords = Array.from(new Set(foundJdKeywords));
  
  if (uniqueJdKeywords.length === 0) {
    // If no technical keywords detected, fallback to standard developer terms
    return {
      matchScore: 0,
      matchedKeywords: [],
      missingKeywords: [],
      recommendations: ["Job Description does not contain recognizable developer keywords. Paste a detailed engineering job description."]
    };
  }

  const matchedKeywords: string[] = [];
  const missingKeywords: string[] = [];

  uniqueJdKeywords.forEach(kw => {
    if (matchKeyword(resumeText, kw)) {
      matchedKeywords.push(kw.toUpperCase());
    } else {
      missingKeywords.push(kw.toUpperCase());
    }
  });

  const matchScore = Math.round((matchedKeywords.length / uniqueJdKeywords.length) * 100);

  const recommendations: string[] = [];
  if (missingKeywords.length > 0) {
    recommendations.push(`Add the following keywords to your skills/experience: ${missingKeywords.slice(0, 5).join(", ")}.`);
    recommendations.push("Ensure missing skills are described contextually inside projects, not just copy-pasted.");
  } else {
    recommendations.push("Your resume matches all parsed tech stack skills in the Job Description! Ready to apply.");
  }

  return {
    matchScore,
    matchedKeywords,
    missingKeywords,
    recommendations
  };
}

// Script loading loader
const loadExternalScripts = (): Promise<void> => {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve();
      return;
    }
    
    // Check if scripts are already loaded and globally available
    if ((window as any).pdfjsLib && (window as any).mammoth) {
      resolve();
      return;
    }

    const checkLoaded = () => {
      if ((window as any).pdfjsLib && (window as any).mammoth) {
        resolve();
      } else {
        setTimeout(checkLoaded, 100);
      }
    };

    if (!document.getElementById("pdfjs-script")) {
      const s1 = document.createElement("script");
      s1.id = "pdfjs-script";
      s1.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js";
      document.head.appendChild(s1);
    }

    if (!document.getElementById("mammoth-script")) {
      const s2 = document.createElement("script");
      s2.id = "mammoth-script";
      s2.src = "https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js";
      document.head.appendChild(s2);
    }

    checkLoaded();
  });
};

const extractTextFromPdf = async (arrayBuffer: ArrayBuffer): Promise<string> => {
  const pdfjsLib = (window as any).pdfjsLib;
  pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js";

  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;
  let text = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map((item: any) => item.str).join(" ");
    text += pageText + "\n";
  }

  return text;
};

const extractTextFromDocx = async (arrayBuffer: ArrayBuffer): Promise<string> => {
  const mammoth = (window as any).mammoth;
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value || "";
};

// ==========================================
// COMPONENT IMPLEMENTATION
// ==========================================
export default function ResumeAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);

  // Match Mode States
  const [mode, setMode] = useState<"ats" | "job-match">("ats");
  const [jdText, setJdText] = useState("");
  const [jobMatchResult, setJobMatchResult] = useState<JobMatchResult | null>(null);
  const [isMatching, setIsMatching] = useState(false);

  // Resume Texts
  const [resumeText, setResumeText] = useState("");
  const [parsedSegments, setParsedSegments] = useState<SectionsMap | null>(null);

  // UI Tabs State
  const [activeTab, setActiveTab] = useState<"overview" | "skills" | "strengths" | "jd-match">("overview");

  // Load external scripts once component is mounted
  useEffect(() => {
    loadExternalScripts().catch(err => console.error("Error preloading extraction scripts", err));
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setResult(null);
      setJobMatchResult(null);
      setErrorMsg("");
    }
  }, []);

  // Main Resume Analysis Runner
  const handleAnalyze = useCallback(async () => {
    if (!file) return;
    setIsAnalyzing(true);
    setErrorMsg("");
    setResult(null);
    setJobMatchResult(null);

    try {
      await loadExternalScripts();
      
      const reader = new FileReader();
      reader.onload = async (ev) => {
        try {
          const arrayBuffer = ev.target?.result as ArrayBuffer;
          let text = "";
          
          const fileExt = file.name.split(".").pop()?.toLowerCase();
          
          if (fileExt === "pdf") {
            text = await extractTextFromPdf(arrayBuffer);
          } else if (fileExt === "docx") {
            text = await extractTextFromDocx(arrayBuffer);
          } else {
            // Read standard TXT file
            const textReader = new FileReader();
            textReader.onload = (e) => {
              const txt = e.target?.result as string;
              runAnalysis(txt);
            };
            textReader.readAsText(file);
            return;
          }
          
          runAnalysis(text);
        } catch (err: any) {
          console.error("File extraction failure", err);
          setErrorMsg("Failed to extract text. Make sure your file is not password protected or corrupted.");
          setIsAnalyzing(false);
        }
      };
      
      reader.readAsArrayBuffer(file);
    } catch (err: any) {
      console.error("Loader error", err);
      setErrorMsg("Parser engine could not be initialized client-side.");
      setIsAnalyzing(false);
    }
  }, [file]);

  const runAnalysis = (text: string) => {
    if (!text || text.trim().length < 50) {
      setErrorMsg("Resume text content is too short to be analyzed properly. Please upload a detailed resume.");
      setIsAnalyzing(false);
      return;
    }

    const segments = segmentResumeText(text);
    const scores = calculateScores(segments, text);
    const skillValidation = validateSkills(segments);
    const strengthsAndImprovements = generateStrengthsAndImprovements(scores, segments, skillValidation);

    setResumeText(text);
    setParsedSegments(segments);
    
    setResult({
      overallScore: scores.overall,
      breakdown: {
        "Section Structure & Completeness": (scores.structure / 20) * 100,
        "Skill Alignment & Density": (scores.skills / 30) * 100,
        "Impact & Action Verbs": (scores.impact / 25) * 100,
        "Formatting & ATS Readability": (scores.formatting / 25) * 100
      },
      skillValidation,
      strengths: strengthsAndImprovements.strengths,
      improvements: strengthsAndImprovements.improvements
    });

    setIsAnalyzing(false);
    setActiveTab("overview");
  };

  // Run Job Match Analysis
  const handleCalculateMatch = useCallback(() => {
    if (!resumeText || !jdText.trim()) return;
    setIsMatching(true);
    
    setTimeout(() => {
      const matchRes = compareResumeWithJd(resumeText, jdText);
      setJobMatchResult(matchRes);
      setIsMatching(false);
    }, 1200);
  }, [resumeText, jdText]);

  const handleReset = useCallback(() => {
    setFile(null);
    setResult(null);
    setResumeText("");
    setParsedSegments(null);
    setJobMatchResult(null);
    setJdText("");
    setErrorMsg("");
    setIsAnalyzing(false);
  }, []);

  const scoreColor = result
    ? result.overallScore >= 80 
      ? "text-emerald-500" 
      : result.overallScore >= 60 
      ? "text-amber-500" 
      : "text-rose-500"
    : "";

  return (
    <SectionWrapper id="resume-analyzer">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary dark:text-secondary dark:border-secondary/20 dark:bg-secondary/5 text-xs font-semibold uppercase tracking-wider mb-3">
            <Cpu className="w-3 h-3" /> Parser Engine
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl tracking-tight mb-4">
            ATS Resume Evaluator
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base">
            Upload your resume (.pdf, .docx, .txt) to run a structured, weighted parser audit analyzing section splits, experience verbs, and cross-section skill validation.
          </p>
          <div className="h-1 w-12 bg-primary dark:bg-secondary mx-auto rounded mt-4" />
        </div>

        <InteractiveCard className="glass-panel rounded-3xl border border-bordercolor-light dark:border-bordercolor-dark shadow-xl overflow-hidden p-6 md:p-10 relative">
          
          {/* Background glowing decorations */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key="upload-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Upload zone */}
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-bordercolor-light dark:border-bordercolor-dark rounded-2xl p-10 cursor-pointer hover:border-primary/40 dark:hover:border-secondary/40 transition-colors group relative bg-white/30 dark:bg-slate-900/30">
                  <div className="p-4 bg-primary/10 dark:bg-secondary/10 rounded-2xl mb-4 group-hover:scale-105 transition-transform">
                    <Upload className="w-8 h-8 text-primary dark:text-secondary" />
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 font-semibold text-sm mb-1">
                    {file ? file.name : "Drag your resume file here or click to browse"}
                  </p>
                  <p className="text-slate-400 text-xs">
                    Supports .pdf, .docx, and .txt formats
                  </p>
                  <input
                    type="file"
                    accept=".txt,.pdf,.docx"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>

                {errorMsg && (
                  <div className="mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-semibold flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    {errorMsg}
                  </div>
                )}

                {file && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 flex items-center justify-center gap-4"
                  >
                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-sm border border-slate-200/50 dark:border-slate-700/50">
                      <FileText className="w-4 h-4 text-primary dark:text-secondary" />
                      <span className="text-slate-600 dark:text-slate-300 font-medium text-xs max-w-[150px] truncate">{file.name}</span>
                    </div>
                    <button
                      onClick={handleAnalyze}
                      disabled={isAnalyzing}
                      className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary-dark transition-colors disabled:opacity-60 shadow-md shadow-primary/20"
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Parsing File...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          Evaluate Resume
                        </>
                      )}
                    </button>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="results-screen"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Result header layout */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-bordercolor-light dark:border-bordercolor-dark">
                  <div className="flex items-center gap-4.5">
                    <div className="p-3 bg-primary/10 dark:bg-secondary/10 rounded-2xl w-fit">
                      <FileText className="w-6 h-6 text-primary dark:text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-display font-extrabold text-lg text-slate-800 dark:text-white">
                        Analysis Complete
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        File: {file?.name} • Extracted {resumeText.split(/\s+/).length} words
                      </p>
                    </div>
                  </div>

                  {/* Mode switcher tabs */}
                  <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200/50 dark:border-slate-800/50">
                    <button
                      onClick={() => setMode("ats")}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        mode === "ats" 
                          ? "bg-white dark:bg-slate-800 shadow-sm text-primary dark:text-secondary" 
                          : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                      }`}
                    >
                      ATS Audit
                    </button>
                    <button
                      onClick={() => {
                        setMode("job-match");
                        setActiveTab("jd-match");
                      }}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        mode === "job-match" 
                          ? "bg-white dark:bg-slate-800 shadow-sm text-primary dark:text-secondary" 
                          : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                      }`}
                    >
                      Job Matcher
                    </button>
                  </div>
                </div>

                {/* Dashboard Tabs Selector */}
                <div className="flex flex-wrap gap-2 mt-6 border-b border-bordercolor-light dark:border-bordercolor-dark pb-4">
                  <button
                    onClick={() => setActiveTab("overview")}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                      activeTab === "overview" 
                        ? "bg-primary text-white" 
                        : "bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
                    }`}
                  >
                    Score Breakdown
                  </button>
                  <button
                    onClick={() => setActiveTab("skills")}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                      activeTab === "skills" 
                        ? "bg-primary text-white" 
                        : "bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
                    }`}
                  >
                    Validated Skills ({result.skillValidation.length})
                  </button>
                  <button
                    onClick={() => setActiveTab("strengths")}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                      activeTab === "strengths" 
                        ? "bg-primary text-white" 
                        : "bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
                    }`}
                  >
                    Strengths & Tips
                  </button>
                  {mode === "job-match" && (
                    <button
                      onClick={() => setActiveTab("jd-match")}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                        activeTab === "jd-match" 
                          ? "bg-primary text-white" 
                          : "bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
                      }`}
                    >
                      Compare JD
                    </button>
                  )}
                </div>

                {/* TAB CONTENT PANELS */}
                <div className="mt-6">
                  
                  {/* TAB 1: OVERVIEW SCORES */}
                  {activeTab === "overview" && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                      
                      {/* Circle progress indicator */}
                      <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-50/50 dark:bg-slate-900/30 border border-slate-200/50 dark:border-slate-800/50 rounded-3xl">
                        <div className="relative w-40 h-40">
                          {/* Outer circle track */}
                          <svg className="w-full h-full transform -rotate-90">
                            <circle
                              cx="80"
                              cy="80"
                              r="70"
                              className="stroke-slate-200 dark:stroke-slate-800 fill-none"
                              strokeWidth="10"
                            />
                            {/* Animated colored ring */}
                            <motion.circle
                              cx="80"
                              cy="80"
                              r="70"
                              className={`fill-none ${
                                result.overallScore >= 80 
                                  ? "stroke-emerald-500" 
                                  : result.overallScore >= 60 
                                  ? "stroke-amber-500" 
                                  : "stroke-rose-500"
                              }`}
                              strokeWidth="10"
                              strokeDasharray={440}
                              initial={{ strokeDashoffset: 440 }}
                              animate={{ strokeDashoffset: 440 - (440 * result.overallScore) / 100 }}
                              transition={{ duration: 1.2, ease: "easeOut" }}
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className={`text-4xl font-extrabold font-display ${scoreColor}`}>
                              {result.overallScore}
                            </span>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                              ATS SCORE
                            </span>
                          </div>
                        </div>

                        {/* Level badge */}
                        <div className="mt-4 text-center">
                          <span className={`px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                            result.overallScore >= 80 
                              ? "bg-emerald-500/10 text-emerald-500" 
                              : result.overallScore >= 60 
                              ? "bg-amber-500/10 text-amber-500" 
                              : "bg-rose-500/10 text-rose-500"
                          }`}>
                            {result.overallScore >= 80 ? "Recruiter Ready" : result.overallScore >= 60 ? "Needs Polish" : "Weak Index"}
                          </span>
                        </div>
                      </div>

                      {/* Score breakdown bar charts */}
                      <div className="lg:col-span-7 space-y-4">
                        <h4 className="font-display font-bold text-sm text-slate-800 dark:text-slate-200 uppercase tracking-wide">
                          Weighted Breakdown Index
                        </h4>
                        
                        <div className="space-y-3.5">
                          {Object.entries(result.breakdown).map(([key, val]) => (
                            <div key={key} className="space-y-1">
                              <div className="flex justify-between text-xs font-semibold">
                                <span className="text-slate-500 dark:text-slate-400 capitalize">{key} Info</span>
                                <span className="text-slate-700 dark:text-slate-300">{Math.round(val)}%</span>
                              </div>
                              <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${val}%` }}
                                  transition={{ duration: 0.8, delay: 0.2 }}
                                  className={`h-full rounded-full ${
                                    val >= 80 
                                      ? "bg-emerald-500" 
                                      : val >= 60 
                                      ? "bg-amber-500" 
                                      : "bg-rose-500"
                                  }`}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  )}

                  {/* TAB 2: VALIDATED SKILLS */}
                  {activeTab === "skills" && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center bg-primary/5 dark:bg-secondary/5 border border-primary/10 dark:border-secondary/10 rounded-2xl p-4">
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
                          <HelpCircle className="w-4 h-4 text-primary dark:text-secondary" />
                          <span>Confidence matches count section presence: <strong>High</strong> (Skills + Projects + Experience), <strong>Medium</strong> (2 sections), <strong>Low</strong> (1 section).</span>
                        </div>
                      </div>

                      {result.skillValidation.length === 0 ? (
                        <div className="text-center py-8 text-slate-400 text-sm">
                          No technical dictionary keywords matched inside the file text.
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {result.skillValidation.map((skill, index) => (
                            <div key={index} className="p-4 bg-slate-50/50 dark:bg-slate-900/30 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl flex flex-col justify-between gap-3">
                              <div className="flex justify-between items-start">
                                <div>
                                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">{skill.category}</span>
                                  <h5 className="font-mono font-bold text-sm text-slate-800 dark:text-white mt-0.5">{skill.name}</h5>
                                </div>
                                <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                                  skill.confidence === "High" 
                                    ? "bg-emerald-500/10 text-emerald-500" 
                                    : skill.confidence === "Medium" 
                                    ? "bg-amber-500/10 text-amber-500" 
                                    : "bg-slate-200 dark:bg-slate-800 text-slate-500"
                                }`}>
                                  {skill.confidence} Conf.
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {skill.sections.map((sec, i) => (
                                  <span key={i} className="text-[10px] font-semibold bg-white dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-md">
                                    ✓ {sec}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 3: STRENGTHS & IMPROVEMENTS */}
                  {activeTab === "strengths" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Strengths panel */}
                      <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-3xl p-6">
                        <h4 className="font-display font-bold text-sm text-emerald-500 mb-4 flex items-center gap-2 uppercase tracking-wide">
                          <CheckCircle2 className="w-4 h-4" /> Passed Checks ({result.strengths.length})
                        </h4>
                        <ul className="space-y-3">
                          {result.strengths.map((str, i) => (
                            <li key={i} className="flex gap-2.5 items-start text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                              <span className="text-emerald-500 font-bold shrink-0">✓</span>
                              <span>{str}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Improvements panel */}
                      <div className="bg-amber-500/5 border border-amber-500/15 rounded-3xl p-6">
                        <h4 className="font-display font-bold text-sm text-amber-500 mb-4 flex items-center gap-2 uppercase tracking-wide">
                          <AlertTriangle className="w-4 h-4" /> Improvement Audit ({result.improvements.length})
                        </h4>
                        <ul className="space-y-3">
                          {result.improvements.map((imp, i) => (
                            <li key={i} className="flex gap-2.5 items-start text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                              <span className="text-amber-500 font-bold shrink-0">!</span>
                              <span>{imp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                    </div>
                  )}

                  {/* TAB 4: JOB DESCRIPTION COMPILER */}
                  {activeTab === "jd-match" && (
                    <div className="space-y-6">
                      <div className="flex flex-col gap-3">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                          Paste Target Job Description (JD)
                        </label>
                        <textarea
                          value={jdText}
                          onChange={(e) => setJdText(e.target.value)}
                          placeholder="Paste the details of the job listing you want to match against..."
                          className="w-full h-32 bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-xs focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-800 dark:text-white"
                        />
                      </div>

                      <div className="flex justify-end gap-3">
                        <button
                          onClick={handleCalculateMatch}
                          disabled={!jdText.trim() || isMatching}
                          className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-xs hover:bg-primary-dark transition-colors disabled:opacity-60 shadow-md shadow-primary/20"
                        >
                          {isMatching ? (
                            <>
                              <Loader2 className="w-4.5 h-4.5 animate-spin" />
                              Comparing...
                            </>
                          ) : (
                            <>
                              <FileEdit className="w-4.5 h-4.5" />
                              Compute Match Score
                            </>
                          )}
                        </button>
                      </div>

                      {/* Match results dashboard */}
                      {jobMatchResult && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-6 bg-slate-50/50 dark:bg-slate-900/30 border border-slate-200/50 dark:border-slate-800/50 rounded-3xl space-y-6"
                        >
                          
                          {/* Match score bar */}
                          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div>
                              <h4 className="font-display font-extrabold text-base text-slate-800 dark:text-white">
                                JD Match Accuracy
                              </h4>
                              <p className="text-[11px] text-slate-400 font-medium">
                                Based on keywords intersection with the target description.
                              </p>
                            </div>
                            
                            <div className="flex items-center gap-3">
                              <span className={`text-4xl font-black font-display ${
                                jobMatchResult.matchScore >= 85 ? "text-emerald-500" : jobMatchResult.matchScore >= 65 ? "text-amber-500" : "text-rose-500"
                              }`}>
                                {jobMatchResult.matchScore}%
                              </span>
                              <span className={`px-2.5 py-0.5 rounded-lg text-[9px] font-extrabold uppercase tracking-wider ${
                                jobMatchResult.matchScore >= 85 ? "bg-emerald-500/10 text-emerald-500" : jobMatchResult.matchScore >= 65 ? "bg-amber-500/10 text-amber-500" : "bg-rose-500/10 text-rose-500"
                              }`}>
                                {jobMatchResult.matchScore >= 85 ? "Strong Match" : jobMatchResult.matchScore >= 65 ? "Modest Fit" : "Low Alignment"}
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-bordercolor-light dark:border-bordercolor-dark">
                            
                            {/* Matched list */}
                            <div className="space-y-3">
                              <h5 className="text-xs font-bold text-emerald-500 uppercase tracking-wide flex items-center gap-1.5">
                                <Check className="w-4 h-4" /> Matched Keywords ({jobMatchResult.matchedKeywords.length})
                              </h5>
                              {jobMatchResult.matchedKeywords.length === 0 ? (
                                <p className="text-[11px] text-slate-400">No matching keyword intersections.</p>
                              ) : (
                                <div className="flex flex-wrap gap-2">
                                  {jobMatchResult.matchedKeywords.map((kw, i) => (
                                    <span key={i} className="px-2.5 py-1 text-[10px] font-bold font-mono bg-emerald-500/5 border border-emerald-500/15 text-emerald-500 rounded-lg">
                                      {kw}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* Missing list */}
                            <div className="space-y-3">
                              <h5 className="text-xs font-bold text-rose-500 uppercase tracking-wide flex items-center gap-1.5">
                                <X className="w-4 h-4" /> Missing Keywords ({jobMatchResult.missingKeywords.length})
                              </h5>
                              {jobMatchResult.missingKeywords.length === 0 ? (
                                <p className="text-[11px] text-slate-400">All keywords matched!</p>
                              ) : (
                                <div className="flex flex-wrap gap-2">
                                  {jobMatchResult.missingKeywords.map((kw, i) => (
                                    <span key={i} className="px-2.5 py-1 text-[10px] font-bold font-mono bg-rose-500/5 border border-rose-500/15 text-rose-500 rounded-lg">
                                      {kw}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>

                          </div>

                          {/* Matching tips */}
                          {jobMatchResult.recommendations.length > 0 && (
                            <div className="pt-4 border-t border-bordercolor-light dark:border-bordercolor-dark">
                              <h5 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wide mb-2.5">
                                Matching Recommendations
                              </h5>
                              <ul className="space-y-2">
                                {jobMatchResult.recommendations.map((rec, i) => (
                                  <li key={i} className="text-xs text-slate-600 dark:text-slate-400 leading-normal flex items-start gap-2">
                                    <span className="text-primary font-bold shrink-0">•</span>
                                    <span>{rec}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                        </motion.div>
                      )}
                    </div>
                  )}

                </div>

                {/* Reset Action */}
                <div className="text-center mt-8 pt-6 border-t border-bordercolor-light dark:border-bordercolor-dark">
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-bordercolor-light dark:border-bordercolor-dark rounded-xl text-xs font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset Analyzer
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </InteractiveCard>
      </div>
    </SectionWrapper>
  );
}
