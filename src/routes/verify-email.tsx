import { createFileRoute, Link, useRouter, useSearch } from "@tanstack/react-router";
import { Mail } from "lucide-react";

export const Route = createFileRoute("/verify-email")({
  validateSearch: (s: Record<string, unknown>) => ({ next: (s.next as string) ?? "/" }),
  component: VerifyPage,
});

function VerifyPage() {
  const router = useRouter();
  const { next } = useSearch({ from: "/verify-email" });
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="max-w-md w-full text-center bg-card border border-border rounded-lg p-10">
        <div className="mx-auto h-14 w-14 rounded-full bg-accent flex items-center justify-center">
          <Mail className="h-6 w-6 text-primary" />
        </div>
        <h1 className="font-display text-2xl mt-6">Check your inbox</h1>
        <div className="gold-divider w-16 mx-auto my-4" />
        <p className="text-sm text-muted-foreground">
          We've sent a verification link to your email. Click it to activate your account.
        </p>
        <button
          onClick={() => router.navigate({ to: next })}
          className="mt-6 w-full py-2.5 rounded-md bg-primary text-primary-foreground hover:bg-primary-hover"
        >
          I've verified — continue
        </button>
        <Link to="/login" className="block mt-4 text-sm text-muted-foreground hover:text-primary">
          Back to sign in
        </Link>
      </div>
    </div>
  );
}
