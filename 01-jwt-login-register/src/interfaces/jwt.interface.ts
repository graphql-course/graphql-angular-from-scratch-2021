import { IUser } from "./user.interface";

export interface IJwt {
    user: IUser;
    iat: number;
    exp: number;
    messge?: string;
}