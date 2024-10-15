import { SignJWT, jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export const encrypt = async (payload: any) => {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('2 hours from now') //tempo de expiração, ex 2h ou 
        .sign(secret);;
};

export const decrypt = async (value: string) => {
    const { payload } = await jwtVerify(value, secret, { algorithms: ['HS256'] });
    return payload;
};