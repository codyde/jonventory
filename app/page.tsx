"use client";
import { InventoryCard } from "@/components/inventorycard";
import { Sidebar } from "@/components/sidebar";
import { useEffect, useState } from "react";
import {
  createClientComponentClient,
  Session,
  User,
} from "@supabase/auth-helpers-nextjs";
import { MobileSidebar } from "@/components/mobilesidebar";

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

  const supabase = createClientComponentClient();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) console.error("Error getting session:", error.message);
      else setSession(data.session);
      console.log(session);
    };
    getSession();
  }, []);

  return (
    <div className="relative flex items-center justify-center">
      
      <div className="flex flex-col items-center z-10 ">
        {/* <Header inventory={inventory} setInventory={setInventory} /> */}
        <div>
          {session ? (
            <div className="mt-16 lg:mt-14">
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
            <div className="grid place-items-center gap-y-4 mx-12 mt-4 lg:mt-14 z-10">
              <p className="text-2xl xl:text-8xl font-bold">
                Welcome to ThingStore
              </p>
              <p className="text-2xl text-muted-foreground">
                Store anything. Grab a picture, throw in some text, and save it for later.
              </p>
              <p className="text-2xl text-muted-foreground">
              Does it really need to be much more complicated?
              </p>
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
