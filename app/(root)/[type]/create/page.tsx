import CreatePartForm from "@/components/CreatePartForm";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const Create = async ({ params }: SearchParamProps) => {
  const type = ((await params)?.type as string) || "";
  return (
    <div className="w-full">
      <section className=" w-full flex justify-between items-center">
        <h1 className="text-2xl font-bold uppercase">
          Create {type}
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
      <CreatePartForm type={type} />
    </div>
  );
};

export default Create;
