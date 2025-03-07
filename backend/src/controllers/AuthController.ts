import { Request, Response } from "express";
import User from "../models/User.ts";
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
import dotenv from "dotenv";

dotenv.config();

class AuthController {
    static async register(req: Request, res: Response): Promise<void> {
        const { name, email, password } = req.body;
        const passwordCrypt = CryptoJS.AES.encrypt(password, process.env.SECRET as string).toString()

        const user = new User({
            name,
            email,
            password: passwordCrypt
        });

        await user.save();

        try {
            await user.save();
            res.status(201).send({ message: "Usuário cadastrado com sucesso" });
        } catch (error) {
            res.status(500).send({ message: "Something failed" });
        }
    }

    static async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
            if (!user)
            {
                res.status(400).send({ message: "Email ou Senha invalido" })
                return
            }
            if (CryptoJS.AES.decrypt(user.password, process.env.SECRET as string).toString(CryptoJS.enc.Utf8) != password) {
                res.status(400).send({ message: "Email ou senha invalido" })
                return
            }
            const secret = process.env.SECRET;
            if (secret == null)
            {
                return
            }
            const token = jwt.sign(
                {
                    id: user._id,
                },
                secret,
                {
                    expiresIn: '2 days'
                }
            );
            res.status(200).send({token: token})
    }
}

export default AuthController;