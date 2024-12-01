"use client";

import Link from "next/link";
import Image from "next/image";
import { LinkType, mainLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ChevronRight } from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();
  const [openLinks, setOpenLinks] = useState<{
    [key: string]: boolean;
  }>({ Dashboard: true });

  const toggleChildren = (label: string) => {
    setOpenLinks((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const renderLinks = (
    links: LinkType[],
    isChildren: boolean = false
  ) => {
    return links.map(
      ({
        route,
        label,
        component: Component,
        children,
      }) => {
        const isOpen = openLinks[label];
        const isActive =
          pathname === route ||
          pathname.includes(route + "/") ||
          (children &&
            children.some((child) =>
              pathname.includes(child.route)
            ));

        return (
          <div key={label}>
            <div className="flex items-center justify-between">
              <Link href={route} className="lg:w-full">
                <li
                  className={cn(
                    "sidebar-nav-item",
                    isActive &&
                      (isChildren
                        ? "shad-active opacity-50 py-2"
                        : "shad-active"),
                    isChildren && "text-sm py-2"
                  )}
                >
                  <div className="flex gap-2 items-center">
                    <Component
                      className={cn(
                        isChildren
                          ? "nav-icon w-4 h-4"
                          : "nav-icon w-6 h-6",
                        isActive && "nav-icon-active"
                      )}
                    />
                    <p
                      className={cn(
                        "hidden lg:block",
                        isChildren && "text-sm"
                      )}
                    >
                      {label}
                    </p>
                  </div>
                  {children && (
                    <button
                      onClick={() => toggleChildren(label)}
                      className="ml-2"
                    >
                      <ChevronRight
                        className={cn(
                          "w-4 h-4 transition-all ",
                          isOpen && "rotate-90"
                        )}
                      />
                    </button>
                  )}
                </li>
              </Link>
            </div>
            {children && isOpen && (
              <ul className="ml-4 mt-4">
                {renderLinks(children, true)}
              </ul>
            )}
          </div>
        );
      }
    );
  };

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
          {renderLinks(mainLinks)}
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
