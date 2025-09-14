import { Request, Response } from "express";
import { getAllUsers, getUserByID, handleCreateUser, handleDeleteUser, } from "services/user.service";

const getHomePage = async (req: Request, res: Response) => {
    const users = await getAllUsers()
    console.log("check user: ", users);
    // x <- y 
    return res.render("home", {
        users: users
    });

}

const getCreateUserPage = (req: Request, res: Response) => {
    return res.render("create-user");
}

const postCreateUserPage = async (req: Request, res: Response) => {


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

export {
    getHomePage,
    getCreateUserPage,
    handleCreateUser,
    postCreateUserPage,
    getAllUsers,
    postDeleteUser,
    getViewUser,

};