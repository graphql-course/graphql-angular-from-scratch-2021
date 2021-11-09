import { Db } from "mongodb";
import { ICharacter } from "../interfaces/character.interface";
import { getCharacters, getCharacter } from "../lib/db-operations";

// Resolver map
const queryResolvers = {
    Query: {
      async characters(_: void, __: unknown, context: { db: Db }):
      Promise<Array<ICharacter>> {
        return await getCharacters(context.db);
      },
      async character(_: void, { id }: unknown, context: { db: Db }):
      Promise<ICharacter>{
        return await getCharacter(context.db, id);
      },
    }
    
  };
export default queryResolvers;
  