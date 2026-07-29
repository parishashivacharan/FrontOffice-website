import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/teacher")({
  component: () => (
    <AppShell role="teacher">
      <Outlet />
    </AppShell>
  ),
});
