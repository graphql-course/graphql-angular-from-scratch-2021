import GraphQLServer from "./server";
import schema from "./schema";

(async () => {
  const graphQLServer = new GraphQLServer(schema);

  graphQLServer.listen((port: number) =>{
    console.log(
      `🚀 Query endpoint ready at http://localhost:${port}/graphql`
    );
    console.log(
      `🚀 Subscription endpoint ready at ws://localhost:${port}/graphql`
    );
  } );
})();
