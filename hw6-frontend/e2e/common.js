import { expect } from 'chai'
import { findId, sleep } from './selenium'

exports.creds = {
    username: 'zht1test',
    password: 'forever-dream-jump'
};

exports.login = () =>
    sleep(500)
        .then(findId('username').clear())
        .then(findId('password').clear())
        .then(findId('username').sendKeys(exports.creds.username))
        .then(findId('password').sendKeys(exports.creds.password))
        .then(findId('loginAttempt').click())
        .then(sleep(2000));

exports.logout = () =>
    sleep(500)
    .then(findId('logout').click())
    .then(sleep(2000))
    .then(findId('message').getText()
        .then(text => {
             expect(text.indexOf('Logout Successful!')).to.equal(0)
        }))