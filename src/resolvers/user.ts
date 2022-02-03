import { User } from "../types";

const resolvers = {
  Query: {
    me: (parent: any, args: any, { me }: { me: User }) => me,
    users: (parent: any, args: any, { db }: any) => db.user,
    user: (parent: any, { id }: any, { db }: any) => db.user[id],
  },

  Mutation: {
    deleteUser: (parent: any, { id }: { id: string }, { db }: any) => {
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
