import * as Actions from '../../actions'
import { followArticles, unfollowArticles } from '../article/articleActions'

export const addFollow = (follow, followers) => {
    return (dispatch) => {
        if (followers.indexOf(follow) != -1) {
            dispatch({ type: 'ERROR', message: 'User is already followed!'})
        } else {

            Actions.resource('PUT', 'following/' + follow)
            .then(r => {
                if (followers.length < r.following.length) {
                    dispatch({type: 'FOLLOW', name: follow})
                    followArticles(follow)(dispatch)
                } else {
                    dispatch({type: 'ERROR', message: 'Not a valid account name!'})
                }
            })
            .catch(r => dispatch({type: 'ERROR', message: 'No user was followed!'}))
        }
    }
}

export const removeFollow = (follow) => {
    return (dispatch) => {
        Actions.resource('DELETE', 'following/' + follow)
        .then(r => {
            dispatch( { type: 'UNFOLLOW', name: follow} )
            unfollowArticles(follow)(dispatch)
        })
        .catch(r => dispatch( {type: 'ERROR', message: 'Unable to unfollow!'} ))
    }
}
