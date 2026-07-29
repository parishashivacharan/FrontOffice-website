import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { getTasksStore, getCoursesStore, type Task, type Course } from "@/lib/mock-data";
import { ClipboardList, CheckCircle2, Clock, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/admin/tasks")({
  component: AdminTasksPage,
});

function AdminTasksPage() {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [coursesList, setCoursesList] = useState<Course[]>([]);

  useEffect(() => {
    setTaskList(getTasksStore());
    setCoursesList(getCoursesStore());
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Institute-Wide Assignments & Tasks"
        subtitle="Complete administrative oversight across all courses, submissions, and grading progress."
      />

      <div className="space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-[#e5e5e5] shadow-xs">
            <div className="text-xs text-[#6a6a6a]">Total Active Tasks</div>
            <div className="text-2xl font-bold text-[#0a0a0a] mt-1">{taskList.length}</div>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-[#e5e5e5] shadow-xs">
            <div className="text-xs text-[#6a6a6a]">Submitted / Pending Review</div>
            <div className="text-2xl font-bold text-[#e8b94a] mt-1">
              {taskList.filter((t) => t.status === "submitted").length}
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-[#e5e5e5] shadow-xs">
            <div className="text-xs text-[#6a6a6a]">Graded Assignments</div>
            <div className="text-2xl font-bold text-[#22c55e] mt-1">
              {taskList.filter((t) => t.status === "graded").length}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-[#e5e5e5] p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-6">
            <ClipboardList className="w-5 h-5 text-[#0a0a0a]" />
            <h2 className="font-medium text-base text-[#0a0a0a]">All Institute Tasks</h2>
          </div>

          <div className="space-y-3">
            {taskList.map((t) => {
              const course = coursesList.find((c) => c.id === t.courseId);
              return (
                <div
                  key={t.id}
                  className="p-4 rounded-2xl border border-[#e5e5e5] bg-[#fffaf0]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="font-semibold text-sm text-[#0a0a0a]">{t.title}</div>
                    <div className="text-xs text-[#6a6a6a] mt-0.5">
                      Course: <span className="font-medium text-[#0a0a0a]">{course?.name || t.courseId}</span> · Due: {t.due} · Marks: {t.marks}
                    </div>
                    <p className="text-xs text-[#6a6a6a] mt-1 line-clamp-1">{t.description}</p>
                  </div>
                  <span className="self-start sm:self-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#0a0a0a]/5 border border-[#0a0a0a]/10">
                    {t.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
