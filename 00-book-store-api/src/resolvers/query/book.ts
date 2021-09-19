import { IBook } from "../../interfaces/book-interface";
import { IResolvers } from "@graphql-tools/utils";
import data from "../../data";

const queryBookResolvers: IResolvers = {
  Query: {
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
      };
    }
  },
};

export default queryBookResolvers;
