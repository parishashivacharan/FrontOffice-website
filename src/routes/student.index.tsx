import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/AppShell";
import {
  getCoursesStore,
  getTasksStore,
  getAnnouncementsStore,
  getStudentAttendanceSummary,
} from "@/lib/mock-data";
import { getCurrentUser } from "@/lib/mock-auth";
import { IHM_STUDENT_ROSTER } from "@/lib/ihm-roster-data";
import { UNIVERSES_DATA } from "@/lib/universes-data";
import {
  CalendarClock,
  FileText,
  Megaphone,
  TrendingUp,
  ArrowRight,
  BookOpen,
  AlertCircle,
  UserCheck,
} from "lucide-react";

export const Route = createFileRoute("/student/")({
  component: StudentDashboard,
});

function StudentDashboard() {
  const user = getCurrentUser();
  const [courses, setCourses] = useState(getCoursesStore());
  const [taskList, setTaskList] = useState(getTasksStore());
  const [announcementList, setAnnouncementList] = useState(getAnnouncementsStore());
  const [attendancePct, setAttendancePct] = useState(92);

  useEffect(() => {
    setCourses(getCoursesStore());
    setTaskList(getTasksStore());
    setAnnouncementList(getAnnouncementsStore());
    if (user) {
      setAttendancePct(getStudentAttendanceSummary(user.id).percentage);
    }
  }, [user?.id]);

  const pendingTasks = taskList.filter((t) => t.status === "pending");

  // Check if profile setup is complete
  const emailRoll = user?.email?.split("@")[0];
  const matchingRoster = IHM_STUDENT_ROSTER.find(
    (s) => s.councilNo === emailRoll || s.councilNo === user?.rollNumber
  );

  const isProfileComplete = Boolean(
    (user?.rollNumber && user.rollNumber !== "10A-01") || matchingRoster
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome back, ${user?.name && user.name !== "Institute Admin" ? user.name : "Student"}`}
        subtitle="Here is your daily workspace overview — active tasks, enrolled classes, attendance rate, and campus updates."
        action={
          <Link
            to="/student/courses"
            className="px-4 py-2.5 rounded-xl bg-[#0a0a0a] text-white text-xs font-medium hover:bg-[#1a1a1a] transition-colors flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-[#e8b94a]" />
            View My Courses
          </Link>
        }
      />

      {/* ── Complete Profile Verification Setup Banner (Visible on Dashboard until filled) ── */}
      {!isProfileComplete && (
        <div className="p-5 rounded-3xl bg-[#fffaf0] border border-[#e8b94a]/40 text-[#0a0a0a] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#e8b94a] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#0a0a0a]">
                COMPLETE PROFILE VERIFICATION SETUP
              </h3>
              <p className="text-xs text-[#6a6a6a] leading-relaxed">
                Please enter your official IHM Council Roll Number and select your assigned batch. Completing this setup links your active portal status for teacher attendance tracking.
              </p>
            </div>
          </div>
          <Link
            to="/student/profile"
            className="px-4 py-2 rounded-xl bg-[#0a0a0a] text-white text-xs font-bold hover:bg-[#1a1a1a] transition-all shrink-0 flex items-center gap-1.5 shadow-xs"
          >
            <UserCheck className="w-4 h-4 text-[#e8b94a]" /> Complete Setup Now
          </Link>
        </div>
      )}

      {/* Overview Stat Cards */}
      <div className="grid md:grid-cols-4 gap-5">
        <div className="bg-white border border-[#e5e5e5] rounded-2xl p-5 shadow-xs">
          <FileText className="h-5 w-5 text-[#0a0a0a] mb-3" />
          <div className="text-2xl font-semibold text-[#0a0a0a]">{courses.length}</div>
          <div className="text-xs text-[#6a6a6a] mt-1 font-medium">Enrolled Courses</div>
        </div>

        <div className="bg-white border border-[#e5e5e5] rounded-2xl p-5 shadow-xs">
          <CalendarClock className="h-5 w-5 text-[#ffb084] mb-3" />
          <div className="text-2xl font-semibold text-[#0a0a0a]">{pendingTasks.length}</div>
          <div className="text-xs text-[#6a6a6a] mt-1 font-medium">Upcoming Tasks Due</div>
        </div>

        <div className="bg-white border border-[#e5e5e5] rounded-2xl p-5 shadow-xs">
          <TrendingUp className="h-5 w-5 text-[#22c55e] mb-3" />
          <div className="text-2xl font-semibold text-[#22c55e]">{attendancePct}%</div>
          <div className="text-xs text-[#6a6a6a] mt-1 font-medium">Attendance Percentage</div>
        </div>

        <div className="bg-white border border-[#e5e5e5] rounded-2xl p-5 shadow-xs">
          <Megaphone className="h-5 w-5 text-[#e8b94a] mb-3" />
          <div className="text-2xl font-semibold text-[#0a0a0a]">{announcementList.length}</div>
          <div className="text-xs text-[#6a6a6a] mt-1 font-medium">Announcements</div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-[#e5e5e5] rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-baseline justify-between mb-2">
            <h2 className="font-medium text-lg text-[#0a0a0a]">Upcoming & Active Tasks</h2>
            <span className="text-xs text-[#6a6a6a] font-medium">
              {pendingTasks.length} pending submission
            </span>
          </div>

          <div className="space-y-3">
            {taskList.map((t) => (
              <Link
                key={t.id}
                to="/student/tasks/$id"
                params={{ id: t.id }}
                className="block p-4 rounded-xl border border-[#e5e5e5] hover:border-[#0a0a0a] transition-all hover:shadow-xs group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-[#0a0a0a] group-hover:text-[#0a0a0a]">
                      {t.title}
                    </h3>
                    <p className="text-xs text-[#6a6a6a] mt-1">Due: {t.due} · {t.marks} Marks</p>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#fffaf0] text-[#0a0a0a] border border-[#e8b94a]/30">
                    {t.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Announcements Sidebar */}
        <div className="bg-white border border-[#e5e5e5] rounded-2xl p-6 shadow-xs space-y-4">
          <h2 className="font-medium text-lg text-[#0a0a0a] flex items-center gap-2">
            <Megaphone className="w-4 h-4 text-[#e8b94a]" /> Course Updates
          </h2>
          <div className="space-y-4 divide-y divide-[#e5e5e5]">
            {announcementList.map((a) => (
              <div key={a.id} className="pt-3 first:pt-0 space-y-1">
                <h4 className="text-xs font-bold text-[#0a0a0a]">{a.title}</h4>
                <p className="text-xs text-[#6a6a6a] line-clamp-2">{a.body}</p>
                <span className="text-[10px] text-[#9a9a9a] block font-mono">{a.date} · {a.author}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
