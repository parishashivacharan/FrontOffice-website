import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/AppShell";
import {
  getResourcesStore,
  addResourceStore,
  updateResourceStore,
  deleteResourceStore,
  type Resource,
} from "@/lib/mock-data";
import {
  INITIAL_IHM_RESOURCES,
  type IHMResourceUnit,
  downloadResourceHandout,
} from "@/lib/ihm-resources-data";
import {
  Upload,
  FileText,
  Download,
  Trash2,
  Edit2,
  PlusCircle,
  Building2,
  CheckCircle2,
  BookOpen,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/resources")({
  component: AdminResourcesPage,
});

function AdminResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [search, setSearch] = useState("");
  const [selectedUnit, setSelectedUnit] = useState<number | "all">("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Edit / Form State
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [unitNum, setUnitNum] = useState<number>(1);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("Mr. Rajesh");
  const [institution, setInstitution] = useState("IHM Hyderabad");
  const [type, setType] = useState("PDF Handout");

  const refreshResources = () => {
    setResources(getResourcesStore());
  };

  useEffect(() => {
    refreshResources();
  }, []);

  const handleOpenEdit = (res: Resource) => {
    setIsEditing(true);
    setEditingId(res.id);
    setUnitNum(res.unit || 1);
    setTitle(res.title);
    setSubtitle(res.subtitle || "");
    setDescription(res.description || "");
    setAuthor(res.author || "Mr. Rajesh");
    setInstitution(res.institution || "IHM Hyderabad");
    setType(res.type || "PDF Handout");
  };

  const handleOpenCreate = () => {
    setIsEditing(true);
    setEditingId(null);
    setUnitNum(1);
    setTitle("");
    setSubtitle("");
    setDescription("");
    setAuthor("Mr. Rajesh");
    setInstitution("IHM Hyderabad");
    setType("PDF Handout");
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    if (editingId) {
      updateResourceStore(editingId, {
        unit: unitNum,
        title,
        subtitle,
        description,
        author,
        institution,
        type,
      });
      setToastMessage(`✓ Resource "${title}" updated successfully!`);
    } else {
      addResourceStore({
        courseId: "room-division",
        unit: unitNum,
        unitTitle: title,
        title,
        subtitle,
        description,
        author,
        institution,
        type,
      });
      setToastMessage(`✓ New resource "${title}" published for students!`);
    }

    setIsEditing(false);
    refreshResources();
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleDelete = (id: string, resTitle: string) => {
    if (confirm(`Are you sure you want to delete resource "${resTitle}"?`)) {
      deleteResourceStore(id);
      setToastMessage(`✓ Resource "${resTitle}" deleted.`);
      refreshResources();
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  const filteredResources = resources.filter((r) => {
    const matchesUnit = selectedUnit === "all" || r.unit === selectedUnit;
    const matchesSearch =
      search === "" ||
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      (r.description && r.description.toLowerCase().includes(search.toLowerCase()));
    return matchesUnit && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Institute Study Material & Resources Management"
        subtitle="Manage and edit syllabus handouts for Room Division (Front Office Operations) by Mr. Rajesh, IHM Hyderabad."
      />

      {toastMessage && (
        <div className="p-4 rounded-2xl bg-[#22c55e]/15 border border-[#22c55e]/30 text-[#0a0a0a] text-xs font-semibold animate-in fade-in slide-in-from-top-2">
          {toastMessage}
        </div>
      )}

      {/* Admin Action Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-3xl border border-[#e5e5e5] shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9a9a9a]" />
          <input
            type="text"
            placeholder="Search resources by title or topic..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-2xl border border-[#e5e5e5] focus:outline-none focus:border-[#0a0a0a] bg-[#fffaf0]/40"
          />
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-5 py-2.5 rounded-2xl bg-[#0a0a0a] text-white text-xs font-semibold hover:bg-[#1a1a1a] transition-colors flex items-center justify-center gap-2 shrink-0"
        >
          <PlusCircle className="w-4 h-4" /> Add / Publish Resource
        </button>
      </div>

      {/* Edit / Create Form Modal */}
      {isEditing && (
        <form
          onSubmit={handleSave}
          className="bg-white rounded-3xl border border-[#0a0a0a]/20 p-6 sm:p-8 shadow-xl space-y-4 animate-in fade-in"
        >
          <div className="flex items-center justify-between border-b border-[#e5e5e5] pb-4">
            <h2 className="text-base font-bold text-[#0a0a0a]">
              {editingId ? "Edit Resource Unit Material" : "Publish New Unit Material"}
            </h2>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="text-xs font-semibold text-[#6a6a6a] hover:text-[#0a0a0a]"
            >
              Cancel
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#0a0a0a] mb-1">Unit Number</label>
              <select
                value={unitNum}
                onChange={(e) => setUnitNum(Number(e.target.value))}
                className="w-full px-4 py-2.5 text-xs rounded-2xl border border-[#e5e5e5] bg-white focus:outline-none focus:border-[#0a0a0a]"
              >
                <option value={1}>Unit 1: Rate Setting & Forecasting</option>
                <option value={2}>Unit 2: Budgeting & CPOR</option>
                <option value={3}>Unit 3: Performance Reports & STR</option>
                <option value={5}>Unit 5: Loyalty & AI in Hospitality</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0a0a0a] mb-1">Resource Type</label>
              <input
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="e.g. PDF Handout, Formula Sheet"
                className="w-full px-4 py-2.5 text-xs rounded-2xl border border-[#e5e5e5] focus:outline-none focus:border-[#0a0a0a]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0a0a0a] mb-1">Resource Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Unit 1: Planning & Evaluating Front Office Operations"
              className="w-full px-4 py-2.5 text-xs rounded-2xl border border-[#e5e5e5] focus:outline-none focus:border-[#0a0a0a]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0a0a0a] mb-1">Subtitle / Key Focus</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="e.g. Hubbart Formula, Rate Strategies, Forecast Forms"
              className="w-full px-4 py-2.5 text-xs rounded-2xl border border-[#e5e5e5] focus:outline-none focus:border-[#0a0a0a]"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#0a0a0a] mb-1">Faculty / Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-4 py-2.5 text-xs rounded-2xl border border-[#e5e5e5] focus:outline-none focus:border-[#0a0a0a]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0a0a0a] mb-1">Institution</label>
              <input
                type="text"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                className="w-full px-4 py-2.5 text-xs rounded-2xl border border-[#e5e5e5] focus:outline-none focus:border-[#0a0a0a]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0a0a0a] mb-1">Description / Summary</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a overview of what students will learn in this unit..."
              className="w-full px-4 py-2.5 text-xs rounded-2xl border border-[#e5e5e5] focus:outline-none focus:border-[#0a0a0a]"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-5 py-2.5 rounded-2xl border border-[#e5e5e5] text-xs font-semibold text-[#6a6a6a] hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-2xl bg-[#0a0a0a] text-white text-xs font-semibold hover:bg-[#1a1a1a]"
            >
              {editingId ? "Save Changes" : "Publish Resource"}
            </button>
          </div>
        </form>
      )}

      {/* Published Resources Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {filteredResources.map((r) => (
          <div
            key={r.id}
            className="p-5 rounded-3xl border border-[#e5e5e5] bg-white shadow-xs flex flex-col justify-between space-y-3 hover:border-[#0a0a0a]/30 transition-all"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#0a0a0a] text-white">
                  UNIT {r.unit || 1}
                </span>
                <span className="text-[10px] font-semibold uppercase px-2.5 py-0.5 rounded-full bg-[#e8b94a]/15 text-[#0a0a0a] border border-[#e8b94a]/30">
                  {r.type}
                </span>
              </div>

              <h3 className="font-semibold text-base text-[#0a0a0a]">{r.title}</h3>
              {r.subtitle && <div className="text-xs text-[#6a6a6a] font-medium">{r.subtitle}</div>}
              {r.description && <p className="text-xs text-[#6a6a6a] line-clamp-2">{r.description}</p>}

              <div className="text-[11px] text-[#9a9a9a] pt-1 border-t border-[#e5e5e5]/50">
                Author: <span className="font-semibold text-[#0a0a0a]">{r.author || "Mr. Rajesh"}</span> ({r.institution || "IHM Hyderabad"})
              </div>
            </div>

            <div className="pt-3 border-t border-[#e5e5e5] flex items-center justify-end gap-2">
              <button
                onClick={() => handleOpenEdit(r)}
                className="px-3.5 py-1.5 rounded-xl border border-[#e5e5e5] text-xs font-semibold text-[#0a0a0a] hover:bg-[#fffaf0] transition-colors flex items-center gap-1.5"
              >
                <Edit2 className="w-3.5 h-3.5" /> Edit
              </button>

              <button
                onClick={() => handleDelete(r.id, r.title)}
                className="px-3.5 py-1.5 rounded-xl border border-[#ef4444]/30 text-xs font-semibold text-[#ef4444] hover:bg-[#ef4444]/10 transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
