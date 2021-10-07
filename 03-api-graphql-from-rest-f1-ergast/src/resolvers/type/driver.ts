import { IResolvers } from "@graphql-tools/utils";
import { getWikipediaMobileUrl } from "./../../lib/utils";

// Los resolvers de las operaciones de consulta para devolver información
const typesDriver: IResolvers = {
  Driver: {
    id: (parent) => parent.driverId,
    name: (parent) => parent.givenName.concat(" ").concat(parent.familyName),
    urlMobile: (parent) => getWikipediaMobileUrl(parent.url),
  },
  DriverStanding: {
    driver: (parent) => parent.Driver,
    constructors: (parent) => parent.Constructors,
  }
};

export default typesDriver;
