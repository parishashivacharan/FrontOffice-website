import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/AppShell";
import { getCurrentUser, updateUser, type User } from "@/lib/mock-auth";
import { getCoursesStore } from "@/lib/mock-data";
import { UserCheck, CheckCircle2, BookOpen, Clock } from "lucide-react";

export const Route = createFileRoute("/teacher/profile")({
  component: TeacherProfilePage,
});

function TeacherProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [saved, setSaved] = useState(false);

  // Editable Teacher Fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");

  useEffect(() => {
    const u = getCurrentUser();
    if (u) {
      setUser(u);
      setName(u.name || "");
      setPhone(u.phone || "+91 98123 45678");
      setDepartment(
        u.department && !u.department.includes("Sciences")
          ? u.department
          : "Department of Front Office (Room Division Operations)",
      );
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = updateUser({
      name,
      phone,
      department,
    });
    if (updated) {
      setUser(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
  };

  if (!user) return null;

  // Workload summary (read-only)
  const allCourses = getCoursesStore();
  const assignedCourses = allCourses.filter(
    (c) =>
      c.teacher.toLowerCase().includes(user.name.toLowerCase()) ||
      user.name.toLowerCase().includes(c.teacher.toLowerCase()),
  );
  const assignedCount = assignedCourses.length > 0 ? assignedCourses.length : 4;

  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader
        title="Teacher Profile"
        subtitle="Manage your faculty profile and view your assigned course workload."
      />

      <div className="bg-white border border-[#e5e5e5] rounded-2xl p-6 shadow-xs space-y-6">
        {/* Profile Header */}
        <div className="flex items-center justify-between border-b border-[#e5e5e5] pb-5">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-[#0a0a0a] text-white flex items-center justify-center font-medium text-lg">
              {name?.[0]?.toUpperCase() ?? "T"}
            </div>
            <div>
              <div className="text-base font-medium text-[#0a0a0a]">{name}</div>
              <div className="text-xs text-[#6a6a6a]">{user.email}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-[#e8b94a]" />
            <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-[#0a0a0a] text-white">
              Teacher
            </span>
          </div>
        </div>

        {/* Form Fields for Teacher Profile */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium uppercase tracking-wide text-[#3a3a3a] mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#e5e5e5] bg-white text-[#0a0a0a] outline-none focus:border-[#0a0a0a]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium uppercase tracking-wide text-[#3a3a3a] mb-1.5">
                Phone Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98123 45678"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#e5e5e5] bg-white text-[#0a0a0a] outline-none focus:border-[#0a0a0a]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-medium uppercase tracking-wide text-[#3a3a3a] mb-1.5">
                Department / Subject Taught
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="e.g. Department of Front Office (Room Division Operations)"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#e5e5e5] bg-white text-[#0a0a0a] outline-none focus:border-[#0a0a0a]"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#0a0a0a] text-white text-xs font-medium hover:bg-[#1a1a1a] transition-all shadow-xs"
            >
              Save Changes
            </button>
            {saved && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-[#22c55e]">
                <CheckCircle2 className="w-3.5 h-3.5" /> Changes saved successfully!
              </span>
            )}
          </div>
        </form>

        {/* Read-only Teaching Workload Summary */}
        <div className="pt-6 border-t border-[#e5e5e5]">
          <h3 className="text-sm font-medium text-[#0a0a0a] mb-3">Teaching Workload Summary</h3>
          <div className="bg-[#faf5e8] border border-[#e5e5e5] rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white border border-[#e5e5e5] text-[#0a0a0a]">
                <BookOpen className="w-5 h-5 text-[#e8b94a]" />
              </div>
              <div>
                <div className="text-sm font-medium text-[#0a0a0a]">Assigned Teaching Load</div>
                <div className="text-xs text-[#6a6a6a]">Currently active in system</div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xl font-bold text-[#0a0a0a]">{assignedCount}</span>
              <span className="text-xs text-[#6a6a6a] block">Courses Assigned</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
