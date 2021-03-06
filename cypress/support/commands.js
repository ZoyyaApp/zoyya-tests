import "cypress-localstorage-commands";
import 'cypress-wait-until';

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
}); // + return?

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

Cypress.Commands.add("menuListItems", (parent,list,returnthis)=> {

  cy.get(parent).click();

  for(var i = 0, size=Object.keys(list).length; i<size ;i++){
    var item = list[i]
    cy.get('.react-select__menu-list').contains(item);
  }
  
  return cy.get('.react-select__menu-list').contains[list[returnthis]];
  
});

Cypress.Commands.add("getFormatedDate", (futureDays) =>{ 
  
  var today = new Date();
  var name = String();
  
  var dd = String(today.getDate() + futureDays); 
  var mm = Number(today.getMonth()); 
  var yyyy = String(today.getFullYear());

  mm++;

  if(mm == 1 || mm == 3 || mm == 5 || mm == 7 || mm == 8 || mm == 10 || mm == 12){
    if(dd>=32){
      dd-=31; mm++;
    }
  }
  
  if(mm == 4 || mm == 6 || mm == 9 || mm == 11){
    if(dd>=31){
      dd-=30; mm++;
    }
  }

  if(mm == 2){
    if(dd>=29){
      dd-=28; mm++;
    }
  }

  if(mm==13){
    mm=0; yyyy++; dd=1;
  }

  mm--;

  var monthNameArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var month = monthNameArr[mm];

  var weekDay = (today.getDay() + futureDays - 1) % 7;
  if(weekDay<0) weekDay += 7;

  var weekDayNameArr = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sut", "Sun"];
  name = weekDayNameArr[weekDay];
      
  var danas = String(name + " " + month + " " + dd + ", " + yyyy);
  return cy.wrap(danas);

});

Cypress.Commands.add("isSameMonth", (futureDays)=> {

  var today = new Date();
  var dd = Number(today.getDate() + futureDays);
  var mm = Number(today.getMonth()) + 1;

  if(mm == 1 || mm == 3 || mm == 5 || mm == 7 || mm == 8 || mm == 10 || mm == 12){
    if(dd>31) return cy.wrap(false); 
  }
  
  if(mm == 4 || mm == 6 || mm == 9 || mm == 11){
    if(dd>30) return cy.wrap(false);
  }

  if(mm == 2){
    if(dd>28) return cy.wrap(false);
  }
  
  return cy.wrap(true);

});