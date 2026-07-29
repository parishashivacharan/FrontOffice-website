import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/AppShell";
import {
  IHM_STUDENT_ROSTER,
  getStoredAttendance,
  type AttendanceRecord,
} from "@/lib/ihm-roster-data";
import { CalendarCheck, Users, CheckCircle2, ShieldCheck, UserCheck } from "lucide-react";
import { AnimatedTabs, type Tab } from "@/components/ui/animated-tabs";

export const Route = createFileRoute("/admin/attendance")({
  component: AdminAttendancePage,
});

function AdminAttendancePage() {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);

  useEffect(() => {
    setAttendanceRecords(getStoredAttendance());
  }, []);

  const batches: Array<{ id: "A" | "B" | "C" | "D"; label: string; count: number }> = [
    { id: "A", label: "Batch A", count: 27 },
    { id: "B", label: "Batch B", count: 26 },
    { id: "C", label: "Batch C", count: 26 },
    { id: "D", label: "Batch D", count: 28 },
  ];

  const getBatchAttendanceStats = (batchId: "A" | "B" | "C" | "D") => {
    const batchStudents = IHM_STUDENT_ROSTER.filter((s) => s.batch === batchId);
    const batchRecords = attendanceRecords.filter((r) => r.batch === batchId);

    if (batchRecords.length === 0) {
      return { percentage: 92, presentCount: batchStudents.length, totalCount: batchStudents.length };
    }

    const present = batchRecords.filter((r) => r.status === "Present").length;
    const percentage = Math.round((present / batchRecords.length) * 100);
    return { percentage, presentCount: present, totalCount: batchRecords.length };
  };

  const renderBatchRosterView = (batchId: "A" | "B" | "C" | "D") => {
    const batchStudents = IHM_STUDENT_ROSTER.filter((s) => s.batch === batchId);

    return (
      <div className="overflow-x-auto pt-2">
        <table className="w-full text-xs text-left">
          <thead className="bg-[#fffaf0] border-b border-[#e5e5e5] text-[#9a9a9a] uppercase font-bold text-[10px] tracking-wider">
            <tr>
              <th className="px-4 py-3">Sl No</th>
              <th className="px-4 py-3">Council Roll No</th>
              <th className="px-4 py-3">Student Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3 text-right font-bold">Session Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e5e5e5]">
            {batchStudents.map((st) => {
              const studentRecs = attendanceRecords.filter((r) => r.councilNo === st.councilNo);
              const present = studentRecs.filter((r) => r.status === "Present").length;
              const rate = studentRecs.length > 0 ? Math.round((present / studentRecs.length) * 100) : 92;

              return (
                <tr key={st.slNo} className="hover:bg-[#fffaf0]/40 transition-colors">
                  <td className="px-4 py-3 font-mono text-[#6a6a6a]">{st.slNo}</td>
                  <td className="px-4 py-3 font-mono font-bold text-[#0a0a0a]">{st.councilNo}</td>
                  <td className="px-4 py-3 font-bold text-[#0a0a0a]">
                    {st.name}
                    {st.isReAdmission && (
                      <span className="ml-2 px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-[9px] font-bold uppercase border border-purple-200">
                        Re-Admission
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-mono text-[#6a6a6a]">{st.email}</td>
                  <td className="px-4 py-3 text-right font-mono font-bold text-[#15803d]">
                    {rate}% Present
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const adminTabs: Tab[] = batches.map((b) => ({
    id: `batch-${b.id}`,
    label: b.label,
    badge: `${b.count} Students`,
    content: renderBatchRosterView(b.id),
  }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Institute Attendance Oversight"
        subtitle="Monitor daily student attendance averages across IHM Semester 3 Batches A, B, C & D."
      />

      <div className="bg-white rounded-3xl border border-[#e5e5e5] p-6 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-[#e5e5e5] pb-4">
          <div className="flex items-center gap-2">
            <CalendarCheck className="w-5 h-5 text-[#0a0a0a]" />
            <h2 className="font-bold text-base text-[#0a0a0a]">Semester 3 Batch Attendance Overview</h2>
          </div>
          <span className="text-xs text-[#22c55e] font-semibold bg-[#22c55e]/10 px-3 py-1 rounded-full border border-[#22c55e]/20 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#22c55e]" /> Overall Rate: 91.5%
          </span>
        </div>

        {/* Batch Overview Cards */}
        <div className="grid md:grid-cols-4 gap-4">
          {batches.map((b) => {
            const stats = getBatchAttendanceStats(b.id);
            return (
              <div
                key={b.id}
                className="p-5 rounded-2xl border border-[#e5e5e5] bg-[#fffaf0]/50 space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-base text-[#0a0a0a]">{b.label}</div>
                    <div className="text-xs text-[#6a6a6a]">Semester 3 · Mr. Rajesh</div>
                  </div>
                  <span className="text-xs font-bold text-[#0a0a0a] bg-white px-2.5 py-1 rounded-lg border border-[#e5e5e5]">
                    {b.count} Students
                  </span>
                </div>

                <div className="w-full bg-[#e5e5e5] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#0a0a0a] h-full rounded-full transition-all"
                    style={{ width: `${stats.percentage}%` }}
                  />
                </div>

                <div className="flex justify-between text-xs text-[#6a6a6a]">
                  <span>Marked by Instructor</span>
                  <span className="font-bold text-[#15803d]">{stats.percentage}% Present</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Batch Roster Details Tabs */}
        <div className="pt-4 border-t border-[#e5e5e5]">
          <h3 className="text-sm font-bold text-[#0a0a0a] mb-4 flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-[#e8b94a]" /> Complete 105-Student Roster Attendance Logs
          </h3>
          <AnimatedTabs tabs={adminTabs} defaultTab="batch-a" />
        </div>
      </div>
    </div>
  );
}
