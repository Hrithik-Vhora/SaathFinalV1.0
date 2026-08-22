import { useState, useEffect } from "react"

// ─── Asset imports (required for production build) ────────────────────────────
import imgTeam      from "./imports/IMG_5056.jpeg"
import imgFounders  from "./imports/IMG_5077.jpeg"
import imgSession1  from "./imports/c3e9d1a2-a873-46df-a8e8-12bf539bc94a.jpeg"
import imgSession2  from "./imports/80f95404-b03f-4e27-931d-26ef5e6bf1f5.jpeg"

import pdfCampaign1    from "./imports/Campaign_1_Report.pdf"
import pdfMasterPlan   from "./imports/Saath_Lesson_Plan.pdf"
import pdfLegal        from "./imports/Legal_literacy__rhythm_.pdf"
import pdfFinancial    from "./imports/Lesson_Plan_financial_literacy__jay.pdf"
import pdfDigital      from "./imports/Lesson_plan_digital_literacy__Hrithik.pdf"
import pdfEnvironment  from "./imports/2._Sustainanility_block_1_lesson_plan.pdf"

type Page = "home" | "teach" | "impact" | "docs" | "about"

// ─── Brand Tokens ─────────────────────────────────────────────────────────────
const C = {
  cream:  "#F4EAD8",
  space:  "#25344F",
  slate:  "#617891",
  tan:    "#D5B893",
  coffee: "#6F4D38",
  caput:  "#632024",
} as const

// ─── SVG Collage Atoms ────────────────────────────────────────────────────────

function TornEdge({ fill = C.cream, flip = false }: { fill?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 52"
      preserveAspectRatio="none"
      style={{ display: "block", width: "100%", height: 48, transform: flip ? "scaleY(-1)" : undefined }}
    >
      <path
        d="M0,52 L0,24 Q72,4 148,20 Q234,38 318,12 Q402,0 480,16 Q556,30 634,8 Q714,0 796,14 Q874,26 954,6 Q1034,0 1112,13 Q1192,24 1268,6 Q1348,0 1400,18 L1440,10 L1440,52 Z"
        fill={fill}
      />
    </svg>
  )
}

function HandCircle({ label }: { label: string }) {
  return (
    <span className="relative inline-flex items-center justify-center w-20 h-10">
      <svg viewBox="0 0 80 40" fill="none" className="absolute inset-0 w-full h-full">
        <ellipse cx="40" cy="20" rx="36" ry="16" stroke={C.space} strokeWidth="1.4" strokeDasharray="3.5 2" />
      </svg>
      <span style={{ fontSize: 9, letterSpacing: "0.18em", color: C.space }} className="uppercase font-semibold relative">
        {label}
      </span>
    </span>
  )
}

function GridPaper({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
      {[10,20,30,40,50,60,70,80,90].map(n => (
        <line key={`h${n}`} x1="0" y1={n} x2="100" y2={n} stroke="currentColor" strokeWidth="0.7" />
      ))}
      {[10,20,30,40,50,60,70,80,90].map(n => (
        <line key={`v${n}`} x1={n} y1="0" x2={n} y2="100" stroke="currentColor" strokeWidth="0.7" />
      ))}
    </svg>
  )
}

function Tape({ className }: { className?: string }) {
  return (
    <div
      className={`absolute ${className}`}
      style={{ backgroundColor: `${C.slate}38`, backdropFilter: "blur(1px)" }}
    />
  )
}

function CurvedArrow({ color = C.caput, className }: { color?: string; className?: string }) {
  return (
    <svg className={className} width="60" height="40" viewBox="0 0 60 40" fill="none">
      <path d="M6,22 Q22,6 52,16" stroke={color} strokeWidth="1.7" strokeLinecap="round" fill="none" />
      <path d="M46,9 L52,16 L44,20" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function RoughUnderline({ color = C.space, className }: { color?: string; className?: string }) {
  return (
    <svg className={`w-full ${className}`} height="5" viewBox="0 0 200 5" preserveAspectRatio="none" fill="none">
      <path d="M0,3 Q50,1 100,3.5 Q150,5 200,2" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

// ─── Navigation ───────────────────────────────────────────────────────────────

function Nav({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  const [open, setOpen] = useState(false)

  const links: { label: string; page: Page }[] = [
    { label: "HOME", page: "home" },
    { label: "WHAT WE TEACH", page: "teach" },
    { label: "OUR IMPACT", page: "impact" },
    { label: "DOCUMENTATION", page: "docs" },
  ]

  const go = (p: Page) => { setPage(p); setOpen(false) }

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: C.space,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-14">
        <div className="flex items-center justify-between h-[60px]">
          <button
            onClick={() => go("home")}
            className="font-display font-black uppercase tracking-[0.2em] transition-colors duration-200"
            style={{ fontSize: 18, color: C.tan }}
          >
            SAATH
          </button>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-9">
            {links.map(l => (
              <button
                key={l.page}
                onClick={() => go(l.page)}
                className="relative transition-colors duration-200"
                style={{
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  color: page === l.page ? C.tan : "rgba(255,255,255,0.55)",
                  fontFamily: "inherit",
                  textTransform: "uppercase",
                  fontWeight: 500,
                }}
              >
                {l.label}
                {page === l.page && (
                  <RoughUnderline color={C.tan} className="mt-0.5 absolute -bottom-1 left-0" />
                )}
              </button>
            ))}
          </div>

          {/* Mobile */}
          <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
            <span className="flex flex-col gap-[5px]">
              <span className="block w-5 h-[1.5px] bg-white transition-transform" style={{ transform: open ? "rotate(45deg) translateY(6.5px)" : undefined }} />
              <span className="block w-5 h-[1.5px] bg-white transition-opacity" style={{ opacity: open ? 0 : 1 }} />
              <span className="block w-5 h-[1.5px] bg-white transition-transform" style={{ transform: open ? "rotate(-45deg) translateY(-6.5px)" : undefined }} />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden px-6 pb-6 pt-2 space-y-1" style={{ borderTop: `1px solid rgba(255,255,255,0.08)` }}>
          {links.map(l => (
            <button
              key={l.page}
              onClick={() => go(l.page)}
              className="block w-full text-left py-3"
              style={{
                fontSize: 10,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                fontWeight: 500,
                color: page === l.page ? C.tan : "rgba(255,255,255,0.5)",
              }}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}

// ─── Home Page ────────────────────────────────────────────────────────────────

// ─── About Saath Page ─────────────────────────────────────────────────────────

function AboutPage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundColor: "#F0E8D8",
        backgroundImage: `
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")
        `,
        fontFamily: "'Playfair Display', serif",
      }}
    >
      {/* Subtle paper crease lines via pseudo-layer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              179deg,
              transparent,
              transparent 120px,
              rgba(37,52,79,0.018) 120px,
              rgba(37,52,79,0.018) 121px
            ),
            repeating-linear-gradient(
              91deg,
              transparent,
              transparent 200px,
              rgba(37,52,79,0.012) 200px,
              rgba(37,52,79,0.012) 201px
            )
          `,
        }}
      />

      {/* Back link */}
      <div className="relative px-8 lg:px-20 pt-[76px] pb-0">
        <button
          onClick={() => setPage("home")}
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 500,
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: `${C.space}70`,
            borderTop: "none",
            borderLeft: "none",
            borderRight: "none",
            borderBottom: `1px solid ${C.space}30`,
            paddingBottom: 1,
            background: "none",
            cursor: "pointer",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = C.space }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = `${C.space}70` }}
        >
          ← Back
        </button>
      </div>

      {/* Content */}
      <div className="relative max-w-2xl mx-auto px-8 lg:px-0 py-16 lg:py-24">

        {/* Eyebrow */}
        <div
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 500,
            fontSize: 9,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: `${C.space}55`,
            marginBottom: 32,
          }}
        >
          About — Saath Campaign
        </div>

        {/* Page heading */}
        <h1
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(2.8rem, 8vw, 5rem)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: C.space,
            lineHeight: 0.92,
            marginBottom: 36,
          }}
        >
          About Saath
        </h1>

        {/* Divider */}
        <div style={{ width: 40, height: 2, backgroundColor: C.caput, marginBottom: 36 }} />

        {/* Intro heading */}
        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontWeight: 700,
            fontSize: "clamp(1.25rem, 3.5vw, 1.7rem)",
            color: C.space,
            lineHeight: 1.35,
            marginBottom: 40,
          }}
        >
          The things that matter in life deserve to be taught.
        </p>

        {/* Body paragraphs */}
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          {[
            "Saath is a youth-led initiative built around a simple belief: some of the most important lessons in life should not be left to chance.",
            "Young people grow up making decisions about money, navigating the internet, interacting with laws and institutions, and living with the consequences of environmental change. Yet many students may reach adulthood without ever having had the opportunity to learn these things in a simple, practical and accessible way.",
            "That is the gap Saath hopes to address.",
            "Through interactive learning in Legal Literacy, Financial Studies, Digital Literacy and Environmental Education, we aim to turn information into something young people can actually use.",
            "We want students to understand their rights, recognise risks, make responsible financial decisions, navigate digital spaces safely, understand their relationship with the environment and, most importantly, feel confident asking questions about the world around them.",
            "For us, education is not only about knowing more.",
            "It is about being better prepared for life.",
            "Our goal is not to replace formal education, but to add something valuable to it: practical knowledge, awareness and confidence that students can carry beyond the classroom and into their families and communities.",
          ].map((para, i) => (
            <p
              key={i}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(15px, 2vw, 17px)",
                lineHeight: 1.85,
                color: `${C.space}cc`,
              }}
            >
              {para}
            </p>
          ))}
        </div>

        {/* Closing statement */}
        <div style={{ marginTop: 52, paddingTop: 32, borderTop: `1px solid ${C.space}18` }}>
          <p
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontWeight: 700,
              fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
              color: C.space,
              letterSpacing: "0.01em",
            }}
          >
            Learning for life, not only for the classroom.
          </p>
        </div>

        {/* Bottom breathing room */}
        <div style={{ height: 80 }} />
      </div>
    </div>
  )
}

// ─── Home Page ────────────────────────────────────────────────────────────────

function HomePage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ backgroundColor: C.cream, minHeight: "100svh" }}>



        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 lg:px-14 pt-28 lg:pt-32 pb-0">
          <div className="grid lg:grid-cols-12 gap-0 items-start">

            {/* Typography block */}
            <div className="lg:col-span-6 relative z-10">
              <div className="relative">
                <h1
                  className="font-display font-black uppercase leading-[0.86] tracking-tight select-none"
                  style={{ fontSize: "clamp(6rem, 16vw, 14rem)", color: C.space }}
                >
                  THIS IS
                </h1>
                <h1
                  className="font-serif italic font-bold leading-[0.86] select-none"
                  style={{
                    fontSize: "clamp(5.5rem, 15vw, 13rem)",
                    color: C.space,
                    marginTop: "-0.04em",
                  }}
                >
                  saath.
                </h1>
              </div>

              <div className="mt-8 space-y-0.5">
                <p style={{ fontSize: 18, color: C.space, letterSpacing: "0.04em" }}>practical education.</p>
                <div className="relative inline-block">
                  <p style={{ fontSize: 18, color: C.space, letterSpacing: "0.04em", fontWeight: 600 }}>real impact.</p>
                  <RoughUnderline color={C.space} className="mt-0.5" />
                </div>
              </div>

              <div className="mt-10 flex items-center gap-3">
                <div className="w-6 h-px" style={{ backgroundColor: C.tan }} />
                <span style={{ fontSize: 9, letterSpacing: "0.25em", color: C.slate, textTransform: "uppercase", fontWeight: 500 }}>
                  SAATH INITIATIVE — EST. 2026
                </span>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <button
                  onClick={() => setPage("teach")}
                  className="inline-flex items-center gap-3 px-7 py-4 font-display font-black uppercase tracking-widest transition-all duration-200"
                  style={{ fontSize: 11, backgroundColor: C.space, color: C.cream }}
                  onMouseEnter={e => { const el = e.currentTarget; el.style.backgroundColor = C.caput }}
                  onMouseLeave={e => { const el = e.currentTarget; el.style.backgroundColor = C.space }}
                >
                  WHAT WE TEACH →
                </button>
                <button
                  onClick={() => setPage("impact")}
                  className="inline-flex items-center gap-3 px-7 py-4 font-display font-black uppercase tracking-widest transition-all duration-200"
                  style={{ fontSize: 11, border: `1.5px solid ${C.space}`, color: C.space, backgroundColor: "transparent" }}
                  onMouseEnter={e => { const el = e.currentTarget; el.style.backgroundColor = C.space; el.style.color = C.cream }}
                  onMouseLeave={e => { const el = e.currentTarget; el.style.backgroundColor = "transparent"; el.style.color = C.space }}
                >
                  OUR IMPACT →
                </button>
                <button
                  onClick={() => setPage("docs")}
                  className="inline-flex items-center gap-3 px-7 py-4 font-display font-black uppercase tracking-widest transition-all duration-200"
                  style={{ fontSize: 11, backgroundColor: C.tan, color: C.space }}
                  onMouseEnter={e => { const el = e.currentTarget; el.style.backgroundColor = C.coffee; el.style.color = C.cream }}
                  onMouseLeave={e => { const el = e.currentTarget; el.style.backgroundColor = C.tan; el.style.color = C.space }}
                >
                  DOCUMENTATION →
                </button>
              </div>
            </div>

            {/* Collage image block */}
            <div className="lg:col-span-6 relative mt-12 lg:mt-0 lg:-mr-14 lg:pl-8">
              <div className="relative">
                {/* Tape strips */}
                <Tape className="w-16 h-5 rotate-[-2deg] -top-2 left-[30%] z-20" />
                <Tape className="w-10 h-4 rotate-[3deg] top-8 right-6 z-20" />

                {/* Grid paper texture */}
                <div className="absolute bottom-12 right-4 w-20 h-20 z-10 opacity-25" style={{ color: C.space }}>
                  <GridPaper className="w-full h-full" />
                </div>

                {/* Main photo — torn bottom */}
                <div
                  className="relative overflow-hidden"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 100% 91%, 96% 100%, 86% 95%, 74% 100%, 60% 93%, 46% 100%, 32% 94%, 18% 100%, 6% 95%, 0 100%)",
                    aspectRatio: "4/3.3",
                  }}
                >
                  <img
                    src={imgTeam}
                    alt="Saath Campaign team"
                    className="w-full h-full object-cover"
                    style={{ filter: "grayscale(100%) contrast(1.08)", objectPosition: "center top" }}
                  />
                  <div className="absolute inset-0" style={{ backgroundColor: `${C.space}22` }} />
                </div>

                {/* Meet the team — below the frame */}
                <div className="relative mt-4 ml-3 flex items-start gap-3" style={{ transform: "rotate(-1.5deg)", transformOrigin: "left top" }}>
                  {/* Playful arrow pointing up */}
                  <svg
                    viewBox="0 0 48 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ width: "clamp(28px, 4vw, 42px)", flexShrink: 0, marginTop: 6, color: C.caput }}
                  >
                    {/* Wobbly curved shaft */}
                    <path
                      d="M24 76 C20 60, 30 48, 22 34 C16 22, 28 10, 24 4"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      fill="none"
                      strokeDasharray="0"
                    />
                    {/* Arrowhead — hand-drawn open style */}
                    <path
                      d="M24 4 C18 9, 12 11, 10 16"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <path
                      d="M24 4 C30 9, 36 10, 38 15"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      fill="none"
                    />
                    {/* Small decorative dot at tail */}
                    <circle cx="24" cy="78" r="2.5" fill="currentColor" opacity="0.6" />
                  </svg>

                  <div style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    fontStyle: "italic",
                    fontSize: "clamp(22px, 4.5vw, 38px)",
                    letterSpacing: "0.01em",
                    color: C.space,
                    lineHeight: 1.1,
                  }}>
                    Meet the team
                  </div>
                </div>

                {/* Founders Polaroid — layered over upper portion of large photo */}
                <div
                  className="absolute z-30 bg-white shadow-2xl"
                  style={{
                    top: "8%",
                    right: "-6%",
                    width: "clamp(90px, 15vw, 155px)",
                    padding: "clamp(5px, 1vw, 9px)",
                    paddingBottom: "clamp(22px, 4vw, 36px)",
                    transform: "rotate(-4deg)",
                    boxShadow: "2px 4px 18px rgba(0,0,0,0.32), 0 1px 3px rgba(0,0,0,0.18)",
                  }}
                >
                  <img
                    src={imgFounders}
                    alt="The Founders"
                    className="w-full object-cover"
                    style={{ filter: "grayscale(100%) contrast(1.05)", display: "block", aspectRatio: "1/1.05", objectFit: "cover", objectPosition: "center top" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      paddingBottom: "clamp(5px, 1vw, 9px)",
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 600,
                      fontSize: "clamp(6px, 1.1vw, 10px)",
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: C.slate,
                    }}
                  >
                    The Founders
                  </div>
                </div>

                {/* Caput block accent */}
                <div
                  className="absolute -top-4 -right-4 w-20 h-20 z-0"
                  style={{ backgroundColor: C.tan, opacity: 0.25 }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Torn paper transition to next section */}
        <div className="mt-20 relative z-10" style={{ backgroundColor: C.space }}>
          <TornEdge fill={C.cream} />
        </div>
      </section>

      {/* ── WHAT IS SAATH ── */}
      <section className="py-24 lg:py-36" style={{ backgroundColor: C.space }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-14">

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-28 items-start">
            <div>
              <h2
                className="font-display font-black uppercase leading-none"
                style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)", color: C.cream }}
              >
                WHAT IS<br />SAATH?
              </h2>
              <div className="mt-5 w-10 h-px" style={{ backgroundColor: C.tan }} />

              <div className="mt-10">
                {["education", "that goes", "beyond"].map(w => (
                  <p
                    key={w}
                    className="font-serif italic font-medium leading-tight"
                    style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", color: C.cream }}
                  >
                    {w}
                  </p>
                ))}
                <p
                  className="font-display font-black uppercase leading-tight"
                  style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", color: C.tan }}
                >
                  the classroom.
                </p>
              </div>
            </div>

            <div className="lg:pt-24 relative">
              <p style={{ fontSize: 17, lineHeight: 1.75, color: `${C.cream}cc` }}>
                The Saath Campaign is a student-led initiative working to provide underprivileged children with practical education and essential life skills that can help them navigate their futures with greater confidence.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.75, color: `${C.cream}cc`, marginTop: 20 }}>
                {"We're just a bunch of teenagers who got tired of staying quiet — so we made saath. For the gaps people learn to live with. For the conversations people avoid."}
              </p>

              <div className="mt-10 flex items-center gap-4">
                <CurvedArrow color={C.tan} />
                <button
                  onClick={() => setPage("about")}
                  className="font-display font-black uppercase tracking-widest transition-colors duration-200"
                  style={{ fontSize: 11, color: C.tan, borderBottom: `1px solid ${C.tan}60`, paddingBottom: 2 }}
                >
                  READ OUR STORY →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Torn paper back to cream */}
        <div className="mt-24" style={{ backgroundColor: C.cream }}>
          <TornEdge fill={C.space} flip />
        </div>
      </section>

      {/* ── LETTER FROM THE TEAM ── */}
      <section className="py-24 lg:py-36" style={{ backgroundColor: C.cream }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-14">

          <div className="relative">
            {/* Large quotation mark */}
            <div
              className="font-serif select-none pointer-events-none absolute -top-8 -left-4 lg:-left-10 leading-none"
              style={{ fontSize: "clamp(7rem, 16vw, 12rem)", color: `${C.space}12`, lineHeight: 1 }}
            >
              "
            </div>

            {/* Letter card */}
            <div
              className="relative p-10 lg:p-16"
              style={{
                backgroundColor: "white",
                border: `1px solid rgba(37,52,79,0.1)`,
                boxShadow: "4px 6px 0 rgba(37,52,79,0.06)",
              }}
            >
              {/* Corner bracket detail */}
              <div className="absolute top-0 left-0 w-8 h-8" style={{ borderTop: `2px solid ${C.caput}`, borderLeft: `2px solid ${C.caput}` }} />
              <div className="absolute bottom-0 right-0 w-8 h-8" style={{ borderBottom: `2px solid ${C.caput}`, borderRight: `2px solid ${C.caput}` }} />

              <h2
                className="font-display font-black uppercase leading-tight mb-10"
                style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: C.space }}
              >
                A NOTE FROM<br />THE TEAM
              </h2>

              <div className="space-y-5 max-w-2xl">
                <p style={{ fontSize: 16, lineHeight: 1.8, color: `${C.space}cc` }}>To everyone who has chosen to be a part of Saath,</p>
                <p style={{ fontSize: 16, lineHeight: 1.8, color: `${C.space}cc` }}>Saath began with a question:</p>
                <p style={{ fontSize: 16, lineHeight: 1.8, color: `${C.space}cc`, fontStyle: "italic" }}>What do we wish every young person had the opportunity to learn before they had to figure it out for themselves?</p>
                {[
                  "How do you recognise an online scam?",
                  "What happens when your rights are violated?",
                  "How do you begin managing money responsibly?",
                  "What does environmental responsibility actually look like beyond slogans and posters?",
                ].map((q, i) => (
                  <p key={i} style={{ fontSize: 16, lineHeight: 1.8, color: `${C.space}cc`, paddingLeft: 16, borderLeft: `2px solid ${C.caput}40` }}>{q}</p>
                ))}
                {[
                  "These questions may not always appear in a school examination, but the answers can shape a person's life.",
                  "That is why we created Saath.",
                  "We are young people ourselves, and we know that education becomes powerful when it feels relevant. We do not want our sessions to feel like another textbook or another lecture. We want students to question us, disagree with us, participate, practise, create and leave knowing something they can genuinely use.",
                  "At the same time, we know that meaningful work requires more than good intentions. It requires consistency, responsibility and the willingness to measure whether what we are doing is actually helping. As Saath grows, we want to remain transparent about our progress, our challenges and what we learn along the way.",
                  "We may begin with individual classrooms and individual conversations, but we believe knowledge travels.",
                ].map((p, i) => (
                  <p key={i} style={{ fontSize: 16, lineHeight: 1.8, color: `${C.space}cc` }}>{p}</p>
                ))}
                {[
                  "A child shares something with a sibling.",
                  "A student warns a parent about a scam.",
                  "Someone understands a right they did not know they had.",
                  "Someone makes a more responsible choice.",
                ].map((line, i) => (
                  <p key={i} style={{ fontSize: 16, lineHeight: 1.8, color: `${C.space}cc`, paddingLeft: 16, borderLeft: `2px solid ${C.caput}40` }}>{line}</p>
                ))}
                <p style={{ fontSize: 16, lineHeight: 1.8, color: `${C.space}cc` }}>That is how small lessons can begin creating larger change.</p>
                <p style={{ fontSize: 16, lineHeight: 1.8, color: `${C.space}cc` }}>Thank you for walking saath with us.</p>
              </div>

              <div className="mt-12">
                <p style={{ fontSize: 15, lineHeight: 1.6, color: `${C.space}99`, marginBottom: 8 }}>With hope and purpose,</p>
                <p className="font-serif italic" style={{ fontSize: 22, color: C.space }}>— The Saath Team</p>
                <RoughUnderline color={C.space} className="mt-2 w-32" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT STARTED ── */}
      <section className="py-24 lg:py-36" style={{ backgroundColor: C.tan }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-14">

          <h2
            className="font-display font-black uppercase leading-none mb-20"
            style={{ fontSize: "clamp(3rem, 9vw, 7.5rem)", color: C.space }}
          >
            HOW IT<br />STARTED
          </h2>

          <div>
            {[
              { num: "01", title: "THE IDEA", body: "It started with a conversation — a realisation that the education around us was missing something fundamental. Not academic knowledge, but the practical skills that help you actually live your life. A handful of us decided we wanted to change that." },
              { num: "02", title: "THE FIRST STEP", body: "We reached out to a local school, built our first curriculum together, and walked into our first classroom not entirely sure what we were doing. The students surprised us — their engagement and curiosity made everything feel worthwhile." },
              { num: "03", title: "THE GROWTH", body: "Word spread. More schools reached out. More volunteers joined. We refined what we taught, how we taught it, and learned something new from every session. Saath became bigger than any of us had imagined." },
              { num: "04", title: "TODAY", body: "Saath is now an organised campaign with a team of passionate young volunteers, a structured curriculum, and an expanding presence across schools. We document our work, measure our impact, and keep pushing forward." },
              { num: "05", title: "WHAT'S NEXT", body: "More schools. More subjects. More volunteers. We want to build a scalable model that any motivated group of students can replicate — because the gap we set out to fill is bigger than what any one campaign can address." },
            ].map((step, i) => (
              <div
                key={step.num}
                className="grid grid-cols-[60px_1fr] lg:grid-cols-[100px_1fr] gap-8 py-10"
                style={{ borderTop: `1px solid ${C.coffee}30` }}
              >
                <div
                  className="font-display font-black leading-none"
                  style={{ fontSize: "clamp(3rem, 6vw, 5rem)", color: C.space, opacity: 0.18 }}
                >
                  {step.num}
                </div>
                <div style={{ paddingLeft: i % 2 === 1 ? "clamp(0px, 5vw, 80px)" : 0 }}>
                  <div
                    className="font-display font-black uppercase tracking-wider mb-3"
                    style={{ fontSize: "clamp(1rem, 2vw, 1.3rem)", color: C.space }}
                  >
                    — {step.title}
                  </div>
                  <p className="max-w-xl" style={{ fontSize: 15, lineHeight: 1.8, color: `${C.space}bb` }}>
                    {step.body}
                  </p>
                  {i === 1 && (
                    <CurvedArrow color={C.caput} className="mt-4" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 lg:py-36 relative overflow-hidden" style={{ backgroundColor: C.caput }}>
        {/* Watermark */}
        <div
          className="absolute -bottom-4 -right-4 font-display font-black uppercase select-none pointer-events-none leading-none"
          style={{ fontSize: "clamp(8rem, 22vw, 22rem)", color: "rgba(255,255,255,0.04)" }}
        >
          SAATH
        </div>

        {/* Grid texture */}
        <div className="absolute top-0 left-0 w-60 h-60 opacity-[0.04] text-white">
          <GridPaper className="w-full h-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-14 relative">

          <div>
            <h2
              className="font-display font-black uppercase leading-[0.88]"
              style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)", color: C.cream }}
            >
              {"THERE'S"}
            </h2>
            <h2
              className="font-display font-black uppercase leading-[0.88]"
              style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)", color: C.cream }}
            >
              MORE TO
            </h2>
            <h2
              className="font-serif italic font-bold leading-[0.88]"
              style={{ fontSize: "clamp(3.2rem, 9vw, 8.5rem)", color: C.tan }}
            >
              saath.
            </h2>
          </div>

          <p className="mt-10 max-w-md" style={{ fontSize: 18, color: `${C.cream}99`, lineHeight: 1.7 }}>
            Explore what we teach, the impact we have created, and the work behind the campaign.
          </p>

          <button
            onClick={() => setPage("impact")}
            className="mt-10 inline-flex items-center gap-4 px-8 py-4 font-display font-black uppercase tracking-widest transition-all duration-200"
            style={{ fontSize: 11, backgroundColor: C.tan, color: C.space }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = C.cream }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = C.tan }}
          >
            EXPLORE THE CAMPAIGN →
          </button>
        </div>
      </section>

      <ContactSection />
    </div>
  )
}

// ─── What We Teach ────────────────────────────────────────────────────────────

function WhatWeTeachPage() {
  const subjects = [
    {
      num: "01",
      title: "LEGAL LITERACY",
      tagline: "Know your rights. Understand your responsibilities. Know where to turn.",
      desc: "Law affects people long before they ever enter a courtroom. It influences what happens when someone is bullied, defrauded, harassed or exploited. It also shapes consumer protections, children's rights, online responsibilities and the remedies available when something goes wrong.",
      topics: ["Child rights", "Consumer rights", "Cybercrime", "Consent and personal safety", "Basic contracts", "Reporting wrongdoing", "Approaching the police", "Legal aid and accessing help"],
      aim: "To help young people understand that rights exist, responsibilities matter and help is available when something goes wrong.",
      accent: C.caput,
    },
    {
      num: "02",
      title: "FINANCIAL STUDIES",
      tagline: "Financial confidence begins with small decisions.",
      desc: "Money becomes part of our lives long before most of us begin earning it. Young people already encounter choices involving saving, spending, digital payments, advertisements, online purchases and financial scams.",
      topics: ["Needs versus wants", "Saving", "Simple budgeting", "Banks and bank accounts", "UPI and digital payments", "Financial fraud and scams", "Responsible spending", "Basic financial planning"],
      aim: "To help students make informed choices with the resources they have. Responsible financial behaviour does not begin with a large salary — it can begin with the first ₹100 someone decides whether to save or spend.",
      accent: C.space,
    },
    {
      num: "03",
      title: "DIGITAL LITERACY",
      tagline: "Knowing how to use technology is not the same as knowing how to navigate it.",
      desc: "For many young people, the internet is part of everyday life. It is where they communicate, learn, entertain themselves, discover information and increasingly interact with the wider world.",
      topics: ["Strong passwords", "Two-factor authentication", "Phishing and online scams", "Privacy", "Cyberbullying", "Misinformation", "Digital footprints", "Responsible social-media use", "Online communication", "Basic productivity tools"],
      aim: "To help young people use technology with confidence, awareness and responsibility.",
      highlight: "Pause. Question. Then click.",
      accent: C.slate,
    },
    {
      num: "04",
      title: "ENVIRONMENTAL EDUCATION",
      tagline: "Global problems often begin with local choices.",
      desc: "Climate change, pollution, biodiversity loss and waste can feel like enormous global problems. But environmental responsibility often begins much closer to home — the water we use, the waste we create, the resources we consume, the environment surrounding our own communities.",
      topics: ["Waste management", "Water conservation", "Pollution", "Biodiversity", "Climate change", "Responsible consumption", "Local environmental action"],
      aim: "To help students understand both the problem and their role within it. We want environmental education to leave students feeling capable, rather than helpless.",
      accent: C.tan,
    },
  ]

  return (
    <div style={{ backgroundColor: C.cream }} className="pt-[60px]">

      {/* Header */}
      <section className="py-20 lg:py-28" style={{ borderBottom: `1px solid ${C.space}15` }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <h1
            className="font-display font-black uppercase leading-none"
            style={{ fontSize: "clamp(4rem, 13vw, 11rem)", color: C.space }}
          >
            WHAT WE<br />TEACH
          </h1>
          <p className="mt-8 font-serif italic" style={{ fontSize: "clamp(1.3rem, 3vw, 2rem)", color: C.caput }}>
            Practical education. Real-world skills.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 lg:py-28" style={{ borderBottom: `1px solid ${C.space}15` }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-28 items-start">
            <div>
              <h2 className="font-display font-black uppercase leading-none" style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", color: C.space }}>
                EDUCATION FOR<br />THE WORLD<br />OUTSIDE THE<br />CLASSROOM
              </h2>
            </div>
            <div className="lg:pt-4 space-y-5">
              <p style={{ fontSize: 16, lineHeight: 1.8, color: `${C.space}cc` }}>
                Academic education gives young people an essential foundation. But growing up requires another set of skills too: understanding the institutions around us, making decisions independently, identifying risks, responding to change and participating responsibly in society.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: `${C.space}cc` }}>
                Saath focuses on four areas that increasingly influence everyday life:
              </p>
              <div className="space-y-1 pl-4" style={{ borderLeft: `2px solid ${C.caput}40` }}>
                {["Legal Literacy", "Financial Studies", "Digital Literacy", "Environmental Education"].map(s => (
                  <p key={s} className="font-display font-black uppercase" style={{ fontSize: 13, letterSpacing: "0.1em", color: C.space }}>{s}</p>
                ))}
              </div>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: `${C.space}cc` }}>
                These subjects may appear different, but they share the same purpose. They give young people agency — the ability to understand a situation, evaluate their options and make an informed decision instead of simply reacting to circumstances.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: `${C.space}cc` }}>
                Our aim is not to fill a classroom with definitions. It is to help students turn knowledge into action.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Four subject boxes */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="grid md:grid-cols-2 gap-px" style={{ backgroundColor: `${C.space}18`, outline: `1px solid ${C.space}18` }}>
            {subjects.map((s) => (
              <div
                key={s.num}
                className="p-8 lg:p-12 relative"
                style={{ backgroundColor: C.cream }}
              >
                {/* Accent corner */}
                <div className="absolute top-0 left-0 w-8 h-8" style={{ borderTop: `3px solid ${s.accent}`, borderLeft: `3px solid ${s.accent}` }} />

                {/* Number */}
                <div
                  className="font-display font-black leading-none mb-6"
                  style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)", color: `${s.accent}22` }}
                >
                  {s.num}
                </div>

                {/* Title */}
                <h3
                  className="font-display font-black uppercase tracking-wide mb-2"
                  style={{ fontSize: "clamp(1.1rem, 2vw, 1.35rem)", color: C.space }}
                >
                  {s.title}
                </h3>

                {/* Tagline */}
                <p className="font-serif italic mb-5" style={{ fontSize: 15, color: s.accent, lineHeight: 1.4 }}>
                  {s.tagline}
                </p>

                <div style={{ width: 32, height: 1, backgroundColor: `${C.space}25`, marginBottom: 20 }} />

                {/* Description */}
                <p style={{ fontSize: 14, lineHeight: 1.8, color: `${C.space}99`, marginBottom: 20 }}>
                  {s.desc}
                </p>

                {/* Highlight (Digital Literacy only) */}
                {"highlight" in s && s.highlight && (
                  <div
                    className="mb-5 px-4 py-3"
                    style={{ backgroundColor: `${C.space}08`, borderLeft: `3px solid ${s.accent}` }}
                  >
                    <p className="font-serif italic font-bold" style={{ fontSize: 15, color: C.space }}>
                      {s.highlight}
                    </p>
                  </div>
                )}

                {/* Topics */}
                <div style={{ fontSize: 8, letterSpacing: "0.22em", textTransform: "uppercase", color: C.slate, fontWeight: 500, marginBottom: 10 }}>
                  OUR SESSIONS CAN EXPLORE
                </div>
                <ul className="mb-6 space-y-1">
                  {s.topics.map(t => (
                    <li key={t} className="flex items-start gap-2" style={{ fontSize: 13, color: `${C.space}bb`, lineHeight: 1.6 }}>
                      <span style={{ color: s.accent, flexShrink: 0, marginTop: 1 }}>→</span>{t}
                    </li>
                  ))}
                </ul>

                {/* Aim */}
                <div style={{ paddingTop: 16, borderTop: `1px solid ${C.space}12` }}>
                  <div style={{ fontSize: 8, letterSpacing: "0.22em", textTransform: "uppercase", color: C.slate, fontWeight: 500, marginBottom: 6 }}>OUR AIM</div>
                  <p style={{ fontSize: 13, lineHeight: 1.75, color: `${C.space}99`, fontStyle: "italic" }}>
                    {s.aim}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why These Four? */}
      <section className="py-24 lg:py-36" style={{ backgroundColor: C.space }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <div style={{ fontSize: 9, letterSpacing: "0.25em", color: `${C.tan}66`, textTransform: "uppercase", fontWeight: 500, marginBottom: 32 }}>
            WHY THESE FOUR
          </div>
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-28 items-start">
            <div>
              <h2 className="font-display font-black uppercase leading-none" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: C.cream }}>
                WHY<br />THESE<br />FOUR?
              </h2>
              <p className="font-serif italic mt-6" style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", color: C.tan, lineHeight: 1.4 }}>
                Because independence is not one skill.
              </p>
            </div>
            <div className="space-y-5 lg:pt-4">
              {[
                "It is being able to recognise your rights.",
                "Manage your resources.",
                "Protect yourself online.",
                "Understand the world you live in.",
                "Ask better questions.",
                "Make informed decisions.",
                "And know when to seek help.",
              ].map((line, i) => (
                <p key={i} style={{ fontSize: 16, lineHeight: 1.7, color: `${C.cream}cc` }}>{line}</p>
              ))}
              <div style={{ paddingTop: 20, borderTop: `1px solid ${C.cream}12` }}>
                <p style={{ fontSize: 16, lineHeight: 1.8, color: `${C.cream}cc` }}>
                  Together, these four areas build something larger than four separate subjects. They build practical citizenship.
                </p>
                <p style={{ fontSize: 16, lineHeight: 1.8, color: `${C.cream}cc`, marginTop: 16 }}>
                  Our hope is that the learning does not end when the session ends. A student takes an idea home. A conversation begins. Someone tells a sibling. A parent learns something new. A habit changes.
                </p>
                <p className="font-serif italic font-bold mt-6" style={{ fontSize: 18, color: C.tan }}>
                  Knowledge travels. And that is where education begins becoming impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-24 lg:py-36" style={{ backgroundColor: C.tan }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <div style={{ fontSize: 9, letterSpacing: "0.25em", color: C.coffee, textTransform: "uppercase", fontWeight: 500, marginBottom: 32 }}>
            OUR APPROACH
          </div>
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-28 items-start">
            <div>
              <h2 className="font-display font-black uppercase leading-none" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: C.space }}>
                OUR<br />APPROACH
              </h2>
              <p className="font-serif italic mt-6" style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", color: C.space, lineHeight: 1.4, opacity: 0.75 }}>
                Less lecturing. More learning.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: `${C.space}bb`, marginTop: 20 }}>
                We believe practical education works best when students are involved in it. Our sessions are designed around five principles:
              </p>
            </div>
            <div className="space-y-0">
              {[
                { label: "Practical", body: "We connect concepts with situations students may actually encounter." },
                { label: "Interactive", body: "Activities, conversations, scenarios and questions matter more than passive listening." },
                { label: "Accessible", body: "Complex ideas are broken down into language students can understand." },
                { label: "Relevant", body: "We focus on problems and decisions that exist in students' everyday lives." },
                { label: "Action-oriented", body: "Students should leave knowing not only what something means, but what they can actually do with that knowledge." },
              ].map((p, i) => (
                <div key={i} className="py-5" style={{ borderBottom: `1px solid ${C.space}18` }}>
                  <span className="font-display font-black uppercase" style={{ fontSize: 13, letterSpacing: "0.08em", color: C.space }}>
                    {p.label} —&nbsp;
                  </span>
                  <span style={{ fontSize: 14, lineHeight: 1.75, color: `${C.space}bb` }}>{p.body}</span>
                </div>
              ))}
              <div className="pt-8">
                <p style={{ fontSize: 16, lineHeight: 1.8, color: `${C.space}bb` }}>
                  Most importantly, we want the classroom to feel like a place where asking questions is encouraged.
                </p>
                <p className="font-serif italic font-bold mt-4" style={{ fontSize: 18, color: C.space }}>
                  {"Because sometimes the most valuable lesson begins with: \"But why?\""}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo collage section */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: `${C.slate}18` }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <div style={{ fontSize: 9, letterSpacing: "0.25em", color: C.slate, textTransform: "uppercase", fontWeight: 500, marginBottom: 40 }}>
            IN THE CLASSROOM
          </div>
          <div className="grid lg:grid-cols-3 gap-4 items-start">
            <div className="lg:col-span-2">
              <div
                className="overflow-hidden relative"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 92%, 95% 100%, 88% 95%, 78% 100%, 66% 93%, 52% 100%, 38% 94%, 24% 100%, 12% 96%, 4% 100%, 0 96%)",
                  aspectRatio: "4/3",
                }}
              >
                <img
                  src={imgSession1}
                  alt="TEACHING SESSION — 01"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  style={{ filter: "grayscale(100%) contrast(1.06)", objectPosition: "center center" }}
                />
              </div>
              <div style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: C.slate, marginTop: 8 }}>TEACHING SESSION — 01</div>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <Tape className="w-14 h-[18px] rotate-[-2deg] -top-2 left-5" />
                <div className="overflow-hidden" style={{ aspectRatio: "4/3" }}>
                  <img
                    src={imgSession2}
                    alt="TEACHING SESSION — 02"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    style={{ filter: "grayscale(100%)", objectPosition: "center center" }}
                  />
                </div>
                <div style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: C.slate, marginTop: 8 }}>TEACHING SESSION — 02</div>
              </div>
              <div style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: C.slate }}>SAATH × RAMRAO INGAWALE HIGH SCHOOL</div>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </div>
  )
}

// ─── Our Impact ───────────────────────────────────────────────────────────────

function useCountUp(target: number, duration = 1200): number {
  const [value, setValue] = useState(0)
  useEffect(() => {
    let start: number | null = null
    const step = (ts: number) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    const raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])
  return value
}

function OurImpactPage() {
  const s95 = useCountUp(95)
  const s4  = useCountUp(4)
  const s1  = useCountUp(1)
  const s14 = useCountUp(15)

  return (
    <div style={{ backgroundColor: C.cream }} className="pt-[60px]">

      {/* ── SECTION 1: HERO + AT A GLANCE ── */}
      <section style={{ backgroundColor: C.space, borderBottom: `4px solid ${C.caput}` }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-14 pt-14 lg:pt-20 pb-0">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-end">
            <div>
              <h1 className="font-display font-black uppercase leading-none" style={{ fontSize: "clamp(4rem, 12vw, 10rem)", color: C.cream }}>
                OUR<br />IMPACT
              </h1>
              <p className="font-serif italic mt-5" style={{ fontSize: "clamp(1.2rem, 2.8vw, 2rem)", color: C.tan, lineHeight: 1.35 }}>
                The Saath Campaign
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.75, color: `${C.cream}99`, marginTop: 10 }}>
                Four weeks of teaching and impact.
              </p>
            </div>
            <div className="lg:pb-2">
              <div style={{ paddingLeft: 24, borderLeft: `2px solid ${C.cream}` }}>
                <p className="font-display font-black uppercase" style={{ fontSize: "clamp(1rem, 2vw, 1.3rem)", color: C.cream, letterSpacing: "0.06em" }}>
                  Ramrao Ingawale Highschool
                </p>
                <p style={{ fontSize: 15, color: `${C.cream}70`, marginTop: 6 }}>Hatkanangle, Kolhapur</p>
                <p style={{ fontSize: 14, color: `${C.cream}55`, marginTop: 16, fontStyle: "italic" }}>
                  This is Saath's first completed campaign.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats strip — inside hero so they're visible on load */}
        <div className="grid grid-cols-2 lg:grid-cols-4 mt-12" style={{ borderTop: `1px solid ${C.cream}15` }}>
          {[
            { num: s95, label: "Students Reached" },
            { num: s4,  label: "Weeks of Teaching" },
            { num: s1,  label: "School Reached" },
            { num: s14, label: "Team Members" },
          ].map((s, i) => (
            <div key={i} className="px-8 lg:px-12 py-8" style={{ borderRight: i < 3 ? `1px solid ${C.cream}10` : "none" }}>
              <div className="font-display font-black leading-none" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: C.cream }}>
                {s.num}
              </div>
              <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: `${C.cream}60`, marginTop: 8, fontWeight: 500 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-14 py-5">
          <p className="font-serif italic" style={{ fontSize: 14, color: `${C.cream}40` }}>
            A first campaign, documented honestly.
          </p>
        </div>
      </section>

      {/* ── SECTION 3: OUR EXPERIENCE ── */}
      <section className="py-24 lg:py-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-28 items-start">
            <div>
              <h2 className="font-display font-black uppercase leading-none" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: C.space }}>
                OUR<br />EXPERIENCE
              </h2>
              <div className="mt-10 space-y-5">
                <p style={{ fontSize: 16, lineHeight: 1.85, color: `${C.space}bb` }}>
                  Over the 4 weeks at Ramrao Ingawale Highschool, we discovered that teaching is more than just lessons.
                </p>
                <p style={{ fontSize: 16, lineHeight: 1.85, color: `${C.space}bb` }}>
                  We built genuine connections with the students, learned to communicate ideas in simple and engaging ways, and adapted our teaching to their interests and understanding.
                </p>
                <p style={{ fontSize: 16, lineHeight: 1.85, color: `${C.space}bb` }}>
                  From discussing human rights and cyber safety to learning about savings, income, investments, and needs versus wants, every session gave us an opportunity to make everyday knowledge more accessible.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div
                className="overflow-hidden relative"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 92%, 95% 100%, 86% 95%, 74% 100%, 60% 93%, 46% 100%, 32% 95%, 18% 100%, 6% 95%, 0 100%)",
                  aspectRatio: "4/3",
                }}
              >
                <img
                  src={imgSession1}
                  alt="Campaign 01 — Ramrao Ingawale Highschool"
                  className="w-full h-full object-cover"
                  style={{ filter: "grayscale(100%) contrast(1.06)", objectPosition: "center center" }}
                />
              </div>
              <div style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: C.slate }}>
                Campaign 01 — Ramrao Ingawale Highschool
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: WHAT WE TAUGHT ── */}
      <section className="py-24 lg:py-36" style={{ backgroundColor: C.space }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <h2 className="font-display font-black uppercase leading-none mb-4" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: C.cream }}>
            WHAT WE<br />TAUGHT
          </h2>
          <p className="font-serif italic mb-16" style={{ fontSize: "clamp(1rem, 2.5vw, 1.5rem)", color: C.tan }}>
            Practical knowledge for everyday life.
          </p>
          <div className="grid md:grid-cols-2 gap-px" style={{ backgroundColor: `${C.cream}18` }}>
            {[
              {
                num: "01", title: "RIGHTS & CIVIC AWARENESS", accent: C.tan,
                topics: ["POCSO & Child Safety", "Human Rights", "Current Affairs & Civic Awareness"],
                desc: "Understanding rights, responsibilities, safety and the institutions around us.",
              },
              {
                num: "02", title: "FINANCIAL LITERACY", accent: C.tan,
                topics: ["Savings & Financial Literacy", "Needs vs. Wants", "Income & Budgeting", "Investment Basics"],
                desc: "Building the foundations for thoughtful and responsible financial decisions.",
              },
              {
                num: "03", title: "DIGITAL SAFETY", accent: C.slate,
                topics: ["Cybercrime & Online Safety"],
                desc: "Helping students recognise risks and navigate digital spaces more safely.",
              },
              {
                num: "04", title: "ENVIRONMENTAL AWARENESS", accent: C.tan,
                topics: ["Reduce · Reuse · Recycle"],
                desc: "Connecting everyday choices with environmental responsibility.",
              },
            ].map(s => (
              <div key={s.num} className="p-8 lg:p-12 relative" style={{ backgroundColor: `${C.space}` }}>
                <div className="absolute top-0 left-0 w-7 h-7" style={{ borderTop: `2px solid ${s.accent}`, borderLeft: `2px solid ${s.accent}` }} />
                <div className="font-display font-black leading-none mb-5" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: `${s.accent}20` }}>{s.num}</div>
                <h3 className="font-display font-black uppercase tracking-wide mb-3" style={{ fontSize: "clamp(1rem, 1.8vw, 1.2rem)", color: C.cream }}>{s.title}</h3>
                <p className="font-serif italic mb-6" style={{ fontSize: 14, color: s.accent, lineHeight: 1.45 }}>{s.desc}</p>
                <ul className="space-y-2">
                  {s.topics.map(t => (
                    <li key={t} className="flex items-start gap-2" style={{ fontSize: 13, color: `${C.cream}88`, lineHeight: 1.6 }}>
                      <span style={{ color: s.accent, flexShrink: 0 }}>→</span>{t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: INSIDE THE CLASSROOM ── */}
      <section className="py-24 lg:py-36" style={{ backgroundColor: `${C.slate}12` }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <h2 className="font-display font-black uppercase leading-none mb-3" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: C.space }}>
            INSIDE<br />CAMPAIGN 01
          </h2>
          <p className="font-serif italic mb-16" style={{ fontSize: "clamp(1rem, 2.5vw, 1.4rem)", color: C.slate }}>
            Four weeks of conversations, questions and activities.
          </p>
          <div className="grid lg:grid-cols-3 gap-4 items-start">
            <div className="lg:col-span-2">
              <div
                className="overflow-hidden"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 92%, 95% 100%, 86% 95%, 74% 100%, 60% 93%, 46% 100%, 32% 94%, 18% 100%, 6% 95%, 0 100%)",
                  aspectRatio: "4/3",
                }}
              >
                <img
                  src={imgSession1}
                  alt="Campaign 01 classroom"
                  className="w-full h-full object-cover"
                  style={{ filter: "grayscale(100%) contrast(1.06)", objectPosition: "center center" }}
                />
              </div>
              <div style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: C.slate, marginTop: 8 }}>TEACHING SESSION — 01</div>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <Tape className="w-14 h-[18px] rotate-[-2deg] -top-2 left-5" />
                <div className="overflow-hidden" style={{ aspectRatio: "4/3" }}>
                  <img
                    src={imgSession2}
                    alt="Campaign 01 students"
                    className="w-full h-full object-cover"
                    style={{ filter: "grayscale(100%)", objectPosition: "center center" }}
                  />
                </div>
                <div style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: C.slate, marginTop: 8 }}>TEACHING SESSION — 02</div>
              </div>
              <div style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: C.slate }}>SAATH × RAMRAO INGAWALE HIGH SCHOOL</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: STUDENT VOICES ── */}
      <section className="py-24 lg:py-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <h2 className="font-display font-black uppercase leading-none mb-3" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: C.space }}>
            STUDENT<br />VOICES
          </h2>
          <p className="font-serif italic mb-16" style={{ fontSize: "clamp(1rem, 2.5vw, 1.4rem)", color: C.slate }}>
            What stayed with them after the sessions.
          </p>
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sanjana",
                quote: "Learning can be fun when it connects to everyday life.",
                body: "Sanjana enjoyed learning about the 3Rs — Reduce, Reuse and Recycle — and shared that the session helped her learn something she could use in everyday life.",
              },
              {
                name: "Rohit",
                quote: "Knowing your rights gives you the confidence to speak up.",
                body: "Rohit especially enjoyed the session on POCSO and child safety. He learned about understanding what is right and wrong and the importance of speaking up and seeking help.",
              },
              {
                name: "Harshit",
                quote: "Understanding your rights is the first step towards protecting yourself.",
                body: "Harshit enjoyed learning about POCSO and came away with a better understanding of rights, safety and protection.",
              },
            ].map(v => (
              <div key={v.name} className="relative">
                <div className="absolute -top-4 -left-2 font-serif select-none pointer-events-none leading-none" style={{ fontSize: "5rem", color: `${C.space}10`, lineHeight: 1 }}>"</div>
                <div style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: C.space, fontWeight: 500, marginBottom: 16 }}>{v.name}</div>
                <p className="font-serif italic font-bold" style={{ fontSize: "clamp(1.1rem, 2vw, 1.35rem)", color: C.space, lineHeight: 1.35, marginBottom: 16 }}>
                  "{v.quote}"
                </p>
                <div style={{ width: 24, height: 1, backgroundColor: `${C.space}30`, marginBottom: 14 }} />
                <p style={{ fontSize: 13, lineHeight: 1.75, color: `${C.space}88` }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 7: FROM THE SCHOOL ── */}
      <section className="py-24 lg:py-36" style={{ backgroundColor: C.tan }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <h2 className="font-display font-black uppercase leading-none mb-3" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: C.space }}>
            FROM THE<br />SCHOOL
          </h2>
          <p className="font-serif italic mb-16" style={{ fontSize: "clamp(1rem, 2.5vw, 1.4rem)", color: `${C.space}99` }}>
            How the campaign was experienced from the other side of the classroom.
          </p>
          <div className="space-y-10">
            {[
              {
                name: "Bhosale J.M.",
                role: "School Teacher — Class Teacher, Grade 9",
                quote: "The content covered during the sessions was informative, relevant and valuable for the students. The students participated actively and showed genuine interest throughout the sessions. The interactive activities, especially the 3R activity, encouraged their engagement and made the learning experience more effective.",
              },
              {
                name: "Class Teacher — Grade 9",
                role: "Ramrao Ingawale Highschool",
                quote: "The information given by the students of SAATH was so important and valuable to our students. It was about the 3R system and about POSCO. Our children were so lucky to have important things taught to them.",
              },
            ].map(t => (
              <div key={t.name} className="relative p-8 lg:p-12" style={{ backgroundColor: "white", border: `1px solid rgba(37,52,79,0.1)`, boxShadow: "4px 6px 0 rgba(37,52,79,0.06)" }}>
                <div className="absolute top-0 left-0 w-6 h-6" style={{ borderTop: `2px solid ${C.space}`, borderLeft: `2px solid ${C.space}` }} />
                <p className="font-serif italic font-bold mb-6" style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", color: C.space, lineHeight: 1.5 }}>
                  "{t.quote}"
                </p>
                <div style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: C.slate, fontWeight: 500 }}>{t.name}</div>
                <div style={{ fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: `${C.slate}80`, marginTop: 3 }}>{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── SECTION 9: THE TEAM ── */}
      <section className="py-24 lg:py-36" style={{ backgroundColor: C.space }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <h2 className="font-display font-black uppercase leading-none mb-3" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: C.cream }}>
            THE TEAM<br />BEHIND<br />CAMPAIGN 01
          </h2>
          <div style={{ width: 40, height: 2, backgroundColor: C.cream, marginBottom: 48 }} />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-x-8">
            {[
              "Jhalak Jain", "Aayesha Dadhiwale", "Vedika Bagri", "Rhythm Patel",
              "Phalghuni Panchgavi", "Prithviraj Mote", "Advik Kalangutkar", "Ojas Kadam",
              "Aahan Jain", "Devansh Goyal", "Jay Dalya", "Hrithik Vhora",
              "Pravesh Lohana", "Dheer Vikamshi", "Sarah Patel",
            ].map(name => (
              <div key={name} style={{ fontSize: 14, color: `${C.cream}cc`, lineHeight: 1.5, borderBottom: `1px solid ${C.cream}12`, paddingBottom: 12 }}>
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 10: LOOKING FORWARD ── */}
      <section className="py-24 lg:py-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-28 items-start">
            <div>
              <h2 className="font-display font-black uppercase leading-none" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: C.space }}>
                LOOKING<br />FORWARD
              </h2>
            </div>
            <div className="lg:pt-4 space-y-5">
              <p style={{ fontSize: 16, lineHeight: 1.85, color: `${C.space}cc` }}>
                The four weeks are only the beginning of SAATH.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.85, color: `${C.space}cc` }}>
                We look forward to continuing our sessions, reaching more students, introducing new areas of practical learning, and building on the relationships we have created.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.85, color: `${C.space}cc` }}>
                Our aim is to make SAATH a sustained initiative where every session leaves students with knowledge they can carry into their everyday lives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL STATEMENT ── */}
      <section className="py-32 lg:py-48" style={{ backgroundColor: C.space }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-14 text-center">
          <p className="font-serif italic" style={{ fontSize: "clamp(1.5rem, 4vw, 2.8rem)", color: C.cream, lineHeight: 1.45 }}>
            We started with four weeks.
          </p>
          <p className="font-serif italic mt-4" style={{ fontSize: "clamp(1.5rem, 4vw, 2.8rem)", color: C.tan, lineHeight: 1.45 }}>
            We hope to build something that lasts much longer.
          </p>
          <div style={{ width: 40, height: 1, backgroundColor: `${C.cream}30`, margin: "40px auto 0" }} />
        </div>
      </section>

      <ContactSection />
    </div>
  )
}

// ─── Documentation ────────────────────────────────────────────────────────────

function DocFile({ onClick }: { onClick: () => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: "pointer",
        transition: "transform 200ms ease, box-shadow 200ms ease",
        transform: hovered ? "translateY(-6px) rotate(-0.5deg)" : "rotate(-0.8deg)",
        transformOrigin: "bottom center",
        maxWidth: 480,
      }}
    >
      {/* Tab */}
      <div
        style={{
          display: "inline-block",
          backgroundColor: C.tan,
          padding: "6px 20px 6px 14px",
          marginLeft: 24,
          marginBottom: 0,
          clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 100%, 0 100%)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: C.space }}>
          CAMPAIGN 01
        </span>
      </div>

      {/* Folder body */}
      <div
        style={{
          backgroundColor: "white",
          border: `1px solid rgba(37,52,79,0.14)`,
          boxShadow: hovered
            ? "6px 10px 32px rgba(37,52,79,0.18), 2px 2px 0 rgba(37,52,79,0.06)"
            : "4px 6px 18px rgba(37,52,79,0.12), 2px 2px 0 rgba(37,52,79,0.06)",
          padding: "32px 36px 36px",
          position: "relative",
          borderTop: `3px solid ${C.tan}`,
        }}
      >
        {/* Corner fold */}
        <div className="absolute top-0 right-0 w-0 h-0" style={{ borderLeft: "28px solid transparent", borderTop: `28px solid ${C.cream}` }} />
        <div className="absolute top-0 right-0 w-0 h-0" style={{ borderLeft: "28px solid transparent", borderTop: `28px solid ${C.tan}44` }} />

        {/* Stamp mark */}
        <div className="absolute top-5 right-8" style={{ transform: "rotate(8deg)" }}>
          <div style={{
            border: `2px solid ${C.caput}55`,
            borderRadius: 2,
            padding: "3px 8px",
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 8,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: `${C.caput}55`,
            fontWeight: 700,
          }}>ARCHIVED</div>
        </div>

        <div style={{ fontSize: 8, letterSpacing: "0.28em", color: C.slate, textTransform: "uppercase", fontWeight: 500, marginBottom: 20 }}>
          CAMPAIGN ARCHIVE · DOCUMENT 01
        </div>

        <h3 className="font-display font-black uppercase" style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)", color: C.space, lineHeight: 1, marginBottom: 8 }}>
          RAMRAO INGAWALE<br />HIGHSCHOOL
        </h3>

        <div style={{ width: 32, height: 2, backgroundColor: C.tan, margin: "16px 0" }} />

        <div className="flex flex-wrap gap-6">
          {["HATKANANGLE, KOLHAPUR", "4 WEEKS", "95 STUDENTS"].map(tag => (
            <span key={tag} style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: `${C.space}70`, fontWeight: 500 }}>
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-8" style={{ fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600, color: C.space }}>
          OPEN REPORT →
        </div>
      </div>
    </div>
  )
}

function BookCover({ label, sublabel, accent, file, rotate = 0 }: { label: string; sublabel?: string; accent: string; file: string; rotate?: number }) {
  const [hovered, setHovered] = useState(false)
  const open = () => window.open(file, "_blank")
  return (
    <div
      onClick={open}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: "pointer",
        transition: "transform 200ms ease, box-shadow 200ms ease",
        transform: hovered
          ? `translateY(-8px) rotate(${rotate * 0.4}deg)`
          : `rotate(${rotate}deg)`,
        transformOrigin: "bottom center",
      }}
    >
      <div
        style={{
          width: "clamp(120px, 18vw, 175px)",
          aspectRatio: "2/3",
          backgroundColor: accent,
          position: "relative",
          boxShadow: hovered
            ? `5px 12px 28px rgba(37,52,79,0.28), inset -4px 0 8px rgba(0,0,0,0.12)`
            : `3px 6px 16px rgba(37,52,79,0.18), inset -4px 0 8px rgba(0,0,0,0.10)`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "18px 14px 16px",
          borderLeft: `6px solid rgba(0,0,0,0.15)`,
        }}
      >
        {/* Top rule */}
        <div style={{ width: "100%", height: 1, backgroundColor: "rgba(255,255,255,0.25)" }} />

        {/* Title */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "12px 0" }}>
          <p style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(0.85rem, 2vw, 1.1rem)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "white",
            lineHeight: 1.15,
            textAlign: "center",
            textShadow: "0 1px 4px rgba(0,0,0,0.2)",
          }}>
            {label}
          </p>
        </div>

        {/* Bottom rule + sublabel */}
        <div>
          <div style={{ width: "100%", height: 1, backgroundColor: "rgba(255,255,255,0.25)", marginBottom: 8 }} />
          {sublabel && (
            <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 8, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", textAlign: "center" }}>
              {sublabel}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function MasterBook({ file }: { file: string }) {
  const [hovered, setHovered] = useState(false)
  const open = () => window.open(file, "_blank")
  return (
    <div
      onClick={open}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: "pointer",
        transition: "transform 200ms ease, box-shadow 200ms ease",
        transform: hovered ? "translateY(-10px) rotate(-0.3deg)" : "rotate(-1deg)",
        transformOrigin: "bottom center",
      }}
    >
      <div
        style={{
          width: "clamp(150px, 22vw, 220px)",
          aspectRatio: "2/3",
          backgroundColor: C.space,
          position: "relative",
          boxShadow: hovered
            ? `6px 14px 36px rgba(37,52,79,0.35), inset -5px 0 10px rgba(0,0,0,0.2)`
            : `4px 8px 20px rgba(37,52,79,0.22), inset -5px 0 10px rgba(0,0,0,0.18)`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "20px 16px 18px",
          borderLeft: `8px solid rgba(0,0,0,0.25)`,
        }}
      >
        <div style={{ width: "100%", height: 1, backgroundColor: `${C.tan}55` }} />

        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, padding: "16px 0" }}>
          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", letterSpacing: "0.12em", textTransform: "uppercase", color: C.tan, lineHeight: 1, textAlign: "center" }}>
            SAATH
          </p>
          <div style={{ width: 28, height: 1, backgroundColor: `${C.tan}60` }} />
          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "clamp(0.75rem, 1.5vw, 0.9rem)", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.8)", lineHeight: 1.2, textAlign: "center" }}>
            MASTER<br />LESSON PLAN
          </p>
        </div>

        <div>
          <div style={{ width: "100%", height: 1, backgroundColor: `${C.tan}55`, marginBottom: 8 }} />
          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 8, letterSpacing: "0.16em", textTransform: "uppercase", color: `${C.tan}80`, textAlign: "center" }}>
            ALL FOUR SUBJECT AREAS
          </p>
        </div>
      </div>
    </div>
  )
}

function DocumentationPage() {
  return (
    <div style={{ backgroundColor: C.cream }} className="pt-[60px]">

      {/* ── INTRO ── */}
      <section className="py-20 lg:py-28" style={{ borderBottom: `1px solid ${C.space}15` }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <div style={{ fontSize: 9, letterSpacing: "0.25em", color: C.slate, textTransform: "uppercase", fontWeight: 500, marginBottom: 20 }}>DOCUMENTATION</div>
          <h1 className="font-display font-black uppercase leading-none" style={{ fontSize: "clamp(2.8rem, 8vw, 6.5rem)", color: C.space }}>
            The work<br />behind Saath.
          </h1>
          <p className="mt-8 max-w-xl" style={{ fontSize: 16, lineHeight: 1.8, color: `${C.space}bb` }}>
            Saath believes that meaningful work should be documented, not simply described. This space contains the campaign reports, curriculum and lesson plans behind what we do.
          </p>
        </div>
      </section>

      {/* ── CAMPAIGN ARCHIVE ── */}
      <section className="py-24 lg:py-36" style={{ backgroundColor: `${C.slate}10` }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <div style={{ fontSize: 9, letterSpacing: "0.25em", color: C.slate, textTransform: "uppercase", fontWeight: 500, marginBottom: 16 }}>CAMPAIGN ARCHIVE</div>
          <h2 className="font-display font-black uppercase leading-none mb-4" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: C.space }}>
            Campaigns, documented.
          </h2>
          <p className="mb-16 max-w-lg" style={{ fontSize: 15, lineHeight: 1.75, color: `${C.space}88` }}>
            From the classroom to the final report, each campaign becomes part of Saath's growing record of work.
          </p>

          {/* Files row — structured so future campaigns slot in */}
          <div className="flex flex-wrap gap-10 items-end">
            <DocFile onClick={() => window.open(pdfCampaign1, "_blank")} />
            {/* Future campaign files slot in here */}
          </div>
        </div>
      </section>

      {/* ── CURRICULUM ARCHIVE ── */}
      <section className="py-24 lg:py-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <div style={{ fontSize: 9, letterSpacing: "0.25em", color: C.slate, textTransform: "uppercase", fontWeight: 500, marginBottom: 16 }}>CURRICULUM</div>
          <h2 className="font-display font-black uppercase leading-none mb-4" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: C.space }}>
            What we teach.
          </h2>
          <p className="mb-16 max-w-lg" style={{ fontSize: 15, lineHeight: 1.75, color: `${C.space}88` }}>
            Our curriculum is built around practical knowledge that young people can carry beyond the classroom.
          </p>

          {/* Master lesson plan — centered */}
          <div className="flex justify-center mb-12">
            <div className="flex flex-col items-center gap-3">
              <MasterBook file={pdfMasterPlan} />
              <div style={{ fontSize: 8, letterSpacing: "0.18em", textTransform: "uppercase", color: C.slate, fontWeight: 500 }}>Master Lesson Plan</div>
            </div>
          </div>

          {/* Four subject books — 2 × 2 grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-x-10 gap-y-12 justify-items-center" style={{ maxWidth: 480, margin: "0 auto" }}>
            {[
              { label: "LEGAL\nLITERACY",          sublabel: "Block 01",       accent: C.space,   file: pdfLegal,        rotate: 1.2 },
              { label: "FINANCIAL\nLITERACY",       sublabel: "Block 01",       accent: "#4A6741", file: pdfFinancial,    rotate: -0.8 },
              { label: "DIGITAL\nLITERACY",         sublabel: "Block 01",       accent: "#3D5A6E", file: pdfDigital,      rotate: 1.5 },
              { label: "ENVIRONMENTAL\nEDUCATION",  sublabel: "Sustainability", accent: "#5C6B3A", file: pdfEnvironment,  rotate: -1.2 },
            ].map(b => (
              <div key={b.label} className="flex flex-col items-center gap-3">
                <BookCover
                  label={b.label.replace("\n", "\n")}
                  sublabel={b.sublabel}
                  accent={b.accent}
                  file={b.file}
                  rotate={b.rotate}
                />
                <div style={{ fontSize: 8, letterSpacing: "0.15em", textTransform: "uppercase", color: C.slate, fontWeight: 500, textAlign: "center", maxWidth: 120 }}>
                  {b.label.replace("\n", " ")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
    </div>
  )
}

// ─── Shared Contact Section ───────────────────────────────────────────────────

function ContactSection() {
  const contacts = [
    { label: "EMAIL", value: "thesaathcampaign@gmail.com", href: "mailto:thesaathcampaign@gmail.com" },
    { label: "INSTAGRAM", value: "@thesaathcampaign", href: "https://www.instagram.com/thesaathcampaign" },
    { label: "LOCATION", value: "Kolhapur, Maharashtra", href: undefined },
  ]
  return (
    <section className="py-24 lg:py-36" style={{ borderTop: `1px solid ${C.space}12` }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-14">
        <div>
          <h2 className="font-display font-black uppercase leading-none" style={{ fontSize: "clamp(4rem, 13vw, 11rem)", color: C.space }}>{"LET'S"}</h2>
          <h2 className="font-serif italic font-bold leading-none" style={{ fontSize: "clamp(3.5rem, 12vw, 10rem)", color: C.space, marginTop: "-0.05em" }}>connect.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {contacts.map(c => (
            <div key={c.label} className="pt-6" style={{ borderTop: `1px solid ${C.space}22` }}>
              <div style={{ fontSize: 8, letterSpacing: "0.25em", textTransform: "uppercase", color: C.slate, fontWeight: 500, marginBottom: 12 }}>{c.label}</div>
              {c.href ? (
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="font-display font-black uppercase transition-colors duration-200 block"
                  style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)", color: C.space, letterSpacing: "0.05em" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = C.caput }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = C.space }}
                >
                  {c.value}
                </a>
              ) : (
                <span
                  className="font-display font-black uppercase block"
                  style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)", color: C.space, letterSpacing: "0.05em" }}
                >
                  {c.value}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer({ setPage }: { setPage: (p: Page) => void }) {
  const links: { label: string; page: Page }[] = [
    { label: "HOME", page: "home" },
    { label: "WHAT WE TEACH", page: "teach" },
    { label: "OUR IMPACT", page: "impact" },
    { label: "DOCUMENTATION", page: "docs" },
  ]

  return (
    <footer className="py-20 lg:py-28 relative overflow-hidden" style={{ backgroundColor: C.space }}>
      {/* Watermark */}
      <div
        className="absolute bottom-0 right-0 font-display font-black uppercase leading-none select-none pointer-events-none"
        style={{ fontSize: "clamp(6rem, 16vw, 16rem)", color: "rgba(255,255,255,0.025)" }}
      >
        SAATH
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-14 relative">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">
          <div>
            <div
              className="font-serif italic font-bold leading-none"
              style={{ fontSize: "clamp(4rem, 10vw, 9rem)", color: C.cream }}
            >
              saath.
            </div>
            <div className="mt-5 space-y-1">
              <p style={{ fontSize: 17, letterSpacing: "0.04em", color: `${C.tan}88` }}>practical education.</p>
              <p style={{ fontSize: 17, letterSpacing: "0.04em", fontWeight: 600, color: C.tan }}>real impact.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-3 lg:flex lg:flex-col lg:gap-3">
            {links.map(l => (
              <button
                key={l.page}
                onClick={() => setPage(l.page)}
                className="text-left transition-colors duration-200"
                style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 500, color: `${C.cream}44` }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = C.tan }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = `${C.cream}44` }}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-16 pt-8 flex flex-col sm:flex-row justify-between gap-3" style={{ borderTop: `1px solid rgba(255,255,255,0.07)` }}>
          <div style={{ fontSize: 8, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}>
            PRACTICAL EDUCATION. REAL IMPACT.
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>("home")

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior })
  }, [page])

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: C.cream }}>
      <Nav page={page} setPage={setPage} />
      {page === "home"   && <HomePage setPage={setPage} />}
      {page === "about"  && <AboutPage setPage={setPage} />}
      {page === "teach"  && <WhatWeTeachPage />}
      {page === "impact" && <OurImpactPage />}
      {page === "docs"   && <DocumentationPage />}
      <Footer setPage={setPage} />
    </div>
  )
}
