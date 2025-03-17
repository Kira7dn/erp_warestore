"use client";

import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getPart } from "@/lib/database/actions/parts.action";
import { toast } from "sonner";

export default function ScanPage() {
  const router = useRouter();
  const [scanResult, setScanResult] = useState<
    string | null
  >(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 5,
      },
      false
    );

    scanner.render(
      async (decodedText) => {
        setScanResult(decodedText);
        // Tìm partID trong database và redirect
        const result = await getPart(decodedText);

        if (result.status === "SUCCESS") {
          router.push(`/parts/${decodedText}`);
        } else {
          toast.error(result.error);
          // Tiếp tục quét sau khi hiển thị lỗi
          setScanResult(null);
        }
      },
      (error) => {
        console.warn(error);
      }
    );

    return () => {
      scanner.clear().catch((error) => {
        console.error("Failed to clear scanner", error);
      });
    };
  }, [router]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-semibold">
          Quét Mã QR
        </h1>
      </div>

      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-4">
        <div id="reader" className="w-full"></div>

        {scanResult && (
          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <p className="text-green-700">
              Đã quét thành công: {scanResult}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
