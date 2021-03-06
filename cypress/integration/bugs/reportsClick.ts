/// <reference types="cypress" />

export const module = 1;

describe("Owner can login and edit branch data", () => {

  it("Login", () => {
    
    cy.visit("/login");
    cy.get("[data-cy=button_email]").click();

    cy.getInput("email")
        .type(Cypress.env("userName"))
        .should("have.value", Cypress.env("userName")); 
    
    cy.getInput("password")
        .type(Cypress.env("password"))
        .should("have.value", Cypress.env("password"));

    cy.getButton("submit").click();
    cy.location('pathname').should('match', /\/calendar\/day\/*$/);
    
    cy.wait(2000);
    cy.getWaitClick('[data-intercom-target="Sidebar-Reports"]', 0); 

  })

})