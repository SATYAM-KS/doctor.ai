"use client"
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import {
  Drawer as DrawerComponent,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { IoMenuSharp } from "react-icons/io5";
import { useUser } from "@clerk/nextjs";

export default function Drawer() {
  const { user } = useUser();
  return (
    <DrawerComponent>
      <DrawerTrigger>
        <IoMenuSharp className="text-2xl" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="px-6">
          <Link
            href={user ? "/dashboard" : "/signin"}
            className={buttonVariants({ variant: "outline" })}
          >
            {user ? "Dashboard" : "Login"}
          </Link>
          <Link
            href="/signup"
            className={cn(
              buttonVariants({ variant: "default" }),
              "w-full sm:w-auto text-background flex gap-2"
            )}
          >
            <Icons.logo className="h-6 w-6" />
            {user ? "Dashboard" : "Get Started for Free"}
          </Link>
        </DrawerHeader>
      </DrawerContent>
    </DrawerComponent>
  );
}
