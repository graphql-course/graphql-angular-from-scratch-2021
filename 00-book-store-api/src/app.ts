import GraphQLServer from "./server";
import schema from "./schema";

const graphQLServer = new GraphQLServer(schema);

graphQLServer.listen((port: number) => console.log(`http://localhost:${port}/graphql`));
