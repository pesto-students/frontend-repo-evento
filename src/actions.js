"use server";

import { signIn } from "./auth";

export const signInAction = async (credentials) => {
  await signIn("credentials", {
    redirect: false,
    email: credentials.email,
    password: credentials.password,
  });
};
