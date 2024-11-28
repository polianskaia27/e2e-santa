const users = require("../../fixtures/users.json");
const boxPage = require("../../fixtures/pages/boxPage.json");

Given("the user is logged in as 'userAutor'", function () {
  cy.login(users.userAutor.email, users.userAutor.password);
  cy.contains("Создать коробку");
});

Given("the box has all required participants", function () {
  cy.loginAndGetToTheLastBox(users.userAutor.email, users.userAutor.password);
  cy.get(boxPage.drawLink).click({ force: true });
  cy.contains("Жеребьевка").should("exist");
});

Given("the user starts the draw process", function () {
  cy.get(boxPage.drawBtn).click();
  cy.contains("Проведение жеребьевки").should("exist");
  cy.get(boxPage.confirmationDrawBtn).click();
});

Given("the draw should complete successfully with confirmation", function () {
  cy.get(boxPage.drawDoneTitle)
    .invoke("text")
    .then((text) => {
      expect(text).to.include("Жеребьевка проведена");
    });
});
