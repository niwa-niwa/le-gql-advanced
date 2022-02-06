beforeEach(async()=>{
  console.log("message from beforeEach in afterEnv.ts");
});

afterEach(()=>{
  console.log("message from afterEach in afterEnv.ts")
})

jest.spyOn(console, "error").mockImplementation(() => {});

// jest.mock("../../src/lib/FirebaseAdmin", () => ({
//   verifyToken: (token: string) => {
//     if (token == tokens.auth_user) {
//       return auth_user;
//     }
//     if (token === tokens.firebase_user) {
//       return firebase_user;
//     }
//     return generateErrorObj(400, "ID token has invalid signature");
//   },
// }));

