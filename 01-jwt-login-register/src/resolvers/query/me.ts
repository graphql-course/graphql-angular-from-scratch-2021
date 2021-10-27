import { ME_MESSAGES } from "./../../config/constants";
import { IResolvers } from "@graphql-tools/utils";
import { IUser } from "../../interfaces/user.interface";
import JWT from "../../lib/jwt";

const queryMeResolvers: IResolvers = {
  Query: {
    me: (
      _: void,
      __: unknown,
      context: { token: string }
    ): {
      status: boolean;
      message: string;
      user?: IUser;
    } => {
      console.log(context.token);
      const info = new JWT().verify(context.token);
      if (info === "Token inválido") {
        return {
          status: false,
          message: ME_MESSAGES.TOKEN_EXPIRED,
        };
      }
      return {
        status: true,
        message: ME_MESSAGES.TOKEN_CORRECT,
        user: (info as unknown as { user: IUser }).user,
      };
    },
  },
};

export default queryMeResolvers;
