"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles, User, Code, Briefcase, GraduationCap } from "lucide-react";

type Message = {
  id: string;
  sender: "user" | "jarvis";
  text: string;
};

const KNOWLEDGE_BASE = {
  about: "Mohammad Sameer A is a Software Developer and B.Tech IT student at V.S.B. Engineering College (Graduating 2029). He has an 8.19 CGPA in his first semester and is passionate about building practical software solutions.",
  skills: "His core skills include Java, Python, JavaScript, React, Node.js, HTML/CSS, MySQL, and tools like Git, VS Code, and GCP.",
  experience: "He recently worked as a Java Developer Intern at AXCENTRA (April - May 2026), where he applied Java fundamentals, OOP, and completed a capstone project.",
  projects: "His featured project is 'Helpful-Hearts-AI', a Smart Community Help Hub built with React, TypeScript, Tailwind CSS, and Supabase (PLpgSQL).",
  education: "He is pursuing a B.Tech in IT at V.S.B. Engineering College. He previously studied at The TVS School (Class XII) and Little Diamonds Matriculation High School (Class X).",
  certifications: "He holds certifications in OOP (NPTEL), Python Foundation (Infosys Springboard), and is a Gemini Certified Student (Google for Education).",
  contact: "You can reach him at amdsameer92it@gmail.com or connect on LinkedIn and GitHub.",
};

const QUICK_ACTIONS = [
  { label: "About", icon: <User className="w-3 h-3" />, query: "Tell me about Sameer." },
  { label: "Skills", icon: <Code className="w-3 h-3" />, query: "What are his technical skills?" },
  { label: "Experience", icon: <Briefcase className="w-3 h-3" />, query: "Tell me about his internship." },
  { label: "Education", icon: <GraduationCap className="w-3 h-3" />, query: "What is his educational background?" },
];

export default function JarvisAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "jarvis",
      text: "Hello. I am the SameerOS Assistant. How can I help you learn more about Mohammad Sameer A?",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    // Simple keyword matching for Jarvis response
    setTimeout(() => {
      const lower = text.toLowerCase();
      let response = "I don't have specific details on that, but you can check his portfolio sections or contact him directly at amdsameer92it@gmail.com.";

      if (lower.includes("about") || lower.includes("who")) {
        response = KNOWLEDGE_BASE.about;
      } else if (lower.includes("skill") || lower.includes("tech") || lower.includes("stack") || lower.includes("language")) {
        response = KNOWLEDGE_BASE.skills;
      } else if (lower.includes("experience") || lower.includes("intern") || lower.includes("work")) {
        response = KNOWLEDGE_BASE.experience;
      } else if (lower.includes("project") || lower.includes("helpful") || lower.includes("build")) {
        response = KNOWLEDGE_BASE.projects;
      } else if (lower.includes("education") || lower.includes("college") || lower.includes("study") || lower.includes("school")) {
        response = KNOWLEDGE_BASE.education;
      } else if (lower.includes("cert") || lower.includes("nptel") || lower.includes("infosys") || lower.includes("google")) {
        response = KNOWLEDGE_BASE.certifications;
      } else if (lower.includes("contact") || lower.includes("email") || lower.includes("hire") || lower.includes("reach")) {
        response = KNOWLEDGE_BASE.contact;
      }

      const jarvisMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "jarvis",
        text: response,
      };

      setMessages((prev) => [...prev, jarvisMsg]);
      setIsTyping(false);
    }, 1000); // 1s typing delay
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed top-24 right-6 sm:right-8 z-50 w-14 h-14 flex items-center justify-center rounded-full shadow-[0_0_20px_rgba(37,99,235,0.3)] bg-gradient-to-r from-primary to-secondary text-white border-2 border-white/20 hover:shadow-[0_0_25px_rgba(56,189,248,0.5)] transition-all group"
            aria-label="Open AI Assistant"
          >
            <Bot className="w-6 h-6 group-hover:animate-pulse" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900 animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>
 
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed top-24 right-6 sm:right-8 z-50 w-[90vw] sm:w-[380px] h-[550px] max-h-[75vh] flex flex-col rounded-3xl overflow-hidden glass-panel border border-bordercolor-light dark:border-bordercolor-dark shadow-2xl bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 border-b border-bordercolor-light dark:border-bordercolor-dark">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center p-1.5 shadow-inner">
                  <Bot className="w-full h-full text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-800 dark:text-white flex items-center gap-1.5">
                    SameerOS Assistant
                    <Sparkles className="w-3 h-3 text-secondary" />
                  </h3>
                  <div className="text-[10px] text-green-500 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    Online
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${
                      msg.sender === "user"
                        ? "bg-primary text-white rounded-br-sm"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-sm border border-slate-200 dark:border-slate-700"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] p-3 rounded-2xl rounded-bl-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length < 3 && !isTyping && (
              <div className="px-4 pb-2">
                <div className="flex flex-wrap gap-2">
                  {QUICK_ACTIONS.map((action, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(action.query)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors border border-slate-200 dark:border-slate-700"
                    >
                      {action.icon}
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-3 bg-white dark:bg-slate-950 border-t border-bordercolor-light dark:border-bordercolor-dark">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(inputText);
                }}
                className="relative flex items-center"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ask me anything..."
                  className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-800 dark:text-white placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim() || isTyping}
                  className="absolute right-1.5 p-1.5 bg-primary text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-dark transition-colors"
                >
                  <Send className="w-3.5 h-3.5 ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
