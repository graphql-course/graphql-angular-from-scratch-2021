import { IResolvers } from "@graphql-tools/utils";
import { LANGUAGES_USERS_LIST } from "./../../constants/db-operations";

const resolverTypesLanguages: IResolvers = {
  Language: {
    users(parent, __, { connection }) {
      const users = new Array(0);
      const sql = LANGUAGES_USERS_LIST;
      return new Promise((resolve, reject) => {
        connection.query(sql, [parent.id], function (error: unknown, results: Array<{
          user: number,
          instructor: string,
          name: string,
          twitter: string,
          web: string
        }>) {
          if (error) {
            reject(users);
          }
          // Resultado correcto
          results.forEach((element: {
            user: number,
            instructor: string,
            name: string,
            twitter: string,
            web: string
          }) => {
            users.push({
              id: element.user,
              name: element.name,
              instructor: element.instructor,
              twitter: element.twitter,
              web: element.web,
            });
          });
          resolve(users);
        });
      });
    },
  },
};
export default resolverTypesLanguages;
