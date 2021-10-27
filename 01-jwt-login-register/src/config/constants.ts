export const UPDATE_MESSAGES = {
    NO_TOKEN : "Token no correcto por estar caducado o inválido. No puedes actualizar el usuario por no tener permiso",
    USER_NOT_UPDATE : "Usuario No se puede actualizar. No está registrado. ¿Estás seguro que has introducido correctamente los datos?"
};

export const ADD_MESSAGES = {
    NO_PASSWORD: "Password no establecido / asignado",
    USER_EXIST: "Usuario existe y no podemos registrarnos"
};

export const FEEDBACK_MESSAGES_RESULT_USER: Array<string> = [
    UPDATE_MESSAGES.NO_TOKEN,
    UPDATE_MESSAGES.USER_NOT_UPDATE,
    ADD_MESSAGES.NO_PASSWORD,
    ADD_MESSAGES.USER_EXIST
];

export const ME_MESSAGES = {
    TOKEN_CORRECT: "Token correcto para utilizar la información almacenada",
    TOKEN_EXPIRED: "Token no correcto por estar caducado o inválido",
};

export const LOGIN_MESSAGES = {
    PASSWORD_NO_CORRECT: "Pasword no correcto, comprueba de nuevo introduciéndolo",
    USER_EXIST: "Usuario no existe, comprueba que has introducido correctamente el correo"
};

export const FEEDBACK_MESSAGES_RESULT_TOKEN: Array<string> = [
    ME_MESSAGES.TOKEN_EXPIRED,
    LOGIN_MESSAGES.PASSWORD_NO_CORRECT,
    LOGIN_MESSAGES.USER_EXIST
];