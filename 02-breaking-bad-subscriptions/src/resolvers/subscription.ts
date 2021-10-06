import { PubSub, withFilter } from "graphql-subscriptions";
import { Db } from "mongodb";
import { CHANGE_VOTE, CHANGE_VOTES } from "../config/constants";


const subscriptionResolvers = {
  Subscription: {
    changeVotes: {
      resolve: (payload: {changeVotes: unknown}) =>
        payload.changeVotes,
      subscribe: async (_: unknown, __: unknown, context: { db: Db, pubsub: PubSub}) =>
        context.pubsub.asyncIterator([CHANGE_VOTES]),
    },
    changeVote: {
      subscribe: withFilter(
        (_: void, __: unknown, context: { pubsub: PubSub }) => context.pubsub.asyncIterator(CHANGE_VOTE),
        (payload: {changeVote: {id: string | number }}, variables: { id: string | number}) => {
          return payload.changeVote.id === variables.id;
        }
      ),
    },
  }
};

export default subscriptionResolvers;
