import { ApolloServer } from "apollo-server-express";
import compression from "compression";
import express, { Application } from "express";
import { GraphQLSchema } from "graphql";
import { createServer, Server } from "http";
import environments from "./config/environment";

class GraphQLServer {
  // Propiedades
  private app!: Application;
  private httpServer!: Server;
  private readonly DEFAULT_PORT = (process.env.PORT) ? +process.env.PORT: 3025;
  private schema!: GraphQLSchema;
  constructor(schema: GraphQLSchema) {
    if (schema === undefined) {
      throw new Error("Necesitamos un schema de GraphQL para trabajar con APIs GraphQL");
    }
    this.schema = schema;
    this.init();
  }

  private init() {
    this.initializeEnvironments();
    this.configExpress();
    this.configApolloServerExpress();
    this.configRoutes();
  }

  private initializeEnvironments() {
    if (process.env.NODE_ENV !== "production") {
      const envs = environments;
      console.log(envs);
    }
  }

  private configExpress() {
    this.app = express();

    this.app.use(compression());

    this.httpServer = createServer(this.app);
  }

  private async configApolloServerExpress() {

    const apolloServer = new ApolloServer({
      schema: this.schema,
      introspection: true,
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({ app: this.app, cors: true });

   
  }

  private configRoutes() {
    this.app.get("/hello", (_, res) => {
      res.send("Bienvenid@s al primer proyecto");
    });
  
    this.app.get("/", (_, res) => {
      res.redirect("/graphql");
    });
  }

  listen(callback: (port: number) => void): void {
    this.httpServer.listen(+this.DEFAULT_PORT, () => {
      callback(+this.DEFAULT_PORT);
    });
  }
}

export default GraphQLServer;
