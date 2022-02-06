export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email:string;
  messages?: Messages;
  role:string
}

export type Users = {
  [key: string]: User;
}

export type Message = {
  id: string;
  text: string;
  userId: string;
}

export type Messages = {
  [key: string]: Message;
}

export type DB = {
  user:Users
  message:Messages
}
