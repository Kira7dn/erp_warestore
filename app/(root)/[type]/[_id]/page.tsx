import PartForm from "@/components/form/PartForm";
import { Button } from "@/components/ui/button";
import { getPart } from "@/lib/database/actions/parts.action";
import { ChevronLeft, AlertCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

async function page({ params }: SearchParamProps) {
  const type = ((await params)?.type as string) || "";
  const _id = ((await params)?._id as string) || "";
  const data = await getPart(_id);

  if (data.status === "ERROR") {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center gap-4 mb-6">
          <Link href={`/${type}`}>
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-semibold">
            Chi tiết sản phẩm
          </h1>
        </div>

        <Alert
          variant="destructive"
          className="max-w-2xl mx-auto"
        >
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Lỗi</AlertTitle>
          <AlertDescription>{data.error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">
            {type === "parts"
              ? "Chi tiết sản phẩm"
              : "Chi tiết phụ tùng"}
          </h1>
          <p className="text-sm text-muted-foreground">
            Mã sản phẩm: {data.id}
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
        <PartForm
          type={type as PartType}
          action="update"
          data={data}
        />
      </div>
    </div>
  );
}

export default page;
