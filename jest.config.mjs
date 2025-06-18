export default {
  preset: "./jest-preset.mjs",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.(js|jsx|mjs)$": "babel-jest",
    "^.+\\.(ts|tsx)$": "babel-jest",
  },
  transformIgnorePatterns: ["/node_modules/(?!(swiper|ssr-window|dom7)/)"],
  moduleFileExtensions: ["js", "jsx", "mjs", "json", "node"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    // Map Swiper CSS imports to the style mock
    "^swiper\\/css$": "<rootDir>/src/__mock__/styleMock.js",
    "^swiper\\/css\\/.*$": "<rootDir>/src/__mock__/styleMock.js",
    "\\.(css|scss|sass)$": "<rootDir>/src/__mock__/styleMock.js",
  },
  setupFiles: ["<rootDir>/jest.setup.js"],
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}"],
};
