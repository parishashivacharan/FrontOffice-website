import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { PageHeader } from "@/components/AppShell";
import {
  getTasksStore,
  getSubmissionsStore,
  gradeSubmission,
  type Task,
  type SubmissionRecord,
} from "@/lib/mock-data";
import { IHM_STUDENT_ROSTER, type IHMStudentRecord } from "@/lib/ihm-roster-data";
import {
  getSimulationForStudentRosterItem,
  calculateRevenueForecast,
  calculateTask2Matrix,
  calculateFOBudget,
  calculateHKBudget,
  calculateBudgetTotals,
  calculateMonthlyPnL,
  calculatePerformanceScores,
  type HotelSimulationState,
} from "@/lib/hotel-simulation-store";
import { AnimatedTabs, type Tab } from "@/components/ui/animated-tabs";
import {
  ClipboardCheck,
  Search,
  CheckCircle2,
  Clock,
  Award,
  FileText,
  Building2,
  X,
  Send,
  User,
  Inbox,
  Filter,
  DollarSign,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/teacher/submissions")({
  component: TeacherSubmissionsPage,
});

function TeacherSubmissionsPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string>("");
  const [search, setSearch] = useState("");
  const [viewingSimStudent, setViewingSimStudent] = useState<IHMStudentRecord | null>(null);

  // Grading Modal State

  const [gradingStudent, setGradingStudent] = useState<{
    student: IHMStudentRecord;
    task: Task;
    sub?: SubmissionRecord;
  } | null>(null);
  const [gradeInput, setGradeInput] = useState<string>("");
  const [feedbackInput, setFeedbackInput] = useState<string>("");

  const refreshData = () => {
    const loadedTasks = getTasksStore();
    setTasks(loadedTasks);
    if (loadedTasks.length > 0 && !selectedTaskId) {
      setSelectedTaskId(loadedTasks[0].id);
    }
    setSubmissions(getSubmissionsStore());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const activeTask = tasks.find((t) => t.id === selectedTaskId) || tasks[0];

  const handleOpenGradeModal = (student: IHMStudentRecord) => {
    if (!activeTask) return;
    const existingSub = submissions.find(
      (s) =>
        (s.taskId === activeTask.id || s.taskTitle === activeTask.title) &&
        (s.studentName.toLowerCase().includes(student.name.toLowerCase()) ||
          s.councilNo === student.councilNo)
    );

    setGradingStudent({
      student,
      task: activeTask,
      sub: existingSub,
    });
    setGradeInput(existingSub?.grade || (activeTask.status === "graded" ? String(activeTask.grade || 28) : ""));
    setFeedbackInput(existingSub?.feedback || (activeTask.status === "graded" ? activeTask.feedback || "" : ""));
  };

  const handleSaveGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gradingStudent || !activeTask) return;

    const subId = gradingStudent.sub?.id || `sub-${Date.now()}`;
    gradeSubmission(subId, gradeInput, feedbackInput);
    refreshData();
    setGradingStudent(null);
  };

  // Helper to determine student submission status for the selected task
  const getStudentStatus = (student: IHMStudentRecord) => {
    const existingSub = submissions.find(
      (s) =>
        (s.taskId === activeTask?.id || s.taskTitle === activeTask?.title) &&
        (s.studentName.toLowerCase().includes(student.name.toLowerCase()) ||
          s.councilNo === student.councilNo)
    );

    if (existingSub) {
      return {
        status: existingSub.status,
        sub: existingSub,
        submittedAt: existingSub.submittedAt || "Today",
      };
    }

    // Default mock check for demo responsiveness
    if (student.slNo % 2 === 0 || student.slNo === 1 || student.slNo === 104 || student.slNo === 105) {
      return {
        status: student.slNo % 4 === 0 ? ("graded" as const) : ("submitted" as const),
        sub: {
          id: `demo-sub-${student.slNo}`,
          taskId: activeTask?.id || "t-1",
          taskTitle: activeTask?.title || "Task",
          studentName: student.name,
          councilNo: student.councilNo,
          batch: student.batch,
          submittedAt: "2026-07-28",
          maxMarks: activeTask?.marks || 30,
          submissionText: `Official solution worksheet uploaded for ${activeTask?.title}. Calculated target RevPAR & GOP metrics.`,
          status: student.slNo % 4 === 0 ? ("graded" as const) : ("submitted" as const),
          grade: student.slNo % 4 === 0 ? String(Math.round((activeTask?.marks || 30) * 0.9)) : undefined,
          feedback: student.slNo % 4 === 0 ? "Great work! Clear formulas and step-by-step calculations." : undefined,
        },
        submittedAt: "2026-07-28",
      };
    }

    return { status: "not_submitted" as const, sub: null, submittedAt: null };
  };

  // Render Roster Submissions Table for a batch
  const renderBatchSubmissionsTable = (batchName: "A" | "B" | "C" | "D") => {
    const batchStudents = IHM_STUDENT_ROSTER.filter(
      (s) =>
        s.batch === batchName &&
        (search === "" ||
          s.name.toLowerCase().includes(search.toLowerCase()) ||
          s.councilNo.includes(search))
    );

    const studentStatuses = batchStudents.map((st) => ({
      student: st,
      info: getStudentStatus(st),
    }));

    const submittedCount = studentStatuses.filter((s) => s.info.status !== "not_submitted").length;
    const gradedCount = studentStatuses.filter((s) => s.info.status === "graded").length;
    const pendingCount = batchStudents.length - submittedCount;

    return (
      <div className="space-y-4">
        {/* Batch Stats Summary Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#fffaf0] border border-[#e8b94a]/30 p-3.5 rounded-2xl text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#0a0a0a]">BATCH {batchName} SUBMISSION METRICS</span>
            <span className="text-[#6a6a6a]">({batchStudents.length} Enrolled Students)</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#22c55e]/15 text-[#15803d] font-bold border border-[#22c55e]/30">
              {submittedCount} Submitted Work
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#e8b94a]/20 text-[#0a0a0a] font-bold border border-[#e8b94a]/30">
              {gradedCount} Graded
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-[#6a6a6a] font-medium border border-[#e5e5e5]">
              {pendingCount} Not Submitted
            </span>
          </div>
        </div>

        {/* Submissions Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-gray-50 border-b border-[#e5e5e5] text-[#9a9a9a] uppercase font-bold text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-3">Sl No</th>
                <th className="px-4 py-3">Council Roll No</th>
                <th className="px-4 py-3">Student Name</th>
                <th className="px-4 py-3">Submitted On</th>
                <th className="px-4 py-3">Submission Status</th>
                <th className="px-4 py-3 text-right">Evaluation Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e5e5]">
              {studentStatuses.map(({ student, info }) => (
                <tr key={student.slNo} className="hover:bg-[#fffaf0]/40 transition-colors">
                  <td className="px-4 py-3 font-mono font-bold text-[#6a6a6a]">{student.slNo}</td>
                  <td className="px-4 py-3 font-mono font-bold text-[#0a0a0a]">
                    {student.councilNo}
                  </td>
                  <td className="px-4 py-3 font-bold text-[#0a0a0a]">
                    {student.name}
                    {student.isReAdmission && (
                      <span className="ml-2 px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-[9px] font-extrabold uppercase border border-purple-200">
                        Re-Admission
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-[#6a6a6a]">
                    {info.submittedAt || "—"}
                  </td>
                  <td className="px-4 py-3">
                    {info.status === "graded" ? (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#e8b94a]/20 text-[#0a0a0a] border border-[#e8b94a]/40 inline-flex items-center gap-1">
                        <Award className="w-3 h-3 text-[#e8b94a]" /> Graded ({info.sub?.grade || Math.round((activeTask?.marks || 30) * 0.9)} / {activeTask?.marks || 30})
                      </span>
                    ) : info.status === "submitted" ? (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#22c55e]/15 text-[#15803d] border border-[#22c55e]/30 inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-[#22c55e]" /> Submitted & Needs Review
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-gray-100 text-[#6a6a6a] border border-[#e5e5e5] inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Not Submitted
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right flex items-center justify-end gap-2">
                    <button
                      onClick={() => setViewingSimStudent(student)}
                      className="px-2.5 py-1.5 rounded-xl border border-[#e8b94a]/40 bg-[#fffaf0] text-[#0a0a0a] font-bold text-[11px] hover:bg-[#faf5e8] transition-colors flex items-center gap-1"
                      title="Inspect Student's Hotel Simulation & Audit Score"
                    >
                      <Building2 className="w-3.5 h-3.5 text-[#e8b94a]" /> Hotel Lab
                    </button>
                    {info.status !== "not_submitted" ? (
                      <button
                        onClick={() => handleOpenGradeModal(student)}
                        className="px-3 py-1.5 rounded-xl bg-[#0a0a0a] text-white font-semibold text-[11px] hover:bg-black transition-colors"
                      >
                        {info.status === "graded" ? "Edit Grade" : "Grade Work"}
                      </button>
                    ) : (
                      <button
                        disabled
                        className="px-3 py-1.5 rounded-xl bg-gray-100 text-[#9a9a9a] font-medium text-[11px] cursor-not-allowed"
                      >
                        Pending
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const animatedBatchTabs: Tab[] = [
    {
      id: "batch-a",
      label: "Batch A",
      badge: "27 Students",
      content: renderBatchSubmissionsTable("A"),
    },
    {
      id: "batch-b",
      label: "Batch B",
      badge: "26 Students",
      content: renderBatchSubmissionsTable("B"),
    },
    {
      id: "batch-c",
      label: "Batch C",
      badge: "26 Students",
      content: renderBatchSubmissionsTable("C"),
    },
    {
      id: "batch-d",
      label: "Batch D",
      badge: "28 Students",
      content: renderBatchSubmissionsTable("D"),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Student Task Submissions & Batch Grading"
        subtitle="Track submitted student assignments, evaluate solution sheets, and award grades across Batches A, B, C & D."
      />

      {/* Published Tasks Selector */}
      <div className="bg-white p-5 rounded-3xl border border-[#e5e5e5] shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="font-bold text-xs uppercase tracking-wider text-[#6a6a6a] flex items-center gap-2">
            <ClipboardCheck className="w-4 h-4 text-[#e8b94a]" /> Select Published Task to View Submissions
          </div>
          <span className="text-xs font-semibold text-[#0a0a0a] bg-[#fffaf0] px-3 py-1 rounded-full border border-[#e8b94a]/30">
            {tasks.length} Active Published Tasks
          </span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {tasks.map((task) => {
            const isSelected = task.id === selectedTaskId;
            return (
              <button
                key={task.id}
                onClick={() => setSelectedTaskId(task.id)}
                className={cn(
                  "p-4 rounded-2xl text-left border transition-all space-y-2 flex flex-col justify-between",
                  isSelected
                    ? "bg-[#0a0a0a] text-white border-[#0a0a0a] shadow-md"
                    : "bg-[#fffaf0]/60 text-[#0a0a0a] border-[#e5e5e5] hover:border-[#0a0a0a]/40"
                )}
              >
                <div>
                  <div className={cn("text-xs font-bold line-clamp-2", isSelected ? "text-white" : "text-[#0a0a0a]")}>
                    {task.title}
                  </div>
                  <div className={cn("text-[10px] mt-1", isSelected ? "text-gray-300" : "text-[#6a6a6a]")}>
                    Due: {task.due} · Max Marks: {task.marks}
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-white/10">
                  <span
                    className={cn(
                      "text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full",
                      isSelected ? "bg-white/20 text-white" : "bg-[#e8b94a]/20 text-[#0a0a0a]"
                    )}
                  >
                    Front Office
                  </span>
                  <span className={cn("text-[10px] font-bold", isSelected ? "text-[#e8b94a]" : "text-[#0a0a0a]")}>
                    {isSelected ? "Active View →" : "Select Task"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Batch Submissions Roster */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-3xl border border-[#e5e5e5] shadow-xs">
          <div>
            <h2 className="text-base font-bold text-[#0a0a0a] flex items-center gap-2">
              <Inbox className="w-4 h-4 text-[#e8b94a]" /> Batch Submissions: {activeTask?.title}
            </h2>
            <p className="text-xs text-[#6a6a6a] mt-0.5">
              Review answers submitted by students across 4 batches.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#9a9a9a]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search student name or roll no..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#e5e5e5] bg-[#fffaf0]/40 focus:outline-none focus:border-[#0a0a0a]"
            />
          </div>
        </div>

        <AnimatedTabs tabs={animatedBatchTabs} defaultTab="batch-a" />
      </div>

      {/* Grading Modal */}
      {gradingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl border border-[#e5e5e5] max-w-xl w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-[#e5e5e5] pb-4">
              <div>
                <h3 className="text-base font-bold text-[#0a0a0a]">
                  Grade Student Submission
                </h3>
                <p className="text-xs text-[#6a6a6a]">
                  {gradingStudent.student.name} ({gradingStudent.student.councilNo}) · Batch {gradingStudent.student.batch}
                </p>
              </div>
              <button
                onClick={() => setGradingStudent(null)}
                className="p-2 rounded-xl text-[#6a6a6a] hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#fffaf0] border border-[#e8b94a]/30 space-y-2">
                <div className="text-xs font-bold text-[#0a0a0a]">
                  Task: {gradingStudent.task.title} (Max Marks: {gradingStudent.task.marks})
                </div>
                <div className="text-xs text-[#6a6a6a]">
                  <span className="font-semibold text-[#0a0a0a]">Submitted Work Note:</span>{" "}
                  "{gradingStudent.sub?.submissionText || "Solution calculation sheet submitted by student."}"
                </div>
              </div>

              <form onSubmit={handleSaveGrade} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#3a3a3a] mb-1">
                    Award Score (Out of {gradingStudent.task.marks})
                  </label>
                  <input
                    type="number"
                    min="0"
                    max={gradingStudent.task.marks}
                    required
                    value={gradeInput}
                    onChange={(e) => setGradeInput(e.target.value)}
                    placeholder={`e.g. 27`}
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#e5e5e5] bg-[#fffaf0]/40 focus:outline-none focus:border-[#0a0a0a] font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#3a3a3a] mb-1">
                    Teacher Remarks & Feedback
                  </label>
                  <textarea
                    rows={3}
                    value={feedbackInput}
                    onChange={(e) => setFeedbackInput(e.target.value)}
                    placeholder="Provide constructive feedback for the student..."
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#e5e5e5] bg-[#fffaf0]/40 focus:outline-none focus:border-[#0a0a0a]"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#e5e5e5]">
                  <button
                    type="button"
                    onClick={() => setGradingStudent(null)}
                    className="px-4 py-2 rounded-xl border border-[#e5e5e5] text-xs font-semibold hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#0a0a0a] text-white text-xs font-semibold hover:bg-black transition-colors flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" /> Save Grade & Feedback
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Student Hotel Simulation Inspection Modal */}
      {viewingSimStudent && (() => {
        const studentSim = getSimulationForStudentRosterItem(viewingSimStudent);
        const forecast = calculateRevenueForecast(
          studentSim.task1Rooms || 100,
          studentSim.task1Adr || 15000,
          studentSim.task1Occupancy || 70,
          studentSim.task1Days || 365
        );
        const foBudget = calculateFOBudget(studentSim.frontOfficeItems, studentSim.foCapitalBudget);
        const hkBudget = calculateHKBudget(studentSim.housekeepingItems, studentSim.hkCapitalBudget);
        const combinedBudget = calculateBudgetTotals(
          studentSim.frontOfficeItems,
          studentSim.housekeepingItems,
          studentSim.foCapitalBudget + studentSim.hkCapitalBudget
        );
        const pnl = calculateMonthlyPnL(studentSim);

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in overflow-y-auto">
            <div className="bg-white rounded-3xl border border-[#e5e5e5] max-w-3xl w-full p-6 shadow-2xl space-y-5 my-8">
              <div className="flex items-center justify-between border-b border-[#e5e5e5] pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-[#fffaf0] border border-[#e8b94a]/30">
                    <Building2 className="w-5 h-5 text-[#e8b94a]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#0a0a0a]">
                      {studentSim.hotelName} ({studentSim.hotelId})
                    </h3>
                    <p className="text-xs text-[#6a6a6a]">
                      Student: <span className="font-semibold text-[#0a0a0a]">{viewingSimStudent.name}</span> ({viewingSimStudent.councilNo}) · {studentSim.position}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setViewingSimStudent(null)}
                  className="p-2 rounded-xl text-[#6a6a6a] hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Overview Metrics Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-[#fffaf0] border border-[#e8b94a]/30">
                  <span className="text-[10px] font-bold text-[#6a6a6a] uppercase block">Task 1 RevPAR</span>
                  <span className="text-base font-extrabold font-mono text-[#15803d]">₹{forecast.revPar.toLocaleString("en-IN")}</span>
                </div>

                <div className="p-3 rounded-2xl bg-white border border-[#e5e5e5]">
                  <span className="text-[10px] font-bold text-[#6a6a6a] uppercase block">FO Spend</span>
                  <span className="text-sm font-bold font-mono text-[#0a0a0a]">₹{foBudget.totalActual.toLocaleString("en-IN")}</span>
                </div>

                <div className="p-3 rounded-2xl bg-white border border-[#e5e5e5]">
                  <span className="text-[10px] font-bold text-[#6a6a6a] uppercase block">HK Spend</span>
                  <span className="text-sm font-bold font-mono text-[#0a0a0a]">₹{hkBudget.totalActual.toLocaleString("en-IN")}</span>
                </div>

                <div className="p-3 rounded-2xl bg-white border border-[#e5e5e5]">
                  <span className="text-[10px] font-bold text-[#6a6a6a] uppercase block">Remaining Budget</span>
                  <span className={cn(
                    "text-sm font-bold font-mono",
                    combinedBudget.remainingBudget < 0 ? "text-red-700" : "text-[#15803d]"
                  )}>
                    ₹{combinedBudget.remainingBudget.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Detailed Breakdown Tabs for Teacher Inspection */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-[#0a0a0a] uppercase tracking-wider">
                  Detailed Student Submissions Breakdown
                </div>

                <div className="border border-[#e5e5e5] rounded-2xl overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <tbody className="divide-y divide-[#e5e5e5]">
                      <tr className="bg-slate-50 font-bold">
                        <td className="px-4 py-2 text-[#0a0a0a]" colSpan={2}>TASK 1: REVENUE FORECAST</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-[#6a6a6a]">Rooms & ADR Input</td>
                        <td className="px-4 py-2 text-right font-mono">{studentSim.task1Rooms} Rooms @ ₹{studentSim.task1Adr.toLocaleString("en-IN")}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-[#6a6a6a]">Occupancy % & Nights Sold</td>
                        <td className="px-4 py-2 text-right font-mono">{studentSim.task1Occupancy}% ({forecast.roomsSold.toLocaleString("en-IN")} Sold)</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-[#6a6a6a]">Total Annual Revenue</td>
                        <td className="px-4 py-2 text-right font-mono font-bold text-emerald-700">₹{forecast.annualRevenue.toLocaleString("en-IN")}</td>
                      </tr>

                      <tr className="bg-slate-50 font-bold">
                        <td className="px-4 py-2 text-[#0a0a0a]" colSpan={2}>CAPITAL BUDGETING (FO & HK)</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-[#6a6a6a]">Front Office Budget (13 Items)</td>
                        <td className="px-4 py-2 text-right font-mono">Actual: ₹{foBudget.totalActual.toLocaleString("en-IN")} / ₹20,00,000</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-[#6a6a6a]">Housekeeping Budget (19 Items)</td>
                        <td className="px-4 py-2 text-right font-mono">Actual: ₹{hkBudget.totalActual.toLocaleString("en-IN")} / ₹20,00,000</td>
                      </tr>
                      <tr className="bg-[#fffaf0] font-bold">
                        <td className="px-4 py-2 text-[#0a0a0a]">Total Capital Budget Status</td>
                        <td className="px-4 py-2 text-right font-mono text-[#15803d]">{combinedBudget.budgetStatus} (Unspent ₹{combinedBudget.remainingBudget.toLocaleString("en-IN")})</td>
                      </tr>

                      <tr className="bg-slate-50 font-bold">
                        <td className="px-4 py-2 text-[#0a0a0a]" colSpan={2}>MONTHLY P&L STATEMENT</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-[#6a6a6a]">Monthly Net Revenue</td>
                        <td className="px-4 py-2 text-right font-mono font-bold text-blue-700">₹{pnl.netRevenueActual.toLocaleString("en-IN")}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-[#6a6a6a]">Monthly Total Operating Expenses</td>
                        <td className="px-4 py-2 text-right font-mono font-bold text-rose-700">₹{pnl.totalExpensesActual.toLocaleString("en-IN")}</td>
                      </tr>
                      <tr className="bg-emerald-50 font-bold">
                        <td className="px-4 py-2 text-emerald-900">Gross Operating Profit (GOP)</td>
                        <td className="px-4 py-2 text-right font-mono text-emerald-700 font-extrabold">₹{pnl.gopActual.toLocaleString("en-IN")}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Faculty Diagnostics */}
              <div className="p-4 rounded-2xl bg-[#fffaf0] border border-[#e8b94a]/30 space-y-1.5 text-xs">
                <div className="font-bold text-[#0a0a0a] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#e8b94a]" /> Faculty Evaluation Summary
                </div>
                <p className="text-[#6a6a6a]">
                  Student has completed Task 1 Forecasting, Task 2 Matrix, FO Capital Budget, HK Capital Budget, and Monthly Operating Statements accurately.
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-[#e5e5e5] pt-4">
                <button
                  onClick={() => {
                    handleOpenGradeModal(viewingSimStudent);
                    setViewingSimStudent(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#e8b94a] text-black font-bold text-xs hover:bg-[#d8a93a]"
                >
                  Grade Student Work
                </button>

                <button
                  onClick={() => setViewingSimStudent(null)}
                  className="px-5 py-2 rounded-2xl bg-[#0a0a0a] text-white text-xs font-semibold hover:bg-black transition-colors"
                >
                  Close Inspection
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

