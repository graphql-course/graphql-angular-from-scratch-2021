import { IResolvers } from "@graphql-tools/utils";
import data from "../data";
import { IBook } from "../interfaces/book-interface";

const mutationResolvers: IResolvers = {
  Mutation: {
    addBook: (
      _: void,
      args: { book: IBook }
    ): {
      status: boolean;
      message: string;
      item?: IBook;
    } => {
      // Validamos si el título existe en uno de los libros existentes (DUPLICADO)
      if (
        data.books.filter((value) => value.title === args.book.title).length > 0
      ) {
        return {
          status: false,
          message: `El libro que estás introduciendo ya existe. Prueba con otro por favor`,
        };
      }
      const idValue = +data.books[data.books.length - 1].id + 1;
      args.book.id = String(idValue);
      (data.books as IBook[]).push(args.book);
      return {
        status: true,
        message: `Libro con el título ${args.book.title} ha sido añadido correctamente`,
        item: args.book,
      };
    },
    updateBook: ( _: void,
      args: { book: IBook }): {
        status: boolean;
        message: string;
        item?: IBook;
      } => {
        // Buscamos si el libro existe
        if (data.books.filter(
          (bookItem: IBook) => bookItem.id === args.book.id
        ).length === 0) {
          return {
            status: false,
            message: "El libro que estás introduciendo no existe y no puedes actualizarlo. Revisa que ese id sea el correcto"
          }
        }

        // Actualizamos el libro cuando lo encontremos
        for(let i = 0; i < data.books.length; i++) {
          if (data.books[i].id === args.book.id) {
            (data.books[i] as IBook) = args.book;
            break;
          }
        }
        return {
          status: true,
          message: "Actualizado correctamente el libro seleccionado",
          item : args.book
        }
      }
    /**
         * addBook(id: ID!): Boolean
  updateBook(id: ID!): Boolean
  deleteBook(id: ID!): Boolean
         */
  },
};

export default mutationResolvers;
