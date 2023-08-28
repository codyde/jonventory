"use client";
import { Header } from "@/components/header";
import { InventoryCard } from "@/components/inventorycard";
import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { useEffect, useState } from "react";
import Login from "./login";
import {
  createClientComponentClient,
  Session,
} from "@supabase/auth-helpers-nextjs";

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
  const [session, setSession] = useState<Session | null>(null);

  const supabase = createClientComponentClient();

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
      {/* <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-green-500  to-blue-800  rounded-md filter blur-3xl opacity-30 z-[-1]"></div> */}
      <div className="invisible md:visible md:flex w-20 flex-col fixed inset-y-0 left-0 z-10">
        <Navbar />
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
            <p className="text-8xl font-bold items-center">
              Sign-in to Get Started
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
