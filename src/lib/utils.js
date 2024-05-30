import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getAvatarName = (name) => {
  return name?.charAt(0)?.toUpperCase();
};
