import { cookies } from "next/headers";
import { decrypt } from "./jwt";

export const createSession = (jwt: string) => {
    const expires = new Date(Date.now() + 60 * 1000);
    cookies().set("session", jwt, { expires, httpOnly: true });
}

export const getSession = async () => {
    const session = cookies().get("session")?.value;
    if (!session) return null;

    return await decrypt(session);
}