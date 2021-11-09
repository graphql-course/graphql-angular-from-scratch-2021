import { IUser } from "../../../interfaces/user.interface";
import { IResolvers } from "@graphql-tools/utils";
import { Db } from "mongodb";
import JWT from "../../../lib/jwt";
import { ELEMENT_SELECT, UPDATE_MESSAGES } from "../../../config/constants";
const mutationUserUpdateResolvers: IResolvers = {
  Mutation: {
    update: async (
      _: void,
      args: { user: IUser },
      context: { db: Db, token: string }
    ): Promise<{
      status: boolean,
      message: string,
      elementSelect: string,
      user?: IUser
    }> => { 
      // Verificar el token para poder realizar la operación
      const info = new JWT().verify(context.token);
      if(info === "Token inválido") {
        return {
          status: false,
          message: UPDATE_MESSAGES.NO_TOKEN,
          elementSelect: ELEMENT_SELECT.USER
        };
      }
      // Verificar si el usuario existe mediante el id
      const userData: IUser = await context.db.collection("users")
      .findOne({ id: args.user.id}) as IUser;
      // Si no existe el usuario
      if (!userData) {
        return {
          status: false,
          message: UPDATE_MESSAGES.USER_NOT_UPDATE,
          elementSelect: ELEMENT_SELECT.USER
        };
      }
      args.user = Object.assign(args.user, { password: userData.password, registerDate: userData.registerDate});
      // Operación de modificar la información del usuario seleccionado
      // Insertar el usuario en la base de datos
      return await context.db
        .collection("users")
        .updateOne({id: args.user.id}, {$set: args.user})
        .then(() => {
          
          return {
            status: true,
            message: "actualizado correctamente el usuario",
            elementSelect: ELEMENT_SELECT.USER,
            user: args.user
          };
        })
        .catch((error) => {
          console.log(`ERROR: ${error}`);
          return {
            status: false,
            message: `ERROR - No Actualizado: ${error}`,
            elementSelect: ELEMENT_SELECT.USER
          };
        });
    }
  },
};

export default mutationUserUpdateResolvers;
