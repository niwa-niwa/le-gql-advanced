import { Message, User } from "../types";

const resolvers = {
  Query: {
    messages: (parent: any, args: any, { db }: any) => db.message,
    message: (parent: any, { id }: { id: string }, { db }: any) =>
      db.message[id],
  },

  Mutation: {
    createMessage: (
      parent: any,
      { text }: { text: string },
      { db, me }: { db: any; me: User }
    ) =>
      (db.message[db.message.length] = {
        id: db.message.length,
        text,
        userId: me.id,
      }),
    deleteMessage: (parent: any, { id }: { id: string }, { db }: any) => {
      if (db.message[id]) {
        delete db.message[id];
        return true;
      } else {
        return false;
      }
    },
  },

  Message: {
    user: (message: Message, args: any, { db }: any) => db.user[message.userId],
  },
};
export default resolvers;
