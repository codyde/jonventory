'use client'

import { Button } from "@/components/ui/button"
import {createClientComponentClient, type Session } from "@supabase/auth-helpers-nextjs"
import { Chrome, GithubIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const AuthButtonsClient = ({ session }: {session: Session|null}) => {
    const supabase = createClientComponentClient();
    const router = useRouter()

    async function signIn() {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: "github",
            options: { redirectTo: `${location.origin}/auth/callback` },
        });
      }

      async function signInWithGoogle() {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: { redirectTo: `${location.origin}/auth/callback` },
        });
    }
    
      async function signOut() {
        console.log("signout")
        const { error } = await supabase.auth.signOut();
        window.location.reload()
      }
    
    return session ? (
        <Button className="text-2xl py-6" variant={"outline"} onClick={signOut}>Logout</Button>
    ) : (
      <div className="grid items-center space-y-4">
        <Button className="py-8 text-xl gap-x-2" variant={"outline"} onClick={signIn}>Login with GitHub<GithubIcon size={36} /></Button>
        <Button className="py-8 text-xl gap-x-2" variant={"outline"} onClick={signInWithGoogle}>Login with Google<Chrome size={36} /></Button>
      </div>
    )
}
