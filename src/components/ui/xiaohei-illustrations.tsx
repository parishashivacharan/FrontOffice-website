import React from "react";

// Hand-drawn "Xiaohei" / "Little Black" (小黑) SVG Illustrations
// Style: 16:9 aspect ratio, pure white background, black line art, blank expression (solid black body, white dot eyes, thin legs), sparse handwritten annotations in red/blue/orange.

export function XiaoheiSimulationIllustration({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full aspect-[16/9] bg-white rounded-3xl border border-[#e5e5e5] p-4 flex flex-col justify-between select-none ${className}`}>
      <svg viewBox="0 0 800 450" className="w-full h-full text-[#0a0a0a]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Pure White Canvas Background */}
        <rect x="0" y="0" width="800" height="450" fill="#ffffff" stroke="none" />

        {/* Outer Frame - Hand-drawn Line */}
        <rect x="20" y="20" width="760" height="410" stroke="#0a0a0a" strokeWidth="2" strokeDasharray="400 4" rx="8" />

        {/* Market Simulation Chart Grid & Lines */}
        <path d="M 120 340 L 680 340" stroke="#0a0a0a" strokeWidth="3" />
        <path d="M 120 120 L 120 340" stroke="#0a0a0a" strokeWidth="3" />

        {/* Hand-drawn Trend Lines */}
        <path d="M 140 310 Q 240 280, 320 190 T 520 160 T 660 110" stroke="#0a0a0a" strokeWidth="3.5" fill="none" />
        <path d="M 140 330 Q 260 250, 360 270 T 540 210 T 660 170" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="6 4" fill="none" />

        {/* Chart Data Nodes */}
        <circle cx="320" cy="190" r="5" fill="#0a0a0a" />
        <circle cx="520" cy="160" r="5" fill="#0a0a0a" />
        <circle cx="660" cy="110" r="6" fill="#ef4444" />

        {/* ── Xiaohei (Little Black Figure) ── */}
        {/* Solid Black Body */}
        <ellipse cx="230" cy="240" rx="22" ry="42" fill="#0a0a0a" stroke="none" />
        {/* Xiaohei Head */}
        <circle cx="230" cy="175" r="24" fill="#0a0a0a" stroke="none" />
        {/* Blank White Dot Eyes */}
        <circle cx="222" cy="172" r="3.5" fill="#ffffff" stroke="none" />
        <circle cx="238" cy="172" r="3.5" fill="#ffffff" stroke="none" />
        {/* Thin Stick Legs */}
        <path d="M 220 280 L 215 340 M 240 280 L 245 340" stroke="#0a0a0a" strokeWidth="3" />
        {/* Thin Stick Arms pointing to chart */}
        <path d="M 210 230 L 180 260 M 250 230 L 310 200" stroke="#0a0a0a" strokeWidth="3" />

        {/* Handwritten Annotations (Red / Blue) */}
        <text x="330" y="180" fill="#ef4444" fontSize="16" fontFamily="sans-serif" fontWeight="bold" stroke="none">
          Round 9 Peak GOPPAR +24.8%
        </text>
        <path d="M 330 185 L 390 185" stroke="#ef4444" strokeWidth="1.5" />

        <text x="540" y="90" fill="#2563eb" fontSize="15" fontFamily="sans-serif" fontWeight="bold" stroke="none">
          STR Market Benchmark Index (112.4)
        </text>
        <path d="M 640 100 L 655 106" stroke="#2563eb" strokeWidth="2" />

        <text x="40" y="60" fill="#0a0a0a" fontSize="18" fontFamily="sans-serif" fontWeight="800" stroke="none">
          小黑 Hotel Simulation Scorecard
        </text>
      </svg>
    </div>
  );
}

export function XiaoheiAttendanceIllustration({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full aspect-[16/9] bg-white rounded-3xl border border-[#e5e5e5] p-4 flex flex-col justify-between select-none ${className}`}>
      <svg viewBox="0 0 800 450" className="w-full h-full text-[#0a0a0a]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="0" y="0" width="800" height="450" fill="#ffffff" stroke="none" />
        <rect x="20" y="20" width="760" height="410" stroke="#0a0a0a" strokeWidth="2" strokeDasharray="400 4" rx="8" />

        {/* Giant Hand-drawn Clipboard */}
        <rect x="360" y="70" width="340" height="310" stroke="#0a0a0a" strokeWidth="3" fill="#ffffff" rx="12" />
        <rect x="480" y="55" width="100" height="30" stroke="#0a0a0a" strokeWidth="2.5" fill="#0a0a0a" rx="4" />

        {/* Checklist Rows */}
        <path d="M 390 130 L 670 130 M 390 180 L 670 180 M 390 230 L 670 230 M 390 280 L 670 280 M 390 330 L 670 330" stroke="#e5e5e5" strokeWidth="2" />

        {/* Handwritten Checkmarks */}
        <path d="M 400 120 L 410 132 L 430 110" stroke="#22c55e" strokeWidth="4" />
        <path d="M 400 170 L 410 182 L 430 160" stroke="#22c55e" strokeWidth="4" />
        <path d="M 400 220 L 410 232 L 430 210" stroke="#22c55e" strokeWidth="4" />
        <path d="M 405 275 L 425 265 M 405 265 L 425 275" stroke="#ef4444" strokeWidth="3.5" />

        {/* ── Xiaohei holding marker ── */}
        <ellipse cx="200" cy="250" rx="24" ry="46" fill="#0a0a0a" stroke="none" />
        <circle cx="200" cy="180" r="26" fill="#0a0a0a" stroke="none" />
        <circle cx="190" cy="177" r="4" fill="#ffffff" stroke="none" />
        <circle cx="208" cy="177" r="4" fill="#ffffff" stroke="none" />
        <path d="M 190 295 L 185 360 M 210 295 L 215 360" stroke="#0a0a0a" strokeWidth="3.5" />
        {/* Arm reaching out to clipboard */}
        <path d="M 220 235 L 390 175" stroke="#0a0a0a" strokeWidth="3.5" />

        {/* Annotations */}
        <text x="450" y="125" fill="#0a0a0a" fontSize="14" fontFamily="sans-serif" fontWeight="bold" stroke="none">Batch A - Roll 2541112001 (Present)</text>
        <text x="450" y="175" fill="#0a0a0a" fontSize="14" fontFamily="sans-serif" fontWeight="bold" stroke="none">Batch B - Roll 2541112028 (Present)</text>
        <text x="450" y="225" fill="#0a0a0a" fontSize="14" fontFamily="sans-serif" fontWeight="bold" stroke="none">Batch C - Roll 2541112054 (Present)</text>
        <text x="450" y="275" fill="#ef4444" fontSize="14" fontFamily="sans-serif" fontWeight="bold" stroke="none">Batch D - Absent (Leave Granted)</text>

        <text x="40" y="60" fill="#ef4444" fontSize="18" fontFamily="sans-serif" fontWeight="800" stroke="none">
          小黑 105-Student Batch Roster Sheet
        </text>
      </svg>
    </div>
  );
}

export function XiaoheiSubmissionsIllustration({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full aspect-[16/9] bg-white rounded-3xl border border-[#e5e5e5] p-4 flex flex-col justify-between select-none ${className}`}>
      <svg viewBox="0 0 800 450" className="w-full h-full text-[#0a0a0a]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="0" y="0" width="800" height="450" fill="#ffffff" stroke="none" />
        <rect x="20" y="20" width="760" height="410" stroke="#0a0a0a" strokeWidth="2" strokeDasharray="400 4" rx="8" />

        {/* Task Assignment Document Stack */}
        <rect x="420" y="90" width="280" height="300" stroke="#0a0a0a" strokeWidth="3" fill="#ffffff" rx="8" />
        <path d="M 450 140 L 670 140 M 450 180 L 670 180 M 450 220 L 670 220 M 450 260 L 620 260" stroke="#0a0a0a" strokeWidth="2.5" />

        {/* Big Grade Stamp (Red) */}
        <circle cx="600" cy="310" r="45" stroke="#ef4444" strokeWidth="3.5" strokeDasharray="8 4" fill="none" />
        <text x="575" y="318" fill="#ef4444" fontSize="22" fontFamily="sans-serif" fontWeight="900" stroke="none">28/30</text>

        {/* ── Xiaohei inspecting ── */}
        <ellipse cx="220" cy="240" rx="22" ry="42" fill="#0a0a0a" stroke="none" />
        <circle cx="220" cy="175" r="24" fill="#0a0a0a" stroke="none" />
        <circle cx="212" cy="172" r="3.5" fill="#ffffff" stroke="none" />
        <circle cx="228" cy="172" r="3.5" fill="#ffffff" stroke="none" />
        <path d="M 210 280 L 205 340 M 230 280 L 235 340" stroke="#0a0a0a" strokeWidth="3" />
        <path d="M 240 220 L 410 160" stroke="#0a0a0a" strokeWidth="3.5" />

        {/* Annotation */}
        <text x="445" y="125" fill="#2563eb" fontSize="16" fontFamily="sans-serif" fontWeight="bold" stroke="none">
          Unit 1 Hubbart Formula Work Sheet
        </text>
        <text x="40" y="60" fill="#0a0a0a" fontSize="18" fontFamily="sans-serif" fontWeight="800" stroke="none">
          小黑 Student Task Evaluation
        </text>
      </svg>
    </div>
  );
}
