import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  getStoredSimulation,
  saveStoredSimulation,
  clearStoredSimulation,
  calculateRevenueForecast,
  calculateTask2Matrix,
  calculateFOBudget,
  calculateHKBudget,
  calculateBudgetTotals,
  calculateMonthlyPnL,
  calculatePerformanceScores,
  INITIAL_SIMULATION_STATE,
  type HotelSimulationState,
} from "@/lib/hotel-simulation-store";
import { getCurrentUser } from "@/lib/mock-auth";
import {
  Building2,
  TrendingUp,
  PieChart,
  DollarSign,
  Award,
  LayoutDashboard,
  ArrowLeft,
  CheckCircle2,
  Printer,
  ShieldCheck,
  BarChart3,
  QrCode,
  ArrowRight,
  ChevronRight,
  FileText,
  HelpCircle,
  LogOut,
  ListTodo,
  BookOpen,
  Calculator,
  AlertCircle,
  Mail,
  UserCheck,
  RotateCcw,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/student/lab")({
  component: StudentLabPage,
});

export function StudentLabPage() {
  const currentUser = getCurrentUser();
  const studentEmail = currentUser?.email || "";
  const navigate = useNavigate();

  const [simState, setSimState] = useState<HotelSimulationState>(() => getStoredSimulation(studentEmail));
  const [currentPage, setCurrentPage] = useState<number>(() => simState.currentStepPage || 1);
  const [activeMenu, setActiveMenu] = useState<string>("dashboard");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const loaded = getStoredSimulation(studentEmail);
    setSimState(loaded);
    if (loaded.currentStepPage) {
      setCurrentPage(loaded.currentStepPage);
    }
  }, [studentEmail]);

  const updateSimState = (partial: Partial<HotelSimulationState>) => {
    const updated = { ...simState, ...partial };
    setSimState(updated);
    saveStoredSimulation(updated);
  };

  const resetAllPracticeData = () => {
    if (window.confirm("Are you sure you want to clear all entered practice data and start completely fresh?")) {
      clearStoredSimulation(studentEmail);
      setSimState(INITIAL_SIMULATION_STATE);
      setCurrentPage(1);
      setActiveMenu("dashboard");
      setToastMessage("All practice data cleared. You can now fill everything fresh!");
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    setActiveMenu("simulation");
    setIsMobileMenuOpen(false);
    updateSimState({ currentStepPage: page });
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Calculations Engine
  const task1Forecast = calculateRevenueForecast(
    simState.task1Rooms,
    simState.task1Adr,
    simState.task1Occupancy,
    simState.task1Days || 365
  );

  const task2Matrix = calculateTask2Matrix(
    simState.task1Rooms || 100,
    simState.task2Season === "Festival Peak Season" ? 18000 : simState.task2Season === "Summer Season" ? 12000 : 15000,
    simState.task2Season === "Festival Peak Season" ? 85 : simState.task2Season === "Monsoon Season" ? 55 : 70,
    365
  );

  const foBudget = calculateFOBudget(simState.frontOfficeItems, simState.foCapitalBudget);
  const hkBudget = calculateHKBudget(simState.housekeepingItems, simState.hkCapitalBudget);
  const combinedBudget = calculateBudgetTotals(
    simState.frontOfficeItems,
    simState.housekeepingItems,
    simState.foCapitalBudget + simState.hkCapitalBudget
  );

  const pnl = calculateMonthlyPnL(simState);
  const scores = calculatePerformanceScores(
    simState.task1Occupancy,
    combinedBudget.remainingBudget,
    simState.frontOfficeItems,
    simState.housekeepingItems
  );

  const handleFOItemActualChange = (id: string, val: number) => {
    const updatedFO = simState.frontOfficeItems.map((item) =>
      item.id === id ? { ...item, actualCost: val } : item
    );
    updateSimState({ frontOfficeItems: updatedFO });
  };

  const handleHKItemActualChange = (id: string, val: number) => {
    const updatedHK = simState.housekeepingItems.map((item) =>
      item.id === id ? { ...item, actualCost: val } : item
    );
    updateSimState({ housekeepingItems: updatedHK });
  };

  const handleSubmitSimulation = () => {
    updateSimState({
      isSubmitted: true,
      submittedAt: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
    });
    triggerToast("Official simulation report submitted to faculty portal!");
  };

  const getModuleInfo = () => {
    if (activeMenu === "guidelines") {
      return { title: "Support", step: "Reference Center", module: "Help & Guidelines" };
    }
    if (currentPage <= 3) return { title: "Overview", step: `Step ${currentPage} of 3`, module: "Dashboard" };
    if (currentPage <= 6) return { title: "Hotel Setup", step: `Step ${currentPage - 3} of 3`, module: "Hotel Creation & Briefing" };
    if (currentPage <= 10) return { title: "Simulation", step: `Task 1 · Step ${currentPage - 6} of 4`, module: "Revenue Forecasting" };
    if (currentPage <= 12) return { title: "Simulation", step: `Task 2 · Step ${currentPage - 10} of 2`, module: "Scenario Analysis" };
    if (currentPage <= 20) return { title: "Simulation", step: `Step ${currentPage - 12} of 8`, module: "Capital Budgeting" };
    if (currentPage <= 22) return { title: "Reports", step: `Step ${currentPage - 20} of 2`, module: "Operating P&L Statements" };
    if (currentPage <= 24) return { title: "Reports", step: `Step ${currentPage - 22} of 2`, module: "Executive Cockpit & Evaluation" };
    return { title: "Certificate", step: "Final Verification", module: "IIHM Certificate" };
  };

  const activeModule = getModuleInfo();
  const displayHotelName = simState.hotelName.trim() || "Configure Property";
  const displayStudentName = simState.studentName.trim() || "Student";
  const displayRole = simState.selectedRole || "Manager";

  // Dynamic QR Code Verification Payload for Camera Scanning
  const qrVerificationUrl = `https://ihm-hyderabad.edu.in/verify-certificate?cert=IIHM-SIM-2026-95&student=${encodeURIComponent(
    displayStudentName
  )}&hotel=${encodeURIComponent(displayHotelName)}`;

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
    qrVerificationUrl
  )}`;

  return (
    <div className="h-screen w-screen bg-[#f8fafc] text-[#0f172a] font-sans flex overflow-hidden">
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#0f172a] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-semibold animate-in fade-in border border-[#334155] no-print">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* MOBILE BACKDROP OVERLAY */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-xs no-print"
        />
      )}

      {/* FIXED RESPONSIVE ENTERPRISE SIDEBAR */}
      <aside
        className={cn(
          "w-64 h-full bg-[#0b1329] text-white flex flex-col justify-between shrink-0 fixed left-0 top-0 bottom-0 z-40 border-r border-[#1e293b] transition-transform duration-300 ease-in-out no-print",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div>
          <div className="p-5 flex items-center justify-between border-b border-[#1e293b]/60">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#2563eb] text-white flex items-center justify-center font-black text-xs shadow-lg shadow-blue-600/30 ring-2 ring-blue-400/20">
                IHM
              </div>
              <div className="overflow-hidden">
                <div className="text-xs font-black tracking-widest uppercase text-white leading-tight">
                  HOTEL SIM LAB
                </div>
                <div className="text-[11px] text-[#94a3b8] font-medium truncate mt-0.5">
                  {displayHotelName}
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden text-[#94a3b8] hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="px-4 py-5 space-y-6">
            <div>
              <div className="px-3 text-[10px] font-extrabold uppercase tracking-widest text-[#64748b] mb-2.5">
                MAIN MENU
              </div>
              <nav className="space-y-1">
                {[
                  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, targetPage: 3 },
                  { id: "hotel", label: "My Hotel", icon: Building2, targetPage: 4 },
                  { id: "tasks", label: "Tasks", icon: ListTodo, targetPage: 7 },
                  { id: "reports", label: "Reports", icon: BarChart3, targetPage: 21 },
                  { id: "progress", label: "My Progress", icon: Award, targetPage: 24 },
                  { id: "certificate", label: "Certificate", icon: ShieldCheck, targetPage: 25 },
                  { id: "guidelines", label: "Help & Guidelines", icon: HelpCircle, targetPage: 0 },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    (item.id === "guidelines" && activeMenu === "guidelines") ||
                    (activeMenu !== "guidelines" &&
                      ((item.id === "dashboard" && currentPage <= 3) ||
                        (item.id === "hotel" && currentPage >= 4 && currentPage <= 6) ||
                        (item.id === "tasks" && currentPage >= 7 && currentPage <= 20) ||
                        (item.id === "reports" && currentPage >= 21 && currentPage <= 23) ||
                        (item.id === "progress" && currentPage === 24) ||
                        (item.id === "certificate" && currentPage === 25)));

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        if (item.id === "guidelines") {
                          setActiveMenu("guidelines");
                        } else {
                          setActiveMenu(item.id);
                          goToPage(item.targetPage);
                        }
                        setIsMobileMenuOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group",
                        isActive
                          ? "bg-[#2563eb] text-white shadow-md shadow-blue-600/20 font-bold"
                          : "text-[#94a3b8] hover:text-white hover:bg-[#1e293b]/70"
                      )}
                    >
                      <Icon className={cn("w-4 h-4 shrink-0 transition-colors", isActive ? "text-white" : "text-[#64748b] group-hover:text-white")} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-[#1e293b]/60 space-y-2">
          <button
            onClick={resetAllPracticeData}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-semibold hover:bg-slate-700 hover:text-white transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Practice Data</span>
          </button>

          <button
            onClick={() => navigate({ to: "/" as any })}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-[#334155] text-xs font-bold text-[#94a3b8] hover:text-white hover:bg-[#1e293b] transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN WORKSPACE WRAPPER */}
      <div className="flex-1 flex flex-col h-full lg:ml-64 min-w-0 overflow-hidden bg-[#f8fafc]">
        {/* RESPONSIVE TOP BAR HEADER */}
        <header className="h-14 bg-white border-b border-[#e2e8f0] px-4 sm:px-6 flex items-center justify-between shrink-0 z-20 no-print">
          <div className="flex items-center gap-2 text-xs overflow-hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 mr-1"
            >
              <Menu className="w-5 h-5" />
            </button>

            <span className="font-semibold text-[#64748b] hidden sm:inline">{activeModule.title}</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300 hidden sm:inline" />
            <span className="font-bold text-[#0f172a] truncate">{activeModule.module}</span>
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[#64748b] text-[10px] font-bold ml-1 shrink-0">
              {activeModule.step}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs shrink-0">
            {activeMenu !== "guidelines" && currentPage > 1 && (
              <button
                onClick={() => goToPage(currentPage - 1)}
                className="px-3 py-1.5 rounded-xl border border-[#cbd5e1] hover:bg-slate-50 text-[#475569] font-bold flex items-center gap-1 transition-all"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Previous</span>
              </button>
            )}
            {activeMenu !== "guidelines" && currentPage < 25 && (
              <button
                onClick={() => goToPage(currentPage + 1)}
                className="px-3.5 py-1.5 bg-[#2563eb] text-white rounded-xl font-bold hover:bg-blue-700 flex items-center gap-1 shadow-sm transition-all"
              >
                <span className="hidden sm:inline">Next</span> <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </header>

        {/* RESPONSIVE SCROLLABLE WORKSPACE */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          <div className="max-w-5xl mx-auto h-full flex flex-col justify-center">

            {/* DEDICATED HELP CENTER & GUIDELINES VIEW */}
            {activeMenu === "guidelines" && (
              <div className="bg-white p-6 sm:p-8 md:p-10 rounded-3xl border border-[#e2e8f0] shadow-sm space-y-8 my-auto max-w-4xl mx-auto w-full">
                <div className="border-b border-[#f1f5f9] pb-6 flex items-center justify-between">
                  <div>
                    <span className="px-3.5 py-1 rounded-full bg-blue-50 text-[#2563eb] text-xs font-extrabold border border-blue-200">
                      IHM HYDERABAD ACADEMIC KNOWLEDGE CENTER
                    </span>
                    <h1 className="text-xl sm:text-2xl font-black text-[#0f172a] mt-2">
                      Simulator Help & Operational Guidelines
                    </h1>
                    <p className="text-xs text-[#64748b] mt-1">
                      Complete reference guide for revenue formulas, capital budgeting rules, and simulation workflows.
                    </p>
                  </div>
                  <HelpCircle className="w-10 h-10 text-[#2563eb]/20 shrink-0 hidden sm:block" />
                </div>

                <div className="space-y-6 text-xs text-[#475569]">
                  <div className="p-5 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] space-y-2">
                    <h3 className="font-extrabold text-sm text-[#0f172a] flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-[#2563eb]" /> 1. How to Use the Simulator
                    </h3>
                    <p className="leading-relaxed">
                      Follow the sequential 25-page workflow: authenticate your identity, initialize your hotel property, choose your management position, calculate revenue forecasts, audit Front Office & Housekeeping capital procurement within ₹40,00,000 budget limits, and generate final operating P&L reports.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-200/60 space-y-2">
                      <h4 className="font-extrabold text-xs text-[#2563eb] flex items-center gap-1.5">
                        <Calculator className="w-4 h-4" /> Revenue Forecasting Formulas
                      </h4>
                      <div className="space-y-1 font-mono text-[11px] text-[#1e293b]">
                        <div>• Available Nights = Rooms × Days (365)</div>
                        <div>• Rooms Sold = Available Nights × Occupancy %</div>
                        <div>• Room Revenue = Rooms Sold × ADR (₹)</div>
                        <div>• RevPAR = Room Revenue ÷ Available Nights</div>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200/60 space-y-2">
                      <h4 className="font-extrabold text-xs text-emerald-800 flex items-center gap-1.5">
                        <Calculator className="w-4 h-4" /> Capital Budgeting Formulas
                      </h4>
                      <div className="space-y-1 font-mono text-[11px] text-[#064e3b]">
                        <div>• Item Variance = Budgeted Cost - Actual Cost</div>
                        <div>• Remaining FO Budget = ₹20,00,000 - Total FO Actual</div>
                        <div>• Remaining HK Budget = ₹20,00,000 - Total HK Actual</div>
                        <div>• Combined Remaining = ₹40,00,000 - Total Spend</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <div className="font-bold text-[#0f172a] mb-1">RevPAR (Revenue Per Available Room)</div>
                      <p className="text-[11px] text-[#64748b]">
                        RevPAR evaluates overall room yield efficiency by combining room rates (ADR) and occupancy performance into a single core metric.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <div className="font-bold text-[#0f172a] mb-1">Budget Variance Analysis</div>
                      <p className="text-[11px] text-[#64748b]">
                        Positive variance (+₹) represents cost savings under budget. Negative variance (-₹) represents budget overruns that penalize overall competency score.
                      </p>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] space-y-3">
                    <h3 className="font-extrabold text-sm text-[#0f172a] flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-[#2563eb]" /> Frequently Asked Questions (FAQ)
                    </h3>
                    <div className="space-y-2 text-[11px]">
                      <div>
                        <span className="font-bold text-[#0f172a]">Q: Can I modify item names in FO/HK tables?</span>
                        <p className="text-[#64748b]">A: No. The 13 Front Office and 19 Housekeeping items are fixed academic assessment criteria. Enter your Actual Cost values only.</p>
                      </div>
                      <div>
                        <span className="font-bold text-[#0f172a]">Q: How is my final competency score calculated?</span>
                        <p className="text-[#64748b]">A: Score is calculated out of 100 points across Revenue Yield (30), Budget Control (30), and Procurement Entry Completion (40).</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#64748b]">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#2563eb]" />
                      <span>Faculty Help Desk: <strong className="text-[#0f172a]">frontoffice@ihm.edu.in</strong></span>
                    </div>
                    <button
                      onClick={() => goToPage(currentPage || 1)}
                      className="px-5 py-2 bg-[#2563eb] text-white rounded-xl font-bold hover:bg-blue-700 flex items-center gap-1.5 shadow-sm"
                    >
                      <span>Return to Simulation</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* PAGE 1: LANDING PAGE */}
            {activeMenu !== "guidelines" && currentPage === 1 && (
              <div className="bg-white p-6 sm:p-8 md:p-10 rounded-3xl border border-[#e2e8f0] shadow-sm space-y-8 my-auto">
                <div className="text-center space-y-3">
                  <span className="px-3.5 py-1 rounded-full bg-blue-50 text-[#2563eb] text-xs font-extrabold border border-blue-200">
                    INSTITUTE OF HOTEL MANAGEMENT
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight">
                    Hotel Management Simulation Lab
                  </h1>
                  <p className="text-xs sm:text-sm text-[#64748b] max-w-xl mx-auto leading-relaxed">
                    Master Front Office Revenue Forecasting, Capital Budgeting, and Monthly P&L Operations through real-world PMS simulation.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-5 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] space-y-2">
                    <TrendingUp className="w-6 h-6 text-[#2563eb]" />
                    <h3 className="font-bold text-xs text-[#0f172a]">Revenue Forecasting</h3>
                    <p className="text-[11px] text-[#64748b] leading-relaxed">Calculate available nights, rooms sold, RevPAR, and ADR metrics.</p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] space-y-2">
                    <Building2 className="w-6 h-6 text-emerald-600" />
                    <h3 className="font-bold text-xs text-[#0f172a]">Capital Budgeting</h3>
                    <p className="text-[11px] text-[#64748b] leading-relaxed">Manage ₹20,00,000 budgets for FO & Housekeeping separately.</p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] space-y-2">
                    <BarChart3 className="w-6 h-6 text-indigo-600" />
                    <h3 className="font-bold text-xs text-[#0f172a]">Operating P&L</h3>
                    <p className="text-[11px] text-[#64748b] leading-relaxed">Generate Monthly Revenue & Expense statements and track GOP.</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#f1f5f9] flex justify-end">
                  <button
                    onClick={() => goToPage(2)}
                    className="w-full sm:w-auto px-6 py-3 bg-[#2563eb] text-white rounded-xl text-xs font-bold hover:bg-blue-700 flex items-center justify-center gap-2 shadow-md transition-all"
                  >
                    <span>Start Simulation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* PAGE 2: STUDENT LOGIN */}
            {activeMenu !== "guidelines" && currentPage === 2 && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#e2e8f0] shadow-sm max-w-md mx-auto my-auto space-y-6 w-full">
                <div className="text-center space-y-1">
                  <h2 className="text-xl font-extrabold text-[#0f172a]">Student Authentication</h2>
                  <p className="text-xs text-[#64748b]">Enter your academic credentials to initiate your lab session.</p>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-[#475569] mb-1">Roll Number</label>
                    <input
                      type="text"
                      placeholder="Enter Roll Number"
                      value={simState.studentRoll}
                      onChange={(e) => updateSimState({ studentRoll: e.target.value, collegeId: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#cbd5e1] font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#475569] mb-1">Student Full Name</label>
                    <input
                      type="text"
                      placeholder="Enter Full Name"
                      value={simState.studentName}
                      onChange={(e) => updateSimState({ studentName: e.target.value, task1ManagerName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#cbd5e1] font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                <button
                  onClick={() => goToPage(3)}
                  className="w-full py-3 bg-[#2563eb] text-white rounded-xl text-xs font-bold hover:bg-blue-700 flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <span>Continue to Student Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* PAGE 3: STUDENT DASHBOARD */}
            {activeMenu !== "guidelines" && currentPage === 3 && (
              <div className="space-y-6 my-auto">
                <div className="bg-white p-6 rounded-3xl border border-[#e2e8f0] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-xl font-extrabold text-[#0f172a]">Welcome, {displayStudentName}!</h1>
                    <p className="text-xs text-[#64748b] mt-0.5">Department: {simState.department}</p>
                  </div>
                  <div className="bg-[#eff6ff] border border-[#bfdbfe] px-5 py-2.5 rounded-2xl text-right w-full sm:w-auto">
                    <div className="text-[10px] font-bold text-[#2563eb] uppercase">Competency Score</div>
                    <div className="text-2xl font-black text-[#0f172a]">
                      {scores.isStarted ? `${scores.numericScore}%` : "0%"}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0]">
                    <div className="text-xs font-bold text-[#64748b]">Revenue Forecast</div>
                    <div className="text-sm font-extrabold text-[#0f172a] mt-2">
                      {simState.task1Rooms > 0 ? "In Progress" : "Not Started"}
                    </div>
                    <button onClick={() => goToPage(7)} className="mt-3 text-xs text-[#2563eb] font-bold flex items-center gap-1">
                      Open Task <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0]">
                    <div className="text-xs font-bold text-[#64748b]">Capital Budgeting</div>
                    <div className="text-sm font-extrabold text-emerald-600 mt-2">
                      ₹40,00,000 Allocated
                    </div>
                    <button onClick={() => goToPage(13)} className="mt-3 text-xs text-[#2563eb] font-bold flex items-center gap-1">
                      Open FO Budget <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0]">
                    <div className="text-xs font-bold text-[#64748b]">Monthly Reports</div>
                    <div className="text-sm font-extrabold text-[#0f172a] mt-2">Pending Submission</div>
                    <button onClick={() => goToPage(21)} className="mt-3 text-xs text-[#2563eb] font-bold flex items-center gap-1">
                      Open Reports <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0]">
                    <div className="text-xs font-bold text-[#64748b]">Certificate Status</div>
                    <div className="text-sm font-extrabold text-amber-600 mt-2">
                      {simState.isSubmitted ? "Unlocked" : "Locked"}
                    </div>
                    <button onClick={() => goToPage(25)} className="mt-3 text-xs text-[#2563eb] font-bold flex items-center gap-1">
                      View Certificate <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => goToPage(4)}
                    className="w-full sm:w-auto px-6 py-3 bg-[#2563eb] text-white rounded-xl text-xs font-bold hover:bg-blue-700 flex items-center justify-center gap-2 shadow-md transition-all"
                  >
                    <span>Proceed to Hotel Creation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* PAGE 4: HOTEL ONBOARDING & CREATION */}
            {activeMenu !== "guidelines" && currentPage === 4 && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#e2e8f0] shadow-sm max-w-2xl mx-auto my-auto space-y-6 w-full">
                <div className="border-b border-[#f1f5f9] pb-4">
                  <h2 className="text-lg font-extrabold text-[#0f172a]">Create Property & Hotel Setup</h2>
                  <p className="text-xs text-[#64748b] mt-0.5">Initialize your custom hotel property. All simulation tasks will belong to this hotel.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-[#475569] mb-1">Hotel Property Name</label>
                    <input
                      type="text"
                      placeholder="Enter Hotel Property Name"
                      value={simState.hotelName}
                      onChange={(e) => updateSimState({ hotelName: e.target.value, task1HotelName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#cbd5e1] font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#475569] mb-1">Manager Username</label>
                    <input
                      type="text"
                      placeholder="Enter Manager Username"
                      value={simState.managerUsername}
                      onChange={(e) => updateSimState({ managerUsername: e.target.value, task1Username: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#cbd5e1] font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#475569] mb-1">Hotel Category</label>
                    <select
                      value={simState.hotelType}
                      onChange={(e) => updateSimState({ hotelType: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#cbd5e1] font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="Luxury Hotel">Luxury Hotel</option>
                      <option value="Business Hotel">Business Hotel</option>
                      <option value="Budget Hotel">Budget Hotel</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-[#475569] mb-1">Star Rating</label>
                    <select
                      value={simState.starRating}
                      onChange={(e) => updateSimState({ starRating: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#cbd5e1] font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="3★ Star">3★ Star</option>
                      <option value="4★ Star">4★ Star</option>
                      <option value="5★ Star Luxury">5★ Star Luxury</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-[#475569] mb-1">Number of Rooms</label>
                    <select
                      value={simState.task1Rooms || 100}
                      onChange={(e) => updateSimState({ task1Rooms: Number(e.target.value), numberOfRooms: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#cbd5e1] font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value={100}>100 Rooms</option>
                      <option value={150}>150 Rooms</option>
                      <option value={200}>200 Rooms</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-[#475569] mb-1">Location / City</label>
                    <input
                      type="text"
                      placeholder="Enter Location / City"
                      value={simState.location}
                      onChange={(e) => updateSimState({ location: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#cbd5e1] font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                <button
                  onClick={() => {
                    updateSimState({ isHotelCreated: true });
                    triggerToast(`Created Hotel: ${displayHotelName}`);
                    goToPage(5);
                  }}
                  className="w-full py-3 bg-[#2563eb] text-white rounded-xl text-xs font-bold hover:bg-blue-700 flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <span>Create Hotel & Assign Role</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* PAGE 5: SELECT POSITION / ROLE */}
            {activeMenu !== "guidelines" && currentPage === 5 && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#e2e8f0] shadow-sm max-w-3xl mx-auto my-auto space-y-6 w-full">
                <div>
                  <h2 className="text-lg font-extrabold text-[#0f172a]">Select Organizational Role</h2>
                  <p className="text-xs text-[#64748b] mt-0.5">Select your primary management role at {displayHotelName}.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {[
                    { role: "Purchase Manager", desc: "Responsible for Front Office & Housekeeping Capital Procurement." },
                    { role: "General Manager", desc: "Overlooks complete hotel profitability, revenue, and budget limits." },
                    { role: "Revenue Manager", desc: "Optimizes ADR, Occupancy yield, and RevPAR forecasting." },
                    { role: "Front Office Manager", desc: "Manages reception, POS, EPABX, and guest arrival operations." },
                    { role: "Housekeeping Manager", desc: "Oversees room amenities, cleaning machinery, linen, and laundry." },
                  ].map((item) => (
                    <button
                      key={item.role}
                      onClick={() => updateSimState({ selectedRole: item.role as any })}
                      className={cn(
                        "p-4 rounded-2xl border text-left transition-all",
                        simState.selectedRole === item.role
                          ? "border-[#2563eb] bg-blue-50/60 ring-2 ring-[#2563eb]"
                          : "border-[#e2e8f0] hover:bg-gray-50"
                      )}
                    >
                      <div className="font-extrabold text-[#0f172a]">{item.role}</div>
                      <div className="text-[11px] text-[#64748b] mt-1">{item.desc}</div>
                    </button>
                  ))}
                </div>

                <div className="pt-4 flex justify-between">
                  <button onClick={() => goToPage(4)} className="px-4 py-2 border border-[#cbd5e1] rounded-xl text-xs font-bold text-[#475569]">
                    Back
                  </button>
                  <button
                    onClick={() => goToPage(6)}
                    className="px-6 py-2.5 bg-[#2563eb] text-white rounded-xl text-xs font-bold hover:bg-blue-700 flex items-center gap-2 shadow-md transition-all"
                  >
                    <span>Proceed to Simulation Briefing</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* PAGE 6: SIMULATION BRIEFING */}
            {activeMenu !== "guidelines" && currentPage === 6 && (
              <div className="bg-[#0f172a] text-white p-6 sm:p-8 rounded-3xl shadow-xl max-w-3xl mx-auto my-auto space-y-6 w-full">
                <div className="flex items-center gap-3 border-b border-[#1e293b] pb-4">
                  <Building2 className="w-7 h-7 text-[#2563eb]" />
                  <div>
                    <h2 className="text-xl font-black">Official Briefing — Board Directive</h2>
                    <p className="text-xs text-[#94a3b8]">Property: {displayHotelName} · Role: {displayRole}</p>
                  </div>
                </div>

                <div className="space-y-4 text-xs text-[#cbd5e1] leading-relaxed font-mono">
                  <p>Dear {displayRole} ({displayStudentName}),</p>
                  <p>Welcome to <span className="text-white font-bold">{displayHotelName}</span>. The Board of Directors expects you to execute four core operational mandates:</p>
                  <ul className="list-disc pl-5 space-y-1.5 text-blue-300">
                    <li>Maximize Room Revenue & Optimize RevPAR Yield.</li>
                    <li>Manage Front Office & Housekeeping Capital Budgets within ₹40,00,000 limits.</li>
                    <li>Generate Monthly Operating Expenditure & Net Profit (GOP) Statements.</li>
                    <li>Submit audited reports to faculty portal for final evaluation.</li>
                  </ul>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => goToPage(7)}
                    className="w-full sm:w-auto px-6 py-3 bg-[#2563eb] text-white rounded-xl text-xs font-bold hover:bg-blue-700 flex items-center justify-center gap-2 shadow-md transition-all"
                  >
                    <span>Start Task 1: Revenue Forecast</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* PAGE 7: TASK 1 REVENUE FORECAST ENTRY */}
            {activeMenu !== "guidelines" && currentPage === 7 && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#e2e8f0] shadow-sm max-w-2xl mx-auto my-auto space-y-6 w-full">
                <div className="border-b border-[#f1f5f9] pb-4">
                  <h2 className="text-lg font-extrabold text-[#0f172a]">Task 1: Revenue Forecast Challenge</h2>
                  <p className="text-xs text-[#64748b] mt-0.5">Enter operational rooms, room rate (ADR), and occupancy percentage.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-[#475569] mb-1">Hotel Property Name</label>
                    <input
                      type="text"
                      placeholder="Property Name"
                      value={simState.task1HotelName || simState.hotelName}
                      onChange={(e) => updateSimState({ task1HotelName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#cbd5e1] font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#475569] mb-1">Manager Username</label>
                    <input
                      type="text"
                      placeholder="Username"
                      value={simState.task1Username || simState.managerUsername}
                      onChange={(e) => updateSimState({ task1Username: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#cbd5e1] font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#475569] mb-1">Number of Rooms</label>
                    <input
                      type="number"
                      placeholder="Enter Rooms (e.g. 100)"
                      value={simState.task1Rooms || ""}
                      onChange={(e) => updateSimState({ task1Rooms: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#cbd5e1] font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#475569] mb-1">Average Room Rate (ADR ₹)</label>
                    <input
                      type="number"
                      placeholder="Enter ADR (e.g. 15000)"
                      value={simState.task1Adr || ""}
                      onChange={(e) => updateSimState({ task1Adr: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#cbd5e1] font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#475569] mb-1">Occupancy (%)</label>
                    <input
                      type="number"
                      placeholder="Enter Occupancy % (e.g. 70)"
                      value={simState.task1Occupancy || ""}
                      onChange={(e) => updateSimState({ task1Occupancy: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#cbd5e1] font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#475569] mb-1">Number of Days</label>
                    <input
                      type="number"
                      value={simState.task1Days || 365}
                      onChange={(e) => updateSimState({ task1Days: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#cbd5e1] font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => {
                      triggerToast("Forecast generated!");
                      goToPage(8);
                    }}
                    className="w-full sm:w-auto px-6 py-3 bg-[#2563eb] text-white rounded-xl text-xs font-bold hover:bg-blue-700 flex items-center justify-center gap-2 shadow-md transition-all"
                  >
                    <span>Generate Forecast</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* PAGE 8: FORECAST RESULTS PAGE */}
            {activeMenu !== "guidelines" && currentPage === 8 && (
              <div className="space-y-6 my-auto">
                <div className="bg-white p-6 rounded-3xl border border-[#e2e8f0] shadow-sm">
                  <h2 className="text-base font-extrabold text-[#0f172a]">Task 1: Automated Forecast Metrics</h2>
                  <p className="text-xs text-[#64748b] mt-0.5">Annual room revenue and RevPAR calculations for {displayHotelName}.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0]">
                    <div className="text-xs font-semibold text-[#64748b]">Available Room Nights</div>
                    <div className="text-2xl font-extrabold text-[#0f172a] mt-2 font-mono">
                      {task1Forecast.totalAvailableNights.toLocaleString("en-IN")}
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0]">
                    <div className="text-xs font-semibold text-[#64748b]">Rooms Sold</div>
                    <div className="text-2xl font-extrabold text-[#2563eb] mt-2 font-mono">
                      {task1Forecast.roomsSold.toLocaleString("en-IN")}
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0]">
                    <div className="text-xs font-semibold text-[#64748b]">Total Annual Revenue</div>
                    <div className="text-2xl font-extrabold text-emerald-600 mt-2 font-mono">
                      ₹{task1Forecast.annualRevenue.toLocaleString("en-IN")}
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0]">
                    <div className="text-xs font-semibold text-[#64748b]">RevPAR (₹)</div>
                    <div className="text-2xl font-extrabold text-indigo-600 mt-2 font-mono">
                      ₹{task1Forecast.revPar.toLocaleString("en-IN")}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-[#e2e8f0]">
                  <button onClick={() => goToPage(7)} className="px-4 py-2 border border-[#cbd5e1] rounded-xl text-xs font-bold text-[#475569]">
                    Edit Inputs
                  </button>
                  <button onClick={() => goToPage(9)} className="px-6 py-2.5 bg-[#2563eb] text-white rounded-xl text-xs font-bold hover:bg-blue-700 flex items-center gap-2 transition-all">
                    <span>View Forecast Performance</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* PAGE 9: FORECAST PERFORMANCE AUDIT */}
            {activeMenu !== "guidelines" && currentPage === 9 && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#e2e8f0] shadow-sm max-w-3xl mx-auto my-auto space-y-6 w-full">
                <div className="flex justify-between items-center border-b border-[#f1f5f9] pb-4">
                  <div>
                    <h2 className="text-lg font-extrabold text-[#0f172a]">Occupancy Performance Audit</h2>
                    <p className="text-xs text-[#64748b]">Faculty benchmarking of revenue yield.</p>
                  </div>
                  <div className="flex text-amber-400">
                    {"★".repeat(simState.task1Occupancy >= 85 ? 5 : simState.task1Occupancy >= 50 ? 4 : 3)}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200">
                    <div className="font-bold text-[#2563eb]">Occupancy Rating</div>
                    <div className="text-lg font-extrabold text-[#0f172a] mt-1">{simState.task1Occupancy}% — {task1Forecast.occupancyStatus}</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                    <div className="font-bold text-emerald-800">Forecast Accuracy</div>
                    <div className="text-lg font-extrabold text-emerald-900 mt-1">92% Precision Rate</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] text-xs space-y-1">
                  <div className="font-bold text-[#0f172a]">Faculty Remarks:</div>
                  <p className="text-[#64748b]">Solid revenue planning foundation. RevPAR optimization aligns with industry benchmarks.</p>
                </div>

                <div className="flex justify-between pt-4">
                  <button onClick={() => goToPage(8)} className="px-4 py-2 border border-[#cbd5e1] rounded-xl text-xs font-bold text-[#475569]">
                    Back
                  </button>
                  <button onClick={() => goToPage(10)} className="px-6 py-2.5 bg-[#2563eb] text-white rounded-xl text-xs font-bold hover:bg-blue-700 flex items-center gap-2 transition-all">
                    <span>Generate Forecast Statement</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* PAGE 10: FORECAST STATEMENT & CERTIFICATE */}
            {activeMenu !== "guidelines" && currentPage === 10 && (
              <div className="printable-document bg-white p-6 sm:p-8 rounded-3xl border border-[#e2e8f0] shadow-lg max-w-2xl mx-auto my-auto space-y-6 text-center w-full">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto font-black text-xl">
                  ✓
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#0f172a]">Task 1 Forecast Statement</h2>
                  <p className="text-xs text-[#64748b] mt-1">Official Revenue Forecast for {displayHotelName}</p>
                </div>

                <div className="bg-[#f8fafc] p-5 sm:p-6 rounded-2xl border border-[#e2e8f0] text-left font-mono text-xs space-y-2">
                  <div className="flex justify-between border-b pb-1.5"><span>Student:</span><span className="font-bold">{displayStudentName}</span></div>
                  <div className="flex justify-between border-b pb-1.5"><span>Annual Room Revenue:</span><span className="font-bold text-emerald-600">₹{task1Forecast.annualRevenue.toLocaleString("en-IN")}</span></div>
                  <div className="flex justify-between border-b pb-1.5"><span>Target RevPAR:</span><span className="font-bold text-[#2563eb]">₹{task1Forecast.revPar.toLocaleString("en-IN")}</span></div>
                  </div>

                <div className="flex justify-center gap-3 no-print pt-2">
                  <button onClick={() => window.print()} className="px-4 py-2 border border-[#cbd5e1] rounded-xl text-xs font-bold text-[#475569] flex items-center gap-1.5">
                    <Printer className="w-4 h-4" /> Print Statement
                  </button>
                  <button onClick={() => goToPage(11)} className="px-6 py-2 bg-[#2563eb] text-white rounded-xl text-xs font-bold hover:bg-blue-700 flex items-center gap-1.5 transition-all">
                    <span>Proceed to Task 2</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* PAGE 11: TASK 2 SCENARIO SELECT */}
            {activeMenu !== "guidelines" && currentPage === 11 && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#e2e8f0] shadow-sm max-w-xl mx-auto my-auto space-y-6 w-full">
                <div>
                  <h2 className="text-lg font-extrabold text-[#0f172a]">Task 2: Scenario Forecast Selection</h2>
                  <p className="text-xs text-[#64748b] mt-0.5">Select market segment and seasonal profile for automatic matrix computation.</p>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-[#475569] mb-1">Hotel Category</label>
                    <select
                      value={simState.task2HotelType}
                      onChange={(e) => updateSimState({ task2HotelType: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#cbd5e1] font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="Luxury Hotel">Luxury Hotel</option>
                      <option value="Business Hotel">Business Hotel</option>
                      <option value="Budget Hotel">Budget Hotel</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-[#475569] mb-1">Season Profile</label>
                    <select
                      value={simState.task2Season}
                      onChange={(e) => updateSimState({ task2Season: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#cbd5e1] font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="Festival Peak Season">Festival Peak Season</option>
                      <option value="Summer Season">Summer Season</option>
                      <option value="Monsoon Season">Monsoon Season</option>
                      <option value="Winter Season">Winter Season</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={() => goToPage(12)}
                  className="w-full py-3 bg-[#2563eb] text-white rounded-xl text-xs font-bold hover:bg-blue-700 flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <span>Generate Target Matrix</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* PAGE 12: SCENARIO MATRIX */}
            {activeMenu !== "guidelines" && currentPage === 12 && (
              <div className="bg-white p-6 rounded-3xl border border-[#e2e8f0] shadow-sm space-y-6 my-auto">
                <div className="flex justify-between items-center border-b border-[#f1f5f9] pb-4">
                  <div>
                    <h2 className="text-base font-bold text-[#0f172a]">Task 2: Automated Scenario Matrix</h2>
                    <p className="text-xs text-[#64748b]">Scenario: {simState.task2HotelType} · {simState.task2Season}</p>
                  </div>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-extrabold">AUTO CALCULATED</span>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-[#e2e8f0]">
                  <table className="w-full text-left border-collapse min-w-[600px] text-xs">
                    <thead>
                      <tr className="bg-[#f8fafc] border-b border-[#e2e8f0] font-bold text-[#475569]">
                        <th className="p-3">Rooms</th>
                        <th className="p-3">ADR (₹)</th>
                        <th className="p-3">Occupancy (%)</th>
                        <th className="p-3">Available Nights</th>
                        <th className="p-3">Rooms Sold</th>
                        <th className="p-3">Total Revenue (₹)</th>
                        <th className="p-3">RevPAR (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="font-bold">
                        <td className="p-3">{simState.task1Rooms || 100}</td>
                        <td className="p-3">₹{task2Matrix.adr.toLocaleString("en-IN")}</td>
                        <td className="p-3">{task2Matrix.occ}%</td>
                        <td className="p-3">{task2Matrix.availableNights.toLocaleString("en-IN")}</td>
                        <td className="p-3 text-[#2563eb]">{task2Matrix.roomsSold.toLocaleString("en-IN")}</td>
                        <td className="p-3 text-emerald-600">₹{task2Matrix.revenue.toLocaleString("en-IN")}</td>
                        <td className="p-3 text-indigo-600">₹{task2Matrix.revPar.toLocaleString("en-IN")}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-between pt-4">
                  <button onClick={() => goToPage(11)} className="px-4 py-2 border border-[#cbd5e1] rounded-xl text-xs font-bold text-[#475569]">Back</button>
                  <button onClick={() => goToPage(13)} className="px-6 py-2.5 bg-[#2563eb] text-white rounded-xl text-xs font-bold hover:bg-blue-700 flex items-center gap-2 transition-all">
                    <span>Proceed to Front Office Budget</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* PAGE 13: FRONT OFFICE BUDGET INTRO */}
            {activeMenu !== "guidelines" && currentPage === 13 && (
              <div className="bg-[#0f172a] text-white p-6 sm:p-8 rounded-3xl shadow-xl max-w-2xl mx-auto my-auto space-y-6 w-full">
                <div className="border-b border-[#1e293b] pb-4">
                  <div className="text-xs uppercase font-extrabold text-blue-400">GM CAPITAL DIRECTIVE</div>
                  <h2 className="text-xl font-black mt-1">Front Office Department Allocation</h2>
                </div>

                <div className="space-y-3 text-xs font-mono text-[#cbd5e1] leading-relaxed">
                  <p>Dear {displayRole} ({displayStudentName}),</p>
                  <p>The General Manager has approved a Capital Budget of <span className="text-emerald-400 font-extrabold">₹20,00,000</span> for upgrading the Front Office Department equipment and systems for FY 2027-28.</p>
                  <p>Your objective is to enter actual item prices, control variances, and keep total spend strictly under ₹20,00,000.</p>
                </div>

                <div className="flex justify-end pt-4">
                  <button onClick={() => goToPage(14)} className="w-full sm:w-auto px-6 py-3 bg-[#2563eb] text-white rounded-xl text-xs font-bold hover:bg-blue-700 flex items-center justify-center gap-2 transition-all">
                    <span>Start FO Capital Budget Entry</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* PAGE 14: FRONT OFFICE CAPITAL BUDGET TABLE */}
            {activeMenu !== "guidelines" && currentPage === 14 && (
              <div className="space-y-4 my-auto h-full flex flex-col justify-between">
                <div className="bg-[#1e293b] text-white p-4 rounded-2xl flex items-center justify-between font-mono shrink-0">
                  <div>
                    <div className="text-[10px] text-blue-400 uppercase font-bold">FO Approved Capital Budget</div>
                    <div className="text-base font-black text-white">₹20,00,000</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-[#94a3b8] uppercase font-bold">Remaining Budget</div>
                    <div className={cn("text-base font-black", foBudget.remainingBudget >= 0 ? "text-emerald-400" : "text-rose-400")}>
                      ₹{foBudget.remainingBudget.toLocaleString("en-IN")}
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 sm:p-5 rounded-3xl border border-[#e2e8f0] shadow-sm space-y-3 flex-1 flex flex-col min-h-0">
                  <div className="flex justify-between items-center shrink-0">
                    <h2 className="text-sm font-bold text-[#0f172a]">Front Office Purchase List (13 Items)</h2>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-extrabold">{foBudget.budgetStatus}</span>
                  </div>

                  <div className="overflow-y-auto overflow-x-auto max-h-[calc(100vh-320px)] border border-[#e2e8f0] rounded-2xl text-xs scrollbar-thin">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                      <thead className="sticky top-0 bg-[#f8fafc] z-10 shadow-sm border-b border-[#e2e8f0]">
                        <tr className="font-bold text-[#475569]">
                          <th className="p-3 w-10 text-center">S/No</th>
                          <th className="p-3">Purchase Item</th>
                          <th className="p-3 text-right">Actual Cost (₹)</th>
                          <th className="p-3 text-right">Budgeted Cost (₹)</th>
                          <th className="p-3 text-right">Variance (₹)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#e2e8f0]">
                        {simState.frontOfficeItems.map((item, idx) => {
                          const v = item.budgetedCost - item.actualCost;
                          return (
                            <tr key={item.id} className="hover:bg-slate-50">
                              <td className="p-2.5 text-center text-[#64748b]">{idx + 1}</td>
                              <td className="p-2.5 font-semibold text-[#0f172a]">{item.name}</td>
                              <td className="p-2.5 text-right w-40">
                                <input
                                  type="number"
                                  placeholder="Enter actual ₹"
                                  value={item.actualCost || ""}
                                  onChange={(e) => handleFOItemActualChange(item.id, Number(e.target.value))}
                                  className="w-full px-3 py-1.5 rounded-lg border border-[#cbd5e1] text-right font-mono text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                              </td>
                              <td className="p-2.5 text-right font-mono">₹{item.budgetedCost.toLocaleString("en-IN")}</td>
                              <td className={cn("p-2.5 text-right font-mono font-bold", v >= 0 ? "text-emerald-600" : "text-rose-600")}>
                                {v >= 0 ? `+₹${v.toLocaleString("en-IN")}` : `-₹${Math.abs(v).toLocaleString("en-IN")}`}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex justify-between items-center pt-2 shrink-0">
                    <button onClick={() => goToPage(13)} className="px-4 py-2 border border-[#cbd5e1] rounded-xl text-xs font-bold text-[#475569]">Back</button>
                    <button onClick={() => goToPage(15)} className="px-6 py-2 bg-[#2563eb] text-white rounded-xl text-xs font-bold hover:bg-blue-700 flex items-center gap-2 transition-all">
                      <span>View FO Budget Report</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* PAGE 15: FRONT OFFICE BUDGET REPORT */}
            {activeMenu !== "guidelines" && currentPage === 15 && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#e2e8f0] shadow-sm max-w-3xl mx-auto my-auto space-y-6 w-full">
                <div className="border-b border-[#f1f5f9] pb-4">
                  <h2 className="text-lg font-extrabold text-[#0f172a]">Front Office Budget Audit Report</h2>
                  <p className="text-xs text-[#64748b] mt-0.5">Expenditure analysis against ₹20,00,000 capital allocation.</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                  <div className="p-3 bg-[#f8fafc] rounded-xl border"><span>Approved Budget:</span><div className="font-bold text-sm text-[#0f172a]">₹20,00,000</div></div>
                  <div className="p-3 bg-[#f8fafc] rounded-xl border"><span>Total Actual Spend:</span><div className="font-bold text-sm text-[#2563eb]">₹{foBudget.totalActual.toLocaleString("en-IN")}</div></div>
                  <div className="p-3 bg-[#f8fafc] rounded-xl border"><span>Total Variance:</span><div className="font-bold text-sm text-emerald-600">₹{foBudget.totalVariance.toLocaleString("en-IN")}</div></div>
                  <div className="p-3 bg-[#f8fafc] rounded-xl border"><span>Remaining Balance:</span><div className="font-bold text-sm text-emerald-600">₹{foBudget.remainingBudget.toLocaleString("en-IN")}</div></div>
                </div>

                <div className="flex justify-between pt-4 border-t">
                  <button onClick={() => goToPage(14)} className="px-4 py-2 border border-[#cbd5e1] rounded-xl text-xs font-bold text-[#475569]">Back</button>
                  <button onClick={() => goToPage(16)} className="px-6 py-2.5 bg-[#2563eb] text-white rounded-xl text-xs font-bold hover:bg-blue-700 flex items-center gap-2 transition-all">
                    <span>Proceed to Housekeeping Intro</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* PAGE 16: HOUSEKEEPING BUDGET INTRO */}
            {activeMenu !== "guidelines" && currentPage === 16 && (
              <div className="bg-[#0f172a] text-white p-6 sm:p-8 rounded-3xl shadow-xl max-w-2xl mx-auto my-auto space-y-6 w-full">
                <div className="border-b border-[#1e293b] pb-4">
                  <div className="text-xs uppercase font-extrabold text-emerald-400">GM CAPITAL DIRECTIVE</div>
                  <h2 className="text-xl font-black mt-1">Housekeeping Department Allocation</h2>
                </div>

                <div className="space-y-3 text-xs font-mono text-[#cbd5e1] leading-relaxed">
                  <p>Dear {displayRole} ({displayStudentName}),</p>
                  <p>The Executive Housekeeper requested new machinery and linen supplies. The GM has approved a separate Capital Budget of <span className="text-emerald-400 font-extrabold">₹20,00,000</span> for Housekeeping.</p>
                  <p>Enter the actual cost for each item on the dedicated Housekeeping page next.</p>
                </div>

                <div className="flex justify-end pt-4">
                  <button onClick={() => goToPage(17)} className="w-full sm:w-auto px-6 py-3 bg-[#2563eb] text-white rounded-xl text-xs font-bold hover:bg-blue-700 flex items-center justify-center gap-2 transition-all">
                    <span>Start Housekeeping Budget Entry</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* PAGE 17: HOUSEKEEPING CAPITAL BUDGET TABLE */}
            {activeMenu !== "guidelines" && currentPage === 17 && (
              <div className="space-y-4 my-auto h-full flex flex-col justify-between">
                <div className="bg-[#1e293b] text-white p-4 rounded-2xl flex items-center justify-between font-mono shrink-0">
                  <div>
                    <div className="text-[10px] text-emerald-400 uppercase font-bold">HK Approved Capital Budget</div>
                    <div className="text-base font-black text-white">₹20,00,000</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-[#94a3b8] uppercase font-bold">Remaining HK Budget</div>
                    <div className={cn("text-base font-black", hkBudget.remainingBudget >= 0 ? "text-emerald-400" : "text-rose-400")}>
                      ₹{hkBudget.remainingBudget.toLocaleString("en-IN")}
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 sm:p-5 rounded-3xl border border-[#e2e8f0] shadow-sm space-y-3 flex-1 flex flex-col min-h-0">
                  <div className="flex justify-between items-center shrink-0">
                    <h2 className="text-sm font-bold text-[#0f172a]">Housekeeping Purchase List (19 Items)</h2>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-extrabold">{hkBudget.budgetStatus}</span>
                  </div>

                  <div className="overflow-y-auto overflow-x-auto max-h-[calc(100vh-320px)] border border-[#e2e8f0] rounded-2xl text-xs scrollbar-thin">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                      <thead className="sticky top-0 bg-[#f8fafc] z-10 shadow-sm border-b border-[#e2e8f0]">
                        <tr className="font-bold text-[#475569]">
                          <th className="p-3 w-10 text-center">S/No</th>
                          <th className="p-3">Purchase Item</th>
                          <th className="p-3 text-right">Actual Cost (₹)</th>
                          <th className="p-3 text-right">Budgeted Cost (₹)</th>
                          <th className="p-3 text-right">Variance (₹)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#e2e8f0]">
                        {simState.housekeepingItems.map((item, idx) => {
                          const v = item.budgetedCost - item.actualCost;
                          return (
                            <tr key={item.id} className="hover:bg-slate-50">
                              <td className="p-2.5 text-center text-[#64748b]">{idx + 1}</td>
                              <td className="p-2.5 font-semibold text-[#0f172a]">{item.name}</td>
                              <td className="p-2.5 text-right w-40">
                                <input
                                  type="number"
                                  placeholder="Enter actual ₹"
                                  value={item.actualCost || ""}
                                  onChange={(e) => handleHKItemActualChange(item.id, Number(e.target.value))}
                                  className="w-full px-3 py-1.5 rounded-lg border border-[#cbd5e1] text-right font-mono text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                              </td>
                              <td className="p-2.5 text-right font-mono">₹{item.budgetedCost.toLocaleString("en-IN")}</td>
                              <td className={cn("p-2.5 text-right font-mono font-bold", v >= 0 ? "text-emerald-600" : "text-rose-600")}>
                                {v >= 0 ? `+₹${v.toLocaleString("en-IN")}` : `-₹${Math.abs(v).toLocaleString("en-IN")}`}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex justify-between items-center pt-2 shrink-0">
                    <button onClick={() => goToPage(16)} className="px-4 py-2 border border-[#cbd5e1] rounded-xl text-xs font-bold text-[#475569]">Back</button>
                    <button onClick={() => goToPage(18)} className="px-6 py-2 bg-[#2563eb] text-white rounded-xl text-xs font-bold hover:bg-blue-700 flex items-center gap-2 transition-all">
                      <span>View HK Budget Report</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* PAGE 18: HOUSEKEEPING BUDGET REPORT */}
            {activeMenu !== "guidelines" && currentPage === 18 && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#e2e8f0] shadow-sm max-w-3xl mx-auto my-auto space-y-6 w-full">
                <div className="border-b border-[#f1f5f9] pb-4">
                  <h2 className="text-lg font-extrabold text-[#0f172a]">Housekeeping Budget Audit Report</h2>
                  <p className="text-xs text-[#64748b] mt-0.5">Expenditure analysis against ₹20,00,000 capital allocation.</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                  <div className="p-3 bg-[#f8fafc] rounded-xl border"><span>Approved Budget:</span><div className="font-bold text-sm text-[#0f172a]">₹20,00,000</div></div>
                  <div className="p-3 bg-[#f8fafc] rounded-xl border"><span>Total Actual Spend:</span><div className="font-bold text-sm text-[#2563eb]">₹{hkBudget.totalActual.toLocaleString("en-IN")}</div></div>
                  <div className="p-3 bg-[#f8fafc] rounded-xl border"><span>Total Variance:</span><div className="font-bold text-sm text-emerald-600">₹{hkBudget.totalVariance.toLocaleString("en-IN")}</div></div>
                  <div className="p-3 bg-[#f8fafc] rounded-xl border"><span>Remaining Balance:</span><div className="font-bold text-sm text-emerald-600">₹{hkBudget.remainingBudget.toLocaleString("en-IN")}</div></div>
                </div>

                <div className="flex justify-between pt-4 border-t">
                  <button onClick={() => goToPage(17)} className="px-4 py-2 border border-[#cbd5e1] rounded-xl text-xs font-bold text-[#475569]">Back</button>
                  <button onClick={() => goToPage(19)} className="px-6 py-2.5 bg-[#2563eb] text-white rounded-xl text-xs font-bold hover:bg-blue-700 flex items-center gap-2 transition-all">
                    <span>Proceed to Combined Audit</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* PAGE 19: COMBINED CAPITAL AUDIT */}
            {activeMenu !== "guidelines" && currentPage === 19 && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#e2e8f0] shadow-sm max-w-4xl mx-auto my-auto space-y-6 w-full">
                <div className="flex justify-between items-center border-b border-[#f1f5f9] pb-4">
                  <div>
                    <h2 className="text-lg font-extrabold text-[#0f172a]">Consolidated Capital Expenditure Audit</h2>
                    <p className="text-xs text-[#64748b]">Front Office + Housekeeping combined capital budget performance.</p>
                  </div>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-extrabold">TOTAL BUDGET ₹40,00,000</span>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-[#e2e8f0]">
                  <table className="w-full text-left border-collapse min-w-[600px] text-xs">
                    <thead>
                      <tr className="bg-[#f8fafc] border-b font-bold text-[#475569]">
                        <th className="p-3">Department</th>
                        <th className="p-3 text-right">Approved Budget (₹)</th>
                        <th className="p-3 text-right">Actual Spend (₹)</th>
                        <th className="p-3 text-right">Variance (₹)</th>
                        <th className="p-3 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y font-medium">
                      <tr>
                        <td className="p-3 font-bold">Front Office</td>
                        <td className="p-3 text-right font-mono">₹20,00,000</td>
                        <td className="p-3 text-right font-mono text-[#2563eb] font-bold">₹{foBudget.totalActual.toLocaleString("en-IN")}</td>
                        <td className="p-3 text-right font-mono text-emerald-600 font-bold">₹{foBudget.totalVariance.toLocaleString("en-IN")}</td>
                        <td className="p-3 text-right font-bold text-emerald-600">{foBudget.budgetStatus}</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold">Housekeeping</td>
                        <td className="p-3 text-right font-mono">₹20,00,000</td>
                        <td className="p-3 text-right font-mono text-[#2563eb] font-bold">₹{hkBudget.totalActual.toLocaleString("en-IN")}</td>
                        <td className="p-3 text-right font-mono text-emerald-600 font-bold">₹{hkBudget.totalVariance.toLocaleString("en-IN")}</td>
                        <td className="p-3 text-right font-bold text-emerald-600">{hkBudget.budgetStatus}</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr className="bg-[#f1f5f9] font-extrabold border-t-2 text-[#0f172a]">
                        <td className="p-3">COMBINED TOTAL</td>
                        <td className="p-3 text-right font-mono">₹40,00,000</td>
                        <td className="p-3 text-right font-mono text-emerald-600">₹{combinedBudget.combinedActual.toLocaleString("en-IN")}</td>
                        <td className="p-3 text-right font-mono text-emerald-600">₹{combinedBudget.combinedVariance.toLocaleString("en-IN")}</td>
                        <td className="p-3 text-right font-bold text-[#2563eb]">Remaining: ₹{combinedBudget.remainingBudget.toLocaleString("en-IN")}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                <div className="flex justify-between pt-4">
                  <button onClick={() => goToPage(18)} className="px-4 py-2 border border-[#cbd5e1] rounded-xl text-xs font-bold text-[#475569]">Back</button>
                  <button onClick={() => goToPage(20)} className="px-6 py-2.5 bg-[#2563eb] text-white rounded-xl text-xs font-bold hover:bg-blue-700 flex items-center gap-2 transition-all">
                    <span>Generate Capital Expenditure Bill</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* PAGE 20: CAPITAL EXPENDITURE BILL */}
            {activeMenu !== "guidelines" && currentPage === 20 && (
              <div className="printable-document bg-white p-6 sm:p-8 rounded-3xl border border-[#e2e8f0] shadow-lg max-w-2xl mx-auto my-auto space-y-6 w-full">
                <div className="flex justify-between items-center border-b pb-4">
                  <div>
                    <h2 className="text-lg font-black text-[#0f172a]">CAPITAL EXPENDITURE BILL</h2>
                    <p className="text-xs text-[#64748b]">Property: {displayHotelName} · Ref: CAP-FIN-2027</p>
                  </div>
                  <button onClick={() => window.print()} className="px-4 py-2 bg-[#0f172a] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 no-print">
                    <Printer className="w-4 h-4" /> Print Bill
                  </button>
                </div>

                <div className="bg-[#f8fafc] p-5 rounded-2xl border text-xs font-mono space-y-2">
                  <div className="flex justify-between"><span>Manager:</span><span className="font-bold">{displayStudentName}</span></div>
                  <div className="flex justify-between"><span>Role:</span><span className="font-bold">{displayRole}</span></div>
                  <div className="flex justify-between"><span>FO Approved Spend:</span><span className="font-bold">₹{foBudget.totalActual.toLocaleString("en-IN")}</span></div>
                  <div className="flex justify-between"><span>HK Approved Spend:</span><span className="font-bold">₹{hkBudget.totalActual.toLocaleString("en-IN")}</span></div>
                  <div className="flex justify-between text-emerald-600 font-bold"><span>Total Capital Spend:</span><span>₹{combinedBudget.combinedActual.toLocaleString("en-IN")}</span></div>
                  <div className="flex justify-between text-indigo-600 font-bold"><span>Unspent Balance:</span><span>₹{combinedBudget.remainingBudget.toLocaleString("en-IN")}</span></div>
                </div>

                <div className="flex justify-between items-center pt-8 border-t font-mono text-xs text-[#64748b]">
                  <div>Faculty Signature: __________________</div>
                  <div>Date: {new Date().toLocaleDateString("en-IN")}</div>
                </div>

                <div className="flex justify-end pt-4 no-print">
                  <button onClick={() => goToPage(21)} className="px-6 py-2.5 bg-[#2563eb] text-white rounded-xl text-xs font-bold hover:bg-blue-700 flex items-center gap-2 transition-all">
                    <span>Proceed to Monthly Revenue Statement</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* PAGE 21: MONTHLY REVENUE STATEMENT */}
            {activeMenu !== "guidelines" && currentPage === 21 && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#e2e8f0] shadow-sm max-w-4xl mx-auto my-auto space-y-6 w-full">
                <div className="border-b pb-4">
                  <h2 className="text-lg font-extrabold text-[#0f172a]">Monthly Operating Revenue Statement</h2>
                  <p className="text-xs text-[#64748b] mt-0.5">Enter actual and budgeted monthly room sales and allowances.</p>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-[#e2e8f0]">
                  <table className="w-full text-left border-collapse min-w-[600px] text-xs">
                    <thead>
                      <tr className="bg-[#f8fafc] border-b font-bold text-[#475569]">
                        <th className="p-3">REVENUE Item</th>
                        <th className="p-3 text-right">Actual (₹)</th>
                        <th className="p-3 text-right">Budget (₹)</th>
                        <th className="p-3 text-right">Variance (₹)</th>
                        <th className="p-3 text-right">% Variance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="p-3 font-semibold">Rooms Sold (Units)</td>
                        <td className="p-3 text-right w-40"><input type="number" placeholder="Enter Actual Units" value={simState.monthlyRoomsSoldActual || ""} onChange={(e) => updateSimState({ monthlyRoomsSoldActual: Number(e.target.value) })} className="w-full px-3 py-1 rounded border text-right font-mono text-xs focus:ring-2 focus:ring-blue-500 outline-none" /></td>
                        <td className="p-3 text-right w-40"><input type="number" placeholder="Enter Budget Units" value={simState.monthlyRoomsSoldBudget || ""} onChange={(e) => updateSimState({ monthlyRoomsSoldBudget: Number(e.target.value) })} className="w-full px-3 py-1 rounded border text-right font-mono text-xs focus:ring-2 focus:ring-blue-500 outline-none" /></td>
                        <td className="p-3 text-right font-mono font-bold text-emerald-600">+{(simState.monthlyRoomsSoldActual - simState.monthlyRoomsSoldBudget)}</td>
                        <td className="p-3 text-right font-mono text-emerald-600">+{(100 * ((simState.monthlyRoomsSoldActual - simState.monthlyRoomsSoldBudget) / (simState.monthlyRoomsSoldBudget || 1))).toFixed(1)}%</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold">Room Allowance (₹)</td>
                        <td className="p-3 text-right"><input type="number" placeholder="Enter Actual ₹" value={simState.roomAllowanceActual || ""} onChange={(e) => updateSimState({ roomAllowanceActual: Number(e.target.value) })} className="w-full px-3 py-1 rounded border text-right font-mono text-xs focus:ring-2 focus:ring-blue-500 outline-none" /></td>
                        <td className="p-3 text-right"><input type="number" placeholder="Enter Budget ₹" value={simState.roomAllowanceBudget || ""} onChange={(e) => updateSimState({ roomAllowanceBudget: Number(e.target.value) })} className="w-full px-3 py-1 rounded border text-right font-mono text-xs focus:ring-2 focus:ring-blue-500 outline-none" /></td>
                        <td className="p-3 text-right font-mono font-bold text-emerald-600">-₹{(simState.roomAllowanceBudget - simState.roomAllowanceActual).toLocaleString("en-IN")}</td>
                        <td className="p-3 text-right font-mono text-emerald-600">-{(100 - (simState.roomAllowanceActual / (simState.roomAllowanceBudget || 1)) * 100).toFixed(1)}%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-[#eff6ff] p-4 rounded-2xl border flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-[#2563eb]">NET MONTHLY REVENUE</div>
                    <div className="text-xl font-black text-[#0f172a] mt-0.5">₹{pnl.netRevenueActual.toLocaleString("en-IN")}</div>
                  </div>
                  <button onClick={() => triggerToast("Net Revenue Generated")} className="px-4 py-2 bg-[#2563eb] text-white rounded-xl text-xs font-bold shadow-sm">
                    Generate Net Revenue
                  </button>
                </div>

                <div className="flex justify-between pt-4">
                  <button onClick={() => goToPage(20)} className="px-4 py-2 border border-[#cbd5e1] rounded-xl text-xs font-bold text-[#475569]">Back</button>
                  <button onClick={() => goToPage(22)} className="px-6 py-2.5 bg-[#2563eb] text-white rounded-xl text-xs font-bold hover:bg-blue-700 flex items-center gap-2 transition-all">
                    <span>Proceed to Monthly Expenses</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* PAGE 22: MONTHLY OPERATING EXPENSES */}
            {activeMenu !== "guidelines" && currentPage === 22 && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#e2e8f0] shadow-sm max-w-4xl mx-auto my-auto space-y-6 w-full">
                <div className="border-b pb-4">
                  <h2 className="text-lg font-extrabold text-[#0f172a]">Monthly Operating Expenses Statement</h2>
                  <p className="text-xs text-[#64748b] mt-0.5">Enter actual and budgeted departmental operational expenses.</p>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-[#e2e8f0]">
                  <table className="w-full text-left border-collapse min-w-[600px] text-xs">
                    <thead>
                      <tr className="bg-[#f8fafc] border-b font-bold text-[#475569]">
                        <th className="p-3">EXPENSES Item</th>
                        <th className="p-3 text-right">Actual (₹)</th>
                        <th className="p-3 text-right">Budget (₹)</th>
                        <th className="p-3 text-right">Variance (₹)</th>
                        <th className="p-3 text-right">% Variance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="p-3 font-semibold">Salaries and Wages</td>
                        <td className="p-3 text-right w-40"><input type="number" placeholder="Enter Actual ₹" value={simState.salariesWagesActual || ""} onChange={(e) => updateSimState({ salariesWagesActual: Number(e.target.value) })} className="w-full px-3 py-1 rounded border text-right font-mono text-xs focus:ring-2 focus:ring-blue-500 outline-none" /></td>
                        <td className="p-3 text-right w-40"><input type="number" placeholder="Enter Budget ₹" value={simState.salariesWagesBudget || ""} onChange={(e) => updateSimState({ salariesWagesBudget: Number(e.target.value) })} className="w-full px-3 py-1 rounded border text-right font-mono text-xs focus:ring-2 focus:ring-blue-500 outline-none" /></td>
                        <td className="p-3 text-right font-mono font-bold text-rose-600">+₹{(simState.salariesWagesActual - simState.salariesWagesBudget).toLocaleString("en-IN")}</td>
                        <td className="p-3 text-right font-mono text-rose-600">+{(((simState.salariesWagesActual - simState.salariesWagesBudget) / (simState.salariesWagesBudget || 1)) * 100).toFixed(1)}%</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold">Employee Benefits</td>
                        <td className="p-3 text-right"><input type="number" placeholder="Enter Actual ₹" value={simState.employeeBenefitsActual || ""} onChange={(e) => updateSimState({ employeeBenefitsActual: Number(e.target.value) })} className="w-full px-3 py-1 rounded border text-right font-mono text-xs focus:ring-2 focus:ring-blue-500 outline-none" /></td>
                        <td className="p-3 text-right"><input type="number" placeholder="Enter Budget ₹" value={simState.employeeBenefitsBudget || ""} onChange={(e) => updateSimState({ employeeBenefitsBudget: Number(e.target.value) })} className="w-full px-3 py-1 rounded border text-right font-mono text-xs focus:ring-2 focus:ring-blue-500 outline-none" /></td>
                        <td className="p-3 text-right font-mono font-bold text-rose-600">+₹{(simState.employeeBenefitsActual - simState.employeeBenefitsBudget).toLocaleString("en-IN")}</td>
                        <td className="p-3 text-right font-mono text-rose-600">+{(((simState.employeeBenefitsActual - simState.employeeBenefitsBudget) / (simState.employeeBenefitsBudget || 1)) * 100).toFixed(1)}%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-[#f0fdf4] p-4 rounded-2xl border flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-emerald-800">GROSS OPERATING PROFIT (GOP)</div>
                    <div className="text-xl font-black text-emerald-700 mt-0.5">₹{pnl.gopActual.toLocaleString("en-IN")}</div>
                  </div>
                  <button onClick={() => triggerToast("Total Expenses & GOP Generated")} className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-sm">
                    Generate Total Expenses & GOP
                  </button>
                </div>

                <div className="flex justify-between pt-4">
                  <button onClick={() => goToPage(21)} className="px-4 py-2 border border-[#cbd5e1] rounded-xl text-xs font-bold text-[#475569]">Back</button>
                  <button onClick={() => goToPage(23)} className="px-6 py-2.5 bg-[#2563eb] text-white rounded-xl text-xs font-bold hover:bg-blue-700 flex items-center gap-2 transition-all">
                    <span>Proceed to GM Executive Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* PAGE 23: GENERAL MANAGER DASHBOARD */}
            {activeMenu !== "guidelines" && currentPage === 23 && (
              <div className="space-y-6 my-auto">
                <div className="bg-[#0f172a] text-white p-6 rounded-3xl shadow-xl flex items-center justify-between">
                  <div>
                    <div className="text-xs font-extrabold uppercase text-blue-400">POWER BI EXECUTIVE ANALYTICS</div>
                    <h1 className="text-xl font-black">{displayHotelName} — General Manager Cockpit</h1>
                  </div>
                  <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-bold">LIVE METRICS</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                  <div className="bg-white p-4 rounded-2xl border"><span>Annual Room Revenue</span><div className="text-lg font-black text-[#2563eb] mt-1">₹{task1Forecast.annualRevenue.toLocaleString("en-IN")}</div></div>
                  <div className="bg-white p-4 rounded-2xl border"><span>RevPAR</span><div className="text-lg font-black text-indigo-600 mt-1">₹{task1Forecast.revPar.toLocaleString("en-IN")}</div></div>
                  <div className="bg-white p-4 rounded-2xl border"><span>Capital Budget Used</span><div className="text-lg font-black text-[#0f172a] mt-1">₹{combinedBudget.combinedActual.toLocaleString("en-IN")}</div></div>
                  <div className="bg-white p-4 rounded-2xl border"><span>Net Monthly Profit (GOP)</span><div className="text-lg font-black text-emerald-600 mt-1">₹{pnl.gopActual.toLocaleString("en-IN")}</div></div>
                </div>

                <div className="flex justify-between items-center bg-[#ffffff] p-4 rounded-2xl border">
                  <button onClick={() => goToPage(22)} className="px-4 py-2 border border-[#cbd5e1] rounded-xl text-xs font-bold text-[#475569]">Back</button>
                  <button onClick={() => goToPage(24)} className="px-6 py-2.5 bg-[#2563eb] text-white rounded-xl text-xs font-bold hover:bg-blue-700 flex items-center gap-2 transition-all">
                    <span>View Performance Evaluation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* PAGE 24: DEPARTMENT PERFORMANCE EVALUATION */}
            {activeMenu !== "guidelines" && currentPage === 24 && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#e2e8f0] shadow-sm max-w-3xl mx-auto my-auto space-y-6 w-full">
                <div className="border-b pb-4">
                  <h2 className="text-lg font-extrabold text-[#0f172a]">Performance Evaluation Scorecard</h2>
                  <p className="text-xs text-[#64748b]">Overall student assessment breakdown out of 100 points.</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-center font-mono">
                  <div className="p-3 bg-blue-50 rounded-xl border"><span>Revenue Yield</span><div className="text-lg font-bold text-[#2563eb]">{scores.isStarted ? "25/30" : "0/30"}</div></div>
                  <div className="p-3 bg-emerald-50 rounded-xl border"><span>Budget Control</span><div className="text-lg font-bold text-emerald-600">{scores.isStarted ? "30/30" : "0/30"}</div></div>
                  <div className="p-3 bg-indigo-50 rounded-xl border"><span>Procurement Entry</span><div className="text-lg font-bold text-indigo-600">{scores.isStarted ? "30/40" : "0/40"}</div></div>
                </div>

                <div className="p-5 bg-[#0f172a] text-white rounded-2xl text-center space-y-1">
                  <div className="text-xs uppercase font-bold text-[#94a3b8]">FINAL OVERALL COMPETENCY SCORE</div>
                  <div className="text-3xl font-black text-emerald-400">{scores.numericScore} / 100</div>
                </div>

                <div className="flex justify-between pt-4">
                  <button onClick={() => goToPage(23)} className="px-4 py-2 border border-[#cbd5e1] rounded-xl text-xs font-bold text-[#475569]">Back</button>
                  <button onClick={() => goToPage(25)} className="px-6 py-2.5 bg-[#2563eb] text-white rounded-xl text-xs font-bold hover:bg-blue-700 flex items-center gap-2 transition-all">
                    <span>Proceed to Final Submission & Cert</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* PAGE 25: FACULTY SUBMISSION & IIHM CERTIFICATE */}
            {activeMenu !== "guidelines" && currentPage === 25 && (
              <div className="printable-document bg-white p-6 sm:p-10 rounded-3xl border-4 border-[#2563eb] shadow-2xl max-w-3xl mx-auto my-auto space-y-6 text-center w-full">
                <div className="border-b-2 border-[#2563eb] pb-6 space-y-2">
                  <div className="text-xs font-black uppercase tracking-widest text-[#2563eb]">
                    INSTITUTE OF HOTEL MANAGEMENT
                  </div>
                  <h1 className="text-xl sm:text-2xl font-black text-[#0f172a] uppercase tracking-wide">
                    CERTIFICATE OF COMPLETION
                  </h1>
                  <p className="text-xs text-[#64748b]">Hotel Management Digital Simulation Lab</p>
                </div>

                <div className="space-y-3 text-xs leading-relaxed">
                  <p>This is to certify that student <span className="font-extrabold text-[#0f172a] text-sm underline">{displayStudentName}</span> (Roll: {simState.studentRoll || "N/A"}) has successfully completed the simulation for <span className="font-extrabold text-[#0f172a]">{displayHotelName}</span> as <span className="font-bold text-[#2563eb]">{displayRole}</span>.</p>
                  <div className="bg-[#f8fafc] p-4 rounded-2xl border font-mono text-xs text-left max-w-lg mx-auto space-y-1.5">
                    <div className="flex justify-between"><span>Revenue Forecast Completed:</span><span className="font-bold text-emerald-600">✓ PASS</span></div>
                    <div className="flex justify-between"><span>Capital Budget Audit Completed:</span><span className="font-bold text-emerald-600">✓ PASS</span></div>
                    <div className="flex justify-between"><span>Monthly Operating P&L Completed:</span><span className="font-bold text-emerald-600">✓ PASS</span></div>
                    <div className="flex justify-between text-sm text-[#2563eb] font-bold border-t pt-1.5"><span>Final Overall Score:</span><span>{scores.numericScore}%</span></div>
                  </div>
                </div>

                {/* SCANNABLE QR CODE FOR CERTIFICATE VERIFICATION */}
                <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t font-mono text-xs text-[#64748b] gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={qrImageUrl}
                      alt="Verified Certificate QR Code"
                      className="w-16 h-16 object-contain rounded-lg border border-slate-300 shadow-xs"
                    />
                    <div className="text-left text-[10px]">
                      <div className="font-extrabold text-[#2563eb]">VERIFIED DIGITAL CERTIFICATE</div>
                      <div className="font-bold text-[#0f172a]">ID: IIHM-SIM-2026-95</div>
                      <div className="text-[#94a3b8] text-[9px]">Scan with phone camera to verify</div>
                    </div>
                  </div>
                  <div className="text-center sm:text-right">
                    <div className="font-bold text-[#0f172a]">FACULTY SIGNATURE</div>
                    <div>Department Chair, Front Office</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4 no-print">
                  <button onClick={() => window.print()} className="px-5 py-2.5 border border-[#cbd5e1] rounded-xl text-xs font-bold text-[#475569] flex items-center justify-center gap-2">
                    <Printer className="w-4 h-4" /> Download Certificate PDF
                  </button>
                  <button
                    onClick={handleSubmitSimulation}
                    className={cn(
                      "px-6 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all",
                      simState.isSubmitted ? "bg-emerald-600 text-white" : "bg-[#2563eb] text-white hover:bg-blue-700"
                    )}
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>{simState.isSubmitted ? "Submitted & Locked" : "Submit Work to Faculty Portal"}</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}
