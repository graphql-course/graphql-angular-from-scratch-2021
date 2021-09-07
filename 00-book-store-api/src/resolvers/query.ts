import { IResolvers } from "@graphql-tools/utils";

const queryResolvers: IResolvers = {
  Query: {
    hello: (): string => "Hola a la API de GraphQL",
    helloWithName: (
      _: void,
      args: { name: string },
      context: any,
      info: object
    ) => {
      console.log(info);
      return `Hola ${args.name}`;
    },
    peopleNumber: () => 189303,
  },
};

export default queryResolvers;
