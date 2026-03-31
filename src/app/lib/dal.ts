"use server";

import { cookies } from "next/headers";
import { cache } from "react";
import { decrypt, deleteSession } from "./session";
import { redirect } from "next/navigation";

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) redirect("/");

  return { isAuth: true, userId: session.userId };
});

export const logout = cache(async () => {
  try {
    await deleteSession();
  } catch (err: unknown) {
    console.log("Error", err);
  }
  redirect("/");
});
