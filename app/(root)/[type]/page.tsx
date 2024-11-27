import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import {
  Bolt,
  PlusCircle,
  Sparkles,
  Warehouse,
} from "lucide-react";
import { mainLinks } from "@/constants";

const Page = async ({
  searchParams,
  params,
}: SearchParamProps) => {
  const type = ((await params)?.type as string) || "";
  const Icon =
    mainLinks.find((link) => link.route === `/${type}`)
      ?.component || Sparkles;
  return (
    <div className="page-container">
      <section className="w-full flex justify-between">
        <h1 className="text-2xl font-bold uppercase">
          {type}
        </h1>
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
      </section>
    </div>
  );
};

export default Page;
