"use server";

import UsersService from "@/services/Users";

export const handleSignUpForm = async (prevState: any, formData: FormData) => {

    const data = {
        name: String(formData.get("name")),
        email: String(formData.get("email")),
        password: String(formData.get("password")),
    };

    const user = await UsersService.signUp(data);

    return {};
}