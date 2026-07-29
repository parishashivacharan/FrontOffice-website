import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { getTasksStore, getCoursesStore, getSubmissionsStore, type Task } from "@/lib/mock-data";
import { ClipboardList, Calendar, Award, CheckCircle2, Clock, FileText, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/student/tasks/")({
  component: StudentTasksIndexPage,
});

function StudentTasksIndexPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [courses, setCourses] = useState(getCoursesStore());
  const [submissions, setSubmissions] = useState(getSubmissionsStore());
  const [filter, setFilter] = useState<"all" | "pending" | "submitted" | "graded">("all");

  useEffect(() => {
    setTasks(getTasksStore());
    setCourses(getCoursesStore());
    setSubmissions(getSubmissionsStore());
  }, []);

  const getCourseName = (courseId: string) => {
    const found = courses.find((c) => c.id === courseId || c.name.toLowerCase().includes(courseId.toLowerCase()));
    return found ? `${found.name} (${found.grade})` : courseId;
  };

  const getSubmissionInfo = (task: Task) => {
    const sub = submissions.find((s) => s.taskId === task.id || s.taskTitle === task.title);
    if (sub) {
      if (sub.status === "graded") {
        return { status: "graded", label: `Graded (${sub.grade}/${sub.maxMarks || task.marks})`, grade: sub.grade };
      }
      return { status: "submitted", label: "Submitted & Under Review" };
    }
    if (task.status === "graded") {
      return { status: "graded", label: `Graded (${task.grade || 34}/${task.marks})`, grade: task.grade || 34 };
    }
    if (task.status === "submitted") {
      return { status: "submitted", label: "Submitted" };
    }
    return { status: "pending", label: "Pending Submission" };
  };

  const filteredTasks = tasks.filter((t) => {
    const info = getSubmissionInfo(t);
    if (filter === "all") return true;
    return info.status === filter;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Class Assignments & Tasks"
        subtitle="View all course tasks, upload work before deadlines, and check teacher grades and feedback."
      />

        {/* Filter Pills */}
        <div className="flex items-center gap-2 border-b border-[#e5e5e5] pb-3 overflow-x-auto">
          {[
            { id: "all", label: `All Tasks (${tasks.length})` },
            { id: "pending", label: `Pending (${tasks.filter((t) => getSubmissionInfo(t).status === "pending").length})` },
            { id: "submitted", label: `Submitted (${tasks.filter((t) => getSubmissionInfo(t).status === "submitted").length})` },
            { id: "graded", label: `Graded (${tasks.filter((t) => getSubmissionInfo(t).status === "graded").length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={cn(
                "px-4 py-2 rounded-2xl text-xs font-semibold transition-all shrink-0 border",
                filter === tab.id
                  ? "bg-[#0a0a0a] text-white border-[#0a0a0a] shadow-xs"
                  : "bg-white text-[#6a6a6a] border-[#e5e5e5] hover:bg-[#fffaf0] hover:text-[#0a0a0a]",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <div className="bg-white rounded-3xl border border-[#e5e5e5] p-12 text-center text-xs text-[#6a6a6a]">
              No assignments match the selected status filter.
            </div>
          ) : (
            filteredTasks.map((task) => {
              const info = getSubmissionInfo(task);

              return (
                <div
                  key={task.id}
                  className="bg-white border border-[#e5e5e5] rounded-3xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[#0a0a0a]/30 transition-all"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#0a0a0a]/5 text-[#0a0a0a]">
                        {getCourseName(task.courseId)}
                      </span>
                      <span
                        className={cn(
                          "text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border",
                          info.status === "graded"
                            ? "bg-[#22c55e]/15 text-[#22c55e] border-[#22c55e]/30"
                            : info.status === "submitted"
                              ? "bg-[#b8a4ed]/20 text-[#0a0a0a] border-[#b8a4ed]/30"
                              : "bg-[#e8b94a]/15 text-[#0a0a0a] border-[#e8b94a]/30",
                        )}
                      >
                        {info.label}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-[#0a0a0a]">{task.title}</h3>
                    <p className="text-xs text-[#6a6a6a] line-clamp-2">{task.description}</p>

                    <div className="flex items-center gap-4 text-xs text-[#6a6a6a] pt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#0a0a0a]" /> Due: {task.due}
                      </span>
                      <span className="flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 text-[#e8b94a]" /> Max Marks: {task.marks}
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-3">
                    <Link
                      to="/student/tasks/$id"
                      params={{ id: task.id }}
                      className="px-5 py-2.5 rounded-2xl bg-[#0a0a0a] text-white text-xs font-semibold hover:bg-[#1a1a1a] transition-colors flex items-center gap-2"
                    >
                      {info.status === "pending" ? "Submit Assignment" : "View Work & Grade"}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </div>
    </div>
  );
}
