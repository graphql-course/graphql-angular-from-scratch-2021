export interface LoginResult {
    status: boolean;
    message: string;
    token?: string;
}

export interface LoginData {
    email: string;
    password: string;
}
