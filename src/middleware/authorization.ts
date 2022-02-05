import { skip } from "graphql-resolvers";
import { ForbiddenError } from "apollo-server-express";
import { Message, User, DB } from "../types";

export const isAuthenticated = (
  parent: any,
  args: any,
  { me }: { me: User }
) => {
  me ? skip : new ForbiddenError("Not Authenticated as user.");
};

export const isMessageOwner = async (
  parent: any,
  { id }: Message,
  { db, me }: { db: DB; me: User }
) => {
  const message: Message[] = Object.values(db.message).filter(
    (value: Message) => {
      if (id === value.id) return value;
    }
  );

  if (message[0].userId !== me.id)
    throw new ForbiddenError("Not Authenticated as owner");

  skip;
};

export const isAdmin = (parent: any, args: any, { me }: { me: User }) => {
  if (me.role !== "admin") throw new ForbiddenError("Not Authorized as admin");

  skip;
};
