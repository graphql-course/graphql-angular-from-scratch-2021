import { IResolvers } from "@graphql-tools/utils";
import { IUser } from "../../interfaces/user.interface";
import JWT from "../../lib/jwt";

const queryMeResolvers: IResolvers = {
  Query: {
    me: (_: void, __: unknown, context: { token: string }): {
      status: boolean,
      message: string,
      user?: IUser
    } => {
      console.log(context.token);
      const info = new JWT().verify(context.token);
      if(info === "Token inválido") {
        return {
          status: false,
          message: "Token no correcto por estar caducado o inválido"
        };
      }
      return {
        status: true,
        message: "Token correcto para utilizar la información almacenada",
        user: (info as unknown as { user: IUser}).user
      };
    }
  },
};

export default queryMeResolvers;
