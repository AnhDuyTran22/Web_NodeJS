import exp from "constants";
import { Request, Response } from "express";
import { getProductById, getProduct } from "services/client/item.service";


const getProductPage = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await getProductById(+id);
    return res.render("client/product/detail.ejs", {
        product
    });
}

export {
    getProductPage
}