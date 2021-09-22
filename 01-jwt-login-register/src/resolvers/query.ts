import { IResolvers } from "@graphql-tools/utils";
import { Db } from "mongodb";
import { IUser } from "../interfaces/user.interface";

const queryResolvers: IResolvers = {
  Query: {
    users: async(_: void, __: unknown, context: { db: Db}) : Promise<Array<IUser>> => {
      return await context.db.collection("users").find().toArray() as Array<IUser>;
    }
  },
};

export default queryResolvers;
