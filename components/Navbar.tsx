import Link from "next/link";
import { auth, signOut, signIn } from "@/auth";
import { Bell, LogOut } from "lucide-react";
import Search from "@/components/Search";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Button } from "./ui/button";

const Navbar = async () => {
  const session = await auth();

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="items-center justify-between gap-5 px-10 sm:flex lg:py-4 xl:gap-10">
      <div className="flex gap-10 items-center w-full">
        <div className="hidden text-xl font-semibold text-gray-600 md:block">
          {formattedDate}
        </div>
        <Search />
      </div>
      <div className="flex items-center text-black flex-center min-w-fit gap-4">
        {session && session?.user ? (
          <div className="flex gap-2 items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="header-user-info">
                  <Image
                    src={
                      session.user?.image ||
                      "/default-avatar.png"
                    }
                    alt="Avatar"
                    width={44}
                    height={44}
                    className="header-user-avatar"
                  />
                  <div className="hidden lg:block">
                    <p className="subtitle-2 capitalize">
                      {session.user?.name}
                    </p>
                    <p className="caption">
                      {session.user?.email}
                    </p>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  asChild
                  className="cursor-pointer"
                >
                  <Link
                    href={`/user/${session?.user.name}`}
                    className="flex gap-2 items-center"
                  >
                    My Account
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                  asChild
                  className="cursor-pointer"
                >
                  <form
                    action={async () => {
                      "use server";
                      await signOut({ redirectTo: "/" });
                    }}
                  >
                    <button type="submit">
                      <span className="max-sm:hidden">
                        Logout
                      </span>
                      <LogOut className="size-6 sm:hidden text-red-500" />
                    </button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="relative">
              <button className="relative">
                <Bell className="size-6 text-gray-500" />
                <span className="absolute -top-[2px] -right-[2px] w-3 h-3 bg-red text-[8px] text-white flex items-center justify-center rounded-full">
                  2
                </span>
              </button>
            </div>
          </div>
        ) : (
          <form
            action={async () => {
              "use server";
              await signIn("github");
            }}
          >
            <Button variant="outline" type="submit">
              Login
            </Button>
          </form>
        )}
      </div>
    </header>
  );
};

export default Navbar;
