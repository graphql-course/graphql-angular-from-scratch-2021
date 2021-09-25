import { IUser } from "./../interfaces/user.interface";
import jwt from "jsonwebtoken";
/**
 * H = Horas
 * M = Minutos
 * D = Días
 */
export enum EXPIRETIME {
  H1 = 60 * 60,
  H24 = 24 * H1,
  M15 = H1 / 4,
  M20 = H1 / 3,
  D3 = H24 * 3,
}

class JWT {
  private secretKey = process.env.SECRET_KEY || "AnartzX_-MugikaJWT!!???";
  // Información del payload con fecha de caducidad de 24 horas
  sign(data: IUser, expiresIn: number = EXPIRETIME.H24): string {
    return jwt.sign({ user: data }, this.secretKey, {
      expiresIn,
    });
  }
  verify(token: string): string{
    try {
      return jwt.verify(token, this.secretKey) as string;
    } catch (e) {
      console.log(e);
      return "Token inválido";
    }
  }
}

export default JWT;
