export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const REGISTER = 'REGISTER';
export const NAVIGATE = 'NAVIGATE';
export const UPDATE = 'UPDATE';
export const INIT_FOLLOWS = 'INIT_FOLLOWS';
export const INIT_ARTICLES = 'INIT_ARTICLES';
export const FOLLOW = 'FOLLOW';
export const UNFOLLOW = 'UNFOLLOW';
export const FILTER = 'FILTER';
export const NEW_ARTICLE = 'NEW_ARTICLE';
export const REMOVE_ARTICLE = 'REMOVE_ARTICLE';
export const ARTICLE_UPDATE = 'ARTICLE_UPDATE';
export const ARTICLE_EDIT_START = 'ARTICLE_EDIT_START';
export const ARTICLE_EDIT_STOP = 'ARTICLE_EDIT_STOP';
export const ARTICLE_COMMENT_START = 'ARTICLE_COMMENT_START';
export const ARTICLE_COMMENT_STOP = 'ARTICLE_COMMENT_STOP';
export const COMMENT_EDIT_START = 'COMMENT_EDIT_START';
export const COMMENT_EDIT_STOP = 'COMMENT_EDIT_STOP';
export const ERROR = 'ERROR';
export const SUCCESS = 'SUCCESS';

import * as authActions from './components/auth/authActions'
import {getInfo} from './components/profile/profileActions'

const url = 'https://webdev-dummy.herokuapp.com'

export const resource = (method, endpoint, payload, notJSON) => {
  
  const options =  {
        method,
        credentials: 'include'
  }
  if (!notJSON) {
    options.headers = {'Content-Type': 'application/json'}
    if (payload) options.body = JSON.stringify(payload)
  } else {
    if (payload) options.body = payload
  }

  return fetch(`${url}/${endpoint}`, options)
    .then(r => {
      if (r.status === 200) {
        return (r.headers.get('Content-Type').indexOf('json') > 0) ? r.json() : r.text()
      }
    })
}

export const navigate = (newPath) => (dispatch) => {
  dispatch({type: 'NAVIGATE', currentPage: newPath})
}

export const initialize = () => (dispatch) => {
    
      getInfo()(dispatch)

      resource('GET', 'headlines')
      .then(r => {
          if (r.headlines.length > 0) {
              dispatch({type: 'UPDATE', field: 'headline', newVal: r.headlines[0].headline})
          }
      })
  
      resource('GET', 'following')
      .then(r => {
          dispatch({type: 'INIT_FOLLOWS', follows: r.following})
          resource('GET', 'articles')
          .then(r => dispatch({type: 'INIT_ARTICLES', articles: r.articles}))
      })     

    
};

export const error = (message) => (dispatch) => {
    dispatch({type:'ERROR', message: message})
}

export const success = (message) => (dispatch) => {
      dispatch({type:'SUCCESS', message: message})
}