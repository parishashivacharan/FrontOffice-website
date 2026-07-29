import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/AppShell";

export const Route = createFileRoute("/admin/settings")({
  component: Settings,
});

function Settings() {
  const [saved, setSaved] = useState(false);
  return (
    <div>
      <PageHeader
        title="Institute settings"
        subtitle="Configure your academic year, grading rules and notifications."
      />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSaved(true);
          setTimeout(() => setSaved(false), 2000);
        }}
        className="bg-card border border-border rounded-lg p-6 max-w-2xl space-y-5"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Institute name</label>
          <input
            defaultValue="Scholaria Institute"
            className="w-full px-3 py-2 rounded-md border border-input bg-background"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Academic year</label>
            <input
              defaultValue="2026 - 2027"
              className="w-full px-3 py-2 rounded-md border border-input bg-background"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Grading scale</label>
            <select className="w-full px-3 py-2 rounded-md border border-input bg-background">
              <option>Percentage (0-100)</option>
              <option>GPA (0-4)</option>
              <option>Letter grades (A-F)</option>
            </select>
          </div>
        </div>
        <div className="space-y-3 pt-2">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" defaultChecked /> Send email notifications for new tasks
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" defaultChecked /> Send email notifications for graded submissions
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" /> Require two-factor authentication for admins
          </label>
        </div>
        <div className="flex items-center gap-3 pt-2">
          <button className="px-5 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary-hover text-sm">
            Save settings
          </button>
          {saved && <span className="text-sm text-success">Saved ✓</span>}
        </div>
      </form>
    </div>
  );
}
