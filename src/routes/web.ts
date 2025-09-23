import express, { Express } from "express";
import { getCreateUserPage, getHomePage, postCreateUserPage, postDeleteUser, getViewUser, postUpdateUser } from "../controllers/user.controller";
import { getDashboardPage, getAdminUserPage, getAdminOrderPage, getAdminProductPage, } from "../controllers/admin/dashboard.controller";
import { postAdminCreateProductPage, getAdminCreateProductPage, postDeleteProduct, getViewProduct, postUpdateProduct } from "../controllers/admin/product.controller";
import { getProductPage } from "../controllers/client/product.controller";
import { getProduct } from "../services/client/item.service";
import { getLoginPage, getRegisterPage, postRegister } from "../controllers/client/auth.controller";
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
    router.get("/product/:id", getProductPage);
    router.get("/login", getLoginPage);
    router.get("/register", getRegisterPage);
    router.post("/register", postRegister);


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

    router.get("/admin/product", getAdminProductPage);
    router.post("/admin/delete-product/:id", postDeleteProduct);
    router.get("/admin/view-product/:id", getViewProduct);
    router.post("/admin/update-product/:id", fileUploadMiddleware('image', 'images/product'), postUpdateProduct);
    
    router.get("/admin/order", getAdminOrderPage);

    app.use("/", router);
};

export default webRoutes;