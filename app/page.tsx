"use client";
import { Header } from "@/components/header";
import { InventoryCard } from "@/components/inventorycard";
import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { MobileSidebar } from "@/components/mobilesidebar";
import { useEffect, useState } from "react";
import {
  createClientComponentClient,
  Session,
  User,
} from "@supabase/auth-helpers-nextjs";
import { Butcherman } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Github, GithubIcon } from "lucide-react";
import { useRouter } from "next/navigation";

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

  const router = useRouter();
  const supabase = createClientComponentClient();
  const [session, setSession] = useState<Session | null>(null);

  async function signInWithGitHub() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      //   options: { redirectTo: `${location.origin}/auth/callback` },
    });
    console.log(data);
  }

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
    <div className="relative flex items-center justify-center">
      <div className="absolute top-0 right-0">
      </div>
      <div className="flex flex-col items-center z-10 ">
        {/* <Header inventory={inventory} setInventory={setInventory} /> */}
        <div>
          {session ? (
            <div>
            <InventoryCard
              editState={editState}
              inventory={inventory}
              setInventory={setInventory}
            />
              <Sidebar
                editState={editState}
                setEditState={setEditState}
                inventory={inventory}
                setInventory={setInventory}
                session={session}
              />
            </div>
          ) : (
            <div className="grid place-items-center gap-y-4 mx-12">
              <p className="text-8xl md:text-2xl font-bold">
                Welcome to Jonventory
              </p>
              <p className="text-2xl text-muted-foreground">
                To get started, sign in with your GitHub login below.
              </p>
              <Button
                variant={"outline"}
                onClick={signInWithGitHub}
                className="h-24 w-24"
              >
                <GithubIcon size={48} className="" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
function useSessionContext(): { isLoading: any; session: any; error: any } {
  throw new Error("Function not implemented.");
}
