import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'
import { ArticleView } from './articleView'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import {findDOMNode} from 'react-dom'

import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'

import Reducer from '../../reducers'

describe('Validate articles view', () =>  {
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

    it('should render articles', (done) => {
        const logger = createLogger();
        const store = createStore(Reducer, applyMiddleware(logger));

        const articles = [
            {"img": "none", "text":"test1", "author":"sep1", "date":"whenever", "comments":[], "_id": 0},
            {"img": "none", "text":"test2", "author":"sep1test", "date":"whenever", "comments":[], "_id": 2},
            {"img": "none", "text":"test4", "author":"zht1", "date":"eh", "comments":[], "_id": 1}]

        const node = TestUtils.renderIntoDocument(
            <Provider store={store}>
            <ArticleView id={1} articles={articles} />
            </Provider>
        )

        const elements = findDOMNode(node).children[1]
        expect(elements.children.length).to.equal(articles.length)
        done()
    })

    it('should dispatch actions to create a new article', (done) => {
        
        const logger = createLogger();
        const store = createStore(Reducer, applyMiddleware(logger));

        const articles = [
            {"img": "none", "text":"test1", "author":"sep1", "date":"whenever", "comments":[], "_id": 0},
            {"img": "none", "text":"test2", "author":"sep1test", "date":"whenever", "comments":[], "_id": 2},
            {"img": "none", "text":"test4", "author":"zht1", "date":"eh", "comments":[], "_id": 1}]

        mock(`${url}/article`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            json: {'articles': []}
        })

        const node = TestUtils.renderIntoDocument(
            <Provider store={store}>
            <ArticleView id={1} articles={articles} />
            </Provider>
        )
        const newArt = findDOMNode(node).children[0]
        
	    TestUtils.Simulate.click(newArt.children[3])
        
        const elements = findDOMNode(node).children[1]
        expect(elements.children.length).to.equal(articles.length)

        done()
    })
})
