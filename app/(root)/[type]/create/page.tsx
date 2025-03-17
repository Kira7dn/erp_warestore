import PartForm from "@/components/form/PartForm";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const Create = async ({ params }: SearchParamProps) => {
  const type = ((await params)?.type as string) || "";

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">
            {type === "parts"
              ? "Thêm sản phẩm mới"
              : "Thêm phụ tùng mới"}
          </h1>
          <p className="text-sm text-muted-foreground">
            Điền thông tin chi tiết vào form bên dưới
          </p>
        </div>
        <Link href={`/${type}`}>
          <Button variant="outline" className="gap-2">
            <ChevronLeft className="h-4 w-4" />
            <span>Quay lại</span>
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <PartForm type={type as PartType} action="create" />
      </div>
    </div>
  );
};

export default Create;
