import { cookies } from "next/headers";
import { decrypt, encrypt } from "./jwt";

const generateExpires = () => new Date(Date.now() + 60 * 60 * 1000 * 2);
const SESSION_NAME = "session";

export const createSession = (jwt: string) => {
    const expires = generateExpires();
    cookies().set(SESSION_NAME, jwt, { expires, httpOnly: true });
}

export const getSession = async () => {
    const session = cookies().get(SESSION_NAME)?.value;
    if (!session) return null;

    return await decrypt(session);
}

export const updateSession = async () => {
    const session = await getSession();
    if (!session) return null;
    const expires = generateExpires();
    const jwt = await encrypt({ ...session, expires });

    const updateSession = {
        name: SESSION_NAME,
        value: jwt,
        expires,
        httpOnly: true
    };

    return updateSession;
}

/// Destroy the session
export const logout = async () => {
    console.log("Destroying session...");
    cookies().set(SESSION_NAME, "", { expires: new Date(0) });
}