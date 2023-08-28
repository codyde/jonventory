import { Edit, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
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

export const MobileSidebar : React.FC<SidebarProps> = ({ session, inventory, setInventory, editState, setEditState }) => {
  
    function toggleEditState() {
      setEditState(!editState);
    }
    
  return (
    <Sheet>
      <SheetTrigger className="">
        <Menu size={48} className=" hover:scale-125" />
      </SheetTrigger>
      <SheetContent side={"left"} className="w-[200px] sm:w-[540px]">
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
        </div>
      </SheetContent>
    </Sheet>
  );
};
