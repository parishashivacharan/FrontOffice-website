import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/AppShell";
import { getStoredAttendance, IHM_STUDENT_ROSTER, type AttendanceRecord } from "@/lib/ihm-roster-data";
import { getCurrentUser } from "@/lib/mock-auth";
import { Lock, ShieldCheck, CalendarCheck, CheckCircle2, XCircle } from "lucide-react";

export const Route = createFileRoute("/student/attendance")({
  component: StudentAttendanceContent,
});

function StudentAttendanceContent() {
  const user = getCurrentUser();
  const [userAttendance, setUserAttendance] = useState<AttendanceRecord[]>([]);

  useEffect(() => {
    const allRecords = getStoredAttendance();
    // Find matching records by user email or roll number
    if (user) {
      const matchRoll = user.rollNumber || user.email.split("@")[0];
      const filtered = allRecords.filter(
        (r) =>
          r.councilNo === matchRoll ||
          r.councilNo === user.rollNumber ||
          user.email.toLowerCase().includes(r.councilNo)
      );

      if (filtered.length > 0) {
        setUserAttendance(filtered);
      } else {
        // Fallback: show first batch student sample attendance for demo if user logged in with custom email
        setUserAttendance(allRecords.filter((r) => r.councilNo === "2541112060"));
      }
    }
  }, [user?.email, user?.rollNumber]);

  const totalSessions = userAttendance.length || 1;
  const presentSessions = userAttendance.filter((a) => a.status === "Present").length;
  const attendancePct = Math.round((presentSessions / totalSessions) * 100);

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Official Attendance Record"
        subtitle="Read-only view of your daily class attendance marked by Mr. Rajesh (Department of Front Office)."
      />

      {/* Verified Notice */}
      <div className="p-4 rounded-2xl bg-[#fffaf0] border border-[#e8b94a]/30 text-xs text-[#0a0a0a] flex items-center gap-3 shadow-xs">
        <Lock className="w-4 h-4 text-[#e8b94a] shrink-0" />
        <div>
          <span className="font-bold">Faculty Verified Record:</span> Attendance is recorded by your instructor using official batch rosters (Batches A, B, C & D). Students have read-only access.
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white border border-[#e5e5e5] rounded-3xl p-5 shadow-xs">
          <div className="text-3xl font-bold text-[#0a0a0a]">{attendancePct}%</div>
          <div className="text-xs text-[#6a6a6a] mt-1 font-medium">
            Overall Attendance Rate
          </div>
        </div>

        <div className="bg-white border border-[#e5e5e5] rounded-3xl p-5 shadow-xs">
          <div className="text-3xl font-bold text-[#22c55e]">{presentSessions}</div>
          <div className="text-xs text-[#6a6a6a] mt-1 font-medium">
            Sessions Attended (Present)
          </div>
        </div>

        <div className="bg-white border border-[#e5e5e5] rounded-3xl p-5 shadow-xs">
          <div className="text-3xl font-bold text-[#0a0a0a]">{userAttendance.length}</div>
          <div className="text-xs text-[#6a6a6a] mt-1 font-medium">
            Total Verified Sessions
          </div>
        </div>
      </div>

      {/* Attendance Log Table */}
      <div className="bg-white border border-[#e5e5e5] rounded-3xl overflow-hidden shadow-xs p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#e5e5e5]">
          <div className="font-bold text-sm text-[#0a0a0a] flex items-center gap-2">
            <CalendarCheck className="w-4 h-4 text-[#0a0a0a]" /> Official Session Attendance Logs
          </div>
          <div className="text-xs text-[#6a6a6a] flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#e8b94a]" /> Teacher Signed
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#fffaf0] border-b border-[#e5e5e5] text-[#9a9a9a] uppercase font-bold text-[10px] tracking-wider">
              <tr>
                <th className="px-5 py-3">Session Date</th>
                <th className="px-5 py-3">Course & Unit</th>
                <th className="px-5 py-3">Instructor</th>
                <th className="px-5 py-3 text-right">Attendance Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e5e5]">
              {userAttendance.map((log) => (
                <tr key={log.id} className="hover:bg-[#fffaf0]/40 transition-colors">
                  <td className="px-5 py-3.5 font-mono font-bold text-[#0a0a0a]">{log.date}</td>
                  <td className="px-5 py-3.5 font-semibold text-[#0a0a0a]">
                    <div className="font-bold text-[#0a0a0a]">Room Division - Front Office Operations</div>
                    <div className="text-[11px] text-[#6a6a6a] font-normal">
                      {(log as any).topic || "Unit 1: Hubbart Formula Rate Setting Calculation"}
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-[#6a6a6a] font-medium">{log.markedBy}</td>
                  <td className="px-5 py-3.5 text-right">
                    {log.status === "Present" ? (
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#22c55e]/15 text-[#15803d] border border-[#22c55e]/30 inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> PRESENT
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-red-100 text-red-700 border border-red-200 inline-flex items-center gap-1">
                        <XCircle className="w-3 h-3" /> ABSENT
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
