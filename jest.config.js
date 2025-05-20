module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/libre-wms-frontend/jest.setup.js'],
  moduleNameMapper: {
    '^@/components/ui/(.*)$': '<rootDir>/libre-wms-frontend/components/ui/$1',
    '^@/components/(.*)$': '<rootDir>/libre-wms-frontend/components/$1',
    '^@/lib/(.*)$': '<rootDir>/libre-wms-frontend/lib/$1',
    '^@/constants/(.*)$': '<rootDir>/libre-wms-frontend/constants/$1',
    '^@/(.*)$': '<rootDir>/libre-wms-frontend/app/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
} 