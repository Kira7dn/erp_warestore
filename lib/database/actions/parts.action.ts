"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/database";
import Part from "@/lib/database/models/parts.model";
import { parseServerActionResponse } from "@/lib/utils";

export async function createPart(data: PartDataType) {
  const session = await auth();
  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });
  const {
    name,
    type,
    specification,
    brand,
    image,
    category,
  } = data;
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
    return parseServerActionResponse(return_data);
  } catch (error) {
    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
}

export async function getPart(_id: string) {
  const session = await auth();
  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });
  try {
    await connectToDatabase();
    const part = await Part.findById(_id);
    if (!part)
      return parseServerActionResponse({
        error: "Part not found",
        status: "ERROR",
      });
    const return_data = {
      ...part._doc,
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

export async function updatePart(data: PartDataType) {
  const session = await auth();
  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });
  try {
    await connectToDatabase();
    const part = await Part.findByIdAndUpdate(
      data._id,
      data,
      {
        new: true,
      }
    );
    if (!part)
      return parseServerActionResponse({
        error: "Part not found",
        status: "ERROR",
      });
    const return_data = {
      ...part._doc,
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
