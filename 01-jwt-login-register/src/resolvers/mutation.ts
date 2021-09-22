import { IUser } from "./../interfaces/user.interface";
import { IResolvers } from "@graphql-tools/utils";
import { Db } from "mongodb";

const mutationResolvers: IResolvers = {
  Mutation: {
    add: async (
      _: void,
      args: { user: IUser },
      context: { db: Db }
    ): Promise<boolean> => {
      // Comprobar si existe el usuario en la base de datos con el correo
      // Si existe, error mostrando feedback
      const userCheck = await context.db.collection("users").findOne(
        { email: args.user.email}
      );

      if (userCheck) {
        console.log("Usuario existe y no podemos registrarnos");
        return false;
      }

      // Usuario sin password definido, mostrar error si se cumple
      if (!args.user.password) {
        console.log("Password no establecido / asignado");
        return false;
      }

      // YA TENEMOS LO NECESARIO PARA AÑADIR
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

      console.log(args.user);

      // Añadir la fecha de registro antes de almacenar
      args.user.registerDate = new Date().toISOString();
      // Encriptar password antes de almacenar

      // Insertar el usuario en la base de datos
      return await context.db
        .collection("users")
        .insertOne(args.user)
        .then(() => {
          console.log("Añadido correctamente");
          return true;
        })
        .catch((error) => {
          console.log(`ERROR: ${error}`);
          return false;
        });
    },
  },
};

export default mutationResolvers;
