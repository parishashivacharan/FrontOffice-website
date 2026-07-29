"use client";

import type React from "react";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface LiquidMetalButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  disabled?: boolean;
}

export function LiquidMetalButton({
  children,
  onClick,
  type = "button",
  className,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
}: LiquidMetalButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const sizeClasses = {
    sm: "h-9 px-4 text-xs gap-1.5",
    md: "h-11 px-6 text-sm gap-2",
    lg: "h-[50px] px-8 text-sm gap-2.5",
  };

  return (
    <button
      ref={btnRef}
      type={type}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      disabled={disabled}
      className={cn(
        "relative inline-flex items-center justify-center font-medium rounded-full overflow-hidden select-none transition-transform duration-300 group border",
        sizeClasses[size],
        fullWidth && "w-full",
        variant === "primary"
          ? "border-white/20 hover:border-white/40 text-white shadow-md"
          : "border-[#0a0a0a]/15 hover:border-[#0a0a0a]/30 text-[#0a0a0a] shadow-xs",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      style={{
        transform: isPressed ? "scale(0.97)" : isHovered ? "scale(1.02)" : "scale(1)",
        boxShadow: isHovered
          ? variant === "primary"
            ? "0 8px 25px -4px rgba(0, 0, 0, 0.4), 0 0 15px -3px rgba(255, 255, 255, 0.2)"
            : "0 6px 20px -4px rgba(0, 0, 0, 0.12), 0 0 10px -2px rgba(232, 185, 74, 0.2)"
          : "0 2px 8px -2px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* ── Proper Liquid Metal Animated Fluid Background ── */}
      <span
        className="absolute inset-0 z-0 pointer-events-none transition-all duration-700"
        style={{
          background:
            variant === "primary"
              ? `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(80, 80, 80, 0.8) 0%, rgba(20, 20, 20, 0.95) 50%, rgba(5, 5, 5, 1) 100%), linear-gradient(135deg, #18181b 0%, #09090b 25%, #27272a 50%, #09090b 75%, #18181b 100%)`
              : `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 1) 0%, rgba(245, 240, 232, 0.95) 50%, rgba(235, 230, 220, 0.9) 100%), linear-gradient(135deg, #ffffff 0%, #f4f4f5 25%, #ffffff 50%, #e4e4e7 75%, #ffffff 100%)`,
          backgroundSize: "200% 200%",
          animation: "liquid-metal-flow 6s ease infinite",
        }}
      />

      {/* ── Liquid Metallic Ripple & Shimmer Wave ── */}
      <span
        className="absolute inset-0 z-[1] pointer-events-none opacity-80"
        style={{
          background:
            variant === "primary"
              ? "linear-gradient(110deg, transparent 20%, rgba(255, 255, 255, 0.15) 45%, rgba(232, 185, 74, 0.2) 50%, rgba(184, 164, 237, 0.15) 55%, transparent 80%)"
              : "linear-gradient(110deg, transparent 20%, rgba(232, 185, 74, 0.25) 45%, rgba(255, 255, 255, 0.6) 50%, rgba(184, 164, 237, 0.2) 55%, transparent 80%)",
          backgroundSize: "200% 100%",
          animation: isHovered ? "liquid-metal-shimmer 2s linear infinite" : "liquid-metal-shimmer 4s linear infinite",
        }}
      />

      {/* ── Metallic Surface Reflection Highlight ── */}
      <span
        className="absolute top-0 inset-x-0 h-1/2 z-[2] pointer-events-none rounded-t-full"
        style={{
          background:
            variant === "primary"
              ? "linear-gradient(to bottom, rgba(255, 255, 255, 0.12), transparent)"
              : "linear-gradient(to bottom, rgba(255, 255, 255, 0.6), transparent)",
        }}
      />

      {/* ── Minimal 1px Subtle Liquid Border Accent Line ── */}
      <span
        className="absolute inset-0 z-[3] pointer-events-none rounded-full"
        style={{
          boxShadow: isHovered
            ? variant === "primary"
              ? "inset 0 0 0 1px rgba(255, 255, 255, 0.25)"
              : "inset 0 0 0 1px rgba(10, 10, 10, 0.2)"
            : variant === "primary"
            ? "inset 0 0 0 1px rgba(255, 255, 255, 0.12)"
            : "inset 0 0 0 1px rgba(10, 10, 10, 0.08)",
          transition: "box-shadow 0.3s ease",
        }}
      />

      {/* ── Button Content ── */}
      <span
        className="relative z-10 flex items-center justify-center gap-inherit font-medium"
        style={{
          textShadow:
            variant === "primary"
              ? "0 1px 2px rgba(0, 0, 0, 0.6)"
              : "0 1px 1px rgba(255, 255, 255, 0.8)",
        }}
      >
        {children}
      </span>
    </button>
  );
}

/**
 * LiquidMetalLinkWrapper — Link wrapper with proper liquid metal body and minimal border.
 */
interface LiquidMetalLinkWrapperProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
  fullWidth?: boolean;
}

export function LiquidMetalLinkWrapper({
  children,
  variant = "primary",
  size = "md",
  className,
  fullWidth = false,
}: LiquidMetalLinkWrapperProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const sizeClasses = {
    sm: "h-9 px-4 text-xs gap-1.5",
    md: "h-11 px-6 text-sm gap-2",
    lg: "h-[50px] px-8 text-sm gap-2.5",
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      className={cn(
        "relative inline-flex items-center justify-center font-medium rounded-full overflow-hidden select-none cursor-pointer transition-transform duration-300 group border",
        sizeClasses[size],
        fullWidth && "w-full",
        variant === "primary"
          ? "border-white/20 hover:border-white/40 text-white shadow-md"
          : "border-[#0a0a0a]/15 hover:border-[#0a0a0a]/30 text-[#0a0a0a] shadow-xs",
        className
      )}
      style={{
        transform: isPressed ? "scale(0.97)" : isHovered ? "scale(1.02)" : "scale(1)",
        boxShadow: isHovered
          ? variant === "primary"
            ? "0 8px 25px -4px rgba(0, 0, 0, 0.4), 0 0 15px -3px rgba(255, 255, 255, 0.2)"
            : "0 6px 20px -4px rgba(0, 0, 0, 0.12), 0 0 10px -2px rgba(232, 185, 74, 0.2)"
          : "0 2px 8px -2px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* ── Proper Liquid Metal Animated Fluid Background ── */}
      <span
        className="absolute inset-0 z-0 pointer-events-none transition-all duration-700"
        style={{
          background:
            variant === "primary"
              ? `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(80, 80, 80, 0.8) 0%, rgba(20, 20, 20, 0.95) 50%, rgba(5, 5, 5, 1) 100%), linear-gradient(135deg, #18181b 0%, #09090b 25%, #27272a 50%, #09090b 75%, #18181b 100%)`
              : `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 1) 0%, rgba(245, 240, 232, 0.95) 50%, rgba(235, 230, 220, 0.9) 100%), linear-gradient(135deg, #ffffff 0%, #f4f4f5 25%, #ffffff 50%, #e4e4e7 75%, #ffffff 100%)`,
          backgroundSize: "200% 200%",
          animation: "liquid-metal-flow 6s ease infinite",
        }}
      />

      {/* ── Liquid Metallic Ripple & Shimmer Wave ── */}
      <span
        className="absolute inset-0 z-[1] pointer-events-none opacity-80"
        style={{
          background:
            variant === "primary"
              ? "linear-gradient(110deg, transparent 20%, rgba(255, 255, 255, 0.15) 45%, rgba(232, 185, 74, 0.2) 50%, rgba(184, 164, 237, 0.15) 55%, transparent 80%)"
              : "linear-gradient(110deg, transparent 20%, rgba(232, 185, 74, 0.25) 45%, rgba(255, 255, 255, 0.6) 50%, rgba(184, 164, 237, 0.2) 55%, transparent 80%)",
          backgroundSize: "200% 100%",
          animation: isHovered ? "liquid-metal-shimmer 2s linear infinite" : "liquid-metal-shimmer 4s linear infinite",
        }}
      />

      {/* ── Metallic Surface Reflection Highlight ── */}
      <span
        className="absolute top-0 inset-x-0 h-1/2 z-[2] pointer-events-none rounded-t-full"
        style={{
          background:
            variant === "primary"
              ? "linear-gradient(to bottom, rgba(255, 255, 255, 0.12), transparent)"
              : "linear-gradient(to bottom, rgba(255, 255, 255, 0.6), transparent)",
        }}
      />

      {/* ── Minimal 1px Subtle Liquid Border Accent Line ── */}
      <span
        className="absolute inset-0 z-[3] pointer-events-none rounded-full"
        style={{
          boxShadow: isHovered
            ? variant === "primary"
              ? "inset 0 0 0 1px rgba(255, 255, 255, 0.25)"
              : "inset 0 0 0 1px rgba(10, 10, 10, 0.2)"
            : variant === "primary"
            ? "inset 0 0 0 1px rgba(255, 255, 255, 0.12)"
            : "inset 0 0 0 1px rgba(10, 10, 10, 0.08)",
          transition: "box-shadow 0.3s ease",
        }}
      />

      {/* ── Button Content ── */}
      <span
        className="relative z-10 flex items-center justify-center gap-2 font-medium"
        style={{
          textShadow:
            variant === "primary"
              ? "0 1px 2px rgba(0, 0, 0, 0.6)"
              : "0 1px 1px rgba(255, 255, 255, 0.8)",
        }}
      >
        {children}
      </span>
    </div>
  );
}
