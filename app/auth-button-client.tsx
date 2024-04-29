"use client";

import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

type ButtonProps = {
  session: Session | null;
};

export default function AuthButtonClient({ session }: ButtonProps) {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };
  return session ? (
    <button className="text-sm text-gray-400" onClick={handleSignOut}>
      Logout
    </button>
  ) : (
    <button className="text-sm text-gray-400" onClick={handleSignIn}>
      Login
    </button>
  );
}
