import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/AppShell";
import { getCurrentUser, updateUser, type User } from "@/lib/mock-auth";
import { IHM_STUDENT_ROSTER } from "@/lib/ihm-roster-data";
import { ShieldCheck, CheckCircle2, Building2, Sparkles, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/student/profile")({
  component: StudentProfilePage,
});

function StudentProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [saved, setSaved] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [batchNumber, setBatchNumber] = useState("Batch A");
  const [rollNumber, setRollNumber] = useState(""); // Empty by default for new setup!

  useEffect(() => {
    const u = getCurrentUser();
    if (u) {
      setUser(u);
      setName(u.name || "");
      setPhone(u.phone || "");
      setBatchNumber(u.section && u.section.startsWith("Batch") ? u.section : "Batch A");

      // Auto-lookup matching roll number if user logged in with rollno@ihm.edu
      const emailRoll = u.email.split("@")[0];
      const foundStudent = IHM_STUDENT_ROSTER.find(
        (s) => s.councilNo === emailRoll || s.councilNo === u.rollNumber
      );

      if (foundStudent) {
        setRollNumber(foundStudent.councilNo);
        setBatchNumber(`Batch ${foundStudent.batch}`);
        if (!u.name || u.name === "Student" || u.name === "rajesh") {
          setName(foundStudent.name);
        }
      } else {
        setRollNumber(u.rollNumber && u.rollNumber !== "10A-01" ? u.rollNumber : "");
      }
    }
  }, []);

  const isProfileComplete = Boolean(rollNumber.trim() && name.trim());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = updateUser({
      name,
      phone,
      className: "Semester 3",
      section: batchNumber,
      rollNumber: rollNumber.trim(),
    });
    if (updated) {
      setUser(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader
        title="Student Identity Profile"
        subtitle="Manage your academic identity details and assigned batch verification."
      />

      {/* Setup Prompt Banner (Shown when roll number is empty) */}
      {!isProfileComplete && (
        <div className="p-5 rounded-3xl bg-[#fffaf0] border border-[#e8b94a]/40 text-[#0a0a0a] shadow-xs flex items-start gap-3 animate-in fade-in">
          <AlertCircle className="w-5 h-5 text-[#e8b94a] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#0a0a0a]">
              Complete Profile Verification Setup
            </h3>
            <p className="text-xs text-[#6a6a6a] leading-relaxed">
              Please enter your official IHM Council Roll Number and select your assigned batch below. Completing this setup links your active portal status for teacher attendance tracking.
            </p>
          </div>
        </div>
      )}

      {/* Congratulations Banner (Shown after saving complete profile) */}
      {saved && isProfileComplete && (
        <div className="p-5 rounded-3xl bg-[#22c55e]/15 border border-[#22c55e]/30 text-[#0a0a0a] shadow-xs flex items-center gap-3 animate-in fade-in">
          <Sparkles className="w-5 h-5 text-[#15803d] shrink-0" />
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#15803d]">
              🎉 Congratulations! Profile Setup Complete
            </h3>
            <p className="text-xs text-[#15803d]/90 font-medium">
              Your student identity and batch verification are saved. Teachers and administrators can now monitor your active portal status.
            </p>
          </div>
        </div>
      )}

      <div className="bg-white border border-[#e5e5e5] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        {/* Clean Profile Card Header */}
        <div className="flex items-center justify-between border-b border-[#e5e5e5] pb-5">
          <div className="flex items-center gap-3.5">
            <div className="h-12 w-12 rounded-full bg-[#0a0a0a] text-white flex items-center justify-center font-bold text-lg shadow-xs">
              {name?.[0]?.toUpperCase() ?? "S"}
            </div>
            <div>
              <div className="text-base font-bold text-[#0a0a0a]">{name || "Student Candidate"}</div>
              <div className="text-xs font-medium text-[#6a6a6a]">{user.email}</div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fffaf0] border border-[#e8b94a]/30 text-xs font-bold text-[#0a0a0a]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#e8b94a]" /> Verified Student Profile
          </div>
        </div>

        {/* Top Academic Info Bar */}
        <div className="bg-[#fffaf0] border border-[#e8b94a]/30 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs text-[#0a0a0a]">
          <div className="flex items-center gap-2 font-bold">
            <Building2 className="w-4 h-4 text-[#e8b94a]" />
            IHM HYDERABAD · Department of Front Office
          </div>
          <div className="text-[#6a6a6a]">
            Course: <strong className="text-[#0a0a0a]">Second Year B.Sc. (Semester 3)</strong>
          </div>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-[#3a3a3a] mb-1.5">
                Candidate Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full candidate name"
                required
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#e5e5e5] bg-white text-[#0a0a0a] outline-none focus:border-[#0a0a0a] font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-[#3a3a3a] mb-1.5">
                Mobile Contact Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#e5e5e5] bg-white text-[#0a0a0a] outline-none focus:border-[#0a0a0a] font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-[#3a3a3a] mb-1.5">
                Assigned Student Batch
              </label>
              <select
                value={batchNumber}
                onChange={(e) => setBatchNumber(e.target.value)}
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#e5e5e5] bg-white text-[#0a0a0a] outline-none focus:border-[#0a0a0a] font-semibold cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%230a0a0a%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:16px_16px] bg-[right_12px_center] bg-no-repeat pr-10"
              >
                <option value="Batch A">Batch A</option>
                <option value="Batch B">Batch B</option>
                <option value="Batch C">Batch C</option>
                <option value="Batch D">Batch D</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-[#3a3a3a] mb-1.5">
                Council Roll Number
              </label>
              <input
                type="text"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                placeholder="e.g. 2541112060"
                required
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#e5e5e5] bg-white text-[#0a0a0a] outline-none focus:border-[#0a0a0a] font-mono font-bold placeholder:font-normal placeholder:text-[#9a9a9a]"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center gap-3">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#0a0a0a] text-white text-xs font-bold hover:bg-[#1a1a1a] transition-all shadow-xs"
            >
              {isProfileComplete ? "Save Profile Changes" : "Save Profile Setup"}
            </button>

            {saved && (
              <span className="text-xs font-bold text-[#22c55e] flex items-center gap-1.5 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4" /> Profile updated successfully!
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
