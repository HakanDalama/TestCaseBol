const { defineConfig } = require("cypress");
const { writeToPath } = require("@fast-csv/format");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implementeer node event listeners hier
      on("task", {
        writeToCSV({ fileName, rows }) {
          writeToPath('./data.csv', rows);
          return null; // voeg een return statement toe om de taak af te sluiten
        }
      });
    },
  },
});
