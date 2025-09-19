import express, { Express } from "express";
import { getCreateUserPage, getHomePage, postCreateUserPage, postDeleteUser, getViewUser, postUpdateUser } from "../controllers/user.controller";
import { getDashboardPage, getAdminUserPage, getAdminOrderPage, getAdminProductPage, } from "../controllers/admin/dashboard.controller";
import { postAdminCreateProductPage, getAdminCreateProductPage } from "controllers/admin/product.controller";
import { describe } from "node:test";
const router = express.Router();

const multer = require('multer')

// Default upload configuration
const upload = multer({ dest: 'upload/' })

// Create fileUploadMiddleware function with optional destination
const fileUploadMiddleware = (fieldName: string, destination?: string) => {
    if (destination) {
        // Create custom multer instance with specific destination
        const customStorage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, `public/${destination}/`)
            },
            filename: function (req, file, cb) {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
                const extension = file.originalname.split('.').pop()
                cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension)
            }
        })
        const customUpload = multer({ storage: customStorage })
        return customUpload.single(fieldName);
    } else {
        // Use default upload for avatar
        return upload.single(fieldName);
    }
}

const webRoutes = (app: Express) => {
    router.get("/", getHomePage);
    router.post("/admin/handle-delete-user/:ID", postDeleteUser);
    router.get("/admin/view-user/:ID", getViewUser);
    router.post("/admin/update-user", fileUploadMiddleware('avatar'), postUpdateUser);

    // admin routes
    router.get("/admin", getDashboardPage)
    router.get("/admin/user", getAdminUserPage)
    router.get("/admin/create-user", getCreateUserPage)
    router.post("/admin/handle-create-user", fileUploadMiddleware('avatar'), postCreateUserPage);

    router.get("/admin/create-product", getAdminCreateProductPage);
    router.post("/admin/create-product", fileUploadMiddleware('image', 'images/product'), postAdminCreateProductPage);

    router.get("/admin/product", getAdminProductPage)
    router.get("/admin/order", getAdminOrderPage)

    app.use("/", router);
};

export default webRoutes;