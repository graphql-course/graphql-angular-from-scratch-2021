import bcrypt from "bcrypt";
import { IResolvers } from "@graphql-tools/utils";
import { Db } from "mongodb";
import { IUser } from "../interfaces/user.interface";
import JWT from "../lib/jwt";

const queryResolvers: IResolvers = {
  Query: {
    users: async(_: void, __: unknown, context: { db: Db}) : Promise<Array<IUser>> => {
      return await context.db.collection("users").find().toArray() as Array<IUser>;
    },
    login: async(_: void, args: {
      email: string, password: string
    }, context: { db: Db}): Promise<{
      status: boolean,
      message: string,
      token?: string
    }> => {
      return await context.db.collection("users").findOne(
        { email: args.email}
      ).then((user) => {
        if (!user) {
          return {
            status: false,
            message: "Usuario no existe, comprueba que has introducido correctamente el correo"
          };
        }
        // Comprobamos el password
        if (!bcrypt.compareSync(args.password, user.password)) {
          return {
            status: false,
            message: "Pasword no correcto, comprueba de nuevo introduciéndolo"
          };
        }
        delete user?._id;
        delete user.password;
        delete user.registerDate;
        return {
          status: true,
          message: "Usuario correctamente cargado",
          token: new JWT().sign(user as IUser)
        };
      }).catch((error) => {
        return {
          status: false,
          message: `Error: ${error}`
        };
      });
    }
  },
};

export default queryResolvers;
