"use server";

import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/database/index";
import Warehouse from "@/lib/database/models/warehouses.model";
import { parseServerActionResponse } from "@/lib/utils";

interface WarehouseData {
  id?: number;
  name: string;
}

export async function createWarehouse(data: WarehouseData) {
  const session = await auth();
  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  try {
    await connectToDatabase();
    const newWarehouse = await Warehouse.create(data);
    const return_data = {
      ...newWarehouse._doc,
      error: "",
      status: "SUCCESS",
    };
    return parseServerActionResponse(return_data);
  } catch (error) {
    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
}

export async function getWarehouses() {
  const session = await auth();
  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  try {
    await connectToDatabase();
    const warehouses = await Warehouse.find();
    const return_data = {
      ...warehouses,
      error: "",
      status: "SUCCESS",
    };
    return parseServerActionResponse(return_data);
  } catch (error) {
    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
}
