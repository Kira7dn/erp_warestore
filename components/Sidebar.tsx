"use client";

import Link from "next/link";
import Image from "next/image";
import { mainLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="sidebar">
      <Link href="/" className="flex gap-2 items-center">
        <div>
          <Image
            src="/assets/logo.svg"
            alt="logo"
            width={50}
            height={50}
            className="hidden h-auto lg:block"
          />
          <Image
            src="/assets/icons/logo-dark.svg"
            alt="logo"
            width={52}
            height={52}
            className="lg:hidden"
          />
        </div>
        <p
          className={cn("text-4xl font-bold text-gray-500")}
        >
          Warestore
        </p>
      </Link>

      <nav className="sidebar-nav">
        <ul className="flex flex-1 flex-col gap-2">
          {mainLinks.map(({ route, label, component }) => {
            const Component = component;

            return (
              <Link
                key={label}
                href={route}
                className="lg:w-full"
              >
                <li
                  className={cn(
                    "sidebar-nav-item",
                    (pathname === route ||
                      pathname.includes(route + "/")) &&
                      "shad-active"
                  )}
                >
                  <Component
                    className={cn(
                      "nav-icon",
                      (pathname === route ||
                        pathname.includes(route + "/")) &&
                        "nav-icon-active"
                    )}
                  />
                  <p className="hidden lg:block">{label}</p>
                </li>
              </Link>
            );
          })}
        </ul>
      </nav>

      <Image
        src="/assets/images/warehouse.png"
        alt="logo"
        width={200}
        height={200}
        className="w-full"
      />
    </aside>
  );
};
export default Sidebar;
