import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { PageHeader } from "@/components/AppShell";
import { getAllUsers, type User } from "@/lib/mock-auth";
import { IHM_STUDENT_ROSTER, type IHMStudentRecord } from "@/lib/ihm-roster-data";
import { AnimatedTabs, type Tab } from "@/components/ui/animated-tabs";
import { Search, CheckCircle2, Clock, Building2, UserCheck, ShieldCheck, Mail } from "lucide-react";

export const Route = createFileRoute("/admin/users")({
  component: AdminUsersContent,
});

function AdminUsersContent() {
  const [users, setUsers] = useState<User[]>([]);
  const [rosterSearch, setRosterSearch] = useState("");

  const refreshUsers = () => {
    setUsers(getAllUsers());
  };

  useEffect(() => {
    refreshUsers();
  }, []);

  // Helper function to check if student has created an account / logged in
  const isStudentActive = (student: IHMStudentRecord) => {
    return users.some(
      (u) =>
        u.email.toLowerCase() === student.email.toLowerCase() ||
        u.email.toLowerCase().includes(student.councilNo) ||
        (u.rollNumber && u.rollNumber.includes(student.councilNo))
    );
  };

  // Render Roster Table for a specific Batch
  const renderBatchRosterTable = (batchName: "A" | "B" | "C" | "D") => {
    const batchStudents = IHM_STUDENT_ROSTER.filter(
      (s) =>
        s.batch === batchName &&
        (rosterSearch === "" ||
          s.name.toLowerCase().includes(rosterSearch.toLowerCase()) ||
          s.councilNo.includes(rosterSearch) ||
          s.email.toLowerCase().includes(rosterSearch.toLowerCase()))
    );

    const activeCount = batchStudents.filter(isStudentActive).length;

    return (
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#fffaf0] border border-[#e8b94a]/30 p-3.5 rounded-2xl text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#0a0a0a]">BATCH {batchName} ROSTER</span>
            <span className="text-[#6a6a6a]">({batchStudents.length} Students Total)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#22c55e]/15 text-[#15803d] font-bold border border-[#22c55e]/30">
              {activeCount} Active Accounts Verified
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-[#6a6a6a] font-medium border border-[#e5e5e5]">
              {batchStudents.length - activeCount} Pending Setup
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-gray-50 border-b border-[#e5e5e5] text-[#9a9a9a] uppercase font-bold text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-3">Sl No</th>
                <th className="px-4 py-3">Council Roll No</th>
                <th className="px-4 py-3">Candidate Full Name</th>
                <th className="px-4 py-3">Mandatory Login Email</th>
                <th className="px-4 py-3">Term & Course</th>
                <th className="px-4 py-3">Portal Registration Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e5e5]">
              {batchStudents.map((st) => {
                const active = isStudentActive(st);
                return (
                  <tr key={st.slNo} className="hover:bg-[#fffaf0]/40 transition-colors">
                    <td className="px-4 py-3 font-mono font-bold text-[#6a6a6a]">{st.slNo}</td>
                    <td className="px-4 py-3 font-mono font-bold text-[#0a0a0a]">
                      {st.councilNo}
                    </td>
                    <td className="px-4 py-3 font-bold text-[#0a0a0a]">
                      {st.name}
                      {st.isReAdmission && (
                        <span className="ml-2 px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-[9px] font-extrabold uppercase border border-purple-200">
                          Re-Admission
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 font-mono text-[#6a6a6a]">{st.email}</td>
                    <td className="px-4 py-3 text-[#6a6a6a]">
                      <span className="font-semibold text-[#0a0a0a]">{st.semester}</span> · Second Year
                    </td>
                    <td className="px-4 py-3">
                      {active ? (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#22c55e]/15 text-[#15803d] border border-[#22c55e]/30 inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Active & Verified
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-gray-100 text-[#6a6a6a] border border-[#e5e5e5] inline-flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Pending Registration
                        </span>
                      )}
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

  // Render Faculty / Teachers Tab
  const renderTeachersTab = () => (
    <div className="space-y-4 pt-1">
      <div className="p-4 rounded-2xl bg-[#fffaf0] border border-[#e8b94a]/30 text-xs text-[#0a0a0a] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-[#e8b94a]" />
          <span><strong>Authorized Faculty Members:</strong> Authorized instructor accounts for Room Division and front office simulation.</span>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-[#0a0a0a] text-white font-bold text-[10px] uppercase">1 Faculty Account</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead className="bg-gray-50 border-b border-[#e5e5e5] text-[#9a9a9a] uppercase font-bold text-[10px] tracking-wider">
            <tr>
              <th className="px-4 py-3">Faculty Name</th>
              <th className="px-4 py-3">Email Address</th>
              <th className="px-4 py-3">Department & Specialization</th>
              <th className="px-4 py-3">System Role</th>
              <th className="px-4 py-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e5e5e5]">
            <tr className="hover:bg-[#fffaf0]/40 transition-colors">
              <td className="px-4 py-3.5 font-bold text-[#0a0a0a]">Mr. Rajesh</td>
              <td className="px-4 py-3.5 font-mono text-[#0a0a0a] font-bold">rajesh@ihm.edu</td>
              <td className="px-4 py-3.5 text-[#6a6a6a]">Department of Front Office (Room Division Operations)</td>
              <td className="px-4 py-3.5">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#e8b94a]/20 text-[#0a0a0a] border border-[#e8b94a]/30">
                  Teacher & Admin Access
                </span>
              </td>
              <td className="px-4 py-3.5 text-right">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#22c55e]/15 text-[#15803d] border border-[#22c55e]/30 inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Active Faculty
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  // Render Administrators Tab
  const renderAdminsTab = () => (
    <div className="space-y-4 pt-1">
      <div className="p-4 rounded-2xl bg-[#fffaf0] border border-[#e8b94a]/30 text-xs text-[#0a0a0a] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#e8b94a]" />
          <span><strong>System Administrators:</strong> Super admin accounts with full institute oversight.</span>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-[#0a0a0a] text-white font-bold text-[10px] uppercase">2 Admin Accounts</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead className="bg-gray-50 border-b border-[#e5e5e5] text-[#9a9a9a] uppercase font-bold text-[10px] tracking-wider">
            <tr>
              <th className="px-4 py-3">Admin Account</th>
              <th className="px-4 py-3">Email Address</th>
              <th className="px-4 py-3">Permission Level</th>
              <th className="px-4 py-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e5e5e5]">
            <tr className="hover:bg-[#fffaf0]/40 transition-colors">
              <td className="px-4 py-3.5 font-bold text-[#0a0a0a]">Institute Admin</td>
              <td className="px-4 py-3.5 font-mono text-[#0a0a0a] font-bold">parishashivacharan@gmail.com</td>
              <td className="px-4 py-3.5 text-[#6a6a6a]">Super Administrator (Admin Portal Only)</td>
              <td className="px-4 py-3.5 text-right">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#22c55e]/15 text-[#15803d] border border-[#22c55e]/30 inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Active Super Admin
                </span>
              </td>
            </tr>
            <tr className="hover:bg-[#fffaf0]/40 transition-colors">
              <td className="px-4 py-3.5 font-bold text-[#0a0a0a]">Mr. Rajesh</td>
              <td className="px-4 py-3.5 font-mono text-[#0a0a0a] font-bold">rajesh@ihm.edu</td>
              <td className="px-4 py-3.5 text-[#6a6a6a]">Faculty Administrator (Teacher + Admin Portals)</td>
              <td className="px-4 py-3.5 text-right">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#22c55e]/15 text-[#15803d] border border-[#22c55e]/30 inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Active Faculty Admin
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  // Render Test Student Verification Tab
  const renderTestStudentTab = () => (
    <div className="space-y-4 pt-1">
      <div className="p-4 rounded-2xl bg-[#fffaf0] border border-[#e8b94a]/30 text-xs text-[#0a0a0a] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-[#e8b94a]" />
          <span><strong>Demo Test Student Account:</strong> Pre-configured test student login for verification and testing purposes.</span>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-[#0a0a0a] text-white font-bold text-[10px] uppercase">1 Test Student</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead className="bg-gray-50 border-b border-[#e5e5e5] text-[#9a9a9a] uppercase font-bold text-[10px] tracking-wider">
            <tr>
              <th className="px-4 py-3">Student Name</th>
              <th className="px-4 py-3">Test Email Address</th>
              <th className="px-4 py-3">Roll Number</th>
              <th className="px-4 py-3">Class & Semester</th>
              <th className="px-4 py-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e5e5e5]">
            <tr className="hover:bg-[#fffaf0]/40 transition-colors">
              <td className="px-4 py-3.5 font-bold text-[#0a0a0a]">Test Student (Verification)</td>
              <td className="px-4 py-3.5 font-mono text-[#0a0a0a] font-bold">123456789@ihm.edu</td>
              <td className="px-4 py-3.5 font-mono text-[#0a0a0a]">123456789</td>
              <td className="px-4 py-3.5 text-[#6a6a6a]">Second Year B.Sc. in H & HA · Semester 3</td>
              <td className="px-4 py-3.5 text-right">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#22c55e]/15 text-[#15803d] border border-[#22c55e]/30 inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Active Test Student
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const animatedRosterTabs: Tab[] = [
    {
      id: "batch-a",
      label: "Batch A",
      badge: "27 Students",
      content: renderBatchRosterTable("A"),
    },
    {
      id: "batch-b",
      label: "Batch B",
      badge: "26 Students",
      content: renderBatchRosterTable("B"),
    },
    {
      id: "batch-c",
      label: "Batch C",
      badge: "26 Students",
      content: renderBatchRosterTable("C"),
    },
    {
      id: "batch-d",
      label: "Batch D",
      badge: "28 Students",
      content: renderBatchRosterTable("D"),
    },
    {
      id: "teachers",
      label: "Teachers",
      badge: "1 Faculty",
      content: renderTeachersTab(),
    },
    {
      id: "admins",
      label: "Admins",
      badge: "2 Accounts",
      content: renderAdminsTab(),
    },
    {
      id: "test-student",
      label: "Test Student",
      badge: "123456789@ihm.edu",
      content: renderTestStudentTab(),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Student Batches & Portal Verification Roster"
        subtitle="Manage student registrations across Batches A, B, C & D (IHM Hyderabad Semester 3), faculty, admins, and test accounts."
      />

      {/* ── Official IHM Student & System Account Tabs ── */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-3xl border border-[#e5e5e5] shadow-xs">
          <div>
            <h2 className="text-base font-bold text-[#0a0a0a] flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#e8b94a]" /> System Accounts & Student Batch Roster
            </h2>
            <p className="text-xs text-[#6a6a6a] mt-0.5">
              Authorized logins: <code className="bg-[#fffaf0] px-1.5 py-0.5 rounded border border-[#e5e5e5] text-[#0a0a0a] font-mono">rajesh@ihm.edu</code>, <code className="bg-[#fffaf0] px-1.5 py-0.5 rounded border border-[#e5e5e5] text-[#0a0a0a] font-mono">parishashivacharan@gmail.com</code>, <code className="bg-[#fffaf0] px-1.5 py-0.5 rounded border border-[#e5e5e5] text-[#0a0a0a] font-mono">123456789@ihm.edu</code>.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#9a9a9a]" />
            <input
              type="text"
              value={rosterSearch}
              onChange={(e) => setRosterSearch(e.target.value)}
              placeholder="Search roll no or name..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#e5e5e5] bg-[#fffaf0]/40 focus:outline-none focus:border-[#0a0a0a]"
            />
          </div>
        </div>

        <AnimatedTabs tabs={animatedRosterTabs} defaultTab="batch-a" />
      </div>
    </div>
  );
}
