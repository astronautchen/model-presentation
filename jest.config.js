// module.exports = {
//   roots: ['<rootDir>/src'],
//   moduleNameMapper: {
//     '^@/(.*)$': '<rootDir>/src/$1'
//   },
//   testMatch: [
//     '<rootDir>/src/**/__tests__/**/*.{vue,js,jsx,ts,tsx}',
//     '<rootDir>/src/**/*.{spec,test}.{vue,js,jsx,ts,tsx}'
//   ],
//   transform: {
//     '^.+.[j|t]sx?$': 'babel-jest',
//     '^.+.vue?$': 'vue-jest',
//     '^.+.tsx$': 'ts-jest'
//   },
//   collectCoverage: true,
//   collectCoverageFrom: ['src/**/*.js', '!**/node_modules/**'],
//   coverageDirectory: './coverage',
//   coverageReporters: ['html', 'text', 'text-summary']
// };
module.exports = {
  moduleFileExtensions: ['vue', 'js', 'ts'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+.[j|t]sx?$': 'babel-jest',
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.ts$': 'ts-jest'
  },
  // 匹配 __tests__ 目录下的 .js/.ts 文件 或 xx.test.js/ts xx.spec.js/ts
  //   testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts)$',
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{vue,js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{spec,test}.{vue,js,jsx,ts,tsx}'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1' // 配置 jest 下 @ -> src
  }
};
