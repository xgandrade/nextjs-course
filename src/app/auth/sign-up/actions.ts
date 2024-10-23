"use server";

import { getZodErrors } from "@/helpers/zod";
import UsersService from "@/services/Users";
import { redirect } from "next/navigation";
import zod from "zod";

export type SignUpError = {
  name?: string;
  email?: string;
  password?: string;
  passwordConfirmation?: string;
};

export type SignUpState = {
  isValid?: boolean;
  errors: SignUpError;
};

const validateSignUpForm = (formData: FormData) => {
  const checkPasswords = (data: any) =>
    data.password === data.passwordConfirmation;
  const checkPasswordsError = {
    message: "Password confirmation doesn't match",
    path: ["passwordConfirmation"],
  };

  const userSchema = zod
    .object({
      name: zod.string().min(3, { message: "Name is required" }),
      email: zod.string().email({ message: "Invalid email" }),
      password: zod.string().min(10, { message: "Password is required" }),
      passwordConfirmation: zod
        .string()
        .min(10, { message: "Password confirmation is required" }),
    })
    .refine(checkPasswords, checkPasswordsError);

  try {
    userSchema.parse(Object.fromEntries(formData));
    return { isValid: true, errors: {} };
  } catch (error: unknown) {
    const zodErrors = getZodErrors(error);
    return { isValid: false, errors: zodErrors || {} };
  }
};

export const handleSignUpForm = async (prevState: any, formData: FormData) => {
  const validation = validateSignUpForm(formData);
  if (!validation.isValid) return { ...prevState, ...validation };

  const data = {
    name: String(formData.get("name")),
    email: String(formData.get("email")),
    password: String(formData.get("password")),
  };

  await UsersService.signUp(data);
  redirect("/");
};
