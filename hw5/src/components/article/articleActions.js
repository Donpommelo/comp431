import * as Actions from '../../actions'

export const filterArticles = (keyword) => (dispatch) => {
    Actions.resource('GET', 'articles')
    .then(r => {
        dispatch({type: 'INIT_ARTICLES', articles: r.articles})
        Actions.resource('GET', 'articles/' + keyword)
        .then(r => dispatch({type: 'FILTER', text: keyword}))
        .catch(r => dispatch({type:'ERROR', message:'Articles could not be filtered'}))
    })
};

export const getArticles = () => (dispatch) => {
    Actions.resource('GET', 'articles')
    .then(r => dispatch({type: 'INIT_ARTICLES', articles: r.articles}))
}

export const newArticle = (text) => (dispatch) => {
    const date = new Date();
    Actions.resource('POST', 'article', {'text': text})
    .then(r => dispatch({ type: 'NEW_ARTICLE', post: r.articles}))
    .catch(r => dispatch({type:'ERROR', message:'Post could not be made!'}))
};

export const followArticles = (name) => (dispatch) => {
    Actions.resource('GET', 'articles/' + name)
    .then(r => dispatch({ type: 'NEW_ARTICLE', post: r.articles}))  
    .catch(r => dispatch({ type: 'ERROR', message: 'Follower articles could not be retrieved'}))  
}

export const unfollowArticles = (name) => (dispatch) => {
        Actions.resource('GET', 'articles/' + name)
        .then(r => dispatch({ type: 'REMOVE_ARTICLE', name: name}))  
        .catch(r => dispatch({ type: 'ERROR', message: 'Follower articles could not be removed'}))  
}