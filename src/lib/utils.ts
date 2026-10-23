import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Prefixes a site path with the deploy base ("/" locally, "/<repo>/" on GitHub Pages).
export function withBase(path: string) {
  return import.meta.env.BASE_URL.replace(/\/$/, "") + path;
}
