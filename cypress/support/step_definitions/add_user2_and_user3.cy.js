import { Given } from "@badeball/cypress-cucumber-preprocessor";
const boxPage = require("../../fixtures/pages/boxPage.json");
const dashboardPage = require("../../fixtures/pages/dashboardPage.json");

Given(
  "the user is logged in as {string} and {string}",
  function (string1, string2) {
    cy.login(string1, string2);
    cy.contains("Создать коробку");
  }
);

Given(
  "the user adds new participants with the following details:",
  function (dataTable) {
    const participants = dataTable.hashes();
    cy.getToTheLastBox();
    cy.checkingOfDasboardMyBox();
    cy.get(dashboardPage.settingsBtn).click();
    cy.contains("Добавить участников").click({ force: true });
    cy.get(boxPage.addingNewParticipantsTitle).contains(
      "Добавить участников вручную"
    );
    cy.get(boxPage.drawToggle).check({ force: true });
    cy.get(boxPage.participantNameField).type(participants[0].login);
    cy.get(boxPage.participantEmailField).type(participants[0].email);
    cy.get(boxPage.participantNameField2).type(participants[1].login);
    cy.get(boxPage.participantEmailField2).type(participants[1].email);
    cy.get(boxPage.participantNameField3).type(participants[2].login);
    cy.get(boxPage.participantEmailField3).type(participants[2].email);
    cy.get(boxPage.addingNewParticipantsBtn).click({ force: true });
  }
);

Given("the system should confirm successful participant addition", function () {
  cy.contains("Карточки участников успешно созданы").should("exist");
  cy.get(boxPage.confirmationOfAddingNewParticipants)
    .invoke("text")
    .then((text) => {
      expect(text).to.include("Карточки участников успешно созданы");
    });
});
