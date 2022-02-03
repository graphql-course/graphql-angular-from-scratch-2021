import { IResolvers } from "@graphql-tools/utils";

const typesUnionResolvers: IResolvers = {
  Data: {
    __resolveType(
      _: unknown, // object (root)
      __: unknown, // context
      info: {
        // info
        operation: {
          name: {
            value: string;
          };
        };
      }
    ) {
      return info.operation.name.value.search("Book") > -1 ? "Book" : "People";

      // Only Author has a name field
      /*if (obj.name) {
        return "People";
      }
      // Only Book has a title field
      if (obj.isbn) {
        return "Book";
      }
      return null; // GraphQLError is thrown*/
    },
  },
};

export default typesUnionResolvers;
