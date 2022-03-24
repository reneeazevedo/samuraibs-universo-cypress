/// <reference types="cypress" />
import signupPage from '../support/pages/signup'
import faker from '@faker-js/faker'



describe('cadastro', () => {
    context('quando o usuário é novato', () => {
        const user = {
            name: 'Renée Azevedo',
            email: 'renee.azevedo@samuraibs.com',
            password: 'pwd123'
        }
        before(() => {
            cy.task('removeUser', user.email)
                .then(function (result) {
                    cy.log(JSON.stringify(result))
                })
        });
        it('deve cadatrar com sucesso', () => {

            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')

            /*cy.intercept('POST','/users',{
                statusCode:200
            }).as('postUser')
        
            cy.wait('@postUser')*/


        });
    });


    context('quando o email já existe', () => {
        const user = {
            name: 'maria',
            email: 'maria4@maria.com',
            password: "pwd123",
            is_provider: true
        }
        before(() => {
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
        });
        it('deve exibir email já cadastrado', () => {

            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')
            /*cy.intercept('POST','/users',{
            }).as('postUser')
                statusCode:200
        
            cy.wait('@postUser')*/


        });
    });

    context('quando o email é incorreto', () => {
        const user = {
            name: 'Elizabeth olsen',
            email: 'eli.samuraibs.com',
            password: 'pwd123'
        }
        it('deve exibir mensagem de alerta', () => {
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.alertHaveText('Informe um email válido')

        });

    });
    context('quando a senha é muito curta', () => {
        const passwords = ['1', '2a', 'ab3', 'abc4', 'ab#c5']
        const user = {
            name: 'Jason Friday',
            email: 'jason@gmail.com',
            password: '1'
        }
        beforeEach(() => {
            signupPage.go()
            
        });

        passwords.forEach(function (password) {

            user.password = password


            it(`não deve cadastrar com a senha: ${password}`, () => {
                signupPage.form(user)
                signupPage.submit()     
            });
        })

        afterEach(() => {
            signupPage.alertHaveText('Pelo menos 6 caracteres')
        });



    });
    context.only('quando não preencho nenhum dos campos', () => {
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
            it.only(`deve exibir ${alert.toLowerCase()}`, () => {
                signupPage.alertHaveText(alert)
            });
        })
    });
    
});
