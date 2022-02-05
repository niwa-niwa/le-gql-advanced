import { User, Message, DB } from "./types";
import { combineResolvers } from "graphql-resolvers";
import {
  isAdmin,
  isMessageOwner,
  isAuthenticated,
} from "./middleware/authorization";

const resolvers = {
  Query: {
    me: (parent: any, args: any, { me }: { me: User }) => me,
    users: (parent: any, args: any, { db }: { db: DB }) =>
      Object.values(db.user),
    user: (parent: any, { id }: { id: string }, { db }: { db: DB }) =>
      db.user[id],

    messages: (parent: any, args: any, { db }: { db: DB }) =>
      Object.values(db.message),
    message: (parent: any, { id }: { id: string }, { db }: { db: DB }) =>
      db.message[id],
  },

  Mutation: {
    deleteUser: combineResolvers(
      isAdmin,
      (
        parent: any,
        { id }: { id: string },
        { db, me }: { db: DB; me: User }
      ) => {
        const user: User = db.user[id];
        delete db.user[id];
        return user !== undefined;
      }
    ),

    createMessage: combineResolvers(
      isAuthenticated,
      (
        parent: any,
        { text }: { text: string },
        { db, me }: { db: DB; me: User }
      ) =>
        (db.message[Object.values(db.message).length + 1] = {
          id: String(Object.values(db.message).length + 1),
          text,
          userId: me.id,
        })
    ),

    deleteMessage: combineResolvers(
      isMessageOwner,
      (
        parent: any,
        { id }: { id: string },
        { db, me }: { db: DB; me: User }
      ) => {
        if (db.message[id]) {
          delete db.message[id];
          return true;
        } else {
          return false;
        }
      }
    ),
  },

  User: {
    username: (user: User) => `${user.firstName} ${user.lastName}`,
    messages: (user: User, args: any, { db }: { db: DB }) =>
      Object.values(db.message).filter((value: any) => {
        return value.userId === user.id;
      }),
  },

  Message: {
    user: (message: Message, args: any, { db }: { db: DB }) =>
      db.user[message.userId],
  },
};
export default resolvers;
