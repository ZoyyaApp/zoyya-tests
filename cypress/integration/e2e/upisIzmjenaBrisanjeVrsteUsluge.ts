/// <reference types="cypress" />

export const module = 1;

describe("Owner can edit/create/delete type of service", () => {

    beforeEach(()=>{

        cy.visit("/login");

        cy.get('[data-cy=button_email]').click()

        cy.getInput("email")
        .type(Cypress.env("userName"))
        .should("have.value", Cypress.env("userName")); 
    
        cy.getInput("password")
            .type(Cypress.env("password"))
            .should("have.value", Cypress.env("password"));
        
        cy.get('[data-cy=button_submit]').click();

        cy.wait(3000);

        cy.get('[data-intercom-target="Sidebar-Settings"]').click();

        cy.get('[data-intercom-target="Sidebar-Location-Services"]')
        .click();
    
    });

    it('Create/Edit/Delete type of service',() =>{

        // Dodavanje vrste usluge pod imenom 'Test-vrsta-usluge'

        cy.get('[data-cy=tooltip_button_btnAddService]').click();

        cy.get(':nth-child(1) > .style__InputWrapper-eewg3u-0 > .style__InputFieldWrapper-eewg3u-1 > [data-cy=input_undefined]')
        .click()
        .type('Test-vrsta-usluge');

        cy.get('.Check__StyledIcon-m1vxvo-0').click();

        // Izmjena 'Test-vrsta-usluge' u 'Izmjenjena-vrsta-usluge'

        cy.get('.styles__ServicesLeftContent-sb82wm-27')
        .should('contain','Test-vrsta-usluge');

        cy.get('.styles__ServicesLeftContent-sb82wm-27')
        .contains('Test-vrsta-usluge')
        .parent()
        .then(($parent)=>{                                              //Hvatanje parent DOM-a od onoga koji sadrzi Test-vrsta-usluge
            cy.get('[data-cy=tooltip_button_btnEditService]').click()

            cy.wrap($parent)
            .click()
            .type('Izmjenjena-vrsta-usluge')

        });

        cy.get('.Check__StyledIcon-m1vxvo-0').click();

        cy.get('.styles__ServicesLeftContent-sb82wm-27')
        .should('contain','Izmjenjena-vrsta-usluge');
        
        cy.get('.styles__ServicesLeftContent-sb82wm-27')
        .contains('Test-vrsta-usluge')
        .parent().click()
        
        cy.get('[data-cy=tooltip_button_btnDeleteService]').click()

        cy.get('.styles__ServicesLeftContent-sb82wm-27')
        .should('not.contain','Izmjenjena-vrsta-usluge');

        
    });

});