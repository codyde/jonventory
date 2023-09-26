"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {createClientComponentClient, type Session } from "@supabase/auth-helpers-nextjs"


export default async function AvatarLogout() {
    const supabase = createClientComponentClient();

    async function signOut() {
        console.log("signout")
        const { error } = await supabase.auth.signOut();
        window.location.reload()
      }
      const { data, error } = await supabase.auth.getSession()
      

      const url = data.session?.user.user_metadata.avatar_url

    return (
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Avatar>
        <AvatarImage  src={url} />
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>)
};