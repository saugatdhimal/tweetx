import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import GitHubButton from "./github-button";

export const dynamic = "force-dynamic";

export default async function Login() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex-1 flex flex-col gap-8 justify-center items-center">
      <h1 className="text-3xl text-white font-semibold">Welcome to TweetX</h1>
      <GitHubButton />
    </div>
  );
}
