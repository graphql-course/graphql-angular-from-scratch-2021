import { IResolvers } from "@graphql-tools/utils";
import { IUser } from "../../interfaces/user.interface";


const typesResolvers: IResolvers = {
    Result: {
        __resolveType(root: { user: IUser, token: string}){
          // Respuesta con ResultUser
          if(root.user){
            return "ResultUser";
          }
          // Respuesta con ResultToken
          if(root.token){
            return "ResultToken";
          }
          return null; // GraphQLError is thrown
        },
      },
};

export default typesResolvers;