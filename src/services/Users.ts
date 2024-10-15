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

    // signIn: async (data: any) => {
    //     const user = await Users.getOne({ email: data.email });
    //     if (!user) {
    //         return null;
    //     }
    //     const isValid = await verifyHash(data.password, user.password);
    //     if (!isValid) {
    //         return null;
    //     }
    //     return user;
    // },
};

export default UsersService;