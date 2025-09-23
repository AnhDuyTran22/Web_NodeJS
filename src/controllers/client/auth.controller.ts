import { Request, Response } from "express";
import { RegisterSchema, TregisterSchema } from "../../validation/register.schema";
import { registerNewUser } from "../../services/client/auth.service";

const getRegisterPage = async (req: Request, res: Response) => {
    const errors: string[] = [];
    const oldData = {
        fullName: "",
        email: "",
        password: "",
        confirmPassword: ""
    };

    return res.render("client/auth/register.ejs", {
        errors,
        oldData
    });
}

const getLoginPage = async (req: Request, res: Response) => {
    return res.render("client/auth/login.ejs");
}

const postRegister = async (req: Request, res: Response) => {
    const { fullName, email, password, confirmPassword } = req.body as TregisterSchema;
    
    const validate = await RegisterSchema.safeParseAsync(req.body);
    if (!validate.success) {
        const errorsZod = validate.error.issues;
        const errors = errorsZod?.map(item => `${item.message} (${item.path[0]})`);

        const oldData = {
            fullName, email, password, confirmPassword
        };
        return res.render("client/auth/register.ejs", {
            errors, 
            oldData
        });
    }

    try {
        await registerNewUser(fullName, email, password);
        return res.redirect("/login");
    } catch (error) {
        const errors = ["Đăng ký thất bại. Vui lòng thử lại."];
        const oldData = {
            fullName, email, password: "", confirmPassword: ""
        };
        return res.render("client/auth/register.ejs", {
            errors, 
            oldData
        });
    }
}

export {
    getLoginPage, 
    getRegisterPage,
    postRegister
}