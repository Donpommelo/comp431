import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'
import * as profileActions from './profileActions'


describe('Validate Profile Actions', () =>  {

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

    it('should fetch the users profile information', (done) => {
        
        const username = "zht1"
        const email = "zht1@rice.edu"
        const zipcode = "77479"
        const dob = ""

        mock(`${url}/avatars`, {
                method: 'GET',
                headers: {'Content-Type':'application/json'},
                json: { "avatars": [] }
        })

        mock(`${url}/email`, {
                method: 'GET',
                headers: {'Content-Type':'application/json'},
                json: { username, email }
        })

        mock(`${url}/zipcode`, {
                method: 'GET',
                headers: {'Content-Type':'application/json'},
                json: { username, zipcode }
        })

        mock(`${url}/dob`, {
                method: 'GET',
                headers: {'Content-Type':'application/json'},
                json: { username, dob }
        })
        
        profileActions.getInfo()(
            action => {
                expect(action.type).to.eql('UPDATE')
            }
        )

        done()

    })

    it('should update headline', (done) => {

          const username = 'zht1'
          const headline = 'success'

            mock(`${url}/headline`, {
                method: 'PUT',
                headers: {'Content-Type':'application/json'},
                json: { username, headline }
            })

            profileActions.updateStatus('overridden username','overridden headline')(
                action => {
                    expect(action.type).to.eql('UPDATE')
                    done()
                }
            )  
        
    })
})

  