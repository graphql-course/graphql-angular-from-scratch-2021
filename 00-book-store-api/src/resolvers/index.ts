import mutationResolvers from "./mutation";
import queryResolvers from "./query";
import typesResolvers from "./types";


const resolverIndex = {
    ...queryResolvers,
    ...mutationResolvers,
    ...typesResolvers
}

export default resolverIndex;