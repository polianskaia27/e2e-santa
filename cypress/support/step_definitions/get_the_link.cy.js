const users = require("../../fixtures/users.json");
const generalElements = require("../../fixtures/pages/general.json");
const invitePage = require("../../fixtures/pages/invitePage.json");

Given("the user is logged in as 'userAutor'", function () {
  cy.login(users.userAutor.email, users.userAutor.password);
  cy.contains("Создать коробку");
});

Given("the user generates an invite link", function () {
  cy.get(generalElements.submitButton).click();
  cy.get(invitePage.inviteLink)
    .invoke("text")
    .then((link) => {
      Cypress.env("inviteLink", link);
      Cypress.env("boxId", link.match(/\/box\/([^/]+)/)[1]);
    });
  cy.clearCookies();
});
