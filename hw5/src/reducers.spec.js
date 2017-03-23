import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'
import * as reducers from './reducers'

describe('Validate reducer', () =>  {
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

    it('should initialize state', (done) => {
        const startState = { "currentPage": "AUTH_PAGE", "account": {}, "message":'', "followers":[], "articles":[], "keyword":''}
        expect(reducers.default(undefined, {type:"UNDEFINED"})).to.eql(startState)
        done()
    })

    it('should state success', (done) => {
        const message = "testing"
        expect(reducers.messageReducer('', {type:"SUCCESS", message: message})).to.eql(message)
        done()
    })

    it('should state error', (done) => {
        const message = "testing"
        expect(reducers.messageReducer('', {type:"ERROR", message: message})).to.eql(message)
        done()
    })

    it('should set the articles', (done) => {
        const articles = [{"author":"zht1", "text":"test1"},{"author":"zht1test", "text":"test2"}]
        expect(reducers.articleReducer([], {type:"NEW_ARTICLE", post: articles})).to.eql(articles)
        done()        
    })

    it('should set the search keyword', (done) => {
        const keyword = ''
        expect(reducers.keywordReducer('', {type:"FILTER", text: keyword})).to.eql(keyword)
        done()
    })

    it('should filter displayed articles by the search keyword', (done) => {
        const articles = [{"author":"zht1", "text":"test1"},{"author":"zht1test", "text":"test2"}]
        const filteredarticles = [{"author":"zht1", "text":"test1"}]
        const keyword = 'test1'
        expect(reducers.articleReducer(articles, {type:"FILTER", text: keyword})).to.eql(filteredarticles)
        done()    
    })
})

