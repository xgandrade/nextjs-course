import bcrypt from 'bcrypt';
const saltRounbds = 12;

export const createHash = async (password: string) => {
    try {
        if (!password) return null;
        const hash = await bcrypt.hash(password, saltRounbds);
        return hash;
    } catch (error) {
        return null;
    }
}

export const verifyHash = async (password: string, hash: string) => {
    try {
        if (!password || !hash) return false;
        const isValid = await bcrypt.compare(password, hash);
        return isValid;
    } catch (error) {
        return false;
    }
}

