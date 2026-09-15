module.exports = {
  testEnvironment: "node",
  roots: ["<rootDir>/tests"],
  collectCoverageFrom: ["src/**/*.js"],
  coverageDirectory: "coverage",
  clearMocks: true
};