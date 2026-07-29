"use client";

import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { useState, type ReactNode } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { login, register, dashboardPath, ADMIN_EMAIL } from "@/lib/mock-auth";
import {
  GraduationCap,
  ShieldCheck,
  UserCheck,
  Check,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";

export type AuthMode = "signin" | "signup";

export interface AuthSectionOneProps {
  mode?: AuthMode;
}

export default function AuthSectionOne({ mode = "signin" }: AuthSectionOneProps) {
  const router = useRouter();
  const [currentMode, setCurrentMode] = useState<AuthMode>(mode);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (currentMode === "signup") {
      const res = register({ name, email, password });
      if (!res.ok) {
        setError(res.error);
        return;
      }
      router.navigate({ to: dashboardPath[res.user.role] });
    } else {
      const res = login(email);
      if (!res.ok) {
        setError(res.error);
        return;
      }
      router.navigate({ to: dashboardPath[res.user.role] });
    }
  };

  const handleQuickSelect = (targetEmail: string) => {
    setEmail(targetEmail);
    setPassword("password123");
    setError(null);
    const res = login(targetEmail);
    if (res.ok) {
      router.navigate({ to: dashboardPath[res.user.role] });
    } else {
      setError(res.error);
    }
  };

  return (
    <section className="min-h-screen lg:h-screen w-screen bg-[#fffaf0] font-sans flex items-center justify-center p-3 sm:p-4">
      <div className="grid min-h-[calc(100vh-2rem)] lg:h-[calc(100vh-1.5rem)] w-full gap-3 lg:grid-cols-[0.92fr_1.08fr] max-w-[1600px] mx-auto overflow-hidden">
        {/* Left Form Container — Cream canvas */}
        <div className="flex h-full flex-col justify-between rounded-2xl border border-[#e5e5e5] bg-[#fffaf0] p-6 sm:p-8 lg:p-10 overflow-y-auto lg:overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#0a0a0a] text-white">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <div className="text-lg font-medium leading-none tracking-tight">
                  Scholaria
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#6a6a6a] font-medium mt-0.5">
                  Platform
                </div>
              </div>
            </Link>

            <button
              type="button"
              onClick={() => {
                setCurrentMode(currentMode === "signin" ? "signup" : "signin");
                setError(null);
              }}
              className="text-xs font-medium text-[#6a6a6a] hover:text-[#0a0a0a] transition-colors"
            >
              {currentMode === "signin" ? "Need an account?" : "Have an account?"}
            </button>
          </div>

          {/* Form Content */}
          <div className="mx-auto my-auto w-full max-w-[440px] py-2">
            <div>
              <h1 className="text-2xl font-medium tracking-[-0.03em] sm:text-3xl lg:text-[40px] lg:leading-[1.1] text-[#0a0a0a]">
                {currentMode === "signin" ? "Welcome back" : "Create an account"}
              </h1>
              <p className="mt-2 text-sm text-[#6a6a6a] leading-relaxed">
                {currentMode === "signin"
                  ? "Access your courses, tasks, attendance, and campus announcements."
                  : "Join your campus workspace to view courses, tasks, and attendance."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 mt-6">
              {currentMode === "signup" && (
                <FieldInput
                  label="Full Name"
                  value={name}
                  onChange={setName}
                  placeholder="e.g. Aarav Patel"
                  type="text"
                  required
                />
              )}

              <FieldInput
                label="Email Address"
                value={email}
                onChange={setEmail}
                placeholder="you@school.edu"
                type="email"
                required
              />

              <FieldInput
                label="Password"
                value={password}
                onChange={setPassword}
                placeholder="••••••••"
                type="password"
                required
              />

              {error && (
                <div className="text-xs font-medium text-[#ef4444] p-3 rounded-xl bg-[#ef4444]/8 border border-[#ef4444]/15">
                  {error}
                </div>
              )}

              {currentMode === "signup" && (
                <div className="text-[11px] text-[#6a6a6a] leading-relaxed">
                  <CheckboxLine checked={termsAccepted} onChange={setTermsAccepted}>
                    By creating an account, you agree to our{" "}
                    <a href="#" className="font-medium underline underline-offset-2 text-[#0a0a0a]">
                      Terms
                    </a>{" "}
                    and{" "}
                    <a href="#" className="font-medium underline underline-offset-2 text-[#0a0a0a]">
                      Privacy Policy
                    </a>
                  </CheckboxLine>
                </div>
              )}

              <LiquidMetalButton
                type="submit"
                variant="primary"
                size="md"
                fullWidth
                className="mt-5 rounded-xl"
              >
                {currentMode === "signin" ? "Sign in to Portal" : "Create Account"}
                <ArrowRight className="w-4 h-4" />
              </LiquidMetalButton>
            </form>

            {/* Quick Testing Login Presets */}
            {currentMode === "signin" && (
              <div className="mt-5 pt-4 border-t border-[#e5e5e5] space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#6a6a6a]">
                  Quick Demo Login Presets:
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickSelect("rajesh@ihm.edu")}
                    className="p-2 rounded-xl bg-[#fffaf0] border border-[#e8b94a]/30 hover:border-[#0a0a0a] transition-all text-left group"
                  >
                    <div className="text-[11px] font-bold text-[#0a0a0a]">Mr. Rajesh</div>
                    <div className="text-[9px] text-[#6a6a6a] font-mono truncate">rajesh@ihm.edu</div>
                    <span className="text-[9px] font-semibold text-[#e8b94a] block mt-0.5">Faculty / Admin</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickSelect(ADMIN_EMAIL)}
                    className="p-2 rounded-xl bg-[#fffaf0] border border-[#b8a4ed]/30 hover:border-[#0a0a0a] transition-all text-left group"
                  >
                    <div className="text-[11px] font-bold text-[#0a0a0a]">Institute Admin</div>
                    <div className="text-[9px] text-[#6a6a6a] font-mono truncate">{ADMIN_EMAIL}</div>
                    <span className="text-[9px] font-semibold text-[#b8a4ed] block mt-0.5">Super Admin</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickSelect("123456789@ihm.edu")}
                    className="p-2 rounded-xl bg-[#fffaf0] border border-[#a4d4c5]/30 hover:border-[#0a0a0a] transition-all text-left group"
                  >
                    <div className="text-[11px] font-bold text-[#0a0a0a]">Test Student</div>
                    <div className="text-[9px] text-[#6a6a6a] font-mono truncate">123456789@ihm.edu</div>
                    <span className="text-[9px] font-semibold text-[#15803d] block mt-0.5">Student Account</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="text-[11px] text-[#9a9a9a] text-center">
            © 2026 Scholaria Institute Management System
          </div>
        </div>

        {/* Right Gradient Container */}
        <div className="relative hidden lg:flex h-full overflow-hidden rounded-2xl bg-[#0a0a0a]">
          {/* Animated Gradient — minimal, blurry, professional */}
          <AnimatedGradientBackground
            startingGap={110}
            Breathing={true}
            animationSpeed={0.015}
            breathingRange={4}
            topOffset={10}
            gradientColors={[
              "#0a0a0a",
              "#1a3a3a",
              "#b8a4ed",
              "#ffb084",
              "#e8b94a",
              "#a4d4c5",
              "#0a0a0a",
            ]}
            gradientStops={[20, 40, 55, 65, 75, 85, 100]}
          />
          {/* Blur overlay for soft, professional look */}
          <div className="absolute inset-0 backdrop-blur-[60px] bg-black/10 z-[1]" />

          <div className="relative z-10 flex h-full w-full flex-col justify-between p-10 sm:p-12">
            <div className="space-y-5 pt-6 lg:pt-10">
              <span className="inline-block px-4 py-1.5 rounded-full text-[11px] font-medium uppercase tracking-[0.15em] bg-white/10 text-white/90 border border-white/15 backdrop-blur-sm">
                Scholaria Platform
              </span>
              <h2 className="max-w-[500px] text-3xl font-medium tracking-[-0.03em] text-white sm:text-4xl lg:text-[48px] lg:leading-[1.08]">
                Learn faster,
                <br />
                Manage better.
              </h2>
              <p className="max-w-[400px] text-sm text-white/60 leading-relaxed">
                Empowering students, teachers, and admins with a modern, unified
                campus management system built for excellence.
              </p>
            </div>

            {/* Floating feature badges */}
            <div className="flex flex-wrap gap-2 pb-4">
              {["Courses", "Tasks", "Attendance", "Announcements", "Reports"].map(
                (label) => (
                  <span
                    key={label}
                    className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-white/8 text-white/70 border border-white/10 backdrop-blur-sm"
                  >
                    {label}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FieldInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="space-y-1.5">
      <label className="block text-[11px] font-medium text-[#3a3a3a] uppercase tracking-[0.05em]">
        {label}
      </label>
      <div className="flex h-11 items-center rounded-xl border border-[#e5e5e5] bg-white px-4 text-sm transition-all focus-within:border-[#0a0a0a] focus-within:ring-2 focus-within:ring-[#0a0a0a]/10 relative">
        <input
          type={inputType}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-[#0a0a0a] outline-none placeholder:text-[#9a9a9a] font-normal pr-7"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 text-[#9a9a9a] hover:text-[#0a0a0a] transition-colors p-1"
            title={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4 text-[#0a0a0a]" />
            ) : (
              <Eye className="w-4 h-4 text-[#9a9a9a]" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

function CheckboxLine({
  children,
  checked,
  onChange,
}: {
  children: ReactNode;
  checked: boolean;
  onChange: (c: boolean) => void;
}) {
  return (
    <label className="flex items-start gap-2.5 cursor-pointer">
      <span className="relative mt-0.5 size-4 shrink-0">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer size-full appearance-none rounded-md border border-[#e5e5e5] bg-white checked:border-[#0a0a0a] checked:bg-[#0a0a0a] transition-colors"
        />
        <Check className="pointer-events-none absolute inset-0 hidden size-full p-0.5 text-white peer-checked:block" />
      </span>
      <span>{children}</span>
    </label>
  );
}
