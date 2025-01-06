import { Given } from "@badeball/cypress-cucumber-preprocessor";
import { setGlobalBoxId } from "../../support/global.js";
import { setGlobalInviteLink } from "../../support/global.js";
const generalElements = require("../../fixtures/pages/general.json");
const invitePage = require("../../fixtures/pages/invitePage.json");

Given("the user generates an invite link", function () {
  cy.get(generalElements.mainButton).click();
  cy.get(invitePage.inviteLink)
    .invoke("text")
    .then((link) => {
      setGlobalInviteLink(link);
      setGlobalBoxId(link.match(/\/box\/([^/]+)/)[1]);
    });
  cy.clearCookies();
});
