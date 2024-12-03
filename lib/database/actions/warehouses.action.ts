import { connectToDatabase } from "@/lib/database";
import Warehouse from "@/lib/database/models/warehouses.model";
import { handleError } from "@/lib/utils";

interface WarehouseData {
  id?: number;
  name: string;
}

export async function createWarehouse(data: WarehouseData) {
  try {
    await connectToDatabase();
    const newWarehouse = await Warehouse.create(data);
    return JSON.parse(JSON.stringify(newWarehouse));
  } catch (error) {
    handleError(error);
  }
}
