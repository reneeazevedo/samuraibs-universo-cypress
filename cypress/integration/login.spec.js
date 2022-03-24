
import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dash'

describe('login', () => {

    context('quando o usuário é muito bom', () => {
        const user = {
            name: 'Roberto Jassa',
            email: 'jassa@samuraibs.com',
            password:'pwd123'
        }
        it('deve logar com sucesso', () => {
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()
            dashPage.header.userLoggedIn(user.name)
            
        });
    });
    
});