import { Db } from "mongodb";
import { PubSub } from "graphql-subscriptions";
import {
  CHANGE_VOTE,
  CHANGE_VOTES,
  COLLECTIONS,
} from "../config/constants";
import {
  getCharacters,
  getCharacter,
  asignVoteId,
  getVote,
} from "../lib/db-operations";
import { ICharacter } from "../interfaces/character.interface";

async function response(status: boolean, message: string, db: Db) {
  const characters = await getCharacters(db);
  return {
    status,
    message,
    characters,
  };
}
async function sendNotification(pubsub: PubSub, db: Db, id: string) {
  const characters: Array<ICharacter> = await getCharacters(db);
  pubsub.publish(CHANGE_VOTES, { changeVotes: characters });
  if (id !== "") {
    // FIltrar el personaje seleccionado de la lista
    const selectCharacter = characters.filter((c: ICharacter) => c.id == id)[0];
    pubsub.publish(CHANGE_VOTE, { changeVote: selectCharacter });
  }
}
const mutationResolvers = {
  Mutation: {
    async addVote(
      _: void,
      args: { character: string },
      context: { db: Db; pubsub: PubSub }
    ): Promise<{
      status: boolean,
      message: string,
      characters?: Array<ICharacter>
    }> {
      // Comprobar que el personaje existe
      const selectCharacter = await getCharacter(context.db, args.character);
      if (selectCharacter === null || selectCharacter === undefined) {
        return {
          status: false,
          message:
            "El voto NO se ha emitido. Personaje NO existe Prueba de nuevo por favor"
        };
      }

      // Obtenemos el id del voto y creamos el objeto del voto
      const vote = {
        id: await asignVoteId(context.db),
        character: args.character,
        createdAt: new Date().toISOString(),
      };
      // Añadimos el voto
      return await context.db
        .collection(COLLECTIONS.VOTES)
        .insertOne(vote)
        .then(async () => {
          sendNotification(context.pubsub, context.db, "");
          return response(
            true,
            "El voto se ha emitido.",
            context.db
          );
        })
        .catch(async () => {
          return response(
            false,
            "El voto NO se ha emitido. Prueba de nuevo por favor",
            context.db
          );
        });
    },
    async updateVote(
      _: void,
      { id, character }: unknown,
      context: { db: Db; pubsub: PubSub }
    ) : Promise<{
      status: boolean,
      message: string,
      characters?: Array<ICharacter>
    }>{
      // Comprobar que el personaje existe
      const selectCharacter = await getCharacter(context.db, character);
      if (selectCharacter === null || selectCharacter === undefined) {
        return response(
          false,
          "El personaje introducido no existe y no puedes actualizar el voto",
          context.db
        );
      }
      // Comprobar que el voto existe
      const selectVote = await getVote(context.db, id);
      if (selectVote === null || selectVote === undefined) {
        return response(
          false,
          "El voto introducido no existe y no puedes actualizar",
          context.db
        );
      }
      // Actualizar el voto despues de comprobar
      return await context.db
        .collection(COLLECTIONS.VOTES)
        .updateOne({ id }, { $set: { character } })
        .then(async () => {
          sendNotification(context.pubsub, context.db, character);
          return response(true, "Voto actualizado correctamente", context.db);
        })
        .catch(async () => {
          return response(
            false,
            "Voto NO actualizado correctamente. Prueba de nuevo por favor",
            context.db
          );
        });
    },
    async deleteVote(
      _: void,
      { id }: unknown,
      context: { pubsub: PubSub; db: Db }
    ): Promise<{
      status: boolean,
      message: string,
      characters?: Array<ICharacter>
    }> {
      // COmprobar que el voto existe
      // comprobar que el voto existe
      const selectVote = await getVote(context.db, id);
      if (selectVote === null || selectVote === undefined) {
        return response(
          false,
          "El voto introducido no existe y no puedes borrarlo",
          context.db
        );
      }
      // Si existe, borrarlo
      return await context.db
        .collection(COLLECTIONS.VOTES)
        .deleteOne({ id })
        .then(async () => {
          sendNotification(context.pubsub, context.db, id);
          return response(true, "Voto borrado correctamente", context.db);
        })
        .catch(async () => {
          return response(
            false,
            "Voto NO borrado. Por favor intentelo de nuevo",
            context.db
          );
        });
    },
  },
};

export default mutationResolvers;
