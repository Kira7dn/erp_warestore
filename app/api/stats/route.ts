import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database/index";
import Part from "@/lib/database/models/parts.model";
import User from "@/lib/database/models/users.model";
import Fluctuation from "@/lib/database/models/fluctuations.model";
import Warehouse from "@/lib/database/models/warehouses.model";

export async function GET() {
  try {
    await connectToDatabase();
    console.log("getdata");

    const [parts, warestores, users, fluctuations] =
      await Promise.all([
        Part.countDocuments(),
        Warehouse.countDocuments(),
        User.countDocuments(),
        Fluctuation.countDocuments(),
      ]);

    const total = parts + warestores + users + fluctuations;

    return NextResponse.json({
      success: true,
      data: {
        parts,
        warestores,
        users,
        fluctuations,
        total,
      },
    });
  } catch (error) {
    console.error("Lỗi khi lấy thống kê:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Có lỗi xảy ra khi lấy thống kê",
      },
      { status: 500 }
    );
  }
}
