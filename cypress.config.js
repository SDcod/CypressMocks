const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // baseUrl: "https://www.google.com/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      //browser launch option to run in incognito
      // on("before:browser:launch", (browser = {}, launchOptions) => {
      //   if (browser.family == "chromium" && browser.name !== "electron") {
      //     launchOptions.args.push("--incognito");
      //     return launchOptions;
      //   }
      // });
    },
    defaultCommandTimeout: 120000,
  },
  chromeWebSecurity: false,
  watchForFileChanges: false,
  includeShadowDom: true,
});
