import { Request, Response } from "express";
import { getAllUsers, getUserByID, handleCreateUser, handleDeleteUser, updateUserByID, getAllRole } from "../services/user.service";

const getHomePage = async (req: Request, res: Response) => {

    // x <- y 
    return res.render("client/home/show.ejs",);

}

const getCreateUserPage = async (req: Request, res: Response) => {
    const roles = await getAllRole();


    return res.render("admin/user/create.ejs", {
        roles
    });
}

const postCreateUserPage = async (req: Request, res: Response) => {
    const { fullName, username, phone, role, address } = req.body;
    const file = req.file;
    const avatar = file?.filename ?? "";
    // Create user with the extracted data
    await handleCreateUser(fullName, username, address, phone, avatar, role);
    return res.redirect("/admin/user");
}

const postDeleteUser = async (req: Request, res: Response) => {
    const { ID } = req.params
    await handleDeleteUser(ID)
    return res.redirect("/admin/user/");
}

const getViewUser = async (req: Request, res: Response) => {
    const { ID } = req.params

    const user = await getUserByID(ID);
    const roles = await getAllRole();

    return res.render("admin/user/detail.ejs", {
        ID: ID,
        user: user,
        roles: roles
    })

}

const postUpdateUser = async (req: Request, res: Response) => {
    const { id, fullName, phone, role, address } = req.body;
    const file = req.file;
    const avatar = file?.filename ?? undefined;

    // Call updateUserByID with correct parameter order: id, address, fullName, phone, avatar, role
    await updateUserByID(id, address, fullName, phone, avatar, role);
    return res.redirect("/admin/user");

}


export {
    getHomePage,
    getCreateUserPage,
    handleCreateUser,
    postCreateUserPage,
    getAllUsers,
    postDeleteUser,
    getViewUser,
    postUpdateUser,
    getAllRole,

};