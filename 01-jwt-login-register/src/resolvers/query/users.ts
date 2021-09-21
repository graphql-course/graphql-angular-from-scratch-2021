import { IResolvers } from "@graphql-tools/utils";
import { Db } from "mongodb";
import { IUser } from "../../interfaces/user.interface";

const queryUsersResolvers: IResolvers = {
  Query: {
    users: async (
      _: void,
      __: unknown,
      context: { db: Db }
    ): Promise<Array<IUser>> => {
      console.log();
      const users = await context.db.collection("users").find().toArray() as IUser[];
      const result: Array<IUser> = [];
      users.map((user) => {
        result.push(user);
      });
      return result;
    },
  },
};

export default queryUsersResolvers;
