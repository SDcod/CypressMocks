const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://docs.cypress.io/app/get-started/why-cypress",
    video: true,
    videoCompression: 32,
    setupNodeEvents(on, config) {
      //   ...
    },
  },
});
