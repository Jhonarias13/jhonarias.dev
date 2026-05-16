"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ParticleField from "@/components/ParticleField";

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [activeSection, setActiveSection] = useState("");
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  useEffect(() => {
    // Scrollspy — keeps nav dots in sync
    const scrollspy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3, rootMargin: "0px 0px -20% 0px" }
    );

    // Reveal — fires once per section, only when scrolling down into view.
    // requestAnimationFrame garantiza que el browser ya pintó el estado inicial
    // (opacity:0) antes de añadir la clase que dispara la animación.
    const reveal = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal.unobserve(entry.target);
            requestAnimationFrame(() => {
              entry.target.classList.add("section-revealed");
            });
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );

    sectionsRef.current.forEach((section) => {
      if (section) {
        scrollspy.observe(section);
        reveal.observe(section);
      }
    });

    return () => {
      scrollspy.disconnect();
      reveal.disconnect();
    };
  }, []);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className="min-h-screen bg-background text-foreground relative" style={{ zIndex: 2, position: "relative" }}>
      <ParticleField />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Jhon Freiman Arias",
            url: "https://jhonarias.dev",
            sameAs: [
              "https://github.com/Jhonarias13",
              "https://www.linkedin.com/in/jhon-freiman-arias-b87021125/",
            ],
            jobTitle: "Full-Stack Developer",
            worksFor: {
              "@type": "Organization",
              name: "Pharmarket AI",
              url: "https://pharmarket.co",
            },
          }),
        }}
      />

      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <div className="flex flex-col gap-4">
          {["intro", "work", "thoughts", "connect"].map((section) => (
            <button
              key={section}
              onClick={() =>
                document
                  .getElementById(section)
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className={`w-2 h-8 rounded-full transition-all duration-500 ${
                activeSection === section
                  ? "bg-foreground"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              aria-label={`Navigate to ${section}`}
            />
          ))}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16" style={{ position: "relative", zIndex: 2 }}>
        {/* ── INTRO ─────────────────────────────────────────── */}
        <header
          id="intro"
          ref={(el) => { sectionsRef.current[0] = el; }}
          className="min-h-screen flex items-center"
        >
          <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full">
            <div className="lg:col-span-3 space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-2">
                <div
                  className="text-sm text-muted-foreground font-mono tracking-wider reveal-el"
                  style={{ animationDelay: "0ms" }}
                >
                  PORTFOLIO / {new Date().getFullYear()}
                </div>

                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
                  <span className="inline-block overflow-hidden align-bottom">
                    <span className="reveal-word" style={{ animationDelay: "80ms" }}>
                      Jhon
                    </span>
                  </span>
                  <br />
                  <span className="text-muted-foreground">
                    <span className="inline-block overflow-hidden align-bottom">
                      <span className="reveal-word" style={{ animationDelay: "180ms" }}>
                        Freiman
                      </span>
                    </span>
                    {" "}
                    <span className="inline-block overflow-hidden align-bottom">
                      <span className="reveal-word" style={{ animationDelay: "270ms" }}>
                        Arias
                      </span>
                    </span>
                  </span>
                </h1>
              </div>

              <div className="space-y-6 max-w-md">
                <p
                  className="text-lg sm:text-xl text-muted-foreground leading-relaxed reveal-el"
                  style={{ animationDelay: "380ms" }}
                >
                  Full-Stack Developer shaping digital solutions at the
                  crossroads of
                  <span className="text-foreground"> technology</span>,
                  <span className="text-foreground"> product</span>, and
                  <span className="text-foreground"> user needs</span>.
                </p>

                <div
                  className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground reveal-el"
                  style={{ animationDelay: "480ms" }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Available for work
                  </div>
                  <div>Sabaneta, Antioquia, Colombia</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0">
              <div
                className="space-y-4 reveal-el"
                style={{ animationDelay: "300ms" }}
              >
                <div className="text-sm text-muted-foreground font-mono">
                  CURRENTLY
                </div>
                <div className="space-y-2">
                  <div className="text-foreground">Software Engineer</div>
                  <a
                    href="https://pharmarket.co"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:underline hover:text-foreground transition-colors duration-200"
                  >
                    @ Pharmarket AI
                  </a>
                  <div className="text-xs text-muted-foreground">
                    2021 — Present
                  </div>
                </div>
              </div>

              <div
                className="space-y-4 reveal-el"
                style={{ animationDelay: "420ms" }}
              >
                <div className="text-sm text-muted-foreground font-mono">
                  FOCUS
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Web Solutions", "AI Solutions", "Automations", "AI Agents"].map(
                    (skill, i) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300 reveal-el"
                        style={{ animationDelay: `${480 + i * 60}ms` }}
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ── WORK ──────────────────────────────────────────── */}
        <section
          id="work"
          ref={(el) => { sectionsRef.current[1] = el; }}
          className="min-h-screen py-20 sm:py-32"
        >
          <div className="space-y-12 sm:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-light">
                <span className="inline-block overflow-hidden align-bottom">
                  <span className="reveal-word" style={{ animationDelay: "0ms" }}>
                    Selected
                  </span>
                </span>
                {" "}
                <span className="inline-block overflow-hidden align-bottom">
                  <span className="reveal-word" style={{ animationDelay: "100ms" }}>
                    Work
                  </span>
                </span>
              </h2>
              <div
                className="text-sm text-muted-foreground font-mono reveal-el"
                style={{ animationDelay: "180ms" }}
              >
                2021 — 2025
              </div>
            </div>

            <div className="space-y-8 sm:space-y-12">
              {[
                {
                  year: "2025",
                  role: "Engineer — Advanced AI Integrations",
                  company: "Freelance / R&D",
                  description:
                    "Developed call agents with ElevenLabs, multimodal agentic applications, and advanced RAG systems for production use.",
                  tech: ["ElevenLabs", "Multimodal AI", "RAG", "Agents"],
                },
                {
                  year: "2024",
                  role: "Automation & Backend Engineer",
                  company: "Freelance",
                  description:
                    "Built workflow automations with n8n and backends in Python FastAPI, streamlining data and service orchestration.",
                  tech: ["n8n", "Python", "FastAPI"],
                },
                {
                  year: "2023",
                  role: "Web & Bot Developer",
                  company: "Freelance",
                  description:
                    "Created web pages and bots leveraging Next.js, TypeScript, and Node.js for diverse clients.",
                  tech: ["Next.js", "TypeScript", "Node.js"],
                },
                {
                  year: "2021 — Present",
                  role: "Software Engineer",
                  company: "Pharmarket AI SAS",
                  description:
                    "Contributed across full stack, leading product features for pharmaceutical workflows, integrating AI, and supporting scalable architectures.",
                  tech: ["React", "Next.js", "Node.js", "MongoDB", "AWS"],
                },
              ].map((job, index) => (
                <div
                  key={index}
                  className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border/50 hover:border-border transition-colors duration-500 reveal-el"
                  style={{ animationDelay: `${260 + index * 110}ms` }}
                >
                  <div className="lg:col-span-2">
                    <div className="text-xl sm:text-2xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                      {job.year}
                    </div>
                  </div>
                  <div className="lg:col-span-6 space-y-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-medium">{job.role}</h3>
                      <div className="text-muted-foreground">{job.company}</div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed max-w-lg">
                      {job.description}
                    </p>
                  </div>
                  <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end mt-2 lg:mt-0">
                    {job.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs text-muted-foreground rounded group-hover:border-muted-foreground/50 transition-colors duration-500"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONNECT ───────────────────────────────────────── */}
        <section
          id="connect"
          ref={(el) => { sectionsRef.current[3] = el; }}
          className="py-20 sm:py-32"
        >
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl font-light">
                <span className="inline-block overflow-hidden align-bottom">
                  <span className="reveal-word" style={{ animationDelay: "0ms" }}>
                    Let&apos;s
                  </span>
                </span>
                {" "}
                <span className="inline-block overflow-hidden align-bottom">
                  <span className="reveal-word" style={{ animationDelay: "100ms" }}>
                    Connect
                  </span>
                </span>
              </h2>

              <div className="space-y-6">
                <p
                  className="text-lg sm:text-xl text-muted-foreground leading-relaxed reveal-el"
                  style={{ animationDelay: "180ms" }}
                >
                  Always interested in new opportunities, collaborations, and
                  conversations about technology and design.
                </p>

                <div className="space-y-4">
                  <Link
                    href="mailto:jhonarias1322@gmail.com"
                    className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300 reveal-el"
                    style={{ animationDelay: "260ms" }}
                  >
                    <span className="text-base sm:text-lg">
                      jhonarias1322@gmail.com
                    </span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                  <Link
                    href="https://wa.me/573002419602?text=Hello, I saw your portfolio and I'm interested in working with you"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 text-foreground hover:text-green-600 transition-colors duration-300 reveal-el"
                    style={{ animationDelay: "340ms" }}
                  >
                    <span className="text-base sm:text-lg">
                      Let&apos;s talk: +57 300 241 9602
                    </span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div
                className="text-sm text-muted-foreground font-mono reveal-el"
                style={{ animationDelay: "120ms" }}
              >
                ELSEWHERE
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    name: "GitHub",
                    handle: "@jhonfreimanarias",
                    url: "https://github.com/Jhonarias13",
                  },
                  { name: "v0.dev", handle: "@jhonfreimanarias", url: "#" },
                  {
                    name: "HubSpot Community",
                    handle: "@jhonfreimanarias",
                    url: "#",
                  },
                  {
                    name: "LinkedIn",
                    handle: "Jhon Freiman Arias",
                    url: "https://www.linkedin.com/in/jhon-freiman-arias-b87021125/",
                  },
                ].map((social, i) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm reveal-el"
                    style={{ animationDelay: `${200 + i * 80}ms` }}
                  >
                    <div className="space-y-2">
                      <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                        {social.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {social.handle}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="py-12 sm:py-16 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Jhon Freiman Arias. All rights reserved.
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>

              <button className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300">
                <svg
                  className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </footer>
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" style={{ zIndex: 3 }} />
    </div>
  );
}
