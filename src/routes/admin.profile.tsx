import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/AppShell";
import { getCurrentUser, updateUser, getAllUsers, type User } from "@/lib/mock-auth";
import { getCoursesStore } from "@/lib/mock-data";
import { ShieldCheck, CheckCircle2, Users, UserCog, BookOpen } from "lucide-react";

export const Route = createFileRoute("/admin/profile")({
  component: AdminProfilePage,
});

function AdminProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [saved, setSaved] = useState(false);

  // Editable Admin Fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const u = getCurrentUser();
    if (u) {
      setUser(u);
      setName(u.name || "Institute Admin");
      setPhone(u.phone || "+91 99000 11223");
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = updateUser({
      name,
      phone,
    });
    if (updated) {
      setUser(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
  };

  if (!user) return null;

  // Institute metrics summary (read-only)
  const allUsers = getAllUsers();
  const studentCount = allUsers.filter((u) => u.role === "student").length;
  const teacherCount = allUsers.filter((u) => u.role === "teacher").length;
  const courseCount = getCoursesStore().length;

  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader
        title="Admin Profile"
        subtitle="Manage primary administrator contact details and view institute system metrics."
      />

      <div className="bg-white border border-[#e5e5e5] rounded-2xl p-6 shadow-xs space-y-6">
        {/* Profile Header */}
        <div className="flex items-center justify-between border-b border-[#e5e5e5] pb-5">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-[#0a0a0a] text-white flex items-center justify-center font-medium text-lg">
              {name?.[0]?.toUpperCase() ?? "A"}
            </div>
            <div>
              <div className="text-base font-medium text-[#0a0a0a]">{name}</div>
              <div className="text-xs text-[#6a6a6a]">{user.email}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#e8b94a]" />
            <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-[#0a0a0a] text-white">
              Admin
            </span>
          </div>
        </div>

        {/* Form Fields for Admin Profile */}
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
                placeholder="+91 99000 11223"
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

        {/* Read-only System Metrics Summary */}
        <div className="pt-6 border-t border-[#e5e5e5]">
          <h3 className="text-sm font-medium text-[#0a0a0a] mb-3">Institute Overview</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-[#faf5e8] border border-[#e5e5e5] rounded-xl p-4 flex items-center justify-between">
              <div>
                <div className="text-xs text-[#6a6a6a]">Total Students</div>
                <div className="text-xl font-bold text-[#0a0a0a] mt-1">{studentCount}</div>
              </div>
              <Users className="w-5 h-5 text-[#ffb084]" />
            </div>

            <div className="bg-[#faf5e8] border border-[#e5e5e5] rounded-xl p-4 flex items-center justify-between">
              <div>
                <div className="text-xs text-[#6a6a6a]">Total Teachers</div>
                <div className="text-xl font-bold text-[#0a0a0a] mt-1">{teacherCount}</div>
              </div>
              <UserCog className="w-5 h-5 text-[#b8a4ed]" />
            </div>

            <div className="bg-[#faf5e8] border border-[#e5e5e5] rounded-xl p-4 flex items-center justify-between">
              <div>
                <div className="text-xs text-[#6a6a6a]">Total Courses</div>
                <div className="text-xl font-bold text-[#0a0a0a] mt-1">{courseCount}</div>
              </div>
              <BookOpen className="w-5 h-5 text-[#e8b94a]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
