import { User, Message } from "./types";

const resolvers = {
  Query: {
    me: (parent: any, args: any, { me }: { me: User }) => me,
    users: (parent: any, args: any, { db }: any) => Object.values(db.user),
    user: (parent: any, { id }: any, { db }: any) => db.user[id],

    messages: (parent: any, args: any, { db }: any) =>
      Object.values(db.message),
    message: (parent: any, { id }: { id: string }, { db }: any) =>
      db.message[id],
  },

  Mutation: {
    deleteUser: (parent: any, { id }: { id: string }, { db }: any) => {
      const user: User = db.user[id];
      delete db.user[id];
      return user !== undefined;
    },

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

  User: {
    username: (user: User) => `${user.firstName} ${user.lastName}`,
    messages: (user: User, args:any, { db }: any) =>Object.values(db.message).filter((value: any) => {
        return value.userId === user.id
      }),
  },

  Message: {
    user: (message: Message, args: any, { db }: any) => db.user[message.userId],
  },
};
export default resolvers;
