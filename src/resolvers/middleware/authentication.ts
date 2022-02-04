import { UserInputError } from "apollo-server-express";
import { User } from "../../types";

export const authentication: Function = (req: any, db: any): User => {
  const userId: string | undefined = req.headers.authorization;

  // if (!userId) throw new AuthenticationError("You are wrong.");

  let me: User = db.user[Number(userId)];

  if(!me){
    me = db.user[2]!;
  }

  // TODO 認証をしつつサンドボックスができるようにする
  if (!me) throw new UserInputError("token is wrong");

  return me;
};
