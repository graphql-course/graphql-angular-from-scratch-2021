import { IBook } from './../interfaces/book-interface';
import { IResolvers } from "@graphql-tools/utils";
import data from "../data";
import { IPeople } from '../interfaces/people-interface';

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
    booksList: (): Array<IBook> => {
      return data.books;
    },
    peoplesList: (): Array<IPeople> => {
      return data.people;
    }
  },
};

export default queryResolvers;
