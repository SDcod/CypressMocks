const { defineConfig } = require("cypress");

module.exports = defineConfig({
  // setupNodeEvents can be defined in either
  // the e2e or component configuration
  e2e: {
    setupNodeEvents(on, config) {
      on("before:browser:launch", (browser = {}, launchOptions) => {
        if (browser.family == "chromium" && browser.name !== "electron") {
          launchOptions.args.push("--incognito");
          return launchOptions;
        }
      });
    },
  },
});
