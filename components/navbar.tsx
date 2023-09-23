import Link from "next/link";
import AuthButtonServer from "@/components/auth-buttons-server";
import { Sidebar } from "./sidebar";


export const Navbar = () => {
  return (
    <div>
      
    <div className="fixed w-full z-0 md:z-20 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-gray-900">
      <div className="md:visible flex invisible items-center">
        <Link className="text-4xl font-bold pl-3" href="/">ThingStore</Link>
      </div>
      <div className="flex items-center">
        <AuthButtonServer />
      </div>
    </div>
    </div>
  );
};
