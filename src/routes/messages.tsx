import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/AppShell";
import { RoleAwareShell } from "@/components/RoleAwareShell";
import { messages, courses } from "@/lib/mock-data";
import { Send } from "lucide-react";

export const Route = createFileRoute("/messages")({
  component: () => (
    <RoleAwareShell>
      <MessagesPage />
    </RoleAwareShell>
  ),
});

function MessagesPage() {
  const [active, setActive] = useState(courses[0].id);
  const [draft, setDraft] = useState("");
  const [thread, setThread] = useState(messages);

  return (
    <div>
      <PageHeader title="Messages" subtitle="Course discussion boards and direct messages." />
      <div className="grid lg:grid-cols-3 gap-6 h-[600px]">
        <div className="bg-card border border-border rounded-lg p-3 overflow-y-auto">
          <div className="text-xs uppercase tracking-wider text-muted-foreground px-3 py-2">
            Course channels
          </div>
          {courses.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`w-full text-left px-3 py-3 rounded-md ${active === c.id ? "bg-accent text-accent-foreground" : "hover:bg-muted"}`}
            >
              <div className="font-medium text-sm">{c.name}</div>
              <div className="text-xs text-muted-foreground truncate">{c.teacher}</div>
            </button>
          ))}
        </div>

        <div className="lg:col-span-2 bg-card border border-border rounded-lg flex flex-col">
          <div className="p-4 border-b border-border">
            <div className="font-display text-lg">{courses.find((c) => c.id === active)?.name}</div>
            <div className="text-xs text-muted-foreground">Course discussion board</div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {thread.map((m) => (
              <div key={m.id} className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">
                  {m.from[0]}
                </div>
                <div className="flex-1">
                  <div className="text-sm">
                    <span className="font-medium">{m.from}</span>{" "}
                    <span className="text-xs text-muted-foreground ml-2">{m.time}</span>
                  </div>
                  <div className="text-sm text-foreground mt-1">{m.body}</div>
                </div>
              </div>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!draft.trim()) return;
              setThread([
                ...thread,
                { id: crypto.randomUUID(), from: "You", course: "", body: draft, time: "Now" },
              ]);
              setDraft("");
            }}
            className="p-4 border-t border-border flex gap-2"
          >
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 rounded-md border border-input bg-background text-sm"
            />
            <button className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary-hover text-sm flex items-center gap-2">
              <Send className="h-4 w-4" /> Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
