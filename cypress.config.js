const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 2000,
  viewportHeight: 800,
  viewportWidth: 1200,
  e2e: {
    baseUrl: "http://localhost:3000/",
  },
});
