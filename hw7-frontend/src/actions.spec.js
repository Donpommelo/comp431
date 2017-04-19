import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'
import * as action from './actions'

describe('Validate actions', () =>  {
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

    it('resource should be a resource', (done) => {

        const res = 'resource'

        mock(`${url}/`, {
            method: 'GET',
            headers: {'Content-Type':'text/plain'},
            text: res
        })

        action.resource('GET','')
        .then(r =>{
            expect(r).to.eql(res)
            done()
        })       
    })

    it('resource should give me the http error', (done) => {
        mock(`${url}`, {
            method: 'GET',
            headers: {'Content-Type':'text/plain'},
            status: 401
        })

        action.resource('GET', '')
        .then()
        .catch(done())
        
    })

    it('resource should be POSTable', (done) => {
        const res = 'resource'

        mock(`${url}/`, {
            method: 'POST',
            headers: {'Content-Type':'text/plain'},
            text: res
        })

        action.resource('POST', '')
        .then(r =>{
            expect(r).to.eql(res)
            done()
        })    
        
    })

    it('should update error message', (done) => {
        action.error('test')(
            action => {
                expect(action.type).to.eql('ERROR')
                expect(action.message).to.eql('test')
                done()    
            }
        )
    })

    it('should update success message', (done) => {
        action.success('test')(
            action => {
                expect(action.type).to.eql('SUCCESS')
                expect(action.message).to.eql('test')
                done()    
            }
        )        
    })

    it('should navigate to wherever', (done) => {
        action.navigate('MAIN_PAGE')(
            action => {
                expect(action.type).to.eql('NAVIGATE')
                expect(action.currentPage).to.eql('MAIN_PAGE')
                done()
            }
        )
    })
});
