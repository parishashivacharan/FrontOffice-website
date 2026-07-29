import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { getAnnouncementsStore, addAnnouncementStore, type Announcement } from "@/lib/mock-data";
import { Megaphone, Plus, Send } from "lucide-react";

export const Route = createFileRoute("/admin/announcements")({
  component: AdminAnnouncementsPage,
});

function AdminAnnouncementsPage() {
  const [list, setList] = useState<Announcement[]>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    setList(getAnnouncementsStore());
  }, []);

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    const newAnn = addAnnouncementStore({
      title,
      body,
      author: "Institute Admin",
      scope: "Institute-wide",
    });
    setList([newAnn, ...list]);
    setTitle("");
    setBody("");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Institute Announcements & Broadcasts"
        subtitle="Broadcast campus updates, exam dates, and official notices across all students and staff."
      />

      <div className="space-y-6">
        <form onSubmit={handlePost} className="bg-white rounded-3xl border border-[#e5e5e5] p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 font-medium text-sm text-[#0a0a0a]">
            <Megaphone className="w-4 h-4" />
            <span>Post Official Announcement</span>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-[#3a3a3a] mb-1">Notice Title</label>
            <input
              type="text"
              placeholder="e.g. Mid-term Examination Schedule Published"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#e5e5e5] focus:outline-none focus:border-[#0a0a0a]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-[#3a3a3a] mb-1">Details & Instructions</label>
            <textarea
              rows={3}
              placeholder="Write full announcement details here..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#e5e5e5] focus:outline-none focus:border-[#0a0a0a]"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-[#0a0a0a] text-white text-xs font-medium hover:bg-[#1a1a1a] transition-colors flex items-center gap-2"
          >
            <Send className="w-3.5 h-3.5" /> Broadcast Announcement
          </button>
        </form>

        <div className="bg-white rounded-3xl border border-[#e5e5e5] p-6 shadow-xs space-y-4">
          <h2 className="font-medium text-sm text-[#0a0a0a]">All Published Announcements ({list.length})</h2>
          <div className="space-y-3">
            {list.map((ann) => (
              <div key={ann.id} className="p-4 rounded-2xl border border-[#e5e5e5] bg-[#fffaf0]/40 space-y-1">
                <div className="flex justify-between items-start">
                  <div className="font-semibold text-sm text-[#0a0a0a]">{ann.title}</div>
                  <span className="text-[10px] text-[#6a6a6a] bg-white px-2 py-0.5 rounded-full border border-[#e5e5e5]">
                    {ann.date}
                  </span>
                </div>
                <p className="text-xs text-[#3a3a3a] leading-relaxed">{ann.body}</p>
                <div className="text-[11px] text-[#6a6a6a] pt-1">
                  Author: <span className="font-medium text-[#0a0a0a]">{ann.author}</span> · Scope: {ann.scope}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
