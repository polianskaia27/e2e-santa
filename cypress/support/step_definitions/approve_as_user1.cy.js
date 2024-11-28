const users = require("../../fixtures/users.json");
const generalElements = require("../../fixtures/pages/general.json");
const inviteeBoxPage = require("../../fixtures/pages/inviteeBoxPage.json");
const inviteeDashboardPage = require("../../fixtures/pages/inviteeDashboardPage.json");
import { faker } from "@faker-js/faker";

let wishes = faker.word.noun() + faker.word.adverb() + faker.word.adjective();

Given("the participant logs in", function () {
  cy.visit(Cypress.env(inviteLink));
  cy.get(generalElements.submitButton).click();
  cy.contains("войдите").click();
  cy.login(users.user1.email, users.user1.password);
  cy.contains("Создать карточку участника").should("exist");
});

Given("fills in his wishes", function () {
  cy.get(generalElements.submitButton).click();
  cy.get(generalElements.arrowRight).click();
  cy.get(generalElements.arrowRight).click();
  cy.get(inviteeBoxPage.wishesInput).type(wishes);
  cy.get(generalElements.arrowRight).click();
});

Given(
  "the participant's dashboard should confirm successful entry",
  function () {
    cy.get(inviteeDashboardPage.noticeForInvitee)
      .invoke("text")
      .then((text) => {
        expect(text).to.contain("Это — анонимный чат с вашим Тайным Сантой");
      });
    cy.clearCookies();
  }
);
