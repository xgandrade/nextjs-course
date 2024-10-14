"use client";

import { SubmitButton, TextInput } from "@/components";
import { useFormState } from "react-dom";
import { handleSignUpForm } from "./actions";

export default function SignUpForm() {

    const [state, formAction] = useFormState(handleSignUpForm, {});

    return (
        <form action={formAction}>
            <TextInput name="name" label="Name" />
            <TextInput name="email" label="Email" inputMode="email" />
            <TextInput name="password" label="Password" type="password" />
            <TextInput name="passwordConfirmation" label="Password confirmation" type="password" />

            <SubmitButton label={"Create account"} />
        </form>
    )
}