import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
  // [...]
  // Replace `ts-jest` with the preset you want to use
  // from the above list
  preset: 'ts-jest',
  testRegex: '/src/.*\\.(test|spec).(ts|tsx|js)$',
  testEnvironment: 'node',
  collectCoverageFrom: ['src/service/*.{js,jsx,tsx,ts}', '!**/node_modules/**', '!**/vendor/**'],
  coverageReporters: ['json', ['lcov', { projectRoot: './' }], 'text', 'clover'],
  testPathIgnorePatterns: ['build'],
};

export default jestConfig;
