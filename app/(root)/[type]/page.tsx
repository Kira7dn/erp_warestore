import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import {
  PlusCircle,
  Sparkles,
  Warehouse,
} from "lucide-react";
import { mainLinks } from "@/constants";
import Search from "@/components/Search";

const Page = async ({ params }: SearchParamProps) => {
  const type = ((await params)?.type as string) || "";
  const Icon =
    mainLinks.find((link) => link.route === `/${type}`)
      ?.component || Sparkles;
  return (
    <div className="page-container">
      <section className="w-full flex justify-between items-center">
        <div className="flex gap-2">
          <Link href={`/${type}/create`}>
            <Button
              variant="outline"
              className="capitalize"
            >
              <PlusCircle
                className="me-1 -ms-2 opacity-60"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />
              {type}
              <Icon
                className="-me-1 ms-2 opacity-60"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />
            </Button>
          </Link>
          <Link href={`/${type}/create`}>
            <Button
              variant="outline"
              className="capitalize"
            >
              <PlusCircle
                className="me-1 -ms-2 opacity-60"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />
              Warehouse
              <Warehouse
                className="-me-1 ms-2 opacity-60"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />
            </Button>
          </Link>
        </div>
        <Search />
      </section>
    </div>
  );
};

export default Page;
