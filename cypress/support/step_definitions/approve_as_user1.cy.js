import { Given } from "@badeball/cypress-cucumber-preprocessor";
import { getGlobalInviteLink } from "../../support/global.js";
const generalElements = require("../../fixtures/pages/general.json");
const inviteeBoxPage = require("../../fixtures/pages/inviteeBoxPage.json");
const inviteeDashboardPage = require("../../fixtures/pages/inviteeDashboardPage.json");
import { faker } from "@faker-js/faker";

let wishes = faker.word.noun() + faker.word.adverb() + faker.word.adjective();

Given(
  "the participant logs as {string} and {string}",
  function (string1, string2) {
    cy.visit(getGlobalInviteLink());
    cy.get(generalElements.submitButton).click();
    cy.contains("войдите").click();
    cy.login(string1, string2);
    cy.contains("Создать карточку участника").should("exist");
  }
);

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
