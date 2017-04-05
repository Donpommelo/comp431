import { expect } from 'chai'
import { driver, go, sleep, findId, findCSS, By } from './selenium'
import common from './common'

describe('Test End to End Authentication', () => {

 it('should register a new user', (done) => {
        go()
        .then(sleep(500))
        .then(findId('regisName').clear())
        .then(findId('regisPw1').clear())
        .then(findId('regisPw2').clear())
        .then(findId('regisEmail').clear())
        .then(findId('regisPhone').clear())
        .then(findId('regisZip').clear())
        .then(findId('regisBirth').clear())
        .then(findId('regisName').sendKeys('1'))
        .then(findId('regisPw1').sendKeys('1'))
        .then(findId('regisPw2').sendKeys('1'))
        .then(findId('regisEmail').sendKeys('zht1@rice.edu'))
        .then(findId('regisZip').sendKeys('11111'))
        .then(findId('regisBirth').sendKeys('11/11/1990'))
        .then(findId('regisAttempt').click())
        .then(sleep(2000))
        .then(findId('message').getText()
            .then(text => {
                expect(text.indexOf('Register Successful!')).to.equal(0)
            }))
        .then(done)
        .catch(done)
    })

    it('should log in as the test user', (done) => {
        go()
        .then(sleep(500)
        .then(findId('username').clear())
        .then(findId('password').clear())
        .then(findId('username').sendKeys('zht1test'))
        .then(findId('password').sendKeys('forever-dream-jump'))
        .then(findId('loginAttempt').click())
        .then(sleep(2000))
        .then(findId('message').getText()
        .then(text => {
            expect(text.indexOf('Login Successful!')).to.equal(0)
        }))
        .then(done))
        .catch(done)
    })
})