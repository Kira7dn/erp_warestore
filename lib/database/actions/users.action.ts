"use server";
import { connectToDatabase } from "@/lib/database";
import { handleError } from "@/lib/utils";
import { auth } from "@/auth";
import User from "@/lib/database/models/users.model";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createUser(data: any) {
  try {
    await connectToDatabase();
    const new_data = await User.create(data);
    return JSON.parse(JSON.stringify(new_data));
  } catch (error) {
    handleError(error);
  }
}

export async function getUserById(id: string) {
  try {
    await connectToDatabase();
    const user = await User.findOne({ id });
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

export async function getCurrentUser() {
  const session = await auth();
  if (!session?.user) return null;
  try {
    await connectToDatabase();
    const user = await User.findOne({
      name: session.user.name,
    });
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }

  return session;
}
