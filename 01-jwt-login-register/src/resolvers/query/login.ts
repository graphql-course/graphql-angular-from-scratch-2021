import { LOGIN_MESSAGES } from "./../../config/constants";
import bcrypt from "bcrypt";
import { IResolvers } from "@graphql-tools/utils";
import { Db } from "mongodb";
import { IUser } from "../../interfaces/user.interface";
import JWT from "../../lib/jwt";

const queryLoginResolvers: IResolvers = {
  Query: {
    login: async (
      _: void,
      args: {
        email: string;
        password: string;
      },
      context: { db: Db }
    ): Promise<{
      status: boolean;
      message: string;
      token?: string;
    }> => {
      return await context.db
        .collection("users")
        .findOne({ email: args.email })
        .then((user) => {
          if (!user) {
            return {
              status: false,
              message: LOGIN_MESSAGES.USER_EXIST,
            };
          }
          // Comprobamos el password
          if (!bcrypt.compareSync(args.password, user.password)) {
            return {
              status: false,
              message: LOGIN_MESSAGES.PASSWORD_NO_CORRECT,
            };
          }
          delete user?._id;
          delete user.password;
          delete user.registerDate;
          return {
            status: true,
            message: "Usuario correctamente cargado",
            token: new JWT().sign(user as IUser),
          };
        })
        .catch((error) => {
          return {
            status: false,
            message: `Error (Login): ${error}`,
          };
        });
    },
  },
};

export default queryLoginResolvers;
