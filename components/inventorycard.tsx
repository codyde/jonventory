"use client";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { useEffect } from "react";

type InventoryItem = {
  id: number;
  name: string;
  brand: string;
  imageurl: string;
  user_id: string;
};

export const InventoryCard = ({
    editState,
  inventory,
  setInventory,
}: {
    editState: boolean;
  inventory: InventoryItem[];
  setInventory: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
}) => {

  const fetchData = async () => {
    const response = await fetch("/api");
    const data = await response.json();
    console.log(data)
    setInventory(data);
  };

  useEffect(() => {
    fetchData();
    console.log(inventory);
  }, []);

  async function deleteItem(id: number) {
    const response = await fetch("/api", {
      method: "DELETE",
      body: JSON.stringify(id),
    });
    fetchData();
    console.log(response);
    console.log(inventory);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      {inventory.map((item) => (
        <Card key={item.id} className="h-[400px] w-[300px]">
          <CardHeader>
              <CardTitle className="">{item.name}</CardTitle>
            <CardDescription className="text-xl">
              <span className="font-bold">Brand: </span>
              {item.brand}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex  place-content-center">
            <img alt="stuff" src={item.imageurl} className="max-h-52" />
          </CardContent>
          <CardFooter>
            {editState && (
            <Button
              onClick={() => deleteItem(item.id)}
              variant={"destructive"}
              className="mx-auto w-1/2"
            >
              Delete
            </Button>)}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
