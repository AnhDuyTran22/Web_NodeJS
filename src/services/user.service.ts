import { prisma } from "config/client";
import { ACCOUNT_TYPE } from "config/constant";





const handleCreateUser = async (
    fullName: string,
    Email: string,
    Address: string,
    phone: string,
    avatar: string
) => {

    // insert into database


    const newUser = await prisma.user.create({
        data: {
            fullName: fullName,
            username: Email,
            address: Address,
            password: "123456",
            accountType: ACCOUNT_TYPE.SYSTEM,
            avatar: avatar,
            phone: phone,
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
    id: string, email: string, address: string, fullName: string
) => {
    try {
        const updatedUser = await prisma.user.update({
            where: { id: +id },
            data: {
                fullName: fullName,
                username: email,
                address: address,
                password: "",
                accountType: ""
            }
        });
        return updatedUser;
    } catch (err) {
        console.error("Update user error:", err);
        throw err;
    }


}


export { handleCreateUser, getAllUsers, handleDeleteUser, getUserByID, updateUserByID, getAllRole }