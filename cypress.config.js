const { defineConfig } = require("cypress");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env file

module.exports = defineConfig({
  e2e: {
    // baseUrl: "https://www.google.com/",
    setupNodeEvents(on, config) {
      config.env.CYPRESS_GQL_USERNAME = process.env.CYPRESS_GQL_USERNAME;
      config.env.CYPRESS_GQL_PASSWORD = process.env.CYPRESS_GQL_PASSWORD;
      // implement node event listeners here
      //browser launch option to run in incognito
      // on("before:browser:launch", (browser = {}, launchOptions) => {
      //   if (browser.family == "chromium" && browser.name !== "electron") {
      //     launchOptions.args.push("--incognito");
      //     return launchOptions;
      //   }
      // });
      on("task", {
        async writeToFile({ filename, content }) {
          try {
            const filePath = path.resolve(filename);
            await fs.writeFile(filePath, content, "utf8");
            return { success: true, path: filePath };
          } catch (error) {
            console.error("❌ File write error:", error);
            return { success: false, error: error.message };
          }
        },

        async readFromFile(filename) {
          try {
            const filePath = path.resolve(filename);
            const data = await fs.readFile(filePath, "utf8");
            return { success: true, data };
          } catch (error) {
            console.error("❌ File read error:", error);
            return { success: false, error: error.message };
          }
        },
      });

      return config;
    },
    defaultCommandTimeout: 120000,
  },
  chromeWebSecurity: false,
  watchForFileChanges: false,
  includeShadowDom: true,
});
