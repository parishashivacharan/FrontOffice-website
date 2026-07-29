import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { PageHeader } from "@/components/AppShell";
import {
  getAnnouncementsStore,
  addAnnouncementStore,
  deleteAnnouncementStore,
  updateAnnouncementStore,
  type Announcement,
} from "@/lib/mock-data";
import { getCurrentUser } from "@/lib/mock-auth";
import { Megaphone, CheckCircle2, Trash2, Edit2, Send } from "lucide-react";

export const Route = createFileRoute("/teacher/announcements/new")({
  component: NewAnnouncementPage,
});

function NewAnnouncementPage() {
  const teacherUser = getCurrentUser();

  const [scope, setScope] = useState("Institute-wide");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editingAnnId, setEditingAnnId] = useState<string | null>(null);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [announcementList, setAnnouncementList] = useState<Announcement[]>([]);

  const refreshAnnouncements = () => {
    const allAnn = getAnnouncementsStore();
    setAnnouncementList(allAnn);
  };

  useEffect(() => {
    refreshAnnouncements();
  }, []);

  const handlePublishAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !body) return;

    if (editingAnnId) {
      updateAnnouncementStore(editingAnnId, {
        title,
        body,
        scope,
      });
      setSuccessMessage(`Announcement "${title}" updated`);
      setEditingAnnId(null);
    } else {
      addAnnouncementStore({
        title,
        body,
        author: teacherUser?.name || "Teacher",
        scope,
      });
      setSuccessMessage(`Announcement "${title}" posted to students`);
    }

    setTitle("");
    setBody("");
    refreshAnnouncements();

    setTimeout(() => setSuccessMessage(null), 4000);
  };

  const handleDelete = (id: string, annTitle: string) => {
    if (confirm(`Delete announcement "${annTitle}"?`)) {
      deleteAnnouncementStore(id);
      setSuccessMessage(`Announcement "${annTitle}" removed`);
      refreshAnnouncements();
      setTimeout(() => setSuccessMessage(null), 4000);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Post Course Announcement"
        subtitle="Broadcast course updates, exam review schedules, or assignment notices for enrolled students."
      />

      {/* Success Alert Banner */}
      {successMessage && (
        <div className="p-4 rounded-2xl bg-[#22c55e]/15 border border-[#22c55e]/30 text-[#0a0a0a] text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#22c55e]" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Creation & Edit Form */}
      <form
        onSubmit={handlePublishAnnouncement}
        className="bg-white border border-[#e5e5e5] rounded-3xl p-6 shadow-xs space-y-4"
      >
        <div className="font-medium text-sm text-[#0a0a0a] border-b border-[#e5e5e5] pb-3">
          {editingAnnId ? "Edit Announcement" : "Post New Notice"}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-[#3a3a3a] mb-1">
            Target Audience / Scope
          </label>
          <input
            type="text"
            value={scope}
            onChange={(e) => setScope(e.target.value)}
            placeholder="e.g. Institute-wide, Room Division, Semester 3 Students"
            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#e5e5e5] bg-white focus:outline-none focus:border-[#0a0a0a] font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-[#3a3a3a] mb-1">
            Announcement Title
          </label>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Schedule update for upcoming mid-term revision session"
            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#e5e5e5] bg-white focus:outline-none focus:border-[#0a0a0a] font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-[#3a3a3a] mb-1">
            Message Body
          </label>
          <textarea
            rows={4}
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Type your complete announcement message here..."
            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#e5e5e5] bg-white focus:outline-none focus:border-[#0a0a0a]"
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#0a0a0a] text-white text-xs font-semibold hover:bg-[#1a1a1a] transition-colors flex items-center gap-2"
          >
            <Send className="w-3.5 h-3.5" />
            {editingAnnId ? "Update Announcement" : "Post Announcement"}
          </button>
        </div>
      </form>

      {/* Published Announcements List with Edit & Delete */}
      <div className="bg-white border border-[#e5e5e5] rounded-3xl p-6 shadow-xs space-y-4">
        <h3 className="font-medium text-sm text-[#0a0a0a]">All Published Announcements ({announcementList.length})</h3>
        <div className="space-y-3">
          {announcementList.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#6a6a6a]">
              No announcements posted yet. Use the form above to post your first notice.
            </div>
          ) : (
            announcementList.map((a) => (
              <div key={a.id} className="p-4 rounded-2xl border border-[#e5e5e5] bg-[#fffaf0]/40 flex items-start justify-between gap-3">
                <div>
                  <div className="font-semibold text-sm text-[#0a0a0a]">{a.title}</div>
                  <p className="text-xs text-[#3a3a3a] mt-1 line-clamp-2">{a.body}</p>
                  <div className="text-[10px] text-[#6a6a6a] mt-1 font-mono">{a.author} · {a.date}</div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      setEditingAnnId(a.id);
                      setScope(a.scope);
                      setTitle(a.title);
                      setBody(a.body);
                    }}
                    className="p-1.5 rounded-lg border border-[#e5e5e5] bg-white text-[#0a0a0a] hover:bg-[#faf5e8]"
                    title="Edit Announcement"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(a.id, a.title)}
                    className="p-1.5 rounded-lg border border-[#e5e5e5] bg-white text-[#ef4444] hover:bg-[#ef4444]/10"
                    title="Delete Announcement"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
