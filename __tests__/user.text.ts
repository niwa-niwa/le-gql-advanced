import { Express } from "express";
import request from "supertest";
import { app } from "../src/app";

const gql_prefix = "/graphql";
describe("TEST User ", () => {
  test("ger users", async () => {
    const server: Express = await app();
    const { status, body } = await request(server)
      .post(gql_prefix)
      .set("Authorization", "1")
      .send({
        query: `{
        users{
          id
          username
          firstName
          lastName
          email
          messages{
            id
          }
          role
        }
      }`,
      });

    console.log(body.data)

    expect(status).toBe(200);
    expect(body.data).toHaveProperty('users')
    expect(body.data.users[0]).toHaveProperty('id')
    expect(body.data.users[0]).toHaveProperty('username')
    expect(body.data.users[0]).toHaveProperty('firstName')
    expect(body.data.users[0]).toHaveProperty('lastName')
    expect(body.data.users[0]).toHaveProperty('email')
    expect(body.data.users[0]).toHaveProperty('messages')
    expect(body.data.users[0]).toHaveProperty('role')
  });

  test('delete user', async()=>{
    const server: Express = await app();
    const { status, body } = await request(server)
      .post(gql_prefix)
      .set("Authorization", "1")
      .send({
        query:`mutation{
          deleteUser(id:3)
        }`
      })

      console.log(body)
      expect(status).toBe(200);
      expect(body.data).toHaveProperty('deleteUser')
      expect(body.data.deleteUser).toBeTruthy()
  })
});
