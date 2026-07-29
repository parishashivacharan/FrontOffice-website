import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/AppShell";
import { RoleAwareShell } from "@/components/RoleAwareShell";
import { notifications } from "@/lib/mock-data";
import { Bell } from "lucide-react";

export const Route = createFileRoute("/notifications")({
  component: () => (
    <RoleAwareShell>
      <PageHeader title="Notifications" subtitle="Everything you might have missed." />
      <div className="bg-card border border-border rounded-lg divide-y divide-border">
        {notifications.map((n) => (
          <div key={n.id} className="flex items-start gap-4 p-5">
            <div
              className={`h-9 w-9 rounded-full flex items-center justify-center ${n.read ? "bg-muted" : "bg-primary/10"}`}
            >
              <Bell className={`h-4 w-4 ${n.read ? "text-muted-foreground" : "text-primary"}`} />
            </div>
            <div className="flex-1">
              <div className={`font-medium ${n.read ? "text-muted-foreground" : ""}`}>
                {n.title}
              </div>
              <div className="text-sm text-muted-foreground">{n.body}</div>
            </div>
            <div className="text-xs text-muted-foreground whitespace-nowrap">{n.time}</div>
          </div>
        ))}
      </div>
    </RoleAwareShell>
  ),
});
