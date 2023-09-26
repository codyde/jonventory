import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import AuthButtonServer from "./auth-buttons-server";

export function LoginUI() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-xl" variant="outline">Log In</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div className="grid gap-4 py-4">
          <AuthButtonServer />
        </div>
       
      </DialogContent>
    </Dialog>
  );
}
