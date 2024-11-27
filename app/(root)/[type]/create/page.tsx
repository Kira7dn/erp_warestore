import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Create = async ({ params }: SearchParamProps) => {
  const type = ((await params)?.type as string) || "";
  return (
    <div>
      Create {type}
      <div>
        <Link href={`/${type}`}>
          <Button>{`Back to ${type}`}</Button>
        </Link>
      </div>
    </div>
  );
};

export default Create;
