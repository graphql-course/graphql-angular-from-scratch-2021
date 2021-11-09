import { IResolvers } from "@graphql-tools/utils";
import { getWikipediaMobileUrl } from "./../../lib/utils";

// Los resolvers de las operaciones de consulta para devolver información
const typesConstructor: IResolvers = {
  Constructor: {
    id: (parent) => parent.constructorId,
    urlMobile: (parent) => getWikipediaMobileUrl(parent.url),
  },
};

export default typesConstructor;
