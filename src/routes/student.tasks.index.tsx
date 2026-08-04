import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  getStoredSimulation,
  saveStoredSimulation,
  type HotelSimulationState,
} from "@/lib/hotel-simulation-store";
import { getCurrentUser } from "@/lib/mock-auth";
import {
  Home,
  Check,
  Building2,
  ExternalLink,
  RotateCcw,
  User,
  ShieldCheck,
  Building,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/student/tasks/")({
  component: StudentTasksIndexPage,
});

export function StudentTasksIndexPage() {
  const currentUser = getCurrentUser();
  const studentEmail = currentUser?.email || "";
  const navigate = useNavigate();

  const [simState, setSimState] = useState<HotelSimulationState>(() => getStoredSimulation(studentEmail));
  const [onboardingStep, setOnboardingStep] = useState<number>(1);

  // Form Inputs
  const [nameInput, setNameInput] = useState<string>(simState.studentName || "");
  const [loginIdInput, setLoginIdInput] = useState<string>(simState.loginId || "");
  const [hotelNameInput, setHotelNameInput] = useState<string>(simState.hotelName || "");

  const hotelNameSuggestions = [
    "The Park Hotel",
    "Novotel City Center",
    "Hyatt Regency",
    "Marriott Convention Hotel",
    "ITC Koheneur Luxury Suite",
    "Trident Business Hotel",
  ];

  useEffect(() => {
    const loaded = getStoredSimulation(studentEmail);
    setSimState(loaded);
    if (loaded.studentName) setNameInput(loaded.studentName);
    if (loaded.loginId) setLoginIdInput(loaded.loginId);
    if (loaded.hotelName) setHotelNameInput(loaded.hotelName);
  }, [studentEmail]);

  const handleNameChange = (val: string) => {
    setNameInput(val);
    const clean = val.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (clean) {
      setLoginIdInput(`${clean}@ihm.edu`);
    }
  };

  const suggestHotelName = () => {
    const nextIdx = (hotelNameSuggestions.indexOf(hotelNameInput) + 1) % hotelNameSuggestions.length;
    setHotelNameInput(hotelNameSuggestions[nextIdx]);
  };

  const handleCompleteOnboarding = () => {
    const updated: HotelSimulationState = {
      ...simState,
      studentName: nameInput,
      loginId: loginIdInput,
      studentEmail: loginIdInput ? `${loginIdInput}@ihm.edu` : simState.studentEmail,
      hotelName: hotelNameInput,
      task1HotelName: hotelNameInput,
      task1ManagerName: nameInput,
      managerUsername: loginIdInput,
      isOnboarded: true,
    };
    setSimState(updated);
    saveStoredSimulation(updated);
    navigate({ to: "/student/lab" as any });
  };

  return (
    <div className="min-h-[calc(100vh-110px)] flex flex-col justify-between p-4 sm:p-6 font-sans select-none max-w-5xl mx-auto w-full">
      {/* Header */}
      <div className="shrink-0 space-y-1 text-center sm:text-left">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0a0a0a]">
          Hotel Front Office Management Simulation Lab
        </h1>
        <p className="text-xs text-[#6a6a6a]">
          Complete your digital hotel setup to access the standalone revenue forecasting, capital budgeting, and P&L lab.
        </p>
      </div>

      {/* Onboarding Wizard View */}
      {!simState.isOnboarded ? (
        <div className="flex-1 flex flex-col items-center justify-center py-6 my-auto">
          {/* Header Branding */}
          <div className="flex flex-col items-center gap-1.5 mb-6 text-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#1d4ed8] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                IHM
              </div>
              <span className="text-[11px] font-extrabold tracking-[0.15em] text-[#64748b] uppercase">
                FRONT OFFICE DIGITAL LAB
              </span>
            </div>

            {/* Indicator Pills */}
            <div className="flex items-center gap-1.5 mt-2">
              {[1, 2, 3, 4].map((stepNum) => (
                <div
                  key={stepNum}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    stepNum === onboardingStep
                      ? "w-8 bg-[#1d4ed8]"
                      : stepNum < onboardingStep
                      ? "w-8 bg-[#0a0a0a]"
                      : "w-8 bg-[#e2e8f0]"
                  )}
                />
              ))}
            </div>
          </div>

          {/* STEP 1: WELCOME */}
          {onboardingStep === 1 && (
            <div className="bg-white border border-[#e2e8f0] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-lg text-left space-y-5 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-10 h-10 rounded-2xl bg-[#eff6ff] text-[#1d4ed8] flex items-center justify-center">
                <Home className="w-5 h-5" />
              </div>

              <div className="space-y-1.5">
                <h2 className="text-xl font-bold tracking-tight text-[#0f172a]">
                  Welcome to Front Office Digital Lab
                </h2>
                <p className="text-xs text-[#64748b] leading-relaxed">
                  A short setup before you begin — three simple steps. This creates your hotel property and profile for the forecasting, capital budgeting, and P&L lab.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setOnboardingStep(2)}
                  className="w-full py-3 px-5 rounded-2xl bg-[#0a0a0a] text-white text-xs font-semibold hover:bg-black transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  Get Started →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: STUDENT PROFILE */}
          {onboardingStep === 2 && (
            <div className="bg-white border border-[#e2e8f0] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-lg text-left space-y-5 animate-in fade-in zoom-in-95 duration-200">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-[#1d4ed8] uppercase block">
                  STEP 2 OF 4
                </span>
                <h2 className="text-xl font-bold tracking-tight text-[#0f172a] mt-0.5">
                  Student Profile & Identification
                </h2>
                <p className="text-xs text-[#64748b] mt-0.5">
                  This appears on your forecasts, budgets, and final certificates.
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-[#0f172a] mb-1">
                    Student Full Name
                  </label>
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="Enter Student Name"
                    className="w-full px-4 py-2.5 text-xs rounded-2xl border border-[#e2e8f0] bg-white font-medium focus:outline-none focus:border-[#1d4ed8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0f172a] mb-1">
                    Student Login ID
                  </label>
                  <input
                    type="text"
                    value={loginIdInput}
                    onChange={(e) => setLoginIdInput(e.target.value)}
                    placeholder="Enter Student Login ID (e.g. student@ihm.edu)"
                    className="w-full px-4 py-2.5 text-xs rounded-2xl border border-[#e2e8f0] bg-white font-medium focus:outline-none focus:border-[#1d4ed8]"
                  />
                  <span className="text-[10px] text-[#94a3b8] mt-1 block">
                    Auto-generated from name — edit if required.
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setOnboardingStep(1)}
                  className="px-4 py-2 rounded-2xl border border-[#e2e8f0] text-xs font-semibold text-[#0f172a] hover:bg-gray-50 transition-colors"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setOnboardingStep(3)}
                  className="py-2.5 px-5 rounded-2xl bg-[#0a0a0a] text-white text-xs font-semibold hover:bg-black transition-all shadow-sm flex items-center gap-1.5"
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: HOTEL NAME */}
          {onboardingStep === 3 && (
            <div className="bg-white border border-[#e2e8f0] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-lg text-left space-y-5 animate-in fade-in zoom-in-95 duration-200">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-[#1d4ed8] uppercase block">
                  STEP 3 OF 4
                </span>
                <h2 className="text-xl font-bold tracking-tight text-[#0f172a] mt-0.5">
                  Hotel Property Name
                </h2>
                <p className="text-xs text-[#64748b] mt-0.5">
                  You will manage this property through all simulation tasks.
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-[#0f172a] mb-1">
                    Hotel Property Name
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={hotelNameInput}
                      onChange={(e) => setHotelNameInput(e.target.value)}
                      placeholder="Enter Hotel Property Name"
                      className="w-full px-4 py-2.5 text-xs rounded-2xl border border-[#e2e8f0] bg-white font-medium focus:outline-none focus:border-[#1d4ed8]"
                    />
                    <button
                      type="button"
                      onClick={suggestHotelName}
                      className="px-3.5 py-2.5 rounded-2xl border border-[#e2e8f0] text-xs font-bold text-[#0f172a] hover:bg-gray-50 shrink-0"
                    >
                      Suggest
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setOnboardingStep(2)}
                  className="px-4 py-2 rounded-2xl border border-[#e2e8f0] text-xs font-semibold text-[#0f172a] hover:bg-gray-50 transition-colors"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setOnboardingStep(4)}
                  className="py-2.5 px-5 rounded-2xl bg-[#0a0a0a] text-white text-xs font-semibold hover:bg-black transition-all shadow-sm flex items-center gap-1.5"
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: CONFIRMATION & REDIRECT */}
          {onboardingStep === 4 && (
            <div className="bg-white border border-[#e2e8f0] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-lg text-left space-y-5 animate-in fade-in zoom-in-95 duration-200">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-[#1d4ed8] uppercase block">
                  STEP 4 OF 4
                </span>
                <h2 className="text-xl font-bold tracking-tight text-[#0f172a] mt-0.5">
                  Confirm Setup Details
                </h2>
                <p className="text-xs text-[#64748b] mt-0.5">
                  Review your profile and property setup before launching the lab.
                </p>
              </div>

              <div className="bg-[#f8fafc] p-4 rounded-2xl border border-[#e2e8f0] space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-[#64748b]">Student Name:</span>
                  <span className="font-bold text-[#0f172a]">{nameInput || "Not Specified"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748b]">Login ID:</span>
                  <span className="font-bold text-[#1d4ed8]">{loginIdInput || "Not Specified"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748b]">Hotel Property:</span>
                  <span className="font-bold text-emerald-600">{hotelNameInput || "Not Specified"}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setOnboardingStep(3)}
                  className="px-4 py-2 rounded-2xl border border-[#e2e8f0] text-xs font-semibold text-[#0f172a] hover:bg-gray-50 transition-colors"
                >
                  ← Edit
                </button>
                <button
                  onClick={handleCompleteOnboarding}
                  className="py-3 px-6 rounded-2xl bg-[#1d4ed8] text-white text-xs font-bold hover:bg-blue-700 transition-all shadow-md flex items-center gap-2"
                >
                  <span>Launch Simulation Lab</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* ALREADY ONBOARDED SUMMARY VIEW */
        <div className="bg-white border border-[#e2e8f0] rounded-3xl p-6 sm:p-8 max-w-xl mx-auto w-full my-auto shadow-md space-y-6 text-left">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-[#1d4ed8] uppercase">
                ACTIVE LAB SESSION
              </span>
              <h2 className="text-xl font-bold text-[#0f172a] mt-0.5">
                {simState.hotelName || "Hotel Simulation Property"}
              </h2>
              <p className="text-xs text-[#64748b]">Student: {simState.studentName || "Student"}</p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
              ✓
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 bg-[#f8fafc] rounded-xl border">
              <span className="text-[#64748b]">Login ID:</span>
              <div className="font-bold text-[#0f172a] truncate">{simState.loginId || simState.studentEmail}</div>
            </div>
            <div className="p-3 bg-[#f8fafc] rounded-xl border">
              <span className="text-[#64748b]">Current Progress:</span>
              <div className="font-bold text-[#1d4ed8]">Step {simState.currentStepPage || 1} of 25</div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={() => {
                setSimState({ ...simState, isOnboarded: false });
                setOnboardingStep(2);
              }}
              className="px-4 py-2 border border-[#cbd5e1] rounded-xl text-xs font-bold text-[#475569] flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Re-configure
            </button>

            <button
              onClick={() => navigate({ to: "/student/lab" as any })}
              className="px-6 py-2.5 bg-[#1d4ed8] text-white rounded-xl text-xs font-bold hover:bg-blue-700 flex items-center gap-2 shadow-md"
            >
              <span>Launch Simulation Lab</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
