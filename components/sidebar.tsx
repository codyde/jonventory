"use client";
import { Edit, Home, Plus } from "lucide-react";

import { AddItem } from "./additem";
import { MobileSidebar } from "./mobilesidebar";
import { SetStateAction } from "react";

type InventoryItem = {
  id: number;
  name: string;
  brand: string;
  imageurl: string;
  user_id: string;
};

type SidebarProps = {
  editState: boolean;
  setEditState: React.Dispatch<React.SetStateAction<boolean>>;
  inventory: InventoryItem[];
  setInventory: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
  session: any;
};

export const Sidebar: React.FC<SidebarProps> = ({
  session,
  inventory,
  setInventory,
  editState,
  setEditState,
}) => {
  function toggleEditState() {
    setEditState(!editState);
  }
  return (
    <div className="">
      <div className="visible md:invisible block flex-col fixed inset-y-0 left-0 z-10 mt-2 ml-2">
        <MobileSidebar
          editState={editState}
          setEditState={setEditState}
          inventory={inventory}
          setInventory={setInventory}
          session={session}
        />
      </div>
      <div className="invisible md:visible md:flex w-20 flex-col fixed inset-y-0 left-0 z-10">
        <div className="space-y-4 flex flex-col h-full text-primary bg-gray-900">
          <div className="p-3 flex-1 justify-center">
            {session && (
              <div className="grid space-y-8 place-content-center mt-16">
                <AddItem
                  session={session}
                  inventory={inventory}
                  setInventory={setInventory}
                />
                <Edit
                  className={
                    editState
                      ? "text-red-500"
                      : "hover:scale-125 hover:text-red-500"
                  }
                  onClick={toggleEditState}
                  size={48}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
