import { Request, Response } from "express";
import { getAllUsers, handleCreateUser } from "services/user.service";

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
    const { fullName, Email, Address } = req.body;
    await handleCreateUser(fullName, Email, Address)

    return res.redirect("/");
}

export {
    getHomePage,
    getCreateUserPage,
    postCreateUserPage,
    getAllUsers

};