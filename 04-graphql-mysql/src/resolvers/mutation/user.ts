import { IResolvers } from "@graphql-tools/utils";
import {
  ADD_USER,
  UPDATE_USER,
  DELETE_USER_IN_USER_LANGUAGES,
  DELETE_USER,
} from "./../../constants/db-operations";

const resolverMutationUsers: IResolvers = {
  Mutation: {
    addUser(_, { user }, { connection }) {
      return new Promise((resolve, reject) => {
        connection.query(
          ADD_USER,
          [user.name, user.instructor, user.twitter, user.web],
          function (error: unknown, results: {insertId: number | string}) {
            if (error) {
              reject(error);
            }
            // Resultado correcto
            resolve(
              `Añadido correctamente el usuario con el ID ${results.insertId}`
            );
          }
        );
      });
    },
    updateUser(_, { user }, { connection }) {
      return new Promise((resolve, reject) => {
        connection.query(
          UPDATE_USER,
          [user.name, user.instructor, user.twitter, user.web, user.id],
          function (error: unknown) {
            if (error) {
              reject(error);
            }
            // Resultado correcto
            resolve(`Modificado correctamente el usuario con el ID ${user.id}`);
          }
        );
      });
    },
    deleteUser(_, { id }, { connection }) {
      return new Promise((resolve, reject) => {
        connection.query(
          DELETE_USER_IN_USER_LANGUAGES,
          [id],
          function (error: unknown) {
            if (error) {
              reject(error);
            }
            connection.query(DELETE_USER, [id], function (error: unknown) {
              if (error) {
                reject(error);
              }
              // Resultado correcto
              resolve(`Eliminado correctamente el usuario con el ID ${id}`);
            });
          }
        );
      });
    },
  },
};

export default resolverMutationUsers;
