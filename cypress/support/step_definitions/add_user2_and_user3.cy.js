const users = require("../../fixtures/users.json");
const boxPage = require("../../fixtures/pages/boxPage.json");
const dashboardPage = require("../../fixtures/pages/dashboardPage.json");

Given("the user is logged in as 'userAutor'", function () {
  cy.login(users.userAutor.email, users.userAutor.password);
  cy.contains("Создать коробку");
});

Given("the user adds new participants", function () {
  cy.get(dashboardPage.settingsBtn).click();
  cy.contains("Добавить участников").click({ force: true });
  cy.get(boxPage.addingNewParticipantsTitle).contains(
    "Добавить участников вручную"
  );
  cy.get(boxPage.drawToggle).check({ force: true });
  cy.get(boxPage.participantNameField).type(users.user2.name);
  cy.get(boxPage.participantEmailField).type(users.user2.email);
  cy.get(boxPage.participantNameField2).type(users.user3.name);
  cy.get(boxPage.participantEmailField2).type(users.user3.email);
  cy.get(boxPage.addingNewParticipantsBtn).click({ force: true });
});

Given("the system should confirm successful participant addition", function () {
  cy.contains("Карточки участников успешно созданы").should("exist");
  cy.get(boxPage.confirmationOfAddingNewParticipants)
    .invoke("text")
    .then((text) => {
      expect(text).to.include("Карточки участников успешно созданы");
    });
});
