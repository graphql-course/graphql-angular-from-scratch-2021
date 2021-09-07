import GraphQLServer from "./server";


const graphQLServer = new GraphQLServer();

graphQLServer.listen((port: number) => console.log(`http://localhost:${port}/graphql`));
