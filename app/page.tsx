"use client";
import { Header } from "@/components/header";
import { InventoryCard } from "@/components/inventorycard";
import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { useEffect, useState } from "react";
import {
  createClientComponentClient,
  Session, User
} from "@supabase/auth-helpers-nextjs";
import { Butcherman } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Github, GithubIcon } from "lucide-react";
import { useRouter } from 'next/navigation'

type InventoryItem = {
  id: number;
  name: string;
  brand: string;
  imageurl: string;
  user_id: string;
};

export default function Home() {
  const [editState, setEditState] = useState(false);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  const router = useRouter()
  const [session, setSession] = useState<User | null>(null);

  const supabase = createClientComponentClient();

  async function signInWithGitHub() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });
    router.refresh()
  }

  async function signout() {
    const { error } = await supabase.auth.signOut();
    router.refresh()
  }

  useEffect(() => {
    (async () => {
      const {   data: { user }, } = await supabase.auth.getUser()
      setSession(user);
      console.log(session)
    })();
    // supabase.auth.onAuthStateChange((_event, session) => {
    //   setSession(session);
    //   console.log(session)
    // });
  }, []);


  return (
    <div className="relative flex items-center justify-center">
      {/* <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-green-500  to-blue-800  rounded-md filter blur-3xl opacity-30 z-[-1]"></div> */}
      <div className="absolute top-5 right-5">
      <Button variant={"outline"} className="text-xl" onClick={signout}>
          Sign out
      </Button>
      </div>
      <div className="invisible md:visible md:flex w-20 flex-col fixed inset-y-0 left-0 z-10">
        {/* <Navbar /> */}
        <Sidebar
          session={session}
          inventory={inventory}
          setInventory={setInventory}
          editState={editState}
          setEditState={setEditState}
        />
      </div>
      <div className="flex flex-col items-center z-10 ">
        <Header inventory={inventory} setInventory={setInventory} />
        <div className="grid py-8"></div>
        <div>
          {session ? (
            <InventoryCard
              editState={editState}
              inventory={inventory}
              setInventory={setInventory}
            />
          ) : (
            <div className="grid place-items-center gap-y-4">
            {/* <p className="text-md xl:text-8xl font-bold items-center">
              Sign-in to Get Started
            </p> */}
            <Button
          variant={"outline"}
          onClick={signInWithGitHub}
          className="h-24 w-24"
        >
          <GithubIcon size={48} className="" />
          {/* <p className="text-2xl">Sign-In with GitHub</p>  */}
        </Button>
          <img src="./jonventory.jpg" className="w-[300px] rounded-2xl" ></img>
            </div>            
          )}
        </div>
      </div>
    </div>
  );
}
function useSessionContext(): { isLoading: any; session: any; error: any; } {
  throw new Error("Function not implemented.");
}

