"use client";

import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "./ui/button";
import Link from "next/link";

export function Header() {
  return (
    <header className="w-full p-4 flex items-center justify-between border-b md:max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold">
        <Link href="/">Blog - Tech</Link>
      </h1>

      <div className="flex gap-4">
        <Button asChild>
          <LoginLink>Sign in</LoginLink>
        </Button>

        <Button variant="outline" asChild>
          <RegisterLink>Sign up</RegisterLink>
        </Button>
      </div>
    </header>
  );
}
