"use server";
// next.js
import { redirect } from "next/navigation";
// database
import dbConnect from "../lib/mongodb";
import User from "../lib/models/User";
// dal
import { verifySession } from "../lib/dal";
// method
import { handleError } from "../lib/helper";
import { createSession } from "../lib/session";
import UserValidator from "../lib/validators/user";
import { FormState } from "../lib/definitions";
// library
import bcrypt from "bcrypt";

export async function login(formState: FormState, formData: FormData) {
  try {
    const { username, password } = {
      username: String(formData.get("username")).trim(),
      password: String(formData.get("password")).trim(),
    };

    if (!username || !password)
      return handleError("other", "Username and password are required");

    await dbConnect();
    const user = await User.findOne({ username }).select("password");
    if (!user) return handleError("notFound");

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return handleError("unauthorized");

    await createSession(user._id);
  } catch (err: unknown) {
    console.log("Error", err);
    return handleError("other", undefined, undefined, err);
  }

  redirect("/dashboard");
}

export async function signup(formState: FormState, formData: FormData) {
  const { isAuth, userId } = await verifySession();
  try {
    const user = await User.findById(userId);
    if (!user) return handleError("unauthorized");

    const { username, password } = {
      username: String(formData.get("username")).trim(),
      password: String(formData.get("password")).trim(),
    };

    const result = UserValidator.safeParse({ username, password });
    if (!result.success)
      return handleError("zodError", undefined, result.error);

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await User.create({
      username,
      password: hashedPassword,
    });
    console.log(createdUser);
    return { success: { message: "User added successfully" } };
  } catch (err: unknown) {
    console.log("Error", err);
    return handleError("other", undefined, undefined, err);
  }
}
