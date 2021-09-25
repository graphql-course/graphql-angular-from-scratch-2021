import { IJwt } from "./../../interfaces/jwt.interface";
import { IResolvers } from "@graphql-tools/utils";
import JWT from "../../lib/jwt";

const queryMeResolver: IResolvers = {
  Query: {
    me: (_: void, __: unknown, { token }) => {
      console.log(token);
      // Mostramos toda la información
      const info = new JWT().verify(token);
      if (
        info ===
        "Token inválido"
      ) {
        return {
          status: false,
          message: info,
          user: null,
        };
      }

      return {
        status: true,
        message: "Token correcto",
        user: (info as unknown as IJwt).user,
      };
    },
  },
};

export default queryMeResolver;
