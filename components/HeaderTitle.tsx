"use client";
import { LinkType, mainLinks } from "@/constants";
import { usePathname } from "next/navigation";
import React from "react";

function HeaderTitle() {
  const pathname = usePathname();
  const matchedLink = findLinkByType(mainLinks, pathname);
  return (
    <div>
      {matchedLink && (
        <div className="hidden md:flex gap-4 items-center">
          <matchedLink.component className="w-8 h-8 text-brand" />
          <h1 className="text-2xl font-bold uppercase">
            {matchedLink.label}
          </h1>
        </div>
      )}
    </div>
  );
}

export default HeaderTitle;

const findLinkByType = (
  links: LinkType[],
  type: string
): LinkType | undefined => {
  for (const link of links) {
    if (link.route === type) {
      return link;
    }
    if (link.children) {
      const found: LinkType | undefined = findLinkByType(
        link.children,
        type
      );
      if (found) {
        return found;
      }
    }
  }
};
