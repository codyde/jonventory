"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UploadDropzone } from "@uploadthing/react";
import { OurFileRouter } from "../app/api/uploadthing/core";
import { Plus } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useState } from "react";

type InventoryItem = {
    id: number;
    name: string;
    brand: string;
    imageurl: string;
    user_id: string;
  };

export const AddItem = ({ session, inventory, setInventory}: {session: any, inventory: InventoryItem[], setInventory: React.Dispatch<React.SetStateAction<InventoryItem[]>>}) => {
  const [uploadURL, setUploadURL] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { name, brand } = e.currentTarget.elements as any;
    const response = await fetch("/api", {
      method: "POST",
      body: JSON.stringify({
        name: name.value,
        brand: brand.value,
        imageUrl: uploadURL,
        uid: session.user.id,
      }),
    });
    const data = await response.json();
    console.log(data[0]);
    await setInventory([...inventory, data[0]]);
    setOpen(false);    
  }

  async function settheurl(res: any) {
    await setUploadURL(res[0].url);
    await setUploaded(true);
    console.log(uploadURL);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="">
          <Plus className="hover:text-green-500 hover:scale-125" size={48} />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-4xl">Lets add a thing!</DialogTitle>
          <DialogDescription>
            A thing can be many things, or a thing thats a that. You know? Make
            about as much sense as Jon does.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={(e) => handleSubmit(e)}>
        <div className="grid items-center">
            {!uploaded ? (
              <UploadDropzone<OurFileRouter>
                endpoint="imageUploader"
                className="hover:border-2 hover:border-white mb-4"
                onClientUploadComplete={(res) => {
                  settheurl(res);
                }}
                onUploadError={(error: Error) => {
                  alert(`ERROR! ${error.message}`);
                }}
              />
            ) : (
              <div><img src={uploadURL} className="max-w-xs max-h-64 lg:max-w-md pb-4 mx-auto"/></div>
            )}
          </div>
          <div className="flex items-center justify-between pb-4">
            <Label className="pr-2">Name</Label>
            <Input placeholder="Name" id="name" />
          </div>
          <div className="flex items-center pb-4">
            <Label className="pr-2">Brand</Label>
            <Input placeholder="Brand" id="brand" />
          </div>
          <Button variant={"outline"} type="submit" className="flex mx-auto">
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
