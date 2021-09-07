import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer, gql } from "apollo-server-express";
import compression from "compression";
import express, { Application } from "express";
import { GraphQLSchema } from "graphql";
import { Server } from "http";

class GraphQLServer {
  // Propiedades
  private app!: Application;
  private httpServer!: Server;
  private readonly DEFAULT_PORT = 3025;

  constructor() {
    this.init();
  }

  private init() {
    this.configExpress();
    this.configApolloServerExpress();
    this.configRoutes();
  }

  private configExpress() {
    this.app = express();

    this.app.use(compression());
  }

  private async configApolloServerExpress() {
    // Definir los tipos de definición

    const typeDefs = gql`
      # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

      type Query {
        hello: String!
        helloWithName(name: String): String!
        peopleNumber: Int!
      }
    `;

    // Resolvers

    // Resolvers define the technique for fetching the types defined in the
    // schema. This resolver retrieves books from the "books" array above.
    const resolvers = {
      Query: {
        hello: (): string => "Hola a la API de GraphQL",
        helloWithName: (
          _: void,
          args: { name: string },
          context: any,
          info: object
        ) => {
          console.log(info);
          return `Hola ${args.name}`;
        },
        peopleNumber: () => 189303,
      },
    };

    // Construir el schema ejecutable

    const schema: GraphQLSchema = makeExecutableSchema({
      typeDefs,
      resolvers,
    });

    const apolloServer = new ApolloServer({
      schema,
      introspection: true,
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({ app: this.app, cors: true });
  }

  private configRoutes() {}

  listen(callback: (port: number) => void): void {
    this.httpServer.listen(+this.DEFAULT_PORT, () => {
      callback(+this.DEFAULT_PORT);
    });
  }
}

export default GraphQLServer;
