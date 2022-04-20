/// <reference types="cypress" />
import signupPage from '../support/pages/signup'
import faker from '@faker-js/faker'



describe('cadastro', function() {
    before(function()  {
        cy.fixture('signup').then(function(signup){
            this.success = signup.success
            this.email_dup = signup.email_dup
            this.email_inv = signup.email_inv
            this.short_password = signup.short_password

        })
    });
    context('quando o usuário é novato', function() {
      
        before(function() {
            cy.task('removeUser', this.success.email)
                .then(function (result) {
                    cy.log(JSON.stringify(result))
                })
        });
        it('deve cadatrar com sucesso', function(){

            signupPage.go()
            signupPage.form(this.success)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')

            /*cy.intercept('POST','/users',{
                statusCode:200
            }).as('postUser')
        
            cy.wait('@postUser')*/


        });
    });


    context('quando o email já existe', () => {
       
        before(function(){
          cy.postUser(this.email_dup)
        });
        it('deve exibir email já cadastrado',function() {

            signupPage.go()
            signupPage.form(this.email_dup)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')
            /*cy.intercept('POST','/users',{
            }).as('postUser')
                statusCode:200
        
            cy.wait('@postUser')*/


        });
    });

    context('quando o email é incorreto', function() {
       
        it('deve exibir mensagem de alerta', function() {
            signupPage.go()
            signupPage.form(this.email_inv)
            signupPage.submit()
            signupPage.alertHaveText('Informe um email válido')

        });

    });
    context('quando a senha é muito curta', function() {
        const passwords = ['1', '2a', 'ab3', 'abc4', 'ab#c5']


        passwords.forEach(function (password) {

            it(`não deve cadastrar com a senha: ${password}`, function(){
                
                this.short_password.password = password

                signupPage.go()
                signupPage.form(this.short_password)
                signupPage.submit()   
               
            });
            
        })
        afterEach(function () {
            signupPage.alert.haveText('Pelo menos 6 caracteres')
        })

       
          
     


    });
    context('quando não preencho nenhum dos campos', () => {
        const alertMessages = [
            'Nome é obrigatório',
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]
        before(() => {
            signupPage.go()
            signupPage.submit()
        });

        alertMessages.forEach((alert)=>{
            it(`deve exibir ${alert.toLowerCase()}`, () => {
                signupPage.alert.haveText(alert)
            });
        })
    });
    
});
