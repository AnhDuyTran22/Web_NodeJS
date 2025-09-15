import express, { Express } from "express";
import { getCreateUserPage, getHomePage, postCreateUserPage, postDeleteUser, getViewUser, postUpdateUser } from "../controllers/user.controller";

const router = express.Router();

const webRoutes = (app: Express) => {
    router.get("/", getHomePage);

    router.get("/create-user", getCreateUserPage);
    router.post("/handle-create-user", postCreateUserPage);
    router.post("/handle-delete-user/:ID", postDeleteUser);
    router.get("/handle-view-user/:ID", getViewUser);


    router.post("/handle-update-user", postUpdateUser);


    app.use("/", router);
};

export default webRoutes;
