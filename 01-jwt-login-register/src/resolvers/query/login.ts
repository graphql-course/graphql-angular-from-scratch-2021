import bcrypt from "bcrypt";
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
      status: boolean;
      message: string;
      user?: IUser;
    }> => {
      const userSelect = await context.db.collection("users").findOne({
        email: args.email,
      });

      if (userSelect === null) {
        return {
          status: false,
          message: "Login INCORRECTO. No existe el usuario",
        };
      }
      // Comprobar lo introducido con el password encriptado
      if (!bcrypt.compareSync(args.password, userSelect.password)) {
        return {
          status: false,
          message: "Login INCORRECTO. Contraseña incorrecta",
        };
      }
      delete userSelect.password;
      return {
        status: true,
        message: "Login Correcto",
        // Devolver token
      };
    },
  },
};

export default queryLoginResolvers;
