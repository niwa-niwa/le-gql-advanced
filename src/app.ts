import express, { Express } from "express";
import cors from "cors";
import { loadSchemaSync } from "@graphql-tools/load";
import { addResolversToSchema } from "@graphql-tools/schema";
import { ApolloServer, ExpressContext } from "apollo-server-express";
import { GraphQLSchema } from "graphql";
import { join } from "path";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import resolvers from "./resolvers";
import db from "./db";
import { User } from "./types";
import { authentication } from "./middleware/authentication";

export async function app(): Promise<Express> {
  const app: Express = express();

  app.use(cors());

  const schema: GraphQLSchema = loadSchemaSync(
    join(__dirname, "/schema.graphql"),
    {
      loaders: [new GraphQLFileLoader()],
    }
  );

  const schemaWithResolvers: GraphQLSchema = addResolversToSchema({
    schema,
    resolvers,
  });

  const server: ApolloServer<ExpressContext> = new ApolloServer({
    schema: schemaWithResolvers,
    context: ({ req }) => {
      const me: User = authentication(req, db);
      return { me, db };
    },
  });

  await server.start();

  server.applyMiddleware({ app, path: "/graphql" });

  return app;
}
