import { Db } from "mongodb";
import { IResolvers } from "@graphql-tools/utils";
import { IUser } from "../../interfaces/user.interface";

const mutationUsersResolvers: IResolvers = {
  Mutation: {
    add: async (
      _: void,
      args: { user: IUser },
      context: { db: Db }
    ): Promise<boolean> => {
      // Comprobar si existe el usuario en la base de datos con el correo
      // Si existe, error mostrando feedback

      // Usuario sin password definido, mostrar error

      // Si todo va bien y tenemos la información para almacenar
      // Asignar el ID nuevo automáticamente, basándonos
      const lastElement = await context.db
        .collection("users")
        .find()
        .limit(1)
        .sort({ registerDate: -1 })
        .toArray();

      if (lastElement.length === 0) {
        args.user.id = "1";
        return true;
      }
      args.user.id = String(+lastElement[0].id + 1);

      return true;
    },
  },
};

export default mutationUsersResolvers;
