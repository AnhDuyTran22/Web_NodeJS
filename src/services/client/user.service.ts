import { prisma } from "config/client";
import { ACCOUNT_TYPE } from "config/constant";
import bcrypt from 'bcrypt';
const saltRounds = 10;


const hashPassword = async (plainText: string) => {
    return await bcrypt.hash(plainText, saltRounds)
}

const comparePassword = async (plainText: string, hashPassword: string) => {
    return await bcrypt.compare(plainText, hashPassword);
}



const handleCreateUser = async (
    fullName: string,
    username: string,
    address: string,
    phone: string,
    avatar: string,
    role: string,
) => {

    // insert into database

    const defaultPassword = await hashPassword("123456");
    const newUser = await prisma.user.create({
        data: {
            fullName: fullName,
            username: username,
            address: address,
            password: defaultPassword,
            accountType: ACCOUNT_TYPE.SYSTEM,
            avatar: avatar,
            phone: phone,
            roleId: +role
        }
    })
    return newUser;


}
const getAllUsers = async () => {
    const users = await prisma.user.findMany();
    return users;
}

const getAllRole = async () => {
    const roles = await prisma.role.findMany();
    return roles;
}

const handleDeleteUser = async (id: string) => {
    const result = await prisma.user.delete({
        where: { id: +id }
    })
    return result;
}

const getUserByID = async (id: string) => {
    const user = prisma.user.findUnique({ where: { id: +id } });
    return user;

}




const updateUserByID = async (
    id: string, address: string, fullName: string, phone: string, avatar: string, role: string
) => {
    try {
        const updatedUser = await prisma.user.update({
            where: { id: +id },
            data: {
                fullName: fullName,

                address: address,
                roleId: +role,
                ...(avatar !== undefined && { avatar: avatar })
            }
        });
        return updatedUser;
    } catch (err) {
        console.error("Update user error:", err);
        throw err;
    }


}


export { handleCreateUser, getAllUsers, handleDeleteUser, getUserByID, updateUserByID, getAllRole, hashPassword, comparePassword }