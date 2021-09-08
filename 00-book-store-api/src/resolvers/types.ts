import { IResolvers } from "@graphql-tools/utils";
import data from "../data";

const typesResolvers: IResolvers = {
  Data: {
    __resolveType(obj: { name: string; isbn: string }) {
      // Only Author has a name field
      if (obj.name) {
        return "People";
      }
      // Only Book has a title field
      if (obj.isbn) {
        return "Book";
      }
      return null; // GraphQLError is thrown
    },
  },
  People: {
    booksBuy: (root: { books: Array<string> }) => {
      return data.books.filter((book) => root.books.indexOf(book.id) > -1);
    },
    website: (root: { website: string }) => {
      return root.website === undefined ? "" : root.website;
    },
    twitter: (root: { twitter: string }) => {
      return root.twitter === undefined
        ? ""
        : `https://twitter.com/${root.twitter}`;
    },
    github: (root: { github: string }) => {
      return root.github === undefined
        ? ""
        : `https://github.com/${root.github}`;
    },
  },
  Book: {
    byPeoplesBuy: (root: { id: string }) => {
      return data.people.filter((people) => people.books.indexOf(root.id) > -1);
    },
    publishedDate: (root: { publishedDate: string }) => {
      return root.publishedDate === undefined ? "?" : root.publishedDate;
    },
    thumbnailUrl: (root: { thumbnailUrl: string }) => {
      return root.thumbnailUrl === undefined ? "-" : root.thumbnailUrl;
    },
    shortDescription: (root: { shortDescription: string }) => {
      return root.shortDescription === undefined ? "-" : root.shortDescription;
    },
    longDescription: (root: { longDescription: string }) => {
      return root.longDescription === undefined ? "-" : root.longDescription;
    },
  },
};

export default typesResolvers;
