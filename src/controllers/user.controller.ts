import { Request, Response } from "express";
import { getAllUsers, getUserByID, handleCreateUser, handleDeleteUser, updateUserByID } from "../services/user.service";

const getHomePage = async (req: Request, res: Response) => {
    const users = await getAllUsers()
    console.log("check user: ", users);
    // x <- y 
    return res.render("home", {
        users: users
    });

}

const getCreateUserPage = async (req: Request, res: Response) => {
    const roles = await getAllUsers();

    console.log(roles)
    return res.render("admin/user/create.ejs", {
        roles
    });
}

const postCreateUserPage = async (req: Request, res: Response) => {
    const { fullName, Email, Address } = req.body;

    // Create user with the extracted data
    const a = await handleCreateUser(fullName, Email, Address);

    return res.redirect("/");
}

const postDeleteUser = async (req: Request, res: Response) => {
    const { ID } = req.params
    await handleDeleteUser(ID)
    return res.redirect("/");
}

const getViewUser = async (req: Request, res: Response) => {
    const { ID } = req.params

    const user = await getUserByID(ID)
    return res.render("view-user.ejs", {
        ID: ID,
        user: user
    })

}

const postUpdateUser = async (req: Request, res: Response) => {
    const { ID, Email, Address, fullName } = req.body;
    // update user by id  
    await updateUserByID(ID, Email, Address, fullName);
    return res.redirect("/");

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

};