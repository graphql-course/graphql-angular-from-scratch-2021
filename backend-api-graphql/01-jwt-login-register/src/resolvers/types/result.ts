import { ELEMENT_SELECT } from "./../../config/constants";
import { IResolvers } from "@graphql-tools/utils";

const resolverTypes: IResolvers = {
  Result: {
    __resolveType(root: { elementSelect: string }) {
     
      if (root.elementSelect === ELEMENT_SELECT.USER) {
        return "ResultUser";
      }
      if (root.elementSelect === ELEMENT_SELECT.TOKEN) {
        return "ResultToken";
      }
      return null; // GraphQLError is thrown
    },
  },
};

export default resolverTypes;
