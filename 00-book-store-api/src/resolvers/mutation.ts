import { IResolvers } from '@graphql-tools/utils';
import { IBook } from '../interfaces/book-interface';


const mutationResolvers:IResolvers = {
    Mutation: {
        addBook: (_: void, args: {book: IBook}): boolean => {
            console.log(args.book)
            return true;
        }
        /**
         * addBook(id: ID!): Boolean
  updateBook(id: ID!): Boolean
  deleteBook(id: ID!): Boolean
         */
    }
}

export default mutationResolvers;