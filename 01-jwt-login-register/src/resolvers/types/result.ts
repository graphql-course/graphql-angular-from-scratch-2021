import { FEEDBACK_MESSAGES_RESULT_TOKEN, FEEDBACK_MESSAGES_RESULT_USER } from "./../../config/constants";
import { IResolvers } from "@graphql-tools/utils";
import { IUser } from "../../interfaces/user.interface";

const typesResolvers: IResolvers = {
  Result: {
    __resolveType(root: { message: string; user: IUser; token: string }) {
      // Respuesta con ResultUser
      // Si user es null pero trae un mensaje de los de validación
      // Lo acepta como respuesta válida
      if (root.user || FEEDBACK_MESSAGES_RESULT_USER.includes(root.message)) {
        return "ResultUser";
      }
      // Respuesta con ResultToken
      if (root.token || FEEDBACK_MESSAGES_RESULT_TOKEN.includes(root.message)) {
        return "ResultToken";
      }
      return null; // GraphQLError is thrown
    },
  },
};

export default typesResolvers;
