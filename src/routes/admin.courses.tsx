import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/AppShell";
import { UNIVERSES_DATA } from "@/lib/universes-data";
import { Globe, Award, Search, Building, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/admin/courses")({
  component: AdminCoursesContent,
});

function AdminCoursesContent() {
  const [query, setQuery] = useState("");

  const filteredUniverses = UNIVERSES_DATA.filter(
    (u) =>
      u.title.toLowerCase().includes(query.toLowerCase()) ||
      u.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      u.description.toLowerCase().includes(query.toLowerCase()) ||
      u.topPerformer.toLowerCase().includes(query.toLowerCase()) ||
      u.bottomPerformer.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Hospitality Management Universes"
        subtitle="Institute administrative oversight of active Round 9 hotel simulation market universes."
      />

      {/* Oversight Banner */}
      <div className="p-4 rounded-2xl bg-[#fffaf0] border border-[#e8b94a]/30 text-xs text-[#0a0a0a] flex items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-[#e8b94a] shrink-0" />
          <span>
            <strong className="font-bold">Administrative Oversight:</strong> Active simulation universes deployed across student and faculty portals.
          </span>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#0a0a0a] text-white shrink-0">
          Read-Only Admin View
        </span>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-[#e5e5e5] rounded-3xl p-4 shadow-xs">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-[#9a9a9a] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search universes by hotel name, strategy, or metrics..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-2xl border border-[#e5e5e5] bg-[#fffaf0]/40 text-[#0a0a0a] outline-none focus:border-[#0a0a0a]"
          />
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#0a0a0a] shrink-0 px-2">
          <Globe className="w-4 h-4 text-[#e8b94a]" />
          <span>4 Active Market Universes</span>
        </div>
      </div>

      {/* 2x2 Grid of Universe Cards for Admin Oversight */}
      <div className="grid md:grid-cols-2 gap-5">
        {filteredUniverses.map((u) => (
          <div
            key={u.id}
            className="bg-white border border-[#e5e5e5] rounded-3xl p-5 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#0a0a0a] text-white">
                    UNIVERSE {u.number}
                  </span>
                  <span className="text-[10px] font-semibold text-[#0a0a0a] bg-[#e8b94a]/20 px-2.5 py-0.5 rounded-full border border-[#e8b94a]/40">
                    Round 9
                  </span>
                </div>
                <span className="text-[11px] font-medium text-[#6a6a6a]">
                  {u.totalHotels} Hotels
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-[#0a0a0a] leading-tight">{u.title}</h3>
                <p className="text-xs text-[#6a6a6a] mt-1 font-normal leading-relaxed">
                  {u.description}
                </p>
              </div>

              {/* Minimal Performers Badges */}
              <div className="bg-[#fffaf0] border border-[#e5e5e5] rounded-2xl p-3 space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#6a6a6a] font-medium flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-[#e8b94a]" /> Top Performer:
                  </span>
                  <span className="font-bold text-[#0a0a0a]">{u.topPerformer}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] pt-1 border-t border-[#e5e5e5]/60">
                  <span className="text-[#6a6a6a] font-medium flex items-center gap-1">
                    <Building className="w-3.5 h-3.5 text-[#6a6a6a]" /> Lowest Margin:
                  </span>
                  <span className="font-semibold text-[#0a0a0a]">{u.bottomPerformer}</span>
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="pt-3 border-t border-[#e5e5e5] flex items-center justify-between gap-2 text-xs text-[#9a9a9a]">
              <span>Verified Round 9 Report</span>
              <span className="font-mono text-[11px]">Instructor: Mr. Rajesh</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
