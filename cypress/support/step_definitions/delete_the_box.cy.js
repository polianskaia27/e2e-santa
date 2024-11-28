const users = require("../../fixtures/users.json");

Given("the user is logged in as 'userAutor'", function () {
  cy.login(users.userAutor.email, users.userAutor.password);
  cy.contains("Создать коробку");
});

Given("the user deletes the box", function () {
  cy.deleteBox(Cypress.env("boxId"));
});
