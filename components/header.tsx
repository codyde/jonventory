import { UploadButton } from "@/utils/uploadthing";
import { UploadDropzone } from "@uploadthing/react";
import { OurFileRouter } from "../app/api/uploadthing/core";

import { Card, CardTitle } from "./ui/card";
import { AddItem } from "./additem";

type InventoryItem = {
    id: number;
    name: string;
    brand: string;
    imageurl: string;
    user_id: string;
  };

export const Header = ({inventory, setInventory}: {inventory: InventoryItem[], setInventory: React.Dispatch<React.SetStateAction<InventoryItem[]>>}) => {
  return (
    <div className="flex w-full grid-cols-2 relative">
        
      <div className="grid col-start-1">
        <div>
          {/* <p className="text-6xl pb-2 font-bold">Welcome to Jonventory</p>
          <p className="text-4xl">A place to keep Jon's shit</p> */}
          <div className="">
            {/* <AddItem inventory={inventory} setInventory={setInventory} /> */}
          </div>
        </div>
      </div>
      <div className="col-start-2">
        {/* <img src="./jonventory.jpg" className="w-[300px] rounded-full" /> */}
      </div>
    </div>
  );
};
