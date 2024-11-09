const users = require("../fixtures/users.json");
const boxPage = require("../fixtures/pages/boxPage.json");
const generalElements = require("../fixtures/pages/general.json");
const dashboardPage = require("../fixtures/pages/dashboardPage.json");
const invitePage = require("../fixtures/pages/invitePage.json");
const inviteeBoxPage = require("../fixtures/pages/inviteeBoxPage.json");
const inviteeDashboardPage = require("../fixtures/pages/inviteeDashboardPage.json");
const mainPage = require("../fixtures/pages/mainPage.json");
import { faker } from "@faker-js/faker";

describe("user can create a box and run it", () => {
  //пользователь 1 логинится
  //пользователь 1 создает коробку
  //пользователь 1 получает приглашение
  //пользователь 2 переходит по приглашению
  //пользователь 2 заполняет анкету
  //пользователь 3 переходит по приглашению
  //пользователь 3 заполняет анкету
  //пользователь 4 переходит по приглашению
  //пользователь 4 заполняет анкету
  //пользователь 1 логинится
  //пользователь 1 запускает жеребьевку
  let newBoxName = faker.word.noun({ length: { min: 5, max: 10 } });
  let wishes = faker.word.noun() + faker.word.adverb() + faker.word.adjective();
  let maxAmount = 50;
  let currency = "Евро";
  let inviteLink;

  it("user logins and create a box", () => {
    cy.login(users.userAutor.email, users.userAutor.password);
    cy.contains("Создать коробку").click();
    cy.get(boxPage.boxNameField).type(newBoxName);
    cy.get(generalElements.arrowRight).click();
    cy.get(boxPage.sixthIcon).click();
    cy.get(generalElements.arrowRight).click();
    cy.get(boxPage.giftPriceToggle).check({ force: true });
    cy.get(boxPage.maxAnount).type(maxAmount);
    cy.get(boxPage.currency).select(currency);
    cy.get(generalElements.arrowRight).click();
    cy.get(generalElements.arrowRight).click();
    cy.contains("Дополнительные настройки");
    cy.get(generalElements.arrowRight).click();
    cy.get(dashboardPage.createdBoxName).should("have.text", newBoxName);
    cy.checkingOfDasboardMyBox();
  });

  it("add participants", () => {
    cy.get(generalElements.submitButton).click();
    cy.get(invitePage.inviteLink)
      .invoke("text")
      .then((link) => {
        inviteLink = link;
      });
    cy.get(dashboardPage.participantNameField).type(user);
    cy.clearCookies();
  });

  it("approve as user1", () => {
    cy.visit(inviteLink);
    cy.get(generalElements.submitButton).click();
    cy.contains("войдите").click();
    cy.login(users.user1.email, users.user1.password);
    cy.contains("Создать карточку участника").should("exist");
    cy.get(generalElements.submitButton).click();
    cy.get(generalElements.arrowRight).click();
    cy.get(generalElements.arrowRight).click();
    cy.get(inviteeBoxPage.wishesInput).type(wishes);
    cy.get(generalElements.arrowRight).click();
    cy.get(inviteeDashboardPage.noticeForInvitee)
      .invoke("text")
      .then((text) => {
        expect(text).to.contain("Это — анонимный чат с вашим Тайным Сантой");
      });
    cy.clearCookies();
  });

  it("add user2 and user3", () => {
    cy.loginAndGetToTheLastBox(users.userAutor.email, users.userAutor.password);
    cy.checkingOfDasboardMyBox();
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
    cy.contains("Карточки участников успешно созданы").should("exist");
    cy.get(boxPage.confirmationOfAddingNewParticipants)
      .invoke("text")
      .then((text) => {
        expect(text).to.include("Карточки участников успешно созданы");
      });
  });

  it("draw", () => {
    cy.loginAndGetToTheLastBox(users.userAutor.email, users.userAutor.password);
    cy.get(boxPage.drawLink).click({ force: true });
    cy.contains("Жеребьевка").should("exist");
    cy.get(boxPage.drawBtn).click();
    cy.contains("Проведение жеребьевки").should("exist");
    cy.get(boxPage.confirmationDrawBtn).click();
    cy.get(boxPage.drawDoneTitle)
      .invoke("text")
      .then((text) => {
        expect(text).to.include("Жеребьевка проведена");
      });
  });

  after("delete box", () => {
    cy.loginAndGetToTheLastBox(users.userAutor.email, users.userAutor.password);
    cy.get(dashboardPage.settingsBtn).click();
    cy.contains("Архивация и удаление").click({ force: true });
    cy.get(dashboardPage.deleteField).type("Удалить коробку");
    cy.get(dashboardPage.deleteBtn).click();
  });
});
