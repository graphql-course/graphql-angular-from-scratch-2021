import queryResolvers from "./query";
import typesResolvers from "./types";


const resolverIndex = {
    ...queryResolvers,
    ...typesResolvers
}

export default resolverIndex;