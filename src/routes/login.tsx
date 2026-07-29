import { createFileRoute } from "@tanstack/react-router";
import AuthSectionOne from "@/components/ui/auth-section-1";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  return <AuthSectionOne mode="signin" />;
}
