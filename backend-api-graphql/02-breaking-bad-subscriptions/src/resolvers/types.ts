import { Db } from "mongodb";
import { PHOTO_URL } from "../config/constants";
import { getCharacterVotes } from "../lib/db-operations";

const typesResolvers = {
  Character: {
    votes: async (parent: {id: string}, __: unknown, context: { db: Db }): Promise<number> => {
      return await getCharacterVotes(context.db, parent.id);
    },
    photo: (parent: {photo: string}): string => PHOTO_URL.concat(parent.photo),
  },
};

export default typesResolvers;
