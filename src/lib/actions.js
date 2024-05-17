"use server";

import { signIn } from "@/auth";

export const signInAction = async (email, password) => {
  await signIn("credentials", {
    email,
    password,
    redirectTo: "/",
  });
};
