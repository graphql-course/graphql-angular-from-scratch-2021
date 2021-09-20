import { IResolvers } from "@graphql-tools/utils";
import { Db } from "mongodb";
import { IUser } from "../../interfaces/user.interface";

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
        status: boolean,
        message: string,
        user?: IUser
    }> => {
      return await context.db
        .collection("users")
        .findOne({
          email: args.email,
          password: args.password,
        })
        .then((user) => {
          delete user?._id;
          return {
              status: true,
              message: "OK",
              user: user as IUser
          };
        })
        .catch(() => {
          return {
            status: false,
            message: "kdkdkdkdd",
          };
        });
    },
  },
};

export default queryLoginResolvers;
