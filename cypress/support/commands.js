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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('postUser',(user)=>{
    cy.task('removeUser', user.email)
    .then(function (result) {
        cy.log(JSON.stringify(result))
    })
    cy.request({
        method: 'POST',
        url: 'http://localhost:3333/users',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: user
    }).then((response) => {
        expect(response.status).to.eq(200)

    })
})