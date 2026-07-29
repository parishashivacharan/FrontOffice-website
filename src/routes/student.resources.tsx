import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { PageHeader } from "@/components/AppShell";
import {
  getResourcesStore,
  type Resource,
} from "@/lib/mock-data";
import {
  IHM_ROOM_DIVISION_COURSE,
  INITIAL_IHM_RESOURCES,
  type IHMResourceUnit,
  downloadResourceHandout,
} from "@/lib/ihm-resources-data";
import {
  BookOpen,
  Download,
  Search,
  Filter,
  X,
  Maximize2,
  Minimize2,
  User,
  Calculator,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/student/resources")({
  component: StudentResourcesPage,
});

function StudentResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [selectedUnitFilter, setSelectedUnitFilter] = useState<number | "all">("all");
  const [search, setSearch] = useState("");
  const [activeModalUnit, setActiveModalUnit] = useState<IHMResourceUnit | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const storeRes = getResourcesStore();
    setResources(storeRes);
  }, []);

  // Map store resources to full IHMResourceUnit objects
  const unitsList = useMemo<IHMResourceUnit[]>(() => {
    return INITIAL_IHM_RESOURCES.map((ihmSeed) => {
      const match = resources.find((r) => r.id === ihmSeed.id || r.unit === ihmSeed.unit);
      if (match && match.content) {
        try {
          const parsedSections = JSON.parse(match.content);
          return {
            ...ihmSeed,
            title: match.title || ihmSeed.title,
            description: match.description || ihmSeed.description,
            sections: Array.isArray(parsedSections) ? parsedSections : ihmSeed.sections,
          };
        } catch (e) {
          return ihmSeed;
        }
      }
      return ihmSeed;
    });
  }, [resources]);

  const handleDownload = (unit: IHMResourceUnit) => {
    downloadResourceHandout(unit);
    setToastMessage(`✓ Starting download for "${unit.title}"...`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredUnits = unitsList.filter((unit) => {
    const matchesUnit =
      selectedUnitFilter === "all" || unit.unit === selectedUnitFilter;
    const matchesSearch =
      search === "" ||
      unit.title.toLowerCase().includes(search.toLowerCase()) ||
      unit.description.toLowerCase().includes(search.toLowerCase()) ||
      unit.keyTopics.some((t) => t.toLowerCase().includes(search.toLowerCase())) ||
      unit.sections.some(
        (s) =>
          s.heading.toLowerCase().includes(search.toLowerCase()) ||
          s.content.toLowerCase().includes(search.toLowerCase())
      );
    return matchesUnit && matchesSearch;
  });

  return (
    <div className="space-y-5">
      {/* ── Single Unified Clean Page Header ── */}
      <PageHeader
        title="Room Division - Front Office Operations"
        subtitle="Course handouts, syllabus notes, and unit study guides by Mr. Rajesh · IHM Hyderabad (FOM 2yr · RD-FOM-2024)"
      />

      {toastMessage && (
        <div className="p-3.5 rounded-2xl bg-[#22c55e]/15 border border-[#22c55e]/30 text-[#0a0a0a] text-xs font-semibold animate-in fade-in slide-in-from-top-2">
          {toastMessage}
        </div>
      )}

      {/* ── Search & Unit Filter Controls Bar ── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-3xl border border-[#e5e5e5] shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9a9a9a]" />
          <input
            type="text"
            placeholder="Search unit notes, formulas, or topics (e.g. Hubbart, CPOR, RevPAR, Accor)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-2xl border border-[#e5e5e5] focus:outline-none focus:border-[#0a0a0a] bg-[#fffaf0]/40"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <Filter className="w-3.5 h-3.5 text-[#9a9a9a] shrink-0 ml-1" />
          <button
            onClick={() => setSelectedUnitFilter("all")}
            className={cn(
              "px-3.5 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 border",
              selectedUnitFilter === "all"
                ? "bg-[#0a0a0a] text-white border-[#0a0a0a]"
                : "bg-white text-[#6a6a6a] border-[#e5e5e5] hover:bg-[#fffaf0]"
            )}
          >
            All Units (4)
          </button>
          {[1, 2, 3, 5].map((u) => (
            <button
              key={u}
              onClick={() => setSelectedUnitFilter(u)}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 border",
                selectedUnitFilter === u
                  ? "bg-[#0a0a0a] text-white border-[#0a0a0a]"
                  : "bg-white text-[#6a6a6a] border-[#e5e5e5] hover:bg-[#fffaf0]"
              )}
            >
              Unit {u}
            </button>
          ))}
        </div>
      </div>

      {/* ── Compact & Shortened Unit Section Cards ── */}
      <div className="grid md:grid-cols-2 gap-4">
        {filteredUnits.length === 0 ? (
          <div className="md:col-span-2 bg-white rounded-3xl border border-[#e5e5e5] p-10 text-center text-xs text-[#6a6a6a]">
            No course handouts match your search query or unit filter.
          </div>
        ) : (
          filteredUnits.map((u) => (
            <div
              key={u.id}
              className="bg-white border border-[#e5e5e5] rounded-3xl p-4.5 sm:p-5 shadow-xs flex flex-col justify-between hover:border-[#0a0a0a]/30 transition-all space-y-3 group"
            >
              <div className="space-y-2.5">
                {/* Header Badge Row */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#fffaf0] text-[#0a0a0a] border border-[#e8b94a]/30">
                    UNIT {u.unit}
                  </span>
                  <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-gray-100 text-[#6a6a6a] border border-[#e5e5e5]">
                    {u.type}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-[#0a0a0a] group-hover:text-[#e8b94a] transition-colors line-clamp-1">
                    {u.unitTitle}
                  </h2>
                </div>

                {/* Short Concise Description */}
                <p className="text-xs text-[#6a6a6a] font-normal leading-relaxed">
                  {u.description}
                </p>

                {/* Topic Pills — Compact 3 Max */}
                <div className="flex flex-wrap gap-1 pt-0.5">
                  {u.keyTopics.slice(0, 3).map((topic, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-[#fffaf0] border border-[#e5e5e5] text-[10px] font-medium text-[#3a3a3a]"
                    >
                      {topic}
                    </span>
                  ))}
                  {u.keyTopics.length > 3 && (
                    <span className="px-1.5 py-0.5 rounded-md bg-gray-50 border border-[#e5e5e5] text-[10px] font-medium text-[#9a9a9a]">
                      +{u.keyTopics.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="pt-2.5 border-t border-[#e5e5e5]/60 flex items-center gap-2">
                <button
                  onClick={() => {
                    setActiveModalUnit(u);
                    setIsFullscreen(false);
                  }}
                  className="flex-1 px-3.5 py-2 rounded-xl bg-[#0a0a0a] text-white text-xs font-semibold hover:bg-[#1a1a1a] transition-colors flex items-center justify-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5" /> Read Unit Handout
                </button>

                <button
                  onClick={() => handleDownload(u)}
                  className="px-3 py-2 rounded-xl border border-[#e5e5e5] bg-white text-xs font-semibold text-[#0a0a0a] hover:bg-[#faf5e8] transition-colors flex items-center justify-center gap-1.5 shrink-0"
                  title="Download PDF"
                >
                  <Download className="w-3.5 h-3.5" /> PDF
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── Interactive Handout Reader Modal (Clean Minimal Theme - No Dark Boxes) ── */}
      {activeModalUnit && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-2 sm:p-6 overflow-y-auto">
          <div
            className={cn(
              "bg-white border border-[#e5e5e5] rounded-3xl w-full shadow-2xl flex flex-col transition-all duration-300",
              isFullscreen
                ? "h-full max-w-full rounded-none"
                : "max-w-4xl max-h-[92vh] rounded-3xl"
            )}
          >
            {/* Modal Header — Light & Minimal */}
            <div className="p-5 sm:p-6 bg-white text-[#0a0a0a] border-b border-[#e5e5e5] sticky top-0 z-10 flex items-start justify-between gap-4 shrink-0 rounded-t-3xl">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#fffaf0] text-[#0a0a0a] border border-[#e8b94a]/40 text-[10px] font-bold uppercase tracking-wider">
                    UNIT {activeModalUnit.unit} HANDOUT
                  </span>
                  <span className="text-xs font-medium text-[#6a6a6a]">{activeModalUnit.institution}</span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#0a0a0a]">
                  {activeModalUnit.title}
                </h2>
                <p className="text-xs font-medium text-[#6a6a6a] mt-0.5">{activeModalUnit.subtitle}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#0a0a0a] text-xs font-medium transition-colors flex items-center gap-1.5 border border-[#e5e5e5]"
                  title={isFullscreen ? "Minimize Screen" : "Maximize Screen"}
                >
                  {isFullscreen ? (
                    <>
                      <Minimize2 className="w-3.5 h-3.5" /> Minimize
                    </>
                  ) : (
                    <>
                      <Maximize2 className="w-3.5 h-3.5" /> Maximize
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleDownload(activeModalUnit)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#0a0a0a] hover:bg-[#1a1a1a] text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> Download PDF
                </button>

                <button
                  onClick={() => setActiveModalUnit(null)}
                  className="p-1.5 rounded-full hover:bg-gray-100 text-[#6a6a6a] hover:text-[#0a0a0a] transition-colors ml-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: Clean Minimal Reading Experience */}
            <div className="p-6 sm:p-10 space-y-8 overflow-y-auto flex-1 divide-y divide-[#e5e5e5]">
              {/* Author & Course Metadata Banner */}
              <div className="bg-[#fffaf0] border border-[#e8b94a]/30 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs text-[#0a0a0a]">
                <div>
                  <span className="text-[#6a6a6a]">Course:</span>{" "}
                  <span className="font-semibold">{activeModalUnit.courseName}</span>
                </div>
                <div>
                  <span className="text-[#6a6a6a]">Faculty:</span>{" "}
                  <span className="font-semibold">{activeModalUnit.author} ({activeModalUnit.institution})</span>
                </div>
                <div>
                  <span className="text-[#6a6a6a]">Academic Period:</span>{" "}
                  <span className="font-semibold">{activeModalUnit.academicYear}</span>
                </div>
              </div>

              {/* Unit Handout Content Sections */}
              {activeModalUnit.sections.map((sec, idx) => (
                <div key={idx} className="pt-8 first:pt-0 space-y-4">
                  <h3 className="text-lg sm:text-xl font-bold text-[#0a0a0a] flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-[#fffaf0] border border-[#e8b94a]/40 text-[#0a0a0a] text-xs flex items-center justify-center font-bold shrink-0">
                      {idx + 1}
                    </span>
                    {sec.heading}
                  </h3>

                  <div className="text-sm sm:text-base text-[#2a2a2a] leading-relaxed whitespace-pre-line font-normal space-y-4">
                    {sec.content}
                  </div>

                  {sec.content2 && (
                    <div className="text-sm sm:text-base text-[#2a2a2a] leading-relaxed whitespace-pre-line font-normal pt-2">
                      {sec.content2}
                    </div>
                  )}

                  {/* Clean Light Formulas Callout Block */}
                  {sec.formulas && sec.formulas.length > 0 && (
                    <div className="space-y-3 pt-3">
                      <div className="text-xs font-bold uppercase tracking-wider text-[#0a0a0a] flex items-center gap-2">
                        <Calculator className="w-4 h-4 text-[#e8b94a]" /> Key Formulas and Calculations
                      </div>
                      {sec.formulas.map((f, fi) => (
                        <div
                          key={fi}
                          className="p-4 sm:p-5 rounded-2xl bg-[#fffaf0]/80 border border-[#e8b94a]/30 space-y-2.5 shadow-xs"
                        >
                          <div className="text-xs font-bold text-[#0a0a0a] uppercase tracking-wider">{f.label}</div>
                          <div className="font-mono text-xs sm:text-sm font-semibold tracking-wide bg-white p-3 rounded-xl border border-[#e5e5e5] text-[#0a0a0a] shadow-2xs">
                            {f.formula}
                          </div>
                          <div className="text-xs text-[#6a6a6a] leading-relaxed">{f.explanation}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Clean Light Data Tables Block */}
                  {sec.tables && sec.tables.length > 0 && (
                    <div className="space-y-3 pt-3 overflow-x-auto">
                      {sec.tables.map((t, ti) => (
                        <table
                          key={ti}
                          className="w-full text-left text-xs sm:text-sm border border-[#e5e5e5] rounded-2xl overflow-hidden shadow-xs"
                        >
                          <thead className="bg-gray-100/80 text-[#0a0a0a] text-xs uppercase tracking-wider font-bold">
                            <tr>
                              {t.headers.map((h, hi) => (
                                <th key={hi} className="p-3.5 font-bold border-b border-[#e5e5e5] text-[#0a0a0a]">
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#e5e5e5]">
                            {t.rows.map((row, ri) => (
                              <tr
                                key={ri}
                                className={ri % 2 === 0 ? "bg-white" : "bg-[#fffaf0]/30"}
                              >
                                {row.map((cell, ci) => (
                                  <td key={ci} className="p-3.5 text-[#3a3a3a] font-medium">
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="p-5 bg-gray-50 border-t border-[#e5e5e5] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 rounded-b-3xl">
              <div className="text-xs text-[#6a6a6a]">
                Official Student Handout · Prepared by Mr. Rajesh, Faculty, IHM Hyderabad
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="flex-1 sm:flex-none px-4 py-2 rounded-2xl border border-[#e5e5e5] bg-white text-xs font-semibold text-[#0a0a0a] hover:bg-gray-100 transition-colors"
                >
                  {isFullscreen ? "Exit Fullscreen" : "Fullscreen Reader"}
                </button>
                <button
                  onClick={() => handleDownload(activeModalUnit)}
                  className="flex-1 sm:flex-none px-5 py-2 rounded-2xl bg-[#0a0a0a] text-white text-xs font-semibold hover:bg-[#1a1a1a] transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" /> Download Complete Handout PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
