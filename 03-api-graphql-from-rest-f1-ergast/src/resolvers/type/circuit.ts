import { IResolvers } from "@graphql-tools/utils";
import { getWikipediaMobileUrl } from "./../../lib/utils";

// Los resolvers de las operaciones de consulta para devolver información
const typesCircuit: IResolvers = {
  Circuit: {
    id: (parent) => parent.circuitId,
    name: (parent) => parent.circuitName,
    location: (parent) => parent.Location,
    urlMobile: (parent) => getWikipediaMobileUrl(parent.url),
  }
};

export default typesCircuit;
