import { IResolvers } from "@graphql-tools/utils";
import data from "../../data";

const typesPeopleResolvers: IResolvers = {
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
  }
};

export default typesPeopleResolvers;
