"use server";

import { signIn } from "@/auth";

export const signInAction = async (email, password, role) => {
  await signIn("credentials", {
    email,
    password,
    role,
    redirectTo: "/manager",
  });
};
