import { IUser } from "./../interfaces/user.interface";
import jwt from "jsonwebtoken";

class JWT {
    private secretKey = process.env.SECRET_KEY || "Anartz1@!?¿!-_-83iadjjdmdl";
    // Información del payload para crear token que usaremos para autenticarnos
    sign(data: IUser, expiresIn = 3600): string {
        return jwt.sign({
            user: data
        }, this.secretKey, {
            expiresIn
        });
    }

    // Verficar token
    verify(token: string): string {
        try {
            return jwt.verify(token, this.secretKey) as string;
        } catch (e) {
            return "Token inválido";
        }
    }
}

export default JWT;