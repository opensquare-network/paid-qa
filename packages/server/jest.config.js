module.exports = {
  collectCoverageFrom: [
    "**/*.{js}",
    "!**/node_modules/**",
  ],
  testEnvironment: "node",
  preset: "@shelf/jest-mongodb",
};
