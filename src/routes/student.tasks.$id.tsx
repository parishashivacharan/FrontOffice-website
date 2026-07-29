import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { getTasksStore, getCoursesStore, updateTaskSubmission, type Task } from "@/lib/mock-data";
import { getCurrentUser, isStudentProfileComplete } from "@/lib/mock-auth";
import { Upload, CheckCircle2, Award, FileText, Calendar, ArrowLeft, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/student/tasks/$id")({
  component: TaskDetailContent,
});

function TaskDetailContent() {
  const { id } = Route.useParams();
  const tasks = getTasksStore();
  const courses = getCoursesStore();
  const initialTask = tasks.find((t) => t.id === id) || tasks[0];
  const course = courses.find((c) => c.id === initialTask.courseId || c.name.toLowerCase().includes(initialTask.courseId.toLowerCase()));

  const [task, setTask] = useState<Task>(initialTask);
  const [answer, setAnswer] = useState(initialTask.submissionText || "");
  const [fileName, setFileName] = useState(initialTask.submissionFile || "");
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [profileComplete, setProfileComplete] = useState(true);

  useEffect(() => {
    const user = getCurrentUser();
    setProfileComplete(isStudentProfileComplete(user));
  }, []);

  const handleSubmitWork = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileComplete) return;
    const updated = updateTaskSubmission(task.id, answer, fileName || "assignment_response.pdf");
    if (updated) {
      setTask(updated);
      setSubmittedSuccess(true);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={task.title}
        subtitle={`${course?.name || "Course Task"} (${course?.grade || "Grade 10"}) · Due ${task.due} · Maximum Marks: ${task.marks}`}
        action={
          <Link
            to="/student/tasks"
            className="px-4 py-2 rounded-xl border border-[#e5e5e5] bg-white text-xs font-semibold text-[#0a0a0a] hover:bg-[#faf5e8] transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Tasks List
          </Link>
        }
      />

      {submittedSuccess && (
        <div className="p-4 rounded-2xl bg-[#22c55e]/15 border border-[#22c55e]/30 text-[#0a0a0a] text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#22c55e]" />
          <span>✓ Your work has been submitted successfully to your teacher!</span>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-[#e5e5e5] rounded-3xl p-6 shadow-xs space-y-6">
          <div>
            <h2 className="font-medium text-base text-[#0a0a0a] mb-2">Assignment Instructions</h2>
            <p className="text-xs text-[#6a6a6a] leading-relaxed bg-[#fffaf0]/60 p-4 rounded-2xl border border-[#e5e5e5]">
              {task.description}
            </p>
          </div>

          <div className="border-t border-[#e5e5e5] pt-5">
            <h2 className="font-medium text-base text-[#0a0a0a] mb-4">Your Answer & Work Submission</h2>

            {task.status === "graded" ? (
              <div className="p-5 rounded-2xl bg-[#22c55e]/10 border border-[#22c55e]/20 space-y-3">
                <div className="font-semibold text-xs text-[#22c55e] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Graded by Teacher
                </div>
                <div className="text-2xl font-bold text-[#0a0a0a]">
                  Score: {task.grade || 34} / {task.marks}{" "}
                  <span className="text-xs font-normal text-[#6a6a6a]">
                    ({Math.round(((task.grade || 34) / task.marks) * 100)}%)
                  </span>
                </div>
                {task.feedback && (
                  <div className="p-3.5 rounded-xl bg-white border border-[#e5e5e5] text-xs text-[#0a0a0a]">
                    <span className="font-semibold text-[#e8b94a]">Teacher Feedback:</span> "{task.feedback}"
                  </div>
                )}
                {task.submissionText && (
                  <div className="text-xs text-[#6a6a6a] pt-1">
                    <span className="font-semibold text-[#0a0a0a]">Your Submitted Response:</span> "{task.submissionText}"
                  </div>
                )}
              </div>
            ) : task.status === "submitted" ? (
              <div className="p-5 rounded-2xl bg-[#b8a4ed]/15 border border-[#b8a4ed]/30 space-y-3">
                <div className="font-semibold text-xs text-[#0a0a0a] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0a0a0a]" /> Work Submitted & Under Review
                </div>
                <p className="text-xs text-[#6a6a6a]">
                  Your assignment response has been received by <strong>{course?.teacher || "your teacher"}</strong> and is pending grading.
                </p>
                {task.submissionText && (
                  <div className="p-3.5 rounded-xl bg-white border border-[#e5e5e5] text-xs text-[#0a0a0a]">
                    <span className="font-semibold text-[#6a6a6a]">Submitted Text:</span> "{task.submissionText}"
                  </div>
                )}
                {task.submissionFile && (
                  <div className="text-xs text-[#0a0a0a] flex items-center gap-1.5 pt-1">
                    <FileText className="w-3.5 h-3.5 text-[#0a0a0a]" /> Attached File: {task.submissionFile}
                  </div>
                )}
              </div>
            ) : !profileComplete ? (
              <div className="p-5 rounded-2xl bg-[#fffaf0] border border-[#e8b94a]/40 text-[#0a0a0a] space-y-3">
                <div className="flex items-center gap-2 font-bold text-xs">
                  <AlertCircle className="w-4 h-4 text-[#e8b94a]" /> Profile Setup Required to Submit Tasks
                </div>
                <p className="text-xs text-[#6a6a6a] leading-relaxed">
                  You must complete your student identity profile setup (Council Roll No & Name verification) before submitting assignments to teachers.
                </p>
                <Link
                  to="/student/profile"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0a0a0a] text-white text-xs font-semibold hover:bg-black transition-colors"
                >
                  Complete Profile Setup →
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmitWork} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#3a3a3a] mb-1">
                    Type Answer / Solution Notes
                  </label>
                  <textarea
                    rows={6}
                    required
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Type your complete answer, solution steps, or notes here..."
                    className="w-full px-4 py-3 text-xs rounded-xl border border-[#e5e5e5] bg-[#fffaf0]/40 focus:outline-none focus:border-[#0a0a0a]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-[#3a3a3a] mb-1">
                    Attach Work File (Optional)
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#e5e5e5] cursor-pointer hover:bg-[#faf5e8] text-xs font-medium transition-colors bg-white">
                      <Upload className="h-4 w-4 text-[#0a0a0a]" />
                      <span>{fileName ? fileName : "Choose Document or PDF File"}</span>
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
                      />
                    </label>
                    {fileName && (
                      <span className="text-xs text-[#22c55e] font-semibold">✓ File attached</span>
                    )}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#0a0a0a] text-white text-xs font-medium hover:bg-[#1a1a1a] transition-colors"
                  >
                    Submit Assignment to Teacher
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Task Meta Sidebar Card */}
        <div className="bg-white border border-[#e5e5e5] rounded-3xl p-6 h-fit shadow-xs space-y-4">
          <h2 className="font-medium text-sm text-[#0a0a0a] border-b border-[#e5e5e5] pb-3">
            Task Specifications
          </h2>
          <dl className="space-y-4 text-xs">
            <div>
              <dt className="text-[10px] text-[#9a9a9a] uppercase tracking-wider font-semibold">Course</dt>
              <dd className="font-semibold text-[#0a0a0a] mt-0.5">{course?.name}</dd>
            </div>
            <div>
              <dt className="text-[10px] text-[#9a9a9a] uppercase tracking-wider font-semibold">Instructor</dt>
              <dd className="font-medium text-[#3a3a3a] mt-0.5">{course?.teacher}</dd>
            </div>
            <div>
              <dt className="text-[10px] text-[#9a9a9a] uppercase tracking-wider font-semibold">Deadline</dt>
              <dd className="font-medium text-[#0a0a0a] mt-0.5">{task.due}</dd>
            </div>
            <div>
              <dt className="text-[10px] text-[#9a9a9a] uppercase tracking-wider font-semibold">Maximum Marks</dt>
              <dd className="font-bold text-[#0a0a0a] mt-0.5">{task.marks} Marks</dd>
            </div>
            <div>
              <dt className="text-[10px] text-[#9a9a9a] uppercase tracking-wider font-semibold">Status</dt>
              <dd className="mt-1">
                <span
                  className={cn(
                    "text-[10px] px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider border inline-block",
                    task.status === "graded"
                      ? "bg-[#22c55e]/15 text-[#22c55e] border-[#22c55e]/30"
                      : task.status === "submitted"
                        ? "bg-[#b8a4ed]/20 text-[#0a0a0a] border-[#b8a4ed]/30"
                        : "bg-[#e8b94a]/15 text-[#0a0a0a] border-[#e8b94a]/30",
                  )}
                >
                  {task.status}
                </span>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
