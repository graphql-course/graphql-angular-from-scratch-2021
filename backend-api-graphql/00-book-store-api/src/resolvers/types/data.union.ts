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
      let type = null;
      ["Book", "People"].map((object) => {
        if (info.operation.name.value.search(object) > -1) {
          type = object;
        }
      });
      return type;
    },
  },
};

export default typesUnionResolvers;
