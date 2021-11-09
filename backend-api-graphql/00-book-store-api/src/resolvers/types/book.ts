import { IResolvers } from "@graphql-tools/utils";
import data from "../../data";

const typesBookResolvers: IResolvers = {
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

export default typesBookResolvers;
