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
    booksList: (): {
      status: boolean,
      message: string,
      list: Array<IBook>
    } => {
      return {
        status: true,
        message: "Lista de libros correctamente cargada",
        list: data.books
      };
    },
    peoplesList: (): Array<IPeople> => {
      return data.people;
    },
    book: (_: void, args: {id: string} ): {
      status: boolean,
      message: string,
      item: IBook
    } => {
      const bookFind = data.books.filter(
        (value) => value.id === args.id
      )[0];

      return {
        status: bookFind === undefined ? false : true,
        message: bookFind === undefined ? 
          `Libro con el id ${args.id} no ha sido encontrado`:
          `Libro con el id ${args.id} ha sido encontrado`,
        item: bookFind
      }
    },
    people: (_: void, args: {id: string} ): IPeople => {
      return data.people.filter(
        (value) => value.id === args.id
      )[0]
    }
  },
};

export default queryResolvers;
