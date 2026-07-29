import { createFileRoute } from "@tanstack/react-router";
import AuthSectionOne from "@/components/ui/auth-section-1";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
});

function RegisterPage() {
  return <AuthSectionOne mode="signup" />;
}
