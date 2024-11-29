import { Given } from "@badeball/cypress-cucumber-preprocessor";
import { getGlobalBoxId } from "../../support/global.js";

Given("the user deletes the box", function () {
  cy.deleteBox(getGlobalBoxId());
});
