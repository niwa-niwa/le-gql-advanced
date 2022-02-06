import { Express } from "express";
import { app } from "./app";

async function main(): Promise<void> {
  const server: Express = await app();

  server.listen({ port: 23456 }, () => {
    console.log("server on http://localhost:23456/graphql");
  });
}
main();
