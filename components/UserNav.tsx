"use client";

import { useRouter } from "next/navigation";
import { signOut } from "@/lib/actions/auth-actions";
import { Button } from "@/components/ui/button";

export default function UserNav({ user }: { user: any }) {
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    router.push("/sign-in");
  }

  if (!user) {
    return (
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => router.push("/sign-in")}>
          Sign In
        </Button>
        <Button onClick={() => router.push("/sign-up")}>
          Sign Up
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-600">
        Welcome, <span className="font-semibold">{user.name}</span>
      </span>
      <Button variant="ghost" onClick={handleSignOut}>
        Sign Out
      </Button>
    </div>
  );
}
