import express, { Express } from "express";
import { getCreateUserPage, getHomePage, postCreateUserPage, postDeleteUser, getViewUser, postUpdateUser } from "../controllers/user.controller";
import { getDashboardPage, getAdminUserPage, getAdminOrderPage, getAdminProductPage } from "controllers/admin/dashboard.controller";
import { describe } from "node:test";
const router = express.Router();

const multer = require('multer')
const upload = multer({ dest: 'upload/' })

const webRoutes = (app: Express) => {
    router.get("/", getHomePage);
    router.post("/handle-delete-user/:ID", postDeleteUser);
    router.get("/handle-view-user/:ID", getViewUser);
    router.post("/handle-update-user", postUpdateUser);


    // admin routes
    router.get("/admin", getDashboardPage)
    router.get("/admin/user", getAdminUserPage)
    router.get("/admin/create-user", getCreateUserPage)
    // router.post("/admin/handle-create-user", postCreateUserPage);
    router.post("/admin/handle-create-user", upload.single('avatar'), (req, res) => {
        res.send("ok")
    });


    router.get("/admin/product", getAdminProductPage)
    router.get("/admin/order", getAdminOrderPage)

    app.use("/", router);
};

export default webRoutes;
getAdminProductPage
getAdminOrderPage