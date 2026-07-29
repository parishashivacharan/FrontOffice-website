import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { getActivityLogs, type ActivityLog } from "@/lib/mock-data";
import { History, Shield, CheckCircle2, BookOpen, UserCheck, Search, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/activity")({
  component: AdminActivityPage,
});

function AdminActivityPage() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const sync = () => setLogs(getActivityLogs());
    sync();
    window.addEventListener("scholaria:activity", sync);
    return () => window.removeEventListener("scholaria:activity", sync);
  }, []);

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.target.toLowerCase().includes(search.toLowerCase()) ||
      log.actor.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === "All" || log.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage) || 1;
  const paginatedLogs = filteredLogs.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const getBadgeStyle = (category: ActivityLog["category"]) => {
    switch (category) {
      case "Teacher Approval":
        return "bg-[#e8b94a]/15 text-[#0a0a0a] border-[#e8b94a]/30";
      case "Course Management":
        return "bg-[#ffb084]/20 text-[#0a0a0a] border-[#ffb084]/30";
      case "User Management":
        return "bg-[#b8a4ed]/20 text-[#0a0a0a] border-[#b8a4ed]/30";
      default:
        return "bg-[#0a0a0a]/5 text-[#3a3a3a] border-[#0a0a0a]/10";
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Institute Activity Audit Log"
        subtitle="Complete chronological audit trail of all sensitive administrative actions, teacher approvals, and system changes."
      />

      <div className="space-y-6">
        {/* Controls Bar: Search & Category Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#e5e5e5] shadow-xs">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9a9a9a]" />
            <input
              type="text"
              placeholder="Search by action, target, or admin email..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-[#e5e5e5] focus:outline-none focus:border-[#0a0a0a] bg-[#fffaf0]/40"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <Filter className="w-3.5 h-3.5 text-[#9a9a9a] shrink-0 ml-1" />
            {["All", "Teacher Approval", "Course Management", "User Management"].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setCategoryFilter(cat);
                  setPage(1);
                }}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 border",
                  categoryFilter === cat
                    ? "bg-[#0a0a0a] text-white border-[#0a0a0a]"
                    : "bg-[#fffaf0]/60 text-[#6a6a6a] border-[#e5e5e5] hover:bg-[#faf5e8]",
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Audit Log Table */}
        <div className="bg-white rounded-3xl border border-[#e5e5e5] shadow-xs overflow-hidden">
          <div className="p-5 border-b border-[#e5e5e5] flex items-center justify-between bg-[#faf5e8]/30">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-[#0a0a0a]" />
              <h2 className="font-medium text-sm text-[#0a0a0a]">
                Activity Entries ({filteredLogs.length})
              </h2>
            </div>
            <span className="text-xs text-[#6a6a6a]">Showing {paginatedLogs.length} per page</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#fffaf0] border-b border-[#e5e5e5] text-[#9a9a9a] font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-6">Timestamp</th>
                  <th className="py-3.5 px-6">Action Executed</th>
                  <th className="py-3.5 px-6">Target Resource</th>
                  <th className="py-3.5 px-6">Category</th>
                  <th className="py-3.5 px-6">Performed By</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e5e5e5]/60">
                {paginatedLogs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-[#6a6a6a]">
                      No audit logs match your search filter.
                    </td>
                  </tr>
                ) : (
                  paginatedLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-[#fffaf0]/50 transition-colors">
                      <td className="py-4 px-6 text-[#6a6a6a] font-mono text-[11px] whitespace-nowrap">
                        {log.timestamp}
                      </td>
                      <td className="py-4 px-6 font-medium text-[#0a0a0a]">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#22c55e] shrink-0" />
                          <span>{log.action}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-[#3a3a3a] font-medium">{log.target}</td>
                      <td className="py-4 px-6">
                        <span
                          className={cn(
                            "px-2.5 py-0.5 rounded-full text-[10px] font-semibold border inline-block",
                            getBadgeStyle(log.category),
                          )}
                        >
                          {log.category}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-[#6a6a6a]">{log.actor}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="p-4 border-t border-[#e5e5e5] flex items-center justify-between bg-[#fffaf0]/30 text-xs">
              <div className="text-[#6a6a6a]">
                Page <span className="font-semibold text-[#0a0a0a]">{page}</span> of {totalPages}
              </div>
              <div className="flex items-center gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="px-3 py-1.5 rounded-lg border border-[#e5e5e5] bg-white text-[#0a0a0a] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#faf5e8] transition-colors"
                >
                  Previous
                </button>
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="px-3 py-1.5 rounded-lg border border-[#e5e5e5] bg-white text-[#0a0a0a] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#faf5e8] transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
