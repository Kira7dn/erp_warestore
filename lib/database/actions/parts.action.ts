"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/database";
import Part from "@/lib/database/models/parts.model";
import { parseServerActionResponse } from "@/lib/utils";

export async function createPart(
  state: any,
  form: FormData,
  type: string
) {
  const session = await auth();
  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });
  const { name, specification, brand, image, category } =
    Object.fromEntries(Array.from(form));
  try {
    const part = {
      name,
      type,
      specification,
      brand,
      image,
      category,
    };
    await connectToDatabase();
    const new_data = await Part.create(part);
    const return_data = {
      ...new_data._doc,
      error: "",
      status: "SUCCESS",
    };
    console.log(return_data);
    return parseServerActionResponse(return_data);
  } catch (error) {
    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
}
