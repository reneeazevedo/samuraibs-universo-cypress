

import fpPage from "../support/pages/forgotpass"
import recPage from "../support/pages/resetpass"

describe('resgate de senha', function () {
    before(function () {
        cy.fixture('recovery').then(function (recovery) {
            this.data = recovery
        })
    })

    context('quando o usuário esquece a senha', function () {
        before(function () {
            cy.postUser(this.data)
        })
        it('deve poder resgatar por email', function () {
            fpPage.go()
            fpPage.form(this.data.email)
            fpPage.submit()
           
            const message= 'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada.'
            fpPage.toast.shouldHaveText(message)

        })
    })
    context('quando o usário solicita o resgate', function() {
        before(function() {
            cy.postUser(this.data)
            cy.recoveryPass(this.data.email)
        });
        it('deve poder cadastrar um no senha', function() {
           
            recPage.go(Cypress.env('recoveryToken'))
            recPage.form('pwd123','pwd123')
            recPage.submit()
            
            const message ='Agora você já pode logar com a sua nova senha secreta.'
            recPage.toast.shouldHaveText(message)

        });
    });
});