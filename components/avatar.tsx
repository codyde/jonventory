"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {createClientComponentClient, type Session } from "@supabase/auth-helpers-nextjs"


export default function AvatarLogout() {
    const supabase = createClientComponentClient();

    async function signOut() {
        console.log("signout")
        const { error } = await supabase.auth.signOut();
        window.location.reload()
      }

    console.log(supabase.auth)

    return (
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>)
};