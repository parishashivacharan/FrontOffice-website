import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { getCurrentUser, type Role } from "@/lib/mock-auth";

export function RoleAwareShell({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role | null>(null);
  const router = useRouter();
  useEffect(() => {
    const u = getCurrentUser();
    if (!u) {
      router.navigate({ to: "/login" });
      return;
    }
    setRole(u.role);
  }, [router]);
  if (!role) return null;
  return <AppShell role={role}>{children}</AppShell>;
}
