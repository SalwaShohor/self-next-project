"use client";

import { usePathname } from "next/navigation";
import { Header } from "./header";

export function HeaderWrapper() {
  const pathname = usePathname();

  // List of routes where Header should NOT appear
  const hiddenRoutes = ["/auth/sign-in", "/auth/sign-up"];

  if (!pathname) return null; // if somehow null, render nothing

  if (hiddenRoutes.includes(pathname)) {
    return null;
  }

  return <Header />;
}
