import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'
import * as articleActions from './articleActions'
import * as reducers from '../../reducers'

describe('Validate article actions', () =>  {
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

    const articles = {'articles': []}

    it('should fetch articles', (done) => {

        mock(`${url}/articles`, {
            method: 'GET',
            headers: {'Content-Type':'application/json'},
            json: articles
        })

        articleActions.getArticles()(
            action => {
                expect(action.type).to.eql('INIT_ARTICLES')
                done()
            }
        )        
    })

    it('should update the search keyword', (done) => {

        const keyword = ''
        expect(reducers.keywordReducer('', {type:"FILTER", text: keyword})).to.eql(keyword)
        done()
        
    })
})
