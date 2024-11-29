const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const createEsbuildPlugin =
  require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
const addCucumberPreprocessorPlugin =
  require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const { allureCypress } = require("allure-cypress/reporter");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://staging.lpitko.ru",
    testIsolation: false,
    watchForFileChanges: false,
    defaultCommandTimeout: 10000,
    specPattern: "**/*.feature",
    setupNodeEvents(cypressOn, config) {
      const on = require("cypress-on-fix")(cypressOn);
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });
      on("file:preprocessor", bundler);
      addCucumberPreprocessorPlugin(on, config);
      on("task", {
        reportAllureCypressSpecMessages() {
          console.log("Reporting Allure Cypress Spec Messages");
          return null;
        },
      });

      allureCypress(on, config);

      return config;
    },
  },
});
