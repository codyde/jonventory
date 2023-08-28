'use client'

import { Button } from "@/components/ui/button"
import {createClientComponentClient, type Session } from "@supabase/auth-helpers-nextjs"
import { GithubIcon } from "lucide-react";
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
    
      async function signOut() {
        console.log("signout")
        const { error } = await supabase.auth.signOut();
        window.location.reload()
      }
    
    return session ? (
        <Button className="text-2xl py-6" variant={"outline"} onClick={signOut}>Logout</Button>
    ) : (
        <Button className="py-6"  variant={"outline"} onClick={signIn}><p className="text-xl"><GithubIcon size={36} /></p></Button>
    )
}
