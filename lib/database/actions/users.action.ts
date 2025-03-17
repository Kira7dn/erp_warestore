"use server";
import { connectToDatabase } from "@/lib/database/index";
import { auth } from "@/auth";
import User from "@/lib/database/models/users.model";
import { parseServerActionResponse } from "@/lib/utils";

interface UserData {
  id?: number;
  name: string;
  username: string;
  email: string;
  image?: string;
  bio?: string;
}

export async function createUser(data: UserData) {
  const session = await auth();
  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  try {
    await connectToDatabase();
    const newUser = await User.create(data);
    const return_data = {
      ...newUser._doc,
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

export async function getUserById(id: string) {
  const session = await auth();
  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  try {
    await connectToDatabase();
    const user = await User.findOne({ id });
    if (!user)
      return parseServerActionResponse({
        error: "User not found",
        status: "ERROR",
      });
    const return_data = {
      ...user._doc,
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

export async function getCurrentUser() {
  const session = await auth();
  if (!session?.user)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  try {
    await connectToDatabase();
    const user = await User.findOne({
      name: session.user.name,
    });
    if (!user)
      return parseServerActionResponse({
        error: "User not found",
        status: "ERROR",
      });
    const return_data = {
      ...user._doc,
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
