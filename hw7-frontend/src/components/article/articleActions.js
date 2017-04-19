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
    
    Actions.resource('POST', 'article', {'text' :text}, true)
    .then(r => dispatch({ type: 'NEW_ARTICLE', post: r.articles}))
    .catch(r => dispatch({type:'ERROR', message:'Post could not be made!'}))
};

export const newArticleWithImage = (text, img) => (dispatch) => {
    const fd = new FormData()
    fd.append('text', text)
    fd.append('image', img)

    Actions.resource('POST', 'article', fd, true)
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

export const toggleCommentsOn = (postId) => (dispatch) => {
    Actions.resource('GET', 'articles/' + postId)
    .then((r) => dispatch({ type: 'ARTICLE_UPDATE', _id: postId, field: 'comments', newVal: r.articles[0].comments}))
    .catch(r => dispatch({ type: 'ERROR', message: 'Comment visibility could not be toggled!'}))
}

export const toggleCommentsOff = (postId) => (dispatch) => {
    Actions.resource('GET', 'articles/' + postId)
    .then((r) => dispatch({ type: 'ARTICLE_UPDATE', _id: postId, field: 'comments', newVal: []}))
    .catch(r => dispatch({ type: 'ERROR', message: 'Comment visibility could not be toggled!'}))
}

export const articleEditBegin = (articleId) => (dispatch) => {
    dispatch({ type: 'ARTICLE_EDIT_START', _id: articleId })
}

export const articleEditEnd = (articleId) => (dispatch) => {
    dispatch({ type: 'ARTICLE_EDIT_STOP', _id: articleId })
}

export const articleCommentBegin = (articleId) => (dispatch) => {
    dispatch({ type: 'ARTICLE_COMMENT_START', _id: articleId })
}

export const articleCommentEnd = (articleId) => (dispatch) => {
    dispatch({ type: 'ARTICLE_COMMENT_STOP', _id: articleId })
}

export const commentEditBegin = (commentId) => (dispatch) => {
    dispatch({ type: 'COMMENT_EDIT_START', _id: commentId })
}

export const commentEditEnd = (commentId) => (dispatch) => {
    dispatch({ type: 'COMMENT_EDIT_STOP', _id: commentId })
}

export const editArticle = (articleId, text) => (dispatch) => {
    Actions.resource('PUT', 'articles/' + articleId, {'text': text})
    .then((r) => {
        if (r) {
            dispatch({ type: 'ARTICLE_UPDATE', _id: articleId, field: 'text', newVal: text})
        } else {
            dispatch({ type: 'ERROR', message: 'Article could not be edited!'})
        }
    })
    .catch((r) => dispatch({ type: 'ERROR', message: 'Article could not be edited!'}))
}

export const commentArticle = (articleId, text) => (dispatch) => {
    Actions.resource('PUT', 'articles/' + articleId, {'text': text, 'commentId': -1})
    .then((r) => {
        if (r) {
            dispatch({ type: 'ARTICLE_UPDATE', _id: articleId, field: 'comments', newVal: r.articles.comments})
        } else {
            dispatch({ type: 'ERROR', message: 'Comment could not be posted!'})
        }
    })
    .catch((r) => dispatch({ type: 'ERROR', message: 'Comment could not be posted!'}))
}

export const editComment = (articleId, commentId, text) => (dispatch) => {
    Actions.resource('PUT', 'articles/' + articleId, {'text': text, 'commentId': commentId})
    .then((r) => {
        if (r) {
            dispatch({ type: 'ARTICLE_UPDATE', _id: articleId, field: 'comments', newVal: r.articles.comments})
        } else {
            dispatch({ type: 'ERROR', message: 'Comment could not be edited!'})
        }
    })
    .catch((r) => dispatch({ type: 'ERROR', message: 'Comment could not be edited!'}))
}