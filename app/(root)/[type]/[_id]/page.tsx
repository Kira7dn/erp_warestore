import PartForm from "@/components/form/PartForm";
import { Button } from "@/components/ui/button";
import { getPart } from "@/lib/database/actions/parts.action";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

async function page({ params }: SearchParamProps) {
  const type = ((await params)?.type as string) || "";
  const _id = ((await params)?._id as string) || "";
  const data = await getPart(_id);
  console.log(type);
  console.log(_id);
  console.log(data);
  if (data.status === "ERROR") {
    return (
      <div className="w-full">
        <section className=" w-full flex justify-between items-center">
          {data.error}{" "}
        </section>
      </div>
    );
  }

  return (
    <div className="w-full">
      <section className=" w-full flex justify-between items-center">
        <h1 className="text-2xl font-bold uppercase">
          {`${type} ID: ${data.id}`}
        </h1>
        <Link href={`/${type}`}>
          <Button
            className="capitalize flex items-center gap-1"
            variant="outline"
          >
            <ChevronLeft />
            <span>Back</span>
          </Button>
        </Link>
      </section>
      <PartForm type={type} action="update" data={data} />
    </div>
  );
}

export default page;
