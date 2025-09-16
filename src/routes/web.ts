import express, { Express } from "express";
import { getCreateUserPage, getHomePage, postCreateUserPage, postDeleteUser, getViewUser, postUpdateUser } from "../controllers/user.controller";
import { getDashboardPage, getAdminUserPage, getAdminOrderPage, getAdminProductPage } from "controllers/admin/dashboard.controller";
const router = express.Router();

const webRoutes = (app: Express) => {
    router.get("/", getHomePage);
    router.post("/handle-create-user", postCreateUserPage);
    router.post("/handle-delete-user/:ID", postDeleteUser);
    router.get("/handle-view-user/:ID", getViewUser);
    router.post("/handle-update-user", postUpdateUser);


    // admin routes
    router.get("/admin", getDashboardPage)
    router.get("/admin/user", getAdminUserPage)
    router.get("/admin/create-user", getCreateUserPage)

    router.get("/admin/product", getAdminProductPage)
    router.get("/admin/order", getAdminOrderPage)

    app.use("/", router);
};

export default webRoutes;
getAdminProductPage
getAdminOrderPage