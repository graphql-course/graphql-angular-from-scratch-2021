import { Db } from "mongodb";
import { IResolvers } from "@graphql-tools/utils";
import { IUser } from "../../interfaces/user.interface";

const mutationUsersResolvers: IResolvers = {
  Mutation: {
    add: async (
      _: void,
      args: { user: IUser },
      context: { db: Db }
    ): Promise<{
      status: boolean;
      message: string;
      user?: IUser;
    }> => {
      // Comprobar si existe el usuario en la base de datos con el correo
      // Si existe, error mostrando feedback
      const userCheck = await context.db
        .collection("users")
        .findOne({ email: args.user.email });

      if (userCheck !== null) {
        return {
          status: false,
          message: `Usuario NO registrado porque ya existe el usuario ${args.user.email}`,
        };
      }

      // Usuario sin password definido, mostrar error

      if (!args.user.password) {
        return {
          status: false,
          message: `Debes de especificar un password para crear el usuario`,
        };
      }

      // Si todo va bien y tenemos la información para almacenar
      // Asignar el ID nuevo automáticamente, basándonos
      const lastElement = await context.db
        .collection("users")
        .find()
        .limit(1)
        .sort({ registerDate: -1 })
        .toArray();

      args.user.id =
        lastElement.length === 0 ? "1" : String(+lastElement[0].id + 1);
      args.user.registerDate = new Date().toISOString();
      // Añadir el usuario a la base de datos
      return await context.db
        .collection("users")
        .insertOne(args.user)
        .then((data) => {
          console.log(data);
          console.log("Añadido correctamente");
          return {
            status: true,
            message: "Usuario añadido correctamente",
            user: args.user,
          };
        })
        .catch((error) => {
          return {
            status: false,
            message: `Usuario no se ha añadido: ${error}`,
          };
        });
    },
  },
};

export default mutationUsersResolvers;
