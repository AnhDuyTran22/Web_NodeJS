import { Request, Response } from "express";
import { getAllUsers } from "../../services/client/user.service";
import { getProductList } from "../../services/admin/product.service";
const getDashboardPage = async (req: Request, res: Response) => {

    return res.render("admin/dashboard/show.ejs", {

    });

}

const getAdminUserPage = async (req: Request, res: Response) => {
    const users = await getAllUsers()
    return res.render("admin/user/show.ejs", {
        users: users
    });

}

const getAdminProductPage = async (req: Request, res: Response) => {
    const products = await getProductList();

    return res.render("admin/product/show.ejs", {
        products: products
    });

}

const getAdminOrderPage = async (req: Request, res: Response) => {

    return res.render("admin/order/show.ejs", {

    });

}

const getAdminCreateProductPage = async (req: Request, res: Response) => {
    // Display create product form
    return res.render("admin/product/create.ejs");
}

const postCreateProductPage = async (req: Request, res: Response) => {
    // Handle product creation
    const { name, price, detailDesc, shortDesc, quantity, factory, target } = req.body;
    const file = req.file;
    const image = file?.filename ?? "";

    // TODO: Add product creation logic here

    return res.redirect("/admin/product");
}

export { getDashboardPage, getAdminUserPage, getAdminOrderPage, getAdminProductPage, getAdminCreateProductPage, postCreateProductPage }