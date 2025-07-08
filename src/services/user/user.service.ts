import { prisma } from "../db/prisma";

const findUserById = async (id: string) => {
    const user = await prisma.user.findUnique({ where: { id: id } })
    return user
}

const findUserByEmail = async (email: string) => {
    const user = await prisma.user.findFirst({ where: { email: email } });
    return user;
}

const UserService = {
    findUserById,
    findUserByEmail,
}
export default UserService;