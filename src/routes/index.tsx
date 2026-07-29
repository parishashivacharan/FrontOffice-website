import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import { LiquidMetalLinkWrapper } from "@/components/ui/liquid-metal-button";
import {
  GraduationCap,
  BookOpen,
  ClipboardList,
  Users,
  CalendarCheck,
  Megaphone,
  Shield,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "Who can use Scholaria?",
      a: "Any school or college can bring their students and staff onto one shared workspace.",
    },
    {
      q: "Is my data safe?",
      a: "Every account only ever sees information that belongs to it, kept secure at every level.",
    },
    {
      q: "Do I need any technical knowledge to use it?",
      a: "No, the platform is designed to feel as simple as any everyday app.",
    },
    {
      q: "Can it handle multiple classes and subjects at once?",
      a: "Yes, it is built to organize any number of classes without becoming cluttered.",
    },
    {
      q: "What happens if I forget my password?",
      a: "A simple reset link brings you back in within seconds.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#fffaf0] font-sans selection:bg-[#0a0a0a] selection:text-white overflow-x-hidden">
      {/* ── Page-wide Continuous Smooth Animated Gradient (Flows Top to Bottom smoothly without seams) ── */}
      <div className="absolute inset-x-0 top-0 h-[1100px] pointer-events-none z-0 overflow-hidden">
        <AnimatedGradientBackground
          startingGap={140}
          Breathing={true}
          animationSpeed={0.01}
          breathingRange={3}
          topOffset={10}
          gradientColors={[
            "#fffaf0",
            "#f5f0e0",
            "#ffb084",
            "#b8a4ed",
            "#e8b94a",
            "#a4d4c5",
            "#fffaf0",
          ]}
          gradientStops={[15, 30, 48, 62, 75, 88, 100]}
        />
        {/* Soft blur overlay for ultra-smooth aesthetic */}
        <div className="absolute inset-0 backdrop-blur-[90px] bg-[#fffaf0]/30 z-[1]" />
        {/* Long 400px gradient transition mask so colors melt continuously into the rest of the page */}
        <div className="absolute inset-x-0 bottom-0 h-[400px] bg-gradient-to-b from-transparent via-[#fffaf0]/70 to-[#fffaf0] z-[2]" />
      </div>

      {/* ── Transparent Pill-shaped Navbar (Page background shows through softly behind it) ── */}
      <header className="sticky top-0 z-50 px-4 sm:px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between bg-transparent backdrop-blur-md border border-[#0a0a0a]/10 rounded-full px-5 sm:px-6 h-14 shadow-xs transition-all hover:bg-white/10">
          <Link to="/" className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#0a0a0a] text-white">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div className="leading-none">
              <div className="text-sm font-medium tracking-tight text-[#0a0a0a]">Scholaria</div>
              <div className="text-[8px] uppercase tracking-[0.2em] text-[#6a6a6a] font-medium">
                Platform
              </div>
            </div>
          </Link>
          <nav className="flex items-center gap-1.5">
            <Link to="/login">
              <LiquidMetalLinkWrapper variant="secondary" size="sm">
                Sign in
              </LiquidMetalLinkWrapper>
            </Link>
            <Link to="/register">
              <LiquidMetalLinkWrapper variant="primary" size="sm">
                Get started
              </LiquidMetalLinkWrapper>
            </Link>
          </nav>
        </div>
      </header>

      {/* ── Hero Section ── */}
      <section className="relative z-10">
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-24 text-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#0a0a0a]/5 text-[#3a3a3a] text-xs font-medium tracking-wide mb-8 border border-[#0a0a0a]/10 backdrop-blur-xs">
            Built for modern classrooms and campuses
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-medium leading-[1.05] tracking-[-0.03em] text-[#0a0a0a] max-w-4xl mx-auto">
            Everything your classroom needs,{" "}
            <span className="bg-gradient-to-r from-[#e8b94a] via-[#ffb084] to-[#ff4d8b] bg-clip-text text-transparent block sm:inline">
              learning made simple.
            </span>
          </h1>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#e8b94a] to-transparent mx-auto my-8" />
          <p className="text-base sm:text-lg text-[#6a6a6a] max-w-2xl mx-auto leading-relaxed">
            A single calm workspace for classes, assignments, resources, attendance and updates, so
            nothing important ever gets lost in the noise.
          </p>
          <div className="mt-10 flex items-center justify-center gap-3">
            <Link to="/register">
              <LiquidMetalLinkWrapper variant="primary" size="lg">
                Create campus account
                <ArrowRight className="w-4 h-4" />
              </LiquidMetalLinkWrapper>
            </Link>
            <Link to="/login">
              <LiquidMetalLinkWrapper variant="secondary" size="lg">
                Sign in to portal
              </LiquidMetalLinkWrapper>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Feature Cards Section — Saturated Clay-style ── */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              icon: BookOpen,
              title: "Courses & resources",
              body: "Every subject organized in one place, complete with syllabus notes, study material and the latest updates from class.",
              bg: "bg-[#ffb084]",
              text: "text-[#0a0a0a]",
              iconColor: "text-[#0a0a0a]/70",
            },
            {
              icon: ClipboardList,
              title: "Tasks & submissions",
              body: "Assignments with clear deadlines, effortless one click submissions, and marks delivered with real feedback.",
              bg: "bg-[#1a3a3a]",
              text: "text-white",
              iconColor: "text-white/70",
            },
            {
              icon: CalendarCheck,
              title: "Attendance",
              body: "Attendance recorded once and reflected instantly, so everyone always knows exactly where they stand.",
              bg: "bg-[#b8a4ed]",
              text: "text-[#0a0a0a]",
              iconColor: "text-[#0a0a0a]/70",
            },
            {
              icon: Megaphone,
              title: "Announcements",
              body: "Updates that reach exactly the right class at exactly the right time, with nothing missed.",
              bg: "bg-[#e8b94a]",
              text: "text-[#0a0a0a]",
              iconColor: "text-[#0a0a0a]/70",
            },
            {
              icon: Users,
              title: "Secure by design",
              body: "Every account only ever sees what truly belongs to it, keeping information organized and protected at every level.",
              bg: "bg-[#ff4d8b]",
              text: "text-white",
              iconColor: "text-white/70",
            },
            {
              icon: Shield,
              title: "Complete visibility",
              body: "A clear view into performance, participation and progress across every class, all in real time.",
              bg: "bg-[#f5f0e0]",
              text: "text-[#0a0a0a]",
              iconColor: "text-[#0a0a0a]/60",
            },
          ].map((f) => (
            <div
              key={f.title}
              className={`${f.bg} ${f.text} rounded-3xl p-7 transition-all hover:scale-[1.02] duration-200 shadow-xs`}
            >
              <f.icon className={`h-6 w-6 ${f.iconColor} mb-5`} />
              <h3 className="text-lg font-medium tracking-[-0.02em] mb-2">{f.title}</h3>
              <p
                className={`text-sm leading-relaxed ${f.text === "text-white" ? "text-white/70" : "text-[#3a3a3a]"}`}
              >
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 1. How It Works Section ── */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pb-24 text-center">
        <h2 className="text-3xl sm:text-4xl font-medium tracking-[-0.03em] text-[#0a0a0a] mb-12">
          How Scholaria works
        </h2>
        <div className="grid md:grid-cols-3 gap-6 text-left">
          <div className="bg-white/80 backdrop-blur-xs border border-[#e5e5e5] rounded-3xl p-8 shadow-xs relative overflow-hidden">
            <div className="w-10 h-10 rounded-2xl bg-[#ffb084]/20 text-[#0a0a0a] flex items-center justify-center font-bold text-sm mb-6">
              01
            </div>
            <h3 className="text-lg font-medium text-[#0a0a0a] mb-3">
              Create your account in seconds
            </h3>
            <p className="text-sm text-[#6a6a6a] leading-relaxed">
              Sign up instantly on the platform. No complex setup or technical installation
              required.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-xs border border-[#e5e5e5] rounded-3xl p-8 shadow-xs relative overflow-hidden">
            <div className="w-10 h-10 rounded-2xl bg-[#b8a4ed]/20 text-[#0a0a0a] flex items-center justify-center font-bold text-sm mb-6">
              02
            </div>
            <h3 className="text-lg font-medium text-[#0a0a0a] mb-3">
              Get added to your classes automatically
            </h3>
            <p className="text-sm text-[#6a6a6a] leading-relaxed">
              Get added to your classes and courses automatically as soon as your account is
              verified.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-xs border border-[#e5e5e5] rounded-3xl p-8 shadow-xs relative overflow-hidden">
            <div className="w-10 h-10 rounded-2xl bg-[#e8b94a]/20 text-[#0a0a0a] flex items-center justify-center font-bold text-sm mb-6">
              03
            </div>
            <h3 className="text-lg font-medium text-[#0a0a0a] mb-3">Everything updates itself</h3>
            <p className="text-sm text-[#6a6a6a] leading-relaxed">
              Everything updates itself — tasks, attendance and announcements, so you always know
              what is happening.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. Numbers / Stats Section ── */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pb-24">
        <div className="bg-[#faf5e8]/80 backdrop-blur-xs border border-[#e5e5e5] rounded-3xl p-10 text-center shadow-xs">
          <h2 className="text-2xl sm:text-3xl font-medium tracking-[-0.03em] text-[#0a0a0a] mb-10">
            Trusted where it matters
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-[#0a0a0a]">12,000+</div>
              <div className="text-xs text-[#6a6a6a] font-medium mt-2">
                Thousands of students already onboard
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-[#0a0a0a]">450+</div>
              <div className="text-xs text-[#6a6a6a] font-medium mt-2">
                Hundreds of classes running daily
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-[#22c55e]">99.8%</div>
              <div className="text-xs text-[#6a6a6a] font-medium mt-2">Near zero missed deadlines</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-[#e8b94a]">15,000+</div>
              <div className="text-xs text-[#6a6a6a] font-medium mt-2">
                Countless hours saved every week
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Reviews / Testimonials Section ── */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pb-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-medium tracking-[-0.03em] text-[#0a0a0a] mb-3">
            What people are actually saying
          </h2>
          <p className="text-sm text-[#6a6a6a]">
            Real feedback from students and faculty managing daily campus life.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              quote:
                "I used to lose assignment deadlines faster than my motivation. Now scholaria just tells me before I can forget.",
              name: "Aditya",
              role: "Final year student",
            },
            {
              quote:
                "Attendance used to be a mystery I solved once a semester during panic mode. Now I just check the app like a normal person.",
              name: "Meera",
              role: "Second year student",
            },
            {
              quote:
                "Grading used to eat my weekends. Now I open one tab, mark it once, and it reaches everyone instantly. Honestly feels like cheating.",
              name: "Rohan",
              role: "Faculty member",
            },
            {
              quote:
                "My old college portal looked like it was built to punish us. This one actually looks like someone liked their job while building it.",
              name: "Sneha",
              role: "First year student",
            },
            {
              quote:
                "Clean, fast, and it does not ask me to click through five confusing menus just to check a due date. That alone deserves applause.",
              name: "Kabir",
              role: "Class representative",
            },
            {
              quote:
                "We replaced three different tools and one very angry group chat with this single platform. Everyone is calmer now, including me.",
              name: "Priya",
              role: "Department coordinator",
            },
          ].map((r, i) => (
            <div
              key={i}
              className="bg-white/80 backdrop-blur-xs border border-[#e5e5e5] rounded-3xl p-7 flex flex-col justify-between shadow-xs hover:border-[#0a0a0a]/20 transition-all"
            >
              <p className="text-sm text-[#3a3a3a] leading-relaxed italic mb-6">"{r.quote}"</p>
              <div className="pt-4 border-t border-[#e5e5e5]/60 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#0a0a0a] text-white flex items-center justify-center font-medium text-xs">
                  {r.name[0]}
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#0a0a0a]">{r.name}</div>
                  <div className="text-[11px] text-[#6a6a6a]">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. Frequently Asked Questions (FAQ) Section ── */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-medium tracking-[-0.03em] text-[#0a0a0a] mb-3">
            Common questions
          </h2>
          <p className="text-sm text-[#6a6a6a]">
            Everything you need to know about setting up and using the platform.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openFaqIdx === i;
            return (
              <div
                key={i}
                className="bg-white/80 backdrop-blur-xs border border-[#e5e5e5] rounded-2xl overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setOpenFaqIdx(isOpen ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left font-medium text-sm sm:text-base text-[#0a0a0a] hover:bg-[#faf5e8]/40 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 text-[#6a6a6a] transition-transform duration-200 shrink-0 ml-4",
                      isOpen && "rotate-180 text-[#0a0a0a]",
                    )}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#6a6a6a] leading-relaxed border-t border-[#e5e5e5]/50 bg-[#fffaf0]/30">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 5. Final CTA Band ── */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pb-24 text-center">
        <div className="bg-[#faf5e8]/90 backdrop-blur-xs border border-[#e5e5e5] rounded-3xl p-12 shadow-xs relative overflow-hidden">
          <h2 className="text-3xl sm:text-4xl font-medium tracking-[-0.03em] text-[#0a0a0a] max-w-2xl mx-auto mb-4">
            Ready to make your campus calmer?
          </h2>
          <p className="text-sm text-[#6a6a6a] max-w-xl mx-auto mb-8 leading-relaxed">
            Join thousands of students and faculty members who manage their daily learning without
            the chaos.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link to="/register">
              <LiquidMetalLinkWrapper variant="primary" size="lg">
                Start your workspace
                <ArrowRight className="w-4 h-4" />
              </LiquidMetalLinkWrapper>
            </Link>
            <Link to="/login">
              <LiquidMetalLinkWrapper variant="secondary" size="lg">
                Sign in to portal
              </LiquidMetalLinkWrapper>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 6. Expanded Footer ── */}
      <footer className="relative z-10 bg-gradient-to-b from-[#fffaf0] to-[#faf5e8] border-t border-[#e5e5e5]/60 pt-16 pb-12">
        <div className="max-w-6xl mx-auto px-6">
          {/* Logo Header */}
          <div className="flex items-center justify-start gap-2 mb-10">
            <div className="p-1 rounded bg-[#0a0a0a] text-white">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="text-base font-medium tracking-tight text-[#0a0a0a]">Scholaria</span>
          </div>

          {/* Three Columns of Links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pb-12 border-b border-[#e5e5e5]">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#0a0a0a] mb-4">
                Product
              </h4>
              <ul className="space-y-2.5 text-xs text-[#6a6a6a]">
                <li>
                  <Link to="/register" className="hover:text-[#0a0a0a] transition-colors">
                    Courses
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="hover:text-[#0a0a0a] transition-colors">
                    Tasks
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="hover:text-[#0a0a0a] transition-colors">
                    Attendance
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="hover:text-[#0a0a0a] transition-colors">
                    Announcements
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#0a0a0a] mb-4">
                Company
              </h4>
              <ul className="space-y-2.5 text-xs text-[#6a6a6a]">
                <li>
                  <a href="#" className="hover:text-[#0a0a0a] transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#0a0a0a] transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#0a0a0a] transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#0a0a0a] mb-4">
                Legal
              </h4>
              <ul className="space-y-2.5 text-xs text-[#6a6a6a]">
                <li>
                  <a href="#" className="hover:text-[#0a0a0a] transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#0a0a0a] transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright Line */}
          <div className="pt-8 text-xs text-[#6a6a6a]">
            © 2026 Scholaria Platform. A modern platform built for schools and colleges that want
            clarity over chaos.
          </div>
        </div>
      </footer>
    </div>
  );
}
