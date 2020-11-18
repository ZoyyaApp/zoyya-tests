import "cypress-localstorage-commands";
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("errorToastVisible", (message) => {
  cy.get(".Toastify__toast-body", { timeout: 5000 })
    .contains(message)
    .should("exist");
});
Cypress.Commands.add("getWaitClick", (name, waitTime) => {
  return cy.get(`${name}`).wait(waitTime).click();
});
Cypress.Commands.add("getFirstWaitClick", (name, waitTime) => {
  return cy.get(`${name}`).first().wait(waitTime).click();
}); 
Cypress.Commands.add("getInput", (name) => {
  return cy.get(`[data-cy=input_${name}`);
});
Cypress.Commands.add("getButton", (name) => {
  return cy.get(`[data-cy=button_${name}`);
});
Cypress.Commands.add("login", (userName, password) => {
  cy.request({
    method: "POST",
    url: Cypress.env("graphUrl"),
    body: {
      variables: {
        userName: userName || Cypress.env("userName"),
        password: password || Cypress.env("password"),
      },
      query: `mutation loginUser($userName:String,$password:String) {
            user {
              login(input: { userName:$userName, password: $password}) {
                success
                errorMessage
                payload {
                  token
                  user {
                    id
                    firstName
                    lastName
                    gender
                    role
                  }
                }
              }
            }
          }
          `,
    },
  })
    .its("body")
    .then((body) => {
      console.log({ body });
      cy.setLocalStorage("token", body.data.user.login.payload.token);
    });
});
