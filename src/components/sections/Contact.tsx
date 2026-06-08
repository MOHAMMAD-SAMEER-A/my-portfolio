"use client";

import React, { useState, useRef, useCallback } from "react";
import SectionWrapper from "@/components/SectionWrapper";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Send, CheckCircle2, Github, Linkedin, Loader2, AlertCircle, Phone, ExternalLink } from "lucide-react";
import emailjs from "@emailjs/browser";
import InteractiveCard from "@/components/InteractiveCard";

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

const isEmailJSConfigured = !!(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY);

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required.";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus("submitting");

    if (isEmailJSConfigured) {
      try {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            name: formData.name.trim(),
            email: formData.email.trim(),
            subject: formData.subject.trim(),
            message: formData.message.trim(),
            to_email: "amdsameer92it@gmail.com",
          },
          EMAILJS_PUBLIC_KEY
        );
        setStatus("success");
        setStatusMessage("Message sent successfully. Thank you for contacting Mohammad Sameer.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } catch {
        setStatusMessage("Something went wrong. Please try again.");
        setStatus("error");
      }
    } else {
      // Fallback: open mailto
      const mailtoSubject = encodeURIComponent(formData.subject.trim() || "Portfolio Inquiry");
      const mailtoBody = encodeURIComponent(
        `Name: ${formData.name.trim()}\nEmail: ${formData.email.trim()}\n\n${formData.message.trim()}`
      );
      window.open(
        `mailto:amdsameer92it@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`,
        "_self"
      );
      setStatus("success");
      setStatusMessage("Your message has been sent successfully.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }
  };

  return (
    <SectionWrapper id="contact" className="bg-slate-50/50 dark:bg-slate-900/10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary dark:text-secondary dark:border-secondary/20 dark:bg-secondary/5 text-xs font-semibold uppercase tracking-wider mb-3">
            <Mail className="w-3 h-3" /> Contact
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl tracking-tight mb-4">
            Get In Touch
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            Have an internship opportunity, a project collaboration, or just want to say hello? Drop me a message!
          </p>
          <div className="h-1 w-12 bg-primary dark:bg-secondary mx-auto rounded mt-4" />
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-6xl mx-auto">
          
          {/* Contact Details (Left Column) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-2xl text-slate-800 dark:text-white mb-6">
                Contact Information
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed mb-8">
                Feel free to reach out to me through the form or via my social profiles. I am always open to discussing new opportunities, creative ideas, or engineering challenges.
              </p>

              {/* Direct Info Cards */}
              <div className="space-y-4">
                
                {/* Email Card */}
                <InteractiveCard
                  as="a"
                  href="mailto:amdsameer92it@gmail.com"
                  className="glass-panel p-5 rounded-2xl border border-bordercolor-light dark:border-bordercolor-dark shadow-sm hover:border-primary/20 dark:hover:border-secondary/20 transition-all flex items-center gap-4 group"
                >
                  <div className="p-3 bg-primary/10 text-primary dark:bg-secondary/15 dark:text-secondary rounded-xl shrink-0 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      Email Me
                    </h4>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 break-all">
                      amdsameer92it@gmail.com
                    </span>
                  </div>
                </InteractiveCard>

                {/* Phone Card */}
                <InteractiveCard
                  className="glass-panel p-5 rounded-2xl border border-bordercolor-light dark:border-bordercolor-dark shadow-sm hover:border-primary/20 dark:hover:border-secondary/20 transition-all flex items-center gap-4 group"
                >
                  <div className="p-3 bg-primary/10 text-primary dark:bg-secondary/15 dark:text-secondary rounded-xl shrink-0 group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      Phone
                    </h4>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      Available on request
                    </span>
                  </div>
                </InteractiveCard>

                {/* Location Card */}
                <InteractiveCard
                  className="glass-panel p-5 rounded-2xl border border-bordercolor-light dark:border-bordercolor-dark shadow-sm flex items-center gap-4"
                >
                  <div className="p-3 bg-primary/10 text-primary dark:bg-secondary/15 dark:text-secondary rounded-xl shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      Location
                    </h4>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      Madurai / Karur, Tamil Nadu, India
                    </span>
                  </div>
                </InteractiveCard>

              </div>

              {/* Email Me Directly Button — uses onClick for reliable mailto opening */}
              <button
                onClick={() => {
                  window.location.href = 'mailto:amdsameer92it@gmail.com?subject=Portfolio%20Inquiry';
                }}
                className="magnetic-btn mt-6 w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-primary/20 border-0 cursor-pointer"
              >
                📧 Email Me Directly
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              {/* Trust Text */}
              <p className="mt-4 text-xs text-slate-400 dark:text-slate-500 leading-relaxed text-center">
                Feel free to reach out for internships, collaborations, projects, or networking opportunities.
              </p>
            </div>

            {/* Social Connect Links */}
            <div className="mt-10 lg:mt-0">
              <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">
                Connect on Socials
              </h4>
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/MOHAMMAD-SAMEER-A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-full border border-bordercolor-light dark:border-bordercolor-dark bg-white/50 dark:bg-slate-900/50 hover:bg-primary hover:text-white dark:hover:bg-secondary dark:hover:text-black text-slate-600 dark:text-slate-300 transition-colors shadow-sm"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/mohammad-sameer-a-653b30379/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-full border border-bordercolor-light dark:border-bordercolor-dark bg-white/50 dark:bg-slate-900/50 hover:bg-primary hover:text-white dark:hover:bg-secondary dark:hover:text-black text-slate-600 dark:text-slate-300 transition-colors shadow-sm"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form (Right Column) */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 md:p-10 rounded-3xl border border-bordercolor-light dark:border-bordercolor-dark shadow-md h-full relative overflow-hidden flex flex-col justify-center">
              
              {/* Form Radial Background Blur */}
              <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-primary/5 dark:bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center py-12 flex flex-col items-center justify-center"
                  >
                    <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-6 border border-green-500/20">
                      <CheckCircle2 className="w-8 h-8 animate-bounce" />
                    </div>
                    <h3 className="font-display font-extrabold text-2xl text-slate-800 dark:text-white mb-3">
                      Message Sent!
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed mb-8 text-sm md:text-base">
                      {statusMessage}
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="px-6 py-2.5 bg-primary text-white dark:bg-white dark:text-slate-900 font-semibold rounded-xl text-sm hover:opacity-90 transition-opacity"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    ref={formRef}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5 relative z-10"
                    noValidate
                  >
                    {/* Error Box */}
                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-xl flex items-center gap-3 text-sm"
                      >
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <span>{statusMessage}</span>
                      </motion.div>
                    )}

                    {/* Grid Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="name" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`px-4 py-3 rounded-xl border ${errors.name ? "border-red-400 dark:border-red-500" : "border-bordercolor-light dark:border-bordercolor-dark"} bg-white/50 dark:bg-slate-950/50 text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-secondary focus:border-transparent transition-all`}
                          placeholder="John Doe"
                        />
                        {errors.name && (
                          <span className="text-xs text-red-500 font-medium">{errors.name}</span>
                        )}
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`px-4 py-3 rounded-xl border ${errors.email ? "border-red-400 dark:border-red-500" : "border-bordercolor-light dark:border-bordercolor-dark"} bg-white/50 dark:bg-slate-950/50 text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-secondary focus:border-transparent transition-all`}
                          placeholder="john@example.com"
                        />
                        {errors.email && (
                          <span className="text-xs text-red-500 font-medium">{errors.email}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="subject" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`px-4 py-3 rounded-xl border ${errors.subject ? "border-red-400 dark:border-red-500" : "border-bordercolor-light dark:border-bordercolor-dark"} bg-white/50 dark:bg-slate-950/50 text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-secondary focus:border-transparent transition-all`}
                        placeholder="Collaboration / Internship Opportunity"
                      />
                      {errors.subject && (
                        <span className="text-xs text-red-500 font-medium">{errors.subject}</span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="message" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className={`px-4 py-3 rounded-xl border ${errors.message ? "border-red-400 dark:border-red-500" : "border-bordercolor-light dark:border-bordercolor-dark"} bg-white/50 dark:bg-slate-950/50 text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-secondary focus:border-transparent transition-all resize-none`}
                        placeholder="Hi Sameer, I'd like to talk about..."
                      />
                      {errors.message && (
                        <span className="text-xs text-red-500 font-medium">{errors.message}</span>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="magnetic-btn w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-white hover:bg-primary-dark rounded-xl font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/35 transition-all text-sm group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          Send Message
                        </>
                      )}
                    </button>

                    {/* EmailJS info */}
                    {!isEmailJSConfigured && (
                      <p className="text-[10px] text-slate-400 dark:text-slate-600 text-center">
                        Email service not configured — form will open your email client.
                      </p>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </SectionWrapper>
  );
}
