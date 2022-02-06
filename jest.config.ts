/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
  globalSetup: "./__tests__/conf/setup.ts",
  setupFilesAfterEnv: ["./__tests__/conf/afterEnv.ts"],
  globalTeardown: "./__tests__/conf/teardown.ts",
  testPathIgnorePatterns: ["/node_modules/", "/__tests__/conf/"],
  modulePaths: ["/__tests__/", "/src/"],
};
