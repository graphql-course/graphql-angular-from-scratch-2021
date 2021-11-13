import { User } from './../users/user.interface';

export interface RegisterResult {
    status: boolean;
    message: string;
    user?: User;
}

export interface RegisterData {
    name: string;
    lastname: string;
    email: string;
    password: string;
    repeatPass?: string;
}
