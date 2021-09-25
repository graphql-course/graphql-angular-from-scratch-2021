import { Db } from "mongodb";
import { IResolvers } from "@graphql-tools/utils";
import { IUser } from "../../../interfaces/user.interface";
import JWT from "../../../lib/jwt";

const mutationUsersModifyResolvers: IResolvers = {
  Mutation: {
    modify: async (
      _: void,
      args: { user: IUser },
      context: { db: Db; token: string }
    ): Promise<{
      status: boolean;
      message: string;
      user?: IUser;
    }> => {
      // Lo primero, comprobamoss si tenemos permisos (token válido)
      if (new JWT().verify(context.token) === "Token inválido") {
        return {
          status: false,
          message:
            "Para poder hacer modificaciones, tienes que autenticarte con un token de usuario",
        };
      }
      // Comprobar si existe el usuario en la base de datos con el correo y el id
      // Si existe, seguimos. Si no, mostrammos mensaje de que no existe
      const userData: IUser = (await context.db
        .collection("users")
        .findOne({ email: args.user.email, id: args.user.id })) as IUser;

      if (!userData) {
        return {
          status: false,
          message:
            "Usuario NO se puede actualizar por no estar registrado. ¿Estás seguro que has introducido correctamente los datos?",
        };
      }
      // Ahora existe, asignamos la nueva información
      // Primero tenemos un valor provisional con el password
      args.user = Object.assign(args.user, { password: userData.password });

      // Añadir el usuario a la base de datos
      return await context.db
        .collection("users")
        .updateOne({ id: args.user.id }, { $set: args.user })
        .then((data) => {
          console.log(data);
          console.log("Actualizado correctamente");
          return {
            status: true,
            message: "Usuario actualizado correctamente",
            user: args.user,
          };
        })
        .catch((error) => {
          return {
            status: false,
            message: `Usuario no se ha actualizado: ${error}`,
          };
        });
    },
  },
};

export default mutationUsersModifyResolvers;
