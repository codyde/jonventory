"use client";
import { Edit, Home, Plus } from "lucide-react";

import { AddItem } from "./additem";

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
    session: any
  };
  
  export const Sidebar: React.FC<SidebarProps> = ({ session, inventory, setInventory, editState, setEditState }) => {
  
  function toggleEditState() {
    setEditState(!editState);
  }
  return (
    <div className="space-y-4 flex flex-col h-full text-primary bg-gray-900">
      <div className="p-3 flex-1 justify-center">
      {session && (
        <div className="grid space-y-8 place-content-center mt-16">
          {/* <Home size={48} /> */}
          {/* <Plus className="hover:text-green-500 hover:scale-125" size={48} /> */}
          
          <AddItem session={session} inventory={inventory} setInventory={setInventory} />
          <Edit
            className={
              editState ? "text-red-500" : "hover:scale-125 hover:text-red-500"
            }
            onClick={toggleEditState}
            size={48}
          />
        </div>)}
      </div>
    </div>
  );
};
