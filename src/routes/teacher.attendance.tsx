import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { PageHeader } from "@/components/AppShell";
import {
  IHM_STUDENT_ROSTER,
  getStoredAttendance,
  saveAttendance,
  type AttendanceRecord,
} from "@/lib/ihm-roster-data";
import { AnimatedTabs, type Tab } from "@/components/ui/animated-tabs";
import { getCurrentUser } from "@/lib/mock-auth";
import { Calendar, CheckCircle2, ShieldAlert, History, UserCheck, Search, CheckSquare, XSquare, BookOpen, Send } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/teacher/attendance")({
  component: MarkAttendancePage,
});

function MarkAttendancePage() {
  const teacherUser = getCurrentUser();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [topic, setTopic] = useState("Unit 1: Hubbart Formula Rate Setting Calculation");
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [search, setSearch] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Local state for marks for the current date: councilNo -> "Present" | "Absent"
  const [currentMarks, setCurrentMarks] = useState<Record<string, "Present" | "Absent">>({});

  useEffect(() => {
    const records = getStoredAttendance();
    setAttendanceRecords(records);
  }, []);

  // When selectedDate changes, load existing records for that date or initialize default Present
  useEffect(() => {
    const marksForDate: Record<string, "Present" | "Absent"> = {};
    const dateRecords = attendanceRecords.filter((r) => r.date === selectedDate);

    IHM_STUDENT_ROSTER.forEach((s) => {
      const existing = dateRecords.find((r) => r.councilNo === s.councilNo);
      if (existing) {
        marksForDate[s.councilNo] = existing.status;
      } else {
        marksForDate[s.councilNo] = "Present";
      }
    });

    setCurrentMarks(marksForDate);
  }, [selectedDate, attendanceRecords]);

  const toggleStatus = (councilNo: string) => {
    setCurrentMarks((prev) => ({
      ...prev,
      [councilNo]: prev[councilNo] === "Present" ? "Absent" : "Present",
    }));
    setSavedSuccess(false);
  };

  const markAllBatchStatus = (batch: "A" | "B" | "C" | "D", status: "Present" | "Absent") => {
    const batchStudents = IHM_STUDENT_ROSTER.filter((s) => s.batch === batch);
    setCurrentMarks((prev) => {
      const updated = { ...prev };
      batchStudents.forEach((s) => {
        updated[s.councilNo] = status;
      });
      return updated;
    });
    setSavedSuccess(false);
  };

  const handleSaveAttendance = () => {
    const newDateRecords: (AttendanceRecord & { topic?: string })[] = IHM_STUDENT_ROSTER.map((s) => ({
      id: `${selectedDate}-${s.councilNo}`,
      date: selectedDate,
      councilNo: s.councilNo,
      studentName: s.name,
      batch: s.batch,
      status: currentMarks[s.councilNo] || "Present",
      markedBy: teacherUser?.name || "Mr. Rajesh",
      markedAt: new Date().toISOString(),
      topic: topic || "Room Division - Front Office Operations",
    }));

    // Filter out existing records for this date, and append new ones
    const updated = [
      ...attendanceRecords.filter((r) => r.date !== selectedDate),
      ...newDateRecords,
    ];

    saveAttendance(updated as AttendanceRecord[]);
    setAttendanceRecords(updated as AttendanceRecord[]);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 5000);
  };

  const renderBatchAttendanceTable = (batchName: "A" | "B" | "C" | "D") => {
    const batchStudents = IHM_STUDENT_ROSTER.filter(
      (s) =>
        s.batch === batchName &&
        (search === "" ||
          s.name.toLowerCase().includes(search.toLowerCase()) ||
          s.councilNo.includes(search) ||
          s.email.toLowerCase().includes(search.toLowerCase()))
    );

    const presentCount = batchStudents.filter(
      (s) => (currentMarks[s.councilNo] || "Present") === "Present"
    ).length;

    return (
      <div className="space-y-4">
        {/* Batch Action Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#fffaf0] border border-[#e8b94a]/30 p-3.5 rounded-2xl text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#0a0a0a]">BATCH {batchName} ATTENDANCE</span>
            <span className="text-[#6a6a6a]">({batchStudents.length} Students)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => markAllBatchStatus(batchName, "Present")}
              className="px-3 py-1.5 rounded-xl bg-green-50 border border-green-200 text-green-700 text-xs font-semibold hover:bg-green-100 transition-colors flex items-center gap-1.5"
            >
              <CheckSquare className="w-3.5 h-3.5" /> Mark All Present
            </button>
            <button
              type="button"
              onClick={() => markAllBatchStatus(batchName, "Absent")}
              className="px-3 py-1.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold hover:bg-red-100 transition-colors flex items-center gap-1.5"
            >
              <XSquare className="w-3.5 h-3.5" /> Mark All Absent
            </button>
            <span className="px-3 py-1.5 rounded-xl bg-[#0a0a0a] text-white text-xs font-bold">
              {presentCount} / {batchStudents.length} Present
            </span>
          </div>
        </div>

        {/* Student Attendance List */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-gray-50 border-b border-[#e5e5e5] text-[#9a9a9a] uppercase font-bold text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-3">Sl No</th>
                <th className="px-4 py-3">Council Roll No</th>
                <th className="px-4 py-3">Candidate Student Name</th>
                <th className="px-4 py-3">Email Address</th>
                <th className="px-4 py-3 text-right">Attendance Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e5e5]">
              {batchStudents.map((st) => {
                const isPresent = (currentMarks[st.councilNo] || "Present") === "Present";
                return (
                  <tr key={st.slNo} className="hover:bg-[#fffaf0]/40 transition-colors">
                    <td className="px-4 py-3 font-mono font-bold text-[#6a6a6a]">{st.slNo}</td>
                    <td className="px-4 py-3 font-mono font-bold text-[#0a0a0a]">{st.councilNo}</td>
                    <td className="px-4 py-3 font-bold text-[#0a0a0a]">
                      {st.name}
                      {st.isReAdmission && (
                        <span className="ml-2 px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-[9px] font-extrabold uppercase border border-purple-200">
                          Re-Admission
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 font-mono text-[#6a6a6a]">{st.email}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex gap-1 bg-gray-100 p-1 rounded-xl border border-[#e5e5e5]">
                        <button
                          type="button"
                          onClick={() => toggleStatus(st.councilNo)}
                          className={cn(
                            "px-3 py-1 rounded-lg text-xs font-bold transition-all",
                            isPresent
                              ? "bg-[#22c55e] text-white shadow-xs"
                              : "text-[#6a6a6a] hover:text-[#0a0a0a]"
                          )}
                        >
                          Present
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleStatus(st.councilNo)}
                          className={cn(
                            "px-3 py-1 rounded-lg text-xs font-bold transition-all",
                            !isPresent
                              ? "bg-red-600 text-white shadow-xs"
                              : "text-[#6a6a6a] hover:text-[#0a0a0a]"
                          )}
                        >
                          Absent
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const animatedAttendanceTabs: Tab[] = [
    {
      id: "batch-a",
      label: "Batch A",
      badge: "27 Students",
      content: renderBatchAttendanceTable("A"),
    },
    {
      id: "batch-b",
      label: "Batch B",
      badge: "26 Students",
      content: renderBatchAttendanceTable("B"),
    },
    {
      id: "batch-c",
      label: "Batch C",
      badge: "26 Students",
      content: renderBatchAttendanceTable("C"),
    },
    {
      id: "batch-d",
      label: "Batch D",
      badge: "26 Students",
      content: renderBatchAttendanceTable("D"),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Mark Class Attendance"
        subtitle="Select session date, enter topic covered, and mark student attendance for Batches A, B, C & D (IHM Hyderabad Semester 3)."
        action={
          <button
            onClick={handleSaveAttendance}
            className="px-5 py-2.5 rounded-2xl bg-[#0a0a0a] text-white text-xs font-bold hover:bg-[#1a1a1a] transition-all shadow-xs flex items-center gap-2"
          >
            <Send className="w-4 h-4 text-[#e8b94a]" /> Submit Class Attendance
          </button>
        }
      />

      {/* Success Notification Banner */}
      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-[#22c55e]/15 border border-[#22c55e]/30 text-[#0a0a0a] text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#22c55e]" />
          <span>✓ Attendance marked for {selectedDate} ("{topic}") saved successfully! Student dashboards updated.</span>
        </div>
      )}

      {/* Session Controls: Date & Topic Input Bar */}
      <div className="bg-white border border-[#e5e5e5] rounded-3xl p-5 shadow-xs space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-[#3a3a3a] mb-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#0a0a0a]" /> Session Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#e5e5e5] bg-[#fffaf0]/40 font-mono text-xs font-bold focus:outline-none focus:border-[#0a0a0a]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-[#3a3a3a] mb-1 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#0a0a0a]" /> Topic / Syllabus Covered Today
            </label>
            <input
              type="text"
              required
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Unit 1: Hubbart Formula Rate Setting Calculation"
              className="w-full px-4 py-2.5 rounded-xl border border-[#e5e5e5] bg-[#fffaf0]/40 text-xs font-semibold focus:outline-none focus:border-[#0a0a0a]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-[#3a3a3a] mb-1 flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-[#0a0a0a]" /> Filter Student Roster
            </label>
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search roll no or name..."
                className="w-full pl-3.5 pr-4 py-2.5 text-xs rounded-xl border border-[#e5e5e5] bg-[#fffaf0]/40 focus:outline-none focus:border-[#0a0a0a]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Roster Animated Tabs */}
      <AnimatedTabs tabs={animatedAttendanceTabs} defaultTab="batch-a" />
    </div>
  );
}
