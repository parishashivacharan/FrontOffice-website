import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/AppShell";
import { RoleAwareShell } from "@/components/RoleAwareShell";
import { calendarEvents } from "@/lib/mock-data";

export const Route = createFileRoute("/calendar")({
  component: () => (
    <RoleAwareShell>
      <CalendarPage />
    </RoleAwareShell>
  ),
});

function CalendarPage() {
  const days = Array.from({ length: 35 }, (_, i) => i - 2); // offset so calendar starts on a nice grid
  const monthStart = new Date(2026, 6, 1); // July 2026
  return (
    <div>
      <PageHeader title="Calendar" subtitle="Class timings, deadlines and institute events." />

      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 bg-card border border-border rounded-lg p-6">
          <div className="flex justify-between items-baseline mb-4">
            <h2 className="font-display text-lg">July 2026</h2>
            <div className="text-xs text-muted-foreground">Mon–Sun</div>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center text-xs text-muted-foreground mb-2">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {days.map((d) => {
              const day = d;
              const inMonth = day > 0 && day <= 31;
              const dateStr = inMonth ? `2026-07-${String(day).padStart(2, "0")}` : "";
              const events = calendarEvents.filter((e) => e.date === dateStr);
              return (
                <div
                  key={d}
                  className={`min-h-[80px] rounded-md border ${inMonth ? "border-border bg-background" : "border-transparent bg-muted/30"} p-2`}
                >
                  <div className={`text-xs ${inMonth ? "" : "text-muted-foreground"}`}>
                    {inMonth ? day : ""}
                  </div>
                  {events.map((e) => (
                    <div
                      key={e.title}
                      className={`mt-1 text-[10px] px-1.5 py-0.5 rounded ${e.type === "task" ? "bg-primary/10 text-primary" : "bg-gold/20 text-gold-foreground"}`}
                    >
                      {e.title}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            Base date: {monthStart.toDateString()}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 h-fit">
          <h2 className="font-display text-lg mb-4">Upcoming</h2>
          <div className="space-y-3">
            {calendarEvents.map((e) => (
              <div key={e.title} className="border-l-2 border-gold pl-3">
                <div className="font-medium text-sm">{e.title}</div>
                <div className="text-xs text-muted-foreground">{e.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
