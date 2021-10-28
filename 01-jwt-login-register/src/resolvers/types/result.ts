import { ELEMENT_SELECT } from "./../../config/constants";
import { IResolvers } from "@graphql-tools/utils";

const typesResolvers: IResolvers = {
  Result: {
    __resolveType(root: { elementSelect: string }) {
      // Respuesta con ResultUser
      // Si user es null pero trae un mensaje de los de validación
      // Lo acepta como respuesta válida
      if (root.elementSelect === ELEMENT_SELECT.USER) {
        return "ResultUser";
      }
      // Respuesta con ResultToken
      if (root.elementSelect === ELEMENT_SELECT.TOKEN) {
        return "ResultToken";
      }
      return null; // GraphQLError is thrown
    },
  },
};

export default typesResolvers;
