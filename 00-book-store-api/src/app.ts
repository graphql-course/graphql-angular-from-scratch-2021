import { makeExecutableSchema } from "@graphql-tools/schema";
import { GraphQLSchema } from "graphql";
import { ApolloServer, gql } from "apollo-server-express";
import compression from "compression";
import express from "express";
import { createServer } from "http";

async function start() {
  

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

  apolloServer.applyMiddleware({app, cors: true})
  

  app.use("/hello", (_, res) => {
    res.send("Bienvenid@s al primer proyecto");
  });

  app.get("/", (_, res) => {
    res.redirect("/graphql");
  });

  const httpServer = createServer(app);

  httpServer.listen(
    {
      port: 3025,
    },
    () => console.log("Servidor => http://localhost:3025")
  );
}

start();
