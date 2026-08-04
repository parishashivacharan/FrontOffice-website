import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { PageHeader } from "@/components/AppShell";
import { getTasksStore, type Task } from "@/lib/mock-data";
import {
  FileText,
  Upload,
  CheckCircle2,
  Download,
  Send,
  Search,
  Filter,
  X,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/student/assignments")({
  component: StudentAssignmentsPage,
});

export function StudentAssignmentsPage() {
  const [filterTab, setFilterTab] = useState<"all" | "pending" | "submitted" | "graded">("all");
  const [search, setSearch] = useState("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Form state inside submission modal
  const [submissionText, setSubmissionText] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [taskList, setTaskList] = useState<Task[]>(() => {
    return getTasksStore();
  });

  const filteredTasks = useMemo(() => {
    return taskList.filter((task) => {
      const matchesFilter =
        filterTab === "all" ||
        (filterTab === "pending" && task.status === "pending") ||
        (filterTab === "submitted" && task.status === "submitted") ||
        (filterTab === "graded" && task.status === "graded");

      const matchesSearch =
        search === "" ||
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [taskList, filterTab, search]);

  const openTaskModal = (task: Task) => {
    setSelectedTask(task);
    setSubmissionText(task.submissionText || "");
    setUploadedFileName(task.submissionFile || "");
  };

  const handleFileUploadSim = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFileName(e.target.files[0].name);
    }
  };

  const handleSubmitAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTask) return;

    const fileNameToSave = uploadedFileName.trim() || `${selectedTask.id}_submission.pdf`;

    const updatedTasks = taskList.map((t) =>
      t.id === selectedTask.id
        ? {
            ...t,
            status: "submitted" as const,
            submissionText: submissionText,
            submissionFile: fileNameToSave,
          }
        : t
    );

    setTaskList(updatedTasks);
    setSelectedTask(null);

    setToastMessage(`✓ Assignment "${selectedTask.title}" submitted successfully!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const pendingCount = taskList.filter((t) => t.status === "pending").length;

  return (
    <div className="space-y-5 font-sans">
      {/* ── Single Unified Clean Page Header ── */}
      <PageHeader
        title="Academic Tasks & Course Assignments"
        subtitle="Practical coursework and assignments published by faculty for evaluation."
      />

      {toastMessage && (
        <div className="p-3.5 rounded-2xl bg-[#22c55e]/15 border border-[#22c55e]/30 text-[#0a0a0a] text-xs font-semibold animate-in fade-in slide-in-from-top-2">
          {toastMessage}
        </div>
      )}

      {/* ── Search & Scholaria Filter Controls Bar ── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-3xl border border-[#e5e5e5] shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9a9a9a]" />
          <input
            type="text"
            placeholder="Search task title or description (e.g. Hubbart, CPOR, RevPAR)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-2xl border border-[#e5e5e5] focus:outline-none focus:border-[#0a0a0a] bg-[#fffaf0]/40 text-[#0a0a0a]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <Filter className="w-3.5 h-3.5 text-[#9a9a9a] shrink-0 ml-1" />
          <button
            onClick={() => setFilterTab("all")}
            className={cn(
              "px-3.5 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 border",
              filterTab === "all"
                ? "bg-[#0a0a0a] text-white border-[#0a0a0a]"
                : "bg-white text-[#6a6a6a] border-[#e5e5e5] hover:bg-[#fffaf0]"
            )}
          >
            All ({taskList.length})
          </button>
          <button
            onClick={() => setFilterTab("pending")}
            className={cn(
              "px-3.5 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 border",
              filterTab === "pending"
                ? "bg-[#0a0a0a] text-white border-[#0a0a0a]"
                : "bg-white text-[#6a6a6a] border-[#e5e5e5] hover:bg-[#fffaf0]"
            )}
          >
            Pending ({pendingCount})
          </button>
          <button
            onClick={() => setFilterTab("submitted")}
            className={cn(
              "px-3.5 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 border",
              filterTab === "submitted"
                ? "bg-[#0a0a0a] text-white border-[#0a0a0a]"
                : "bg-white text-[#6a6a6a] border-[#e5e5e5] hover:bg-[#fffaf0]"
            )}
          >
            Submitted
          </button>
          <button
            onClick={() => setFilterTab("graded")}
            className={cn(
              "px-3.5 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 border",
              filterTab === "graded"
                ? "bg-[#0a0a0a] text-white border-[#0a0a0a]"
                : "bg-white text-[#6a6a6a] border-[#e5e5e5] hover:bg-[#fffaf0]"
            )}
          >
            Graded
          </button>
        </div>
      </div>

      {/* ── Line-by-Line Stacked Task List (Scholaria Card UI) ── */}
      <div className="bg-white border border-[#e5e5e5] rounded-3xl p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-[#e5e5e5] pb-3">
          <div>
            <h2 className="text-sm font-bold text-[#0a0a0a]">Assigned Coursework</h2>
            <p className="text-xs text-[#6a6a6a]">Submit your work before due dates for faculty evaluation.</p>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#fffaf0] text-[#0a0a0a] border border-[#e8b94a]/40">
            {pendingCount} pending submission
          </span>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="p-8 text-center text-xs text-[#6a6a6a]">
            No coursework tasks match your search query or filter selection.
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTasks.map((t) => (
              <div
                key={t.id}
                onClick={() => openTaskModal(t)}
                className="p-4 rounded-2xl border border-[#e5e5e5] bg-white hover:border-[#0a0a0a]/30 hover:bg-[#fffaf0]/20 transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
              >
                {/* Left Task Information */}
                <div className="space-y-1 flex-1">
                  <h3 className="text-sm font-bold text-[#0a0a0a] group-hover:text-[#e8b94a] transition-colors leading-snug">
                    {t.title}
                  </h3>
                  <div className="text-[11px] text-[#6a6a6a] font-medium flex items-center gap-2">
                    <span>Room Division - Front Office</span>
                    <span>•</span>
                    <span>Due: {t.due}</span>
                    <span>•</span>
                    <span>{t.marks} Marks</span>
                  </div>
                  <p className="text-xs text-[#6a6a6a] line-clamp-1 leading-relaxed mt-0.5 font-normal">
                    {t.description}
                  </p>
                </div>

                {/* Right Status & Action */}
                <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                  {t.status === "pending" && (
                    <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                      PENDING
                    </span>
                  )}
                  {t.status === "submitted" && (
                    <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      SUBMITTED
                    </span>
                  )}
                  {t.status === "graded" && (
                    <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      GRADED ({t.grade ? `${t.grade}/${t.marks}` : "GRADED"})
                    </span>
                  )}

                  <button
                    type="button"
                    className="px-4 py-2 rounded-2xl bg-[#0a0a0a] text-white text-xs font-medium hover:bg-[#1a1a1a] transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#e8b94a]" />
                    <span>{t.status === "pending" ? "Submit Work" : "View"}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#9a9a9a]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Single-View Submission Dialog (Compact, NO SCROLLING, Scholaria Design Tokens) ── */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl border border-[#e5e5e5] max-w-lg w-full shadow-2xl p-5 space-y-4 relative text-left">
            {/* Header */}
            <div className="flex items-start justify-between gap-3 border-b border-gray-100 pb-3">
              <div>
                <h2 className="text-sm font-bold text-[#0a0a0a] leading-snug">{selectedTask.title}</h2>
                <div className="text-[11px] text-[#6a6a6a] mt-0.5">Due: {selectedTask.due} · Maximum Marks: {selectedTask.marks} Marks</div>
              </div>
              <button
                onClick={() => setSelectedTask(null)}
                className="p-1 rounded-full text-gray-400 hover:text-[#0a0a0a] hover:bg-gray-100 transition-all shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Compact Instructions */}
            <div className="p-3 rounded-2xl bg-[#fffaf0] border border-[#e8b94a]/30 text-xs text-[#0a0a0a] space-y-1">
              <div className="font-bold text-[10px] uppercase text-[#6a6a6a]">Faculty Task Briefing</div>
              <p className="text-[11px] leading-snug">{selectedTask.description}</p>
            </div>

            {/* Faculty Feedback (if graded) */}
            {selectedTask.status === "graded" && selectedTask.feedback && (
              <div className="p-3 rounded-2xl bg-[#faf5e8] border border-[#e8b94a]/40 text-xs text-[#0a0a0a] space-y-1">
                <div className="font-bold text-[10px] uppercase text-[#8a6d1c]">Faculty Evaluation Remark</div>
                <p className="text-[11px] italic font-medium">"{selectedTask.feedback}"</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmitAssignment} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-[#0a0a0a] mb-1">
                  Submission Notes / Calculation Summary
                </label>
                <textarea
                  rows={2}
                  disabled={selectedTask.status !== "pending"}
                  placeholder="Enter calculation steps or response notes..."
                  value={submissionText}
                  onChange={(e) => setSubmissionText(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 font-medium focus:outline-none focus:border-[#0a0a0a] disabled:bg-gray-50 text-[#0a0a0a]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#0a0a0a] mb-1">
                  Attach Work PDF File
                </label>

                {selectedTask.status === "pending" ? (
                  <div className="border border-dashed border-gray-300 rounded-xl p-3 text-center bg-[#fffaf0]/30 hover:border-[#0a0a0a] transition-all">
                    <input
                      type="file"
                      id="pdfUpload"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUploadSim}
                      className="hidden"
                    />
                    <label htmlFor="pdfUpload" className="cursor-pointer flex items-center justify-center gap-2">
                      <Upload className="w-4 h-4 text-[#0a0a0a]" />
                      <span className="text-xs font-semibold text-[#0a0a0a]">
                        {uploadedFileName ? uploadedFileName : "Upload PDF Work File"}
                      </span>
                    </label>
                  </div>
                ) : (
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs flex items-center justify-between">
                    <span className="font-semibold text-emerald-900 truncate">
                      {selectedTask.submissionFile || "Assignment_Response.pdf"}
                    </span>
                    <span className="text-[10px] text-emerald-700 shrink-0">Submitted</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setSelectedTask(null)}
                  className="px-4 py-1.5 rounded-xl border border-gray-300 text-xs font-medium text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>

                {selectedTask.status === "pending" && (
                  <button
                    type="submit"
                    className="px-5 py-1.5 bg-[#0a0a0a] text-white rounded-xl text-xs font-bold hover:bg-[#1a1a1a] flex items-center gap-1.5 shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5 text-[#e8b94a]" />
                    <span>Submit Work</span>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
