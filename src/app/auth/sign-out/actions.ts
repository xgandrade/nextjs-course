"use server";

import { logout } from "@/helpers/session";
import { redirect } from "next/navigation";

export const handleSignOutForm = async () => {
  console.log("Signing out...");
  await logout();
  console.log("Sign out successful");
  return redirect("/");
};
