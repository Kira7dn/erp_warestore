import { connectToDatabase } from "@/lib/database";
import Fluctuation from "@/lib/database/models/fluctuations.model";
import { handleError } from "@/lib/utils";

interface FluctuationData {
  partId: number;
  type: "import" | "export";
  quantity: number;
  date?: Date;
  warehouse: number;
}

export async function createFluctuation(
  data: FluctuationData
) {
  try {
    await connectToDatabase();
    const newFluctuation = await Fluctuation.create(data);
    return JSON.parse(JSON.stringify(newFluctuation));
  } catch (error) {
    handleError(error);
  }
}
