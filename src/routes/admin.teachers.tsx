import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell, PageHeader } from "@/components/AppShell";
import {
  getApprovedTeachers,
  addApprovedTeacher,
  removeApprovedTeacher,
  getAllUsers,
} from "@/lib/mock-auth";
import { Trash2, UserCheck, Clock, Plus, ShieldCheck, Search } from "lucide-react";

export const Route = createFileRoute("/admin/teachers")({
  component: ApprovedTeachersContent,
});

function ApprovedTeachersContent() {
  const [list, setList] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [users, setUsers] = useState(getAllUsers());

  const refreshData = () => {
    setList(getApprovedTeachers());
    setUsers(getAllUsers());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const res = addApprovedTeacher(email);
    if (!res.ok) {
      setError(res.message);
      return;
    }

    setSuccess(res.message);
    setEmail("");
    refreshData();
  };

  const handleRemove = (targetEmail: string) => {
    if (confirm(`Revoke teacher approval for ${targetEmail}?`)) {
      removeApprovedTeacher(targetEmail);
      refreshData();
    }
  };

  const filtered = list.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div>
      <PageHeader
        title="Teacher Email Approvals"
        subtitle="Manage approved teacher emails. Anyone signing up with these emails becomes a Teacher automatically. Existing student accounts will automatically upgrade upon login."
      />

      <form
        onSubmit={handleAdd}
        className="bg-white border border-[#e5e5e5] rounded-3xl p-6 mb-6 shadow-xs space-y-3"
      >
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#0a0a0a] flex items-center gap-1.5">
          <Plus className="w-4 h-4 text-[#0a0a0a]" /> Authorize New Teacher Email
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="teacher.name@school.edu"
            className="flex-1 px-4 py-2.5 rounded-xl border border-[#e5e5e5] bg-[#fffaf0]/40 focus:outline-none focus:border-[#0a0a0a] text-xs"
          />
          <button className="px-6 py-2.5 rounded-xl bg-[#0a0a0a] text-white font-medium hover:bg-[#1a1a1a] text-xs shadow-xs transition-colors shrink-0">
            Approve Email
          </button>
        </div>
        {error && <div className="text-xs text-[#ef4444] font-medium">{error}</div>}
        {success && <div className="text-xs text-[#22c55e] font-medium">✓ {success}</div>}
      </form>

      <div className="bg-white border border-[#e5e5e5] rounded-3xl overflow-hidden shadow-xs p-5 space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3 border-b border-[#e5e5e5]">
          <div className="font-medium text-sm text-[#0a0a0a] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#e8b94a]" /> Approved Teacher Email List ({filtered.length})
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#9a9a9a]" />
            <input
              type="text"
              placeholder="Search teacher email address..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-[#e5e5e5] bg-[#fffaf0]/50 focus:outline-none focus:border-[#0a0a0a]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#fffaf0] border-b border-[#e5e5e5] text-[#9a9a9a] uppercase font-semibold text-[10px] tracking-wider">
              <tr>
                <th className="px-5 py-3">Approved Email Address</th>
                <th className="px-5 py-3">Account Status</th>
                <th className="px-5 py-3">Role Status</th>
                <th className="px-5 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e5e5]">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-[#6a6a6a]">
                    No approved teacher emails match your search filter.
                  </td>
                </tr>
              ) : (
                paginated.map((e) => {
                  const matchedUser = users.find((u) => u.email.toLowerCase() === e.toLowerCase());
                  const isClaimed = !!matchedUser;

                  return (
                    <tr key={e} className="hover:bg-[#fffaf0]/50 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-[#0a0a0a]">{e}</td>
                      <td className="px-5 py-3.5">
                        {isClaimed ? (
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#22c55e]/15 text-[#22c55e] border border-[#22c55e]/20">
                            <UserCheck className="w-3 h-3" /> Claimed ({matchedUser.name})
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#e8b94a]/15 text-[#0a0a0a] border border-[#e8b94a]/30">
                            <Clock className="w-3 h-3 text-[#e8b94a]" /> Pending Registration
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-xs text-[#6a6a6a]">
                        {matchedUser ? (
                          <span className="capitalize font-semibold text-[#0a0a0a]">
                            {matchedUser.role}
                          </span>
                        ) : (
                          "Pre-authorized Teacher"
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <button
                          onClick={() => handleRemove(e)}
                          title="Revoke approval"
                          className="p-1.5 rounded-lg hover:bg-[#ef4444]/10 text-[#ef4444] transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="pt-3 border-t border-[#e5e5e5] flex items-center justify-between text-xs text-[#6a6a6a]">
            <div>
              Page <span className="font-semibold text-[#0a0a0a]">{page}</span> of {totalPages}
            </div>
            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1.5 rounded-lg border border-[#e5e5e5] bg-white text-[#0a0a0a] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#faf5e8]"
              >
                Previous
              </button>
              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="px-3 py-1.5 rounded-lg border border-[#e5e5e5] bg-white text-[#0a0a0a] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#faf5e8]"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
