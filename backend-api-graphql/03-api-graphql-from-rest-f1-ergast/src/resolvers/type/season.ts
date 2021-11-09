import { IResolvers } from "@graphql-tools/utils";
import { getWikipediaMobileUrl } from "./../../lib/utils";

// Los resolvers de las operaciones de consulta para devolver información
const typesSeason: IResolvers = {
  Season: {
    year: (parent) => parent.season,
    urlMobile: (parent) => getWikipediaMobileUrl(parent.url),
  }
};

export default typesSeason;
