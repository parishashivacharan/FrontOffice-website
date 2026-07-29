import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { PageHeader } from "@/components/AppShell";
import {
  getResourcesStore,
  addResourceStore,
  deleteResourceStore,
  updateResourceStore,
  addAnnouncementStore,
  type Resource,
} from "@/lib/mock-data";
import { getCurrentUser } from "@/lib/mock-auth";
import { Upload, FileText, CheckCircle2, Trash2, Edit2, FilePlus, Bell } from "lucide-react";

export const Route = createFileRoute("/teacher/resources/new")({
  component: NewResourcePage,
});

function NewResourcePage() {
  const teacherUser = getCurrentUser();
  const [resources, setResources] = useState<Resource[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form State
  const [editingResId, setEditingResId] = useState<string | null>(null);
  const [unitName, setUnitName] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("PDF Handout");
  const [author, setAuthor] = useState("Mr. Rajesh");
  const [institution, setInstitution] = useState("IHM Hyderabad");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfFileName, setPdfFileName] = useState("");

  const refreshResources = () => {
    setResources(getResourcesStore());
  };

  useEffect(() => {
    refreshResources();
  }, []);

  const handleOpenEdit = (r: Resource) => {
    setEditingResId(r.id);
    setUnitName(r.unitTitle || `Unit ${r.unit || 1}`);
    setTitle(r.title);
    setSubtitle(r.subtitle || "");
    setDescription(r.description || "");
    setType(r.type || "PDF Handout");
    setAuthor(r.author || "Mr. Rajesh");
    setInstitution(r.institution || "IHM Hyderabad");
    setPdfFile(null);
    setPdfFileName("");
  };

  const handleReset = () => {
    setEditingResId(null);
    setUnitName("");
    setTitle("");
    setSubtitle("");
    setDescription("");
    setType("PDF Handout");
    setAuthor("Mr. Rajesh");
    setInstitution("IHM Hyderabad");
    setPdfFile(null);
    setPdfFileName("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPdfFile(file);
      setPdfFileName(file.name);
    }
  };

  const handlePublishResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !unitName) return;

    // Extract unit number from input if possible
    const unitMatch = unitName.match(/\d+/);
    const unitNum = unitMatch ? parseInt(unitMatch[0]) : 1;

    if (editingResId) {
      updateResourceStore(editingResId, {
        unit: unitNum,
        unitTitle: unitName,
        title,
        subtitle,
        description,
        type,
        author,
        institution,
        ...(pdfFileName ? { downloadFilename: pdfFileName } : {}),
      });
      setSuccessMessage(`Handout "${title}" updated successfully`);
    } else {
      addResourceStore({
        courseId: "room-division",
        unit: unitNum,
        unitTitle: unitName,
        title,
        subtitle,
        description,
        type,
        author,
        institution,
        ...(pdfFileName ? { downloadFilename: pdfFileName } : {}),
      });

      // Send notification to all students and admin
      addAnnouncementStore({
        title: `New Resource Published: ${title}`,
        body: `${author} has uploaded a new study material for ${unitName}. Check the Resources section to access the handout.`,
        author: teacherUser?.name || "Faculty",
        scope: "Institute-wide",
      });

      setSuccessMessage(`Handout "${title}" published and all students notified`);
    }

    handleReset();
    refreshResources();
    setTimeout(() => setSuccessMessage(null), 5000);
  };

  const handleDelete = (id: string, resTitle: string) => {
    if (confirm(`Delete handout resource "${resTitle}"?`)) {
      deleteResourceStore(id);
      setSuccessMessage(`Resource "${resTitle}" removed`);
      refreshResources();
      setTimeout(() => setSuccessMessage(null), 4000);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Faculty Study Material Manager"
        subtitle="Publish, edit and manage Room Division (Front Office Operations) study materials for students."
      />

      {successMessage && (
        <div className="p-4 rounded-2xl bg-[#22c55e]/15 border border-[#22c55e]/30 text-[#0a0a0a] text-xs font-semibold animate-in fade-in slide-in-from-top-2 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#22c55e]" />
          {successMessage}
        </div>
      )}

      {/* Form Container */}
      <div className="bg-white rounded-3xl border border-[#e5e5e5] p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#e5e5e5] pb-4 mb-6">
          <div className="flex items-center gap-2">
            <FilePlus className="w-5 h-5 text-[#0a0a0a]" />
            <h2 className="font-semibold text-base text-[#0a0a0a]">
              {editingResId ? "Edit Published Handout" : "Publish New Handout / Notes"}
            </h2>
          </div>
          {editingResId && (
            <button
              onClick={handleReset}
              className="text-xs font-semibold text-[#6a6a6a] hover:text-[#0a0a0a]"
            >
              Cancel Edit
            </button>
          )}
        </div>

        <form onSubmit={handlePublishResource} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#0a0a0a] mb-1">Unit Name</label>
              <input
                type="text"
                required
                value={unitName}
                onChange={(e) => setUnitName(e.target.value)}
                placeholder="e.g. Unit 1: Rate Setting & Forecasting"
                className="w-full px-4 py-2.5 text-xs rounded-2xl border border-[#e5e5e5] bg-white focus:outline-none focus:border-[#0a0a0a] font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0a0a0a] mb-1">Resource Type</label>
              <input
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="e.g. PDF Handout, Study Guide"
                className="w-full px-4 py-2.5 text-xs rounded-2xl border border-[#e5e5e5] focus:outline-none focus:border-[#0a0a0a]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0a0a0a] mb-1">Handout Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Planning & Evaluating Front Office Operations"
              className="w-full px-4 py-2.5 text-xs rounded-2xl border border-[#e5e5e5] focus:outline-none focus:border-[#0a0a0a] font-medium"
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
              <label className="block text-xs font-semibold text-[#0a0a0a] mb-1">Faculty / Instructor</label>
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

          {/* PDF Upload Area */}
          <div>
            <label className="block text-xs font-semibold text-[#0a0a0a] mb-1">Upload PDF Attachment</label>
            <div className="relative">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
                id="pdf-upload"
              />
              <label
                htmlFor="pdf-upload"
                className="flex items-center gap-3 w-full px-4 py-3.5 text-xs rounded-2xl border border-dashed border-[#d0d0d0] bg-[#fafaf8] hover:bg-[#f5f0e8] cursor-pointer transition-colors"
              >
                <Upload className="w-5 h-5 text-[#9a9a9a]" />
                <div>
                  {pdfFileName ? (
                    <span className="font-semibold text-[#0a0a0a]">{pdfFileName}</span>
                  ) : (
                    <>
                      <span className="font-medium text-[#6a6a6a]">Click to select a PDF file</span>
                      <span className="block text-[10px] text-[#9a9a9a] mt-0.5">Accepted format: .pdf</span>
                    </>
                  )}
                </div>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0a0a0a] mb-1">Summary / Note Overview</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief summary of syllabus points covered..."
              className="w-full px-4 py-2.5 text-xs rounded-2xl border border-[#e5e5e5] focus:outline-none focus:border-[#0a0a0a]"
            />
          </div>

          <div className="pt-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[10px] text-[#9a9a9a] font-medium">
              <Bell className="w-3.5 h-3.5" />
              Publishing will notify all students and admin
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-2xl bg-[#0a0a0a] text-white text-xs font-semibold hover:bg-[#1a1a1a] transition-colors flex items-center gap-2"
            >
              <Upload className="w-4 h-4" /> {editingResId ? "Update Handout" : "Publish Handout"}
            </button>
          </div>
        </form>
      </div>

      {/* Existing Published List */}
      <div className="bg-white rounded-3xl border border-[#e5e5e5] p-6 shadow-xs space-y-4">
        <h2 className="font-semibold text-base text-[#0a0a0a]">Published Unit Materials ({resources.length})</h2>

        {resources.length === 0 ? (
          <div className="py-8 text-center text-xs text-[#6a6a6a]">
            No materials published yet. Use the form above to publish your first unit handout.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {resources.map((r) => (
              <div
                key={r.id}
                className="p-5 rounded-2xl border border-[#e5e5e5] bg-[#fffaf0]/30 space-y-3 flex flex-col justify-between"
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

                  <h3 className="font-semibold text-sm text-[#0a0a0a]">{r.title}</h3>
                  {r.subtitle && <div className="text-xs text-[#6a6a6a] font-medium">{r.subtitle}</div>}
                  {r.description && <p className="text-xs text-[#6a6a6a] line-clamp-2">{r.description}</p>}
                  {r.downloadFilename && (
                    <div className="flex items-center gap-1.5 text-[10px] text-[#6a6a6a]">
                      <FileText className="w-3 h-3" />
                      <span>{r.downloadFilename}</span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-[#e5e5e5] flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleOpenEdit(r)}
                    className="px-3 py-1.5 rounded-xl border border-[#e5e5e5] bg-white text-xs font-semibold text-[#0a0a0a] hover:bg-[#fffaf0] transition-colors flex items-center gap-1.5"
                  >
                    <Edit2 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(r.id, r.title)}
                    className="px-3 py-1.5 rounded-xl border border-[#ef4444]/30 bg-white text-xs font-semibold text-[#ef4444] hover:bg-[#ef4444]/10 transition-colors flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
