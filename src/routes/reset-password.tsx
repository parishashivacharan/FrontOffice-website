import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { KeyRound } from "lucide-react";

export const Route = createFileRoute("/reset-password")({
  component: ResetPage,
});

function ResetPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
        className="max-w-md w-full bg-card border border-border rounded-lg p-10"
      >
        <div className="mx-auto h-14 w-14 rounded-full bg-accent flex items-center justify-center">
          <KeyRound className="h-6 w-6 text-primary" />
        </div>
        <h1 className="font-display text-2xl text-center mt-6">Reset your password</h1>
        <div className="gold-divider w-16 mx-auto my-4" />
        {sent ? (
          <p className="text-sm text-center text-muted-foreground">
            If that email exists, we've sent reset instructions.
          </p>
        ) : (
          <>
            <label className="block text-sm font-medium mb-1 mt-4">Email</label>
            <input
              type="email"
              required
              className="w-full px-3 py-2 rounded-md border border-input bg-background"
            />
            <button className="mt-6 w-full py-2.5 rounded-md bg-primary text-primary-foreground hover:bg-primary-hover">
              Send reset link
            </button>
          </>
        )}
        <Link
          to="/login"
          className="block mt-4 text-sm text-center text-muted-foreground hover:text-primary"
        >
          Back to sign in
        </Link>
      </form>
    </div>
  );
}
