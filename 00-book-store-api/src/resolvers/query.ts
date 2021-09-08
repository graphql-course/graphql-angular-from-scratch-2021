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
    },
    book: (_: void, args: {id: string} ): IBook => {
      return data.books.filter(
        (value) => value.id === args.id
      )[0]
    },
    people: (_: void, args: {id: string} ): IPeople => {
      return data.people.filter(
        (value) => value.id === args.id
      )[0]
    }
  },
};

export default queryResolvers;
