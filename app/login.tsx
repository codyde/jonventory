"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  createClientComponentClient,
  Session,
} from "@supabase/auth-helpers-nextjs";
import { GithubIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Login() {
  const supabase = createClientComponentClient();
  const [session, setSession] = useState<Session | null>(null);

  async function signout() {
    const { error } = await supabase.auth.signOut();
    if (error) console.log("Error logging out:", error.message);
    else window.location.reload();
  }

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) console.error("Error getting session:", error.message);
      else setSession(data.session);
    })();
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className="">
      {session && (
        <Button variant={"outline"} className="text-xl" onClick={signout}>
          Sign out
        </Button>
      )}
    </div>
  );
}
