/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jsdom',

  collectCoverageFrom: ['only-ts/**/*.ts', '!**/node_modules/**'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/only-ts/scripts/game-of-life.ts',
    '/only-ts/scripts/index.ts',
  ],

  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },

  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  extensionsToTreatAsEsm: ['.ts'],

  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
        useESM: true,
        diagnostics: {
          ignoreCodes: ['1343'],
        },
        babelConfig: {
          plugins: [
            ['babel-plugin-transform-import-meta', { importStyle: 'commonjs' }],
          ],
        },
      },
    ],
  },
};
