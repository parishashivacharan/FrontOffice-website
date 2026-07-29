import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/AppShell";
import {
  getCoursesStore,
  getTasksStore,
  getAnnouncementsStore,
  getSubmissionsStore,
  getResourcesStore,
  gradeSubmission,
} from "@/lib/mock-data";
import { getCurrentUser } from "@/lib/mock-auth";
import {
  BookOpen,
  ClipboardList,
  Users,
  Megaphone,
  CheckCircle,
  CalendarCheck,
  Plus,
  FileText,
} from "lucide-react";

export const Route = createFileRoute("/teacher/")({
  component: TeacherDashboard,
});

function TeacherDashboard() {
  const user = getCurrentUser();
  const [courses, setCourses] = useState(getCoursesStore());
  const [taskList, setTaskList] = useState(getTasksStore());
  const [announcementList, setAnnouncementList] = useState(getAnnouncementsStore());
  const [submissions, setSubmissions] = useState(getSubmissionsStore());
  const [resources, setResources] = useState(getResourcesStore());

  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string | null>(null);
  const [gradeInput, setGradeInput] = useState("");
  const [feedbackInput, setFeedbackInput] = useState("");

  const refreshDashboard = () => {
    setCourses(getCoursesStore());
    setTaskList(getTasksStore());
    setAnnouncementList(getAnnouncementsStore());
    setSubmissions(getSubmissionsStore());
    setResources(getResourcesStore());
  };

  useEffect(() => {
    refreshDashboard();
  }, [user?.email]);

  // Pending submissions
  const pendingSubmissions = submissions.filter((s) => s.status === "submitted");

  const handleGrade = (id: string) => {
    if (!gradeInput) return;
    gradeSubmission(id, gradeInput, feedbackInput);
    setSubmissions(getSubmissionsStore());
    setSelectedSubmissionId(null);
    setGradeInput("");
    setFeedbackInput("");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome, ${user?.email?.toLowerCase() === "rajesh@ihm.edu" ? user.name || "Mr. Rajesh" : "Mr. Rajesh"}`}
        subtitle="Manage courses, create assignments, grade student submissions, and mark attendance."
        action={
          <div className="flex items-center gap-2">
            <Link
              to="/teacher/resources/new"
              className="px-4 py-2.5 rounded-xl border border-[#e5e5e5] bg-white text-xs font-medium text-[#0a0a0a] hover:bg-[#faf5e8] transition-colors flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-[#e8b94a]" />
              Manage Resources
            </Link>
            <Link
              to="/teacher/tasks/new"
              className="px-4 py-2.5 rounded-xl bg-[#0a0a0a] text-white text-xs font-medium hover:bg-[#1a1a1a] transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create Task
            </Link>
          </div>
        }
      />

      {/* Stat Bar */}
      <div className="grid md:grid-cols-5 gap-4">
        <div className="bg-white border border-[#e5e5e5] rounded-2xl p-5 shadow-xs">
          <BookOpen className="h-5 w-5 text-[#0a0a0a] mb-3" />
          <div className="text-2xl font-semibold text-[#0a0a0a]">{courses.length}</div>
          <div className="text-xs text-[#6a6a6a] mt-1 font-medium">Universes</div>
        </div>

        <div className="bg-white border border-[#e5e5e5] rounded-2xl p-5 shadow-xs">
          <ClipboardList className="h-5 w-5 text-[#ffb084] mb-3" />
          <div className="text-2xl font-semibold text-[#0a0a0a]">{taskList.length}</div>
          <div className="text-xs text-[#6a6a6a] mt-1 font-medium">Tasks Published</div>
        </div>

        <div className="bg-white border border-[#e5e5e5] rounded-2xl p-5 shadow-xs">
          <Users className="h-5 w-5 text-[#b8a4ed] mb-3" />
          <div className="text-2xl font-semibold text-[#0a0a0a]">
            {pendingSubmissions.length}
          </div>
          <div className="text-xs text-[#6a6a6a] mt-1 font-medium">Pending Reviews</div>
        </div>

        <div className="bg-white border border-[#e5e5e5] rounded-2xl p-5 shadow-xs">
          <FileText className="h-5 w-5 text-[#22c55e] mb-3" />
          <div className="text-2xl font-semibold text-[#0a0a0a]">{resources.length}</div>
          <div className="text-xs text-[#6a6a6a] mt-1 font-medium">Resources</div>
        </div>

        <div className="bg-white border border-[#e5e5e5] rounded-2xl p-5 shadow-xs">
          <Megaphone className="h-5 w-5 text-[#e8b94a] mb-3" />
          <div className="text-2xl font-semibold text-[#0a0a0a]">
            {announcementList.length}
          </div>
          <div className="text-xs text-[#6a6a6a] mt-1 font-medium">Announcements</div>
        </div>
      </div>

      {/* Xiaohei Little Black (小黑) Hand-Drawn Simulation Illustration Banner */}
      <div className="grid lg:grid-cols-3 gap-6 items-center bg-white p-6 rounded-3xl border border-[#e5e5e5] shadow-xs">
        <div className="lg:col-span-2 space-y-2">
          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#0a0a0a] text-white">
            Xiaohei (小黑) Work Overview
          </span>
          <h2 className="text-xl font-bold text-[#0a0a0a]">
            Front Office Operations & Hotel Simulation Oversight
          </h2>
          <p className="text-xs text-[#6a6a6a] leading-relaxed">
            Monitor 4 active market universes, track batch submissions, verify 105-student class attendance, and manage unit resources.
          </p>
        </div>
        <div className="lg:col-span-1">
          <XiaoheiSimulationIllustration className="w-full shadow-xs" />
        </div>
      </div>

      {/* Main Teacher Views */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Course Quick Summary */}
        <div className="bg-white border border-[#e5e5e5] rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium text-base text-[#0a0a0a]">Active Universes & Roster ({courses.length})</h2>
            <Link
              to="/teacher/attendance"
              className="text-xs font-medium text-[#6a6a6a] hover:text-[#0a0a0a] flex items-center gap-1.5"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              Mark Attendance
            </Link>
          </div>

          <div className="space-y-3">
            {courses.map((c) => (
              <div
                key={c.id}
                className="p-4 rounded-xl border border-[#e5e5e5] bg-[#fffaf0]/40 flex items-center justify-between"
              >
                <div>
                  <div className="font-semibold text-sm text-[#0a0a0a]">{c.name}</div>
                  <div className="text-xs text-[#6a6a6a] mt-0.5">{c.grade} · {c.schedule || "Mon, Wed, Fri"}</div>
                </div>
                <Link
                  to="/teacher/courses/$id"
                  params={{ id: c.id }}
                  className="px-3 py-1.5 rounded-lg bg-[#0a0a0a] text-white text-xs font-medium hover:bg-[#1a1a1a] transition-colors"
                >
                  Open Course
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Submissions Grading Panel */}
        <div className="bg-white border border-[#e5e5e5] rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium text-base text-[#0a0a0a]">
              Student Submissions ({pendingSubmissions.length})
            </h2>
            <span className="text-xs text-[#e8b94a] font-semibold bg-[#e8b94a]/15 px-2.5 py-0.5 rounded-full border border-[#e8b94a]/30">
              Needs Review
            </span>
          </div>

          <div className="space-y-3">
            {pendingSubmissions.length === 0 ? (
              <div className="py-8 text-center text-xs text-[#6a6a6a] flex flex-col items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#22c55e]" />
                All student submissions have been reviewed and graded.
              </div>
            ) : (
              pendingSubmissions.map((sub) => (
                <div
                  key={sub.id}
                  className="p-4 rounded-xl border border-[#e5e5e5] bg-[#fffaf0]/40 space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold text-xs text-[#0a0a0a]">{sub.taskTitle}</div>
                      <div className="text-[11px] text-[#6a6a6a]">
                        Student: <span className="font-medium text-[#0a0a0a]">{sub.studentName}</span> · Submitted {sub.submittedAt}
                      </div>
                    </div>
                    <span className="text-[10px] font-mono bg-[#0a0a0a]/5 px-2 py-0.5 rounded border border-[#0a0a0a]/10">
                      Max {sub.maxMarks} Marks
                    </span>
                  </div>

                  <p className="text-xs text-[#3a3a3a] bg-white p-2.5 rounded-lg border border-[#e5e5e5] italic">
                    "{sub.submissionText}"
                  </p>

                  {selectedSubmissionId === sub.id ? (
                    <div className="pt-2 space-y-2 border-t border-[#e5e5e5]">
                      <div className="flex gap-2">
                        <input
                          type="number"
                          placeholder="Grade"
                          value={gradeInput}
                          onChange={(e) => setGradeInput(e.target.value)}
                          className="w-24 px-3 py-1.5 text-xs rounded-lg border border-[#e5e5e5] focus:outline-none focus:border-[#0a0a0a]"
                        />
                        <input
                          type="text"
                          placeholder="Feedback comment..."
                          value={feedbackInput}
                          onChange={(e) => setFeedbackInput(e.target.value)}
                          className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-[#e5e5e5] focus:outline-none focus:border-[#0a0a0a]"
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setSelectedSubmissionId(null)}
                          className="px-3 py-1 rounded-lg text-xs text-[#6a6a6a] hover:text-[#0a0a0a]"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleGrade(sub.id)}
                          className="px-3 py-1 rounded-lg bg-[#0a0a0a] text-white text-xs font-medium hover:bg-[#1a1a1a]"
                        >
                          Save Grade
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-end">
                      <button
                        onClick={() => setSelectedSubmissionId(sub.id)}
                        className="px-3 py-1 rounded-lg border border-[#e5e5e5] bg-white text-xs font-medium text-[#0a0a0a] hover:bg-[#faf5e8]"
                      >
                        Grade Submission
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Announcements Section - Same as student view */}
      <div className="bg-white border border-[#e5e5e5] rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-medium text-base text-[#0a0a0a] flex items-center gap-2">
            <Megaphone className="w-4 h-4 text-[#e8b94a]" /> Course Updates and Announcements
          </h2>
          <Link
            to="/teacher/announcements/new"
            className="text-xs font-medium text-[#6a6a6a] hover:text-[#0a0a0a] flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            Post New
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {announcementList.slice(0, 6).map((a) => (
            <div key={a.id} className="p-4 rounded-xl border border-[#e5e5e5] bg-[#fffaf0]/40 space-y-1.5">
              <h4 className="text-xs font-bold text-[#0a0a0a]">{a.title}</h4>
              <p className="text-xs text-[#6a6a6a] line-clamp-2">{a.body}</p>
              <span className="text-[10px] text-[#9a9a9a] block font-mono">{a.date} · {a.author}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Published Resources Section */}
      <div className="bg-white border border-[#e5e5e5] rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-medium text-base text-[#0a0a0a] flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#22c55e]" /> Published Study Materials
          </h2>
          <Link
            to="/teacher/resources/new"
            className="text-xs font-medium text-[#6a6a6a] hover:text-[#0a0a0a] flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            Add New
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {resources.map((r) => (
            <div key={r.id} className="p-4 rounded-xl border border-[#e5e5e5] bg-[#fffaf0]/40 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#0a0a0a] text-white">
                  Unit {r.unit || 1}
                </span>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-[#e8b94a]/15 text-[#0a0a0a] border border-[#e8b94a]/30">
                  {r.type}
                </span>
              </div>
              <h4 className="text-xs font-bold text-[#0a0a0a] line-clamp-2">{r.title}</h4>
              {r.subtitle && <p className="text-[10px] text-[#6a6a6a] line-clamp-1">{r.subtitle}</p>}
              <span className="text-[10px] text-[#9a9a9a] block font-mono">{r.author || "Mr. Rajesh"}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
