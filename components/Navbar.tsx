import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";
import { auth, signOut, signIn } from "@/auth";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { LogOut } from "lucide-react";

const Navbar = async () => {
  const session = await auth();
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link
          className={clsx(
            "flex items-center justify-start gap-x-4"
          )}
          href="/"
        >
          <Image
            src="/assets/logo.svg"
            height={40}
            width={40}
            alt="Logo"
          />
          <p
            className={clsx(
              "text-2xl font-bold text-secondary"
            )}
          >
            HR Management
          </p>
        </Link>
        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
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

              <Link href={`/user/${session?.id}`}>
                <Avatar className="size-10">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || ""}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";

                await signIn("github");
              }}
            >
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
