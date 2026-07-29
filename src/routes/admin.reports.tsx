import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { getCoursesStore, getTasksStore, getAttendanceStore, students } from "@/lib/mock-data";
import { BarChart3, GraduationCap, Award, BookOpen, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/admin/reports")({
  component: ReportsContent,
});

function ReportsContent() {
  const [stats, setStats] = useState({
    overallAttendance: 89,
    averageTaskScore: 85,
    totalCourses: 4,
    gradedTasksCount: 1,
    totalSubmissions: 4,
  });

  useEffect(() => {
    const courses = getCoursesStore();
    const tasks = getTasksStore();
    const attendanceRecords = getAttendanceStore();

    let attendancePct = 89;
    if (attendanceRecords.length > 0) {
      const present = attendanceRecords.filter(
        (r) => r.status === "Present" || r.status === "Late",
      ).length;
      attendancePct = Math.round((present / attendanceRecords.length) * 100);
    }

    const gradedTasks = tasks.filter((t) => t.status === "graded" && t.grade !== undefined);
    let avgScorePct = 85;
    if (gradedTasks.length > 0) {
      const totalScorePct = gradedTasks.reduce(
        (sum, t) => sum + ((t.grade || 0) / t.marks) * 100,
        0,
      );
      avgScorePct = Math.round(totalScorePct / gradedTasks.length);
    }

    setStats({
      overallAttendance: attendancePct,
      averageTaskScore: avgScorePct,
      totalCourses: courses.length,
      gradedTasksCount: gradedTasks.length,
      totalSubmissions: tasks.filter((t) => t.status === "submitted" || t.status === "graded")
        .length,
    });
  }, []);

  const weeklyTrends = [
    { week: "Wk 1", val: 84 },
    { week: "Wk 2", val: 87 },
    { week: "Wk 3", val: 91 },
    { week: "Wk 4", val: 88 },
    { week: "Wk 5", val: 92 },
    { week: "Wk 6", val: 89 },
  ];

  const batchPerformance = [
    { name: "Batch A — Front Office Operations", grade: "Semester 3 · 27 Students", avgAttendance: "94%", avgScore: "88/100" },
    { name: "Batch B — Front Office Operations", grade: "Semester 3 · 26 Students", avgAttendance: "91%", avgScore: "85/100" },
    { name: "Batch C — Front Office Operations", grade: "Semester 3 · 26 Students", avgAttendance: "89%", avgScore: "84/100" },
    { name: "Batch D — Front Office Operations", grade: "Semester 3 · 28 Students (Incl. Re-Admission)", avgAttendance: "92%", avgScore: "87/100" },
  ];

  return (
    <div>
      <PageHeader
        title="Institute Performance Reports"
        subtitle="Institute-wide metrics including overall attendance rates, average assignment scores, and batch metrics."
      />

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-[#e5e5e5] rounded-3xl p-6 shadow-xs relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-3xl font-bold text-[#0a0a0a]">
                {stats.overallAttendance}%
              </div>
              <div className="text-sm font-medium text-[#6a6a6a] mt-1">
                Overall Attendance Rate
              </div>
            </div>
            <div className="p-2.5 rounded-2xl bg-[#0a0a0a] text-white">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
          <div className="text-xs text-[#6a6a6a] mt-4 pt-3 border-t border-[#e5e5e5]">
            Calculated across all teacher-marked batch attendance sheets.
          </div>
        </div>

        <div className="bg-white border border-[#e5e5e5] rounded-3xl p-6 shadow-xs relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-3xl font-bold text-[#e8b94a]">
                {stats.averageTaskScore}%
              </div>
              <div className="text-sm font-medium text-[#6a6a6a] mt-1">
                Average Task Grade Score
              </div>
            </div>
            <div className="p-2.5 rounded-2xl bg-[#e8b94a]/20 text-[#0a0a0a]">
              <Award className="w-5 h-5 text-[#e8b94a]" />
            </div>
          </div>
          <div className="text-xs text-[#6a6a6a] mt-4 pt-3 border-t border-[#e5e5e5]">
            Based on {stats.gradedTasksCount} graded task assignment(s) across institute.
          </div>
        </div>

        <div className="bg-white border border-[#e5e5e5] rounded-3xl p-6 shadow-xs relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-3xl font-bold text-[#0a0a0a]">
                4 Batches
              </div>
              <div className="text-sm font-medium text-[#6a6a6a] mt-1">
                Active Student Batches (A, B, C, D)
              </div>
            </div>
            <div className="p-2.5 rounded-2xl bg-[#b8a4ed]/20 text-[#0a0a0a]">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div className="text-xs text-[#6a6a6a] mt-4 pt-3 border-t border-[#e5e5e5]">
            105 enrolled students (including 2 Re-Admissions in Batch D).
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Attendance Visual Bar & Trend Chart */}
        <div className="bg-white border border-[#e5e5e5] rounded-3xl p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-medium text-base text-[#0a0a0a] flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#22c55e]" /> Attendance Trend (Last 6 Weeks)
            </h2>
            <span className="text-xs text-[#22c55e] font-semibold bg-[#22c55e]/10 px-2.5 py-0.5 rounded-full border border-[#22c55e]/20">
              +5.0% Upward Trend
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex items-end justify-between gap-3 h-52 pt-6 px-2 border-b border-[#e5e5e5] pb-2">
              {weeklyTrends.map((item, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <span className="text-xs font-bold text-[#0a0a0a] opacity-80 group-hover:opacity-100 transition-opacity">
                    {item.val}%
                  </span>
                  <div className="w-full bg-[#fffaf0] rounded-2xl h-full flex items-end p-1 border border-[#e5e5e5]">
                    <div
                      className="w-full rounded-xl bg-gradient-to-t from-[#0a0a0a] to-[#e8b94a] group-hover:from-[#0a0a0a] group-hover:to-[#ffb084] transition-all duration-300 shadow-xs"
                      style={{ height: `${(item.val - 50) * 2}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-medium text-[#6a6a6a]">{item.week}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Batch Performance Breakdown */}
        <div className="bg-white border border-[#e5e5e5] rounded-3xl p-6 shadow-xs">
          <h2 className="font-medium text-base text-[#0a0a0a] mb-6 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-[#0a0a0a]" /> Batch Performance & Attendance Breakdown
          </h2>
          <div className="space-y-3.5">
            {batchPerformance.map((c) => (
              <div
                key={c.name}
                className="p-4 rounded-2xl border border-[#e5e5e5] bg-[#fffaf0]/40 flex items-center justify-between"
              >
                <div>
                  <div className="font-semibold text-sm text-[#0a0a0a]">{c.name}</div>
                  <div className="text-xs text-[#6a6a6a]">{c.grade}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-xs text-[#22c55e]">{c.avgAttendance} Attendance</div>
                  <div className="text-xs text-[#6a6a6a] mt-0.5">Avg Score: {c.avgScore}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
