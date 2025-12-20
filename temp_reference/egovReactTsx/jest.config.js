/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: ['<rootDir>/src/setupTests.ts'],
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transformIgnorePatterns: ['/node_modules/(?!(react-router-dom|react-router|@remix-run))'],
};
