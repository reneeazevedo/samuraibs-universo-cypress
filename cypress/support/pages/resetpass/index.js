import {el} from './elements'
import toast from '../../components/toast'
class ResetPassPage{
    constructor(){
        this.toast = toast
    }
    go(token){
        cy.visit('/reset-password?token=' + token)
        cy.contains(el.title)
            .should('be.visible')
    }
    form(newPass, confirmPass){
        cy.get(el.password).type(newPass)
        cy.get(el.passConfir).type(confirmPass)
        
    }
    submit(){
        cy.contains(el.changePassButton).click()
    }
}

export default new ResetPassPage()