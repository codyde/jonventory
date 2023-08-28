"use client"
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { UploadButton } from "@/utils/uploadthing";
import Login from "@/app/login";
import { MobileSidebar } from "./mobilesidebar";
import { SetStateAction } from "react";


export const Navbar = ({session}: any) => {
  return (
    <div className="fixed w-full z-50 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-gray-900">
      <div className="md:visible flex invisible items-center">
        <Link className="text-xl font-bold pl-3" href="/">Jonventory</Link>
      </div>
      <div className="md:invisible flex visible">
      <MobileSidebar editState={false} setEditState={function (value: SetStateAction<boolean>): void {
                  throw new Error("Function not implemented.");
              } } inventory={[]} setInventory={function (value: SetStateAction<{ id: number; name: string; brand: string; imageurl: string; user_id: string; }[]>): void {
                  throw new Error("Function not implemented.");
              } } session={undefined} />
      
      </div>
      <div className="flex items-center">
        <Login />
      </div>
    </div>
  );
};
