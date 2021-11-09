/**
 * Query - Usuarios
 */
export const USERS_LIST = "SELECT * FROM `users`";
export const USERS_SELECT_DETAILS = "SELECT * FROM `users` WHERE id = ? ";
/**
 * Query - Lenguajes de programación
 */
export const LANGUAGES_LIST = "SELECT * FROM `languages`";
export const LANGUAGES_SELECT_DETAILS =
  "SELECT * FROM `languages` WHERE id = ? ";

/**
 * Query - Relaciones para obtener la lista de información que corresponde
 * a un usuario o lenguaje de programación seleccionados
 */
export const USERS_LANGUAGES_LIST =
  "SELECT UL.user, UL.language, L.name FROM `users-languages` AS UL INNER JOIN `languages` AS L ON UL.language = L.id WHERE user = ?";
export const LANGUAGES_USERS_LIST =
  "SELECT UL.user, UL.language, U.name, U.web, U.instructor, U.twitter FROM `users-languages` AS UL INNER JOIN `users` AS U ON UL.user = U.id WHERE language = ?";

/**
 * Mutation - Insertar información
 */
export const ADD_USER =
  "INSERT INTO `users` (`id`, `name`, `instructor`, `twitter`, `web`) VALUES (NULL, ?, ?, ?, ?)";
export const ADD_LANGUAGE =
  "INSERT INTO `languages` (`id`, `name`) VALUES (NULL, ?)";

/**
 * Mutation - Modificar información
 */
export const UPDATE_USER =
  "UPDATE `users` SET `name` = ?, `instructor` = ?, `twitter` = ?, `web` = ? WHERE `users`.`id` = ?";
export const UPDATE_LANGUAGE =
  "UPDATE `languages` SET `name` = ? WHERE `languages`.`id` = ?";

/**
 * Mutation - Eliminar Información
 */
export const DELETE_USER = "DELETE FROM `users` WHERE `users`.`id` = ?";
export const DELETE_USER_IN_USER_LANGUAGES =
  "DELETE FROM `users-languages` WHERE `users-languages`.`user` = ?";

export const DELETE_LANGUAGE =
  "DELETE FROM `languages` WHERE `languages`.`id` = ?";
export const DELETE_LANGUAGE_IN_USER_LANGUAGES =
  "DELETE FROM `users-languages` WHERE `users-languages`.`language` = ?";
