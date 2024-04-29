"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";

export default function GitHubButton() {
  const supabase = createClientComponentClient<Database>();

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <button
      onClick={handleSignIn}
      className="flex items-center gap-4 bg-gray-800 hover:bg-gray-700 p-4 rounded-md"
    >
      <Image
        src="/github-mark-white.png"
        alt="GitHub logo"
        width={40}
        height={40}
      />
      <p className="text-lg text-white">Continue with Github</p>
    </button>
  );
}
