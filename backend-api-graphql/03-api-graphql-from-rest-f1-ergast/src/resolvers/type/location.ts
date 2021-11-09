import { IResolvers } from "@graphql-tools/utils";

// Los resolvers de las operaciones de consulta para devolver información
const typesLocation: IResolvers = {
  Location: {
    lng: (parent) => parent.long,
  }
};

export default typesLocation;
