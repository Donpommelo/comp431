import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'
import * as authActions from './authActions'


describe('Validate authentication', () =>  {
    const url = 'https://webdev-dummy.herokuapp.com'

    let Action, actions
    beforeEach(() => {
        global.fetch = fetch
    })

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        }
    })

    it('should log in a user', (done) => {

        const username = 'zht1'
        const result = 'success'

        mock(`${url}/login`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            json: { username, result }
        })

        authActions.loginAuth('overridden username','overridden password')(
            action => {
                expect(action.type).to.eql('LOG_IN')
                done()
            }
        )        
    })

    it('should not log in an invalid user', (done) => {
        mock(`${url}/login`, {
            method: 'POST',
            headers: {'Content-Type':'text/plain'},
            text: 'Unauthorized'
        })

        authActions.loginAuth('overridden username','overridden password')(
            action => {
                expect(action.type).to.eql('ERROR')
                done()
            }
        )   
    })

    it('should log out a user', (done) => {

        mock(`${url}/logout`, {
            method: 'PUT',
            headers: {'Content-Type':'text/plain'},
            text: 'OK'
        })

        authActions.logoutAuth('overridden username','overridden password')(
            action => {
                expect(action.type).to.eql('LOG_OUT')
                done()
            }
        )   
    })
})
