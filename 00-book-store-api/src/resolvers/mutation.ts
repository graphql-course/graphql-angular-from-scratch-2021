import { IResolvers } from '@graphql-tools/utils';
import data from '../data';
import { IBook } from '../interfaces/book-interface';


const mutationResolvers:IResolvers = {
    Mutation: {
        addBook: (_: void, args: {book: IBook}): {
            status: boolean,
            message: string,
            item: IBook
        } => {
            const idValue = +data.books[data.books.length - 1].id + 1;
            args.book.id = String(idValue);
            (data.books as IBook[]).push(args.book);
            return {
                status: true,
                message: `Libro con el título ${args.book.title} ha sido añadido correctamente`,
                item: args.book
            }
        }
        /**
         * addBook(id: ID!): Boolean
  updateBook(id: ID!): Boolean
  deleteBook(id: ID!): Boolean
         */
    }
}

export default mutationResolvers;