const boxPage = require("../../fixtures/pages/boxPage.json");
const generalElements = require("../../fixtures/pages/general.json");
const dashboardPage = require("../../fixtures/pages/dashboardPage.json");
import { faker } from "@faker-js/faker";
import { Given } from "@badeball/cypress-cucumber-preprocessor";

let newBoxName = faker.word.noun({ length: { min: 5, max: 10 } });

Given(
  "user logs in the secret santa website as {string} and {string}",
  function (string1, string2) {
    cy.login(string1, string2);
    cy.contains("Создать коробку");
  }
);

Given("user creates a box with the following details:", function (dataTable) {
  cy.contains("Создать коробку").click();
  cy.get(boxPage.boxNameField).type(newBoxName);
  cy.get(generalElements.arrowRight).click();
  cy.get(boxPage.sixthIcon).click();
  cy.get(generalElements.arrowRight).click();
  cy.get(boxPage.giftPriceToggle).check({ force: true });
  cy.get(boxPage.maxAnount).type(dataTable.hashes()[0].maxAmount);
  cy.get(boxPage.currency).select(dataTable.hashes()[0].currency);
  cy.get(generalElements.arrowRight).click();
  cy.get(generalElements.arrowRight).click();
  cy.contains("Дополнительные настройки");
  cy.get(generalElements.arrowRight).click();
});

Given("the box should be visible on the dashboard", function () {
  cy.get(dashboardPage.createdBoxName).should("have.text", newBoxName);
  cy.checkingOfDasboardMyBox();
});
