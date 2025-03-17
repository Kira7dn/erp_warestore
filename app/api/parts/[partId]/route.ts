import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database/index";
import mongoose from "mongoose";

export async function GET(
  request: Request,
  { params }: { params: { partId: string } }
) {
  try {
    const partId = params.partId;

    if (!partId) {
      return NextResponse.json(
        { error: "PartID không được để trống" },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const db = mongoose.connection.db;

    if (!db) {
      throw new Error("Không thể kết nối đến database");
    }

    const collection = db.collection("parts");

    // Tìm part trong database
    const part = await collection.findOne({
      id: parseInt(partId),
    });

    if (!part) {
      return NextResponse.json(
        {
          error: "Không tìm thấy thông tin sản phẩm",
          partId,
          message:
            "Vui lòng kiểm tra lại mã QR hoặc liên hệ quản trị viên",
        },
        { status: 404 }
      );
    }

    // Loại bỏ các trường nhạy cảm nếu có
    const { ...safePart } = part;

    return NextResponse.json({
      success: true,
      data: safePart,
    });
  } catch (error) {
    console.error("Lỗi khi tìm kiếm part:", error);
    return NextResponse.json(
      {
        error:
          "Có lỗi xảy ra khi tìm kiếm thông tin sản phẩm",
        message:
          "Vui lòng thử lại sau hoặc liên hệ quản trị viên",
      },
      { status: 500 }
    );
  }
}
