import { gql } from "apollo-server-express";

const schema = gql`
  extend type Query {
    me: User
    users: [User!]
    user(id: ID!): User
  }

  extend type Mutation {
    deleteUser(id: ID!): Boolean
  }

  type User {
    id: ID!
    username: String!
    firstName: String!
    lastName: String!
    email: String!
    messages: [Message!]
    role: String
  }
`;

export default schema;
