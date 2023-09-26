import Link from "next/link";
import { LoginUI } from "./loginui";
import AvatarLogout from "./avatar";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const Navbar = async () => {
  const supabase = createServerComponentClient({ cookies });
  const {data: {session}} = await supabase.auth.getSession()
  
  return (
    <div>
      
    <div className="fixed w-full z-0 md:z-20 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-gray-900">
      <div className="md:visible flex invisible items-center">
        <Link className="text-4xl font-bold pl-3" href="/">ThingStore</Link>
      </div>
      <div className="flex items-center gap-x-2">
       {session ? (
        <AvatarLogout session={session} />
       ) :(
        <LoginUI />
       )}
      </div>
    </div>
    </div>
  );
};
