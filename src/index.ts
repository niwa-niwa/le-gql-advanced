import express, { Express } from "express";
import cors from "cors";
import {
  ApolloServer,
  AuthenticationError,
  ExpressContext,
  gql,
  UserInputError,
} from "apollo-server-express";
import { DocumentNode } from "graphql";
import schemas from "./schemas";
import resolvers from "./resolvers";
import { User } from "./types";
import db from "./db";

// interface User {
//   id: string;
//   firstName: string;
//   lastName: string;
//   messages?: Messages;
// }

// interface Users {
//   [key: string]: User;
// }

// const users: Users = {
//   "1": { id: "1", firstName: "fisher_man", lastName: "sow" },
//   "2": { id: "2", firstName: "fisher_woman", lastName: "mow" },
// };

// const me: User = users[1];

// interface Message {
//   id: string;
//   text: string;
//   userId: string;
// }

// interface Messages {
//   [key: string]: Message;
// }

// const messages: Messages = {
//   "1": { id: "1", text: "Hello, world!", userId: "1" },
//   "2": { id: "2", text: "from GraphQL and Apollo-Server.", userId: "2" },
//   "3": { id: "3", text: "Hello, world!", userId: "2" },
// };

async function main(): Promise<void> {
  const app: Express = express();

  app.use(cors());

  // const schema: DocumentNode = gql`
  //   type Query {
  //     me: User
  //     users: [User!]
  //     user(id: ID!): User

  //     messages: [Message!]!
  //     message(id: ID!): Message!
  //   }

  //   type User {
  //     id: ID!
  //     username: String!
  //     firstName: String!
  //     lastName: String!
  //     messages: [Message!]
  //   }

  //   type Message {
  //     id: ID!
  //     text: String!
  //     user: User!
  //   }
  // `;

  // const resolvers = {
  //   Query: {
  //     me: (parent: any, args: any, { me }: { me: User }) => me,
  //     users: () => Object.values(users),
  //     user: (parent: any, { id }: { id: any }) => users[id] || null,
  //     messages: () => Object.values(messages),
  //     message: (parent: any, { id }: { id: any }) => messages[id],
  //   },
  //   User: {
  //     username: (user: User) => `${user.firstName} ${user.lastName}`,
  //     messages: (user: User) =>
  //       Object.values(messages)
  //         .filter((m) => +m.userId === +user.id)
  //         .map((m) => messages[m.id]),
  //   },
  //   Message: {
  //     user: (message: Message, args: any, { me }: { me: User }) =>
  //       users[message.userId],
  //   },
  // };

  const getMe: Function = (req: any) => {
    const userId: string | undefined = req.headers.authorization;

    if (!userId) throw new AuthenticationError("You are wrong.");

    const me: User | undefined = db.user[Number(userId)];

    if (!me) throw new UserInputError("token is wrong");

    return me;
  };

  const server: ApolloServer<ExpressContext> = new ApolloServer({
    typeDefs: schemas,
    resolvers,
    context: ({ req }) => {
      const me: User = getMe(req);
      return { me };
    },
  });

  await server.start();

  server.applyMiddleware({ app, path: "/graphql" });

  app.listen({ port: 23456 }, () => {
    console.log("server on http://localhost:23456/graphql");
  });
}
main();
