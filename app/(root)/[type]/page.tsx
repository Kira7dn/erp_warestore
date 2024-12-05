import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import {
  PlusCircle,
  Sparkles,
  Warehouse,
} from "lucide-react";
import { LinkType, mainLinks } from "@/constants";
import Search from "@/components/Search";

const findIconComponent = (
  links: LinkType[],
  type: string
): LinkType["component"] => {
  for (const link of links) {
    if (link.route === `/${type}`) {
      return link.component;
    }
    if (link.children) {
      const childComponent = findIconComponent(
        link.children,
        type
      );
      if (childComponent) {
        return childComponent;
      }
    }
  }
  return Sparkles;
};

const Page = async ({ params }: SearchParamProps) => {
  const type = ((await params)?.type as string) || "";
  const Icon = findIconComponent(mainLinks, type);
  return (
    <section className="w-full flex justify-between items-center">
      <div className="flex gap-2">
        <Link href={`/${type}/create`}>
          <Button
            variant="outline"
            className="capitalize text-red-600 border-red-600"
          >
            <PlusCircle
              className="me-1 -ms-2 opacity-60 text-red-600"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
            {type}
            <Icon
              className="-me-1 ms-2 opacity-60 w-4 h-4 stroke-1 text-red-600"
              aria-hidden="true"
            />
          </Button>
        </Link>
        <Link href={`/${type}/create`}>
          <Button
            variant="outline"
            className="capitalize text-red-600 border-red-600"
          >
            <PlusCircle
              className="me-1 -ms-2 opacity-60 text-red-600"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
            Warehouse
            <Warehouse
              className="-me-1 ms-2 opacity-60 w-4 h-4 stroke-1 text-red-600"
              aria-hidden="true"
            />
          </Button>
        </Link>
      </div>
      <Search />
    </section>
  );
};

export default Page;
