import { IResolvers } from "@graphql-tools/utils";
import {
  USERS_LIST,
  USERS_SELECT_DETAILS,
} from "./../../constants/db-operations";

const resolverQueryUsers: IResolvers = {
  Query: {
    users(_, __, { connection }) {
      const users = new Array(0);
      const sql = USERS_LIST;
      return new Promise((resolve, reject) => {
        connection.query(sql, function (error: unknown, results: Array<{
          id: number,
          instructor: string,
          name: string,
          twitter: string,
          web: string
        }>) {
          if (error) {
            reject("");
          }
          // Resultado correcto
          results.forEach((element: {
            id: number,
            instructor: string,
            name: string,
            twitter: string,
            web: string
          }) => {
            users.push({
              id: element.id,
              name: element.name,
              instructor: element.instructor,
              twitter: element.twitter,
              web: element.web,
            });
          });
          console.log(users);
          resolve(users);
        });
      });
    },
    user(_, { id }, { connection }) {
      const sql = USERS_SELECT_DETAILS;
      return new Promise((resolve, reject) => {
        connection.query(sql, [id], function (error: unknown, results: Array<{
          id: number,
          instructor: string,
          name: string,
          twitter: string,
          web: string
        }>) {
          if (error) {
            reject(null);
          }
          // Resultado correcto
          const element = results[0];
          let user;
          if (element === undefined || element === null) {
            user = null;
          } else {
            user = {
              id: element.id,
              name: element.name,
              instructor: element.instructor,
              twitter: element.twitter,
              web: element.web,
            };
          }
          console.log(user);
          resolve(user);
        });
      });
    },
  },
};

export default resolverQueryUsers;
