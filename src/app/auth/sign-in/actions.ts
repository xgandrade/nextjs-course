"use server";

import { encrypt } from "@/helpers/jwt";
import { createSession } from "@/helpers/session";
import { getZodErrors } from "@/helpers/zod";
import UsersService from "@/services/Users";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import zod from "zod";

export type SignInError = {
  email?: string;
  password?: string;
};

export type SignInState = {
  isValid?: boolean;
  errors: SignInError;
};

const validateSignInForm = (formData: FormData) => {
  const userSchema = zod.object({
    email: zod.string().email({ message: "Invalid email" }),
    password: zod.string().min(10, { message: "Password is required" }),
  });

  try {
    userSchema.parse(Object.fromEntries(formData));
    return { isValid: true, errors: {} };
  } catch (error: unknown) {
    const zodErrors = getZodErrors(error);
    return { isValid: false, errors: zodErrors || {} };
  }
};

export const handleSignInForm = async (prevState: any, formData: FormData) => {
  const validation = validateSignInForm(formData);
  if (!validation.isValid) return { ...prevState, ...validation };

  const data = {
    email: String(formData.get("email")),
    password: String(formData.get("password")),
  };

  const user = await UsersService.signIn(data);
  if (!user)
    return {
      isValid: false,
      errors: {
        email: "Invalid email or password",
        password: "Invalid email or password",
      },
    };

  const payload = {
    uuid: user.uuid,
    name: user.name,
    email: user.email,
  };

  const jwt = await encrypt(payload);
  createSession(jwt);
  revalidatePath("/");
  redirect("/");
};
