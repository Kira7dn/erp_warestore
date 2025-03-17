"use server";

import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/database/index";
import Fluctuation from "@/lib/database/models/fluctuations.model";
import { parseServerActionResponse } from "@/lib/utils";

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
  const session = await auth();
  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  try {
    await connectToDatabase();
    const newFluctuation = await Fluctuation.create(data);
    const return_data = {
      ...newFluctuation._doc,
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

export async function getFluctuations() {
  const session = await auth();
  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  try {
    await connectToDatabase();
    const fluctuations = await Fluctuation.find().sort({
      date: -1,
    });
    const return_data = {
      ...fluctuations,
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
