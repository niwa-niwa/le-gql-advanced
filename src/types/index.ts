export type User = {
  id: string;
  firstName: string;
  lastName: string;
  messages?: Messages;
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
