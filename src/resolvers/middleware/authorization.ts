import { skip } from "graphql-resolvers";
import { ForbiddenError } from "apollo-server-express";
import { Message, User } from "../../types";

export const isAuthenticated = (
  parent: any,
  args: any,
  { me }: { me: any }
) => {
  me ? skip : new ForbiddenError("Not Authenticated as user.");
};

export const isMessageOwner = async (
  parent: any,
  { id }: Message,
  { db, me }: any
) => {
  const message: Message = db.message.filter((value: Message) => {
    if (id === value.id) return value;
  });

  if (message.userId !== me.id)
    throw new ForbiddenError("Not Authenticated as owner");

  return skip;
};

export const isAdmin = (parent: any, args: any, { me }: { me: User }) => {
  me?.role === "admin" ? skip : new ForbiddenError("Not Authorized as admin");
};
