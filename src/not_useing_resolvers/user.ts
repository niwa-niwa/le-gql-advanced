import { DB, User } from "../types";

const resolvers = {
  Query: {
    me: (parent: any, args: any, { me }: { me: User }) => me,
    users: (parent: any, args: any, { db }: { db: DB }) => db.user,
    user: (parent: any, { id }: { id: string }, { db }: { db: DB }) =>
      db.user[id],
  },

  Mutation: {
    deleteUser: (parent: any, { id }: { id: string }, { db }: { db: DB }) => {
      const user: User = db.user[id];
      delete db.user[id];
      return user !== undefined;
    },
  },

  User: {
    username: (user: User) => `${user.firstName} ${user.lastName}`,
  },
};
export default resolvers;
