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
import moment from 'moment'

Cypress.Commands.add('postUser',(user)=>{
    cy.task('removeUser', user.email)
    .then(function (result) {
        
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
Cypress.Commands.add('recoveryPass', function(email){
    cy.request({
        method: 'POST',
        url: 'http://localhost:3333/password/forgot',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: {
                email: email
        }
    }).then((response) => {
        expect(response.status).to.eq(204)
        cy.task('findToken', email)
            .then(function(result){
                cy.log(result.token)
                Cypress.env('recoveryToken',result.token)
            })

    })
})
Cypress.Commands.add('createAppointment', function (hour) {
    let now = new Date()
    now.setDate(now.getDate() + 1)
    Cypress.env('appointmentDay', now.getDate())

    const date = moment(now).format('YYYY-MM-DD ' + hour + ':00')
    
    const payload ={
        provider_id: Cypress.env('providerId'),
        date:   date

    }
    cy.request({
        method:'POST',
        url:'http://localhost:3333/appointments',
        headers:{
            authorization:`Bearer ${Cypress.env('apiToken')}`
        },
        body: payload
    }).then(response =>{
        Cypress.env('apiToken',response.body.token)
        expect(response.status).to.be.eq(200)
        
    })
})
Cypress.Commands.add('setProviderId', function (providerEmail) {
    cy.request({
        method: 'GET',
        url:'http://localhost:3333/providers',

        headers:{
            authorization:`Bearer ${Cypress.env('apiToken')}`
        }
    }).then(function (response) {
       

        expect(response.status).to.eq(200)
        const listproviderList =  response.body
        listproviderList.forEach(provider => {
            
           if(provider.email === providerEmail){
                
                Cypress.env('providerId', provider.id)
            }
        });
    })
})
Cypress.Commands.add('apiLogin', function (user) {
    const payload = {
        email:user.email,
        password:user.password
    }
    cy.request({
        method:'POST',
        url:'http://localhost:3333/sessions',
        body: payload
    }).then(response =>{
        Cypress.env('apiToken',response.body.token)
        expect(response.status).to.be.eq(200)
        
    })
    
})