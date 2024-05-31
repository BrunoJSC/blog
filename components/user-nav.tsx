import {
  getKindeServerSession,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import Image from "next/image";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export async function UserNav() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <header className="w-full flex items-center justify-between p-4 border-b max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold">Kinde Next.js Example</h1>

      <nav className="flex items-center gap-4">
        <Link href="/">Home</Link>
        <Link href="/dashboard">Dashboard</Link>
      </nav>

      <DropdownMenu>
        <DropdownMenuTrigger className="h-8 w-8 rounded-full" asChild>
          <Button className="h-8 w-8" variant="ghost">
            <Avatar>
              <AvatarImage src={user?.picture ?? ""} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <LogoutLink>Sign out</LogoutLink>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
