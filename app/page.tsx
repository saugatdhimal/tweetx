import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AuthButton from "./auth-button-server";
import { redirect } from "next/navigation";
import NewTweet from "./new-tweet";
import Tweets from "./tweets";

export const dynamic = "force-dynamic";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }
  const { data } = await supabase
    .from("tweets")
    .select("*, author: profiles(*), likes(user_id)")
    .order("created_at", { ascending: false });

  const tweets =
    data?.map((tweet) => ({
      ...tweet,
      author: Array.isArray(tweet.author) ? tweet.author[0] : tweet.author,
      user_has_liked_tweet: !!tweet.likes.find(
        (like) => like.user_id === session.user.id
      ),
      likes: tweet.likes.length,
    })) ?? [];

  return (
    <main className="w-full max-w-xl mx-auto">
      <div className="flex justify-between px-4 py-6 border border-gray-800">
        <h1 className="text-xl text-white font-semibold">TweetX</h1>
        <AuthButton />
      </div>
      <NewTweet user={session.user} />
      <Tweets tweets={tweets} />
    </main>
  );
}
