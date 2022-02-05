import { AuthenticationError, UserInputError } from "apollo-server-express";
import { User } from "../types";

export const authentication: Function = (req: any, db: any): User => {
  const userId: string | undefined = req.headers.authorization;

  if (!userId) throw new AuthenticationError("You are wrong.");

  const me: User = db.user[Number(userId)];

  if (!me) throw new UserInputError("token is wrong");

  return me;
};
