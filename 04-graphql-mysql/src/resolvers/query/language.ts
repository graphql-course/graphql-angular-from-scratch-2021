import { IResolvers } from "@graphql-tools/utils";
import {
  LANGUAGES_LIST,
  LANGUAGES_SELECT_DETAILS,
} from "./../../constants/db-operations";

const resolverQueryLanguages: IResolvers = {
  Query: {
    languages(_, __, { connection }) {
      const languages = new Array(0);
      const sql = LANGUAGES_LIST;
      return new Promise((resolve, reject) => {
        connection.query(sql, function (error: unknown, results: Array<{
          id: number,
          name: string
        }>) {
          if (error) {
            reject("");
          }
          // Resultado correcto
          results.forEach((element: {
            id: number,
            name: string
          }) => {
            languages.push({
              id: element.id,
              name: element.name,
            });
          });
          resolve(languages);
        });
      });
    },
    language(_, { id }, { connection }) {
      const sql = LANGUAGES_SELECT_DETAILS;
      return new Promise((resolve, reject) => {
        connection.query(sql, [id], function (error: unknown, results: Array<{
          id: number,
          name: string
        }>) {
          if (error) {
            reject(null);
          }
          // Resultado correcto
          const element = results[0];
          let language;
          if (element === undefined || element === null) {
            language = null;
          } else {
            language = {
              id: element.id,
              name: element.name,
            };
          }
          resolve(language);
        });
      });
    },
  },
};

export default resolverQueryLanguages;
