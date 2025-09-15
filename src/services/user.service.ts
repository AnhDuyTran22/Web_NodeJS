import { prisma } from "config/client";
import getConnection from "../config/database"




const handleCreateUser = async (
    fullName: string,
    Email: string,
    Address: string) => {

    // insert into database


    const newUser = await prisma.user.create({
        data: {
            name: fullName,
            email: Email,
            address: Address
        }
    })
    return newUser;


}
const getAllUsers = async () => {
    const users = await prisma.user.findMany();
    return users;
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
                name: fullName,
                email: email,
                address: address
            }
        });
        return updatedUser;
    } catch (err) {
        console.error("Update user error:", err);
        throw err;
    }


}


export { handleCreateUser, getAllUsers, handleDeleteUser, getUserByID, updateUserByID }