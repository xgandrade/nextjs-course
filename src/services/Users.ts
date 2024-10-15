import { createHash, verifyHash } from "@/helpers/hash";
import Users from "@/libs/database/Users";


const UsersService = {
    signUp: async (data: any) => {

        const passwordHash = await createHash(data.password);
        if (!passwordHash) {
            throw new Error("Não é possível criar um hash de senha.");
        }

        return Users.create({ ...data, password: passwordHash });
    },

    signIn: async (data: any) => {

        const record = await Users.findByEmail(data.email);
        if (!record) return null;

        const isValidPassword = await verifyHash(data.password, record.password);
        if (!isValidPassword) return null;

        return { ...record, password: null };
    },
};

export default UsersService;