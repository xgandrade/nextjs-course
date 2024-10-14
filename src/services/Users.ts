import { createHash } from "@/helpers/hash";
import Users from "@/libs/database/Users";


const UsersService = {
    signUp: async (data: any) => {

        const passwordHash = await createHash(data.password);
        if (!passwordHash) {
            throw new Error("Não é possível criar um hash de senha.");
        }

        return Users.create({ ...data, password: passwordHash });
    },
};

export default UsersService;