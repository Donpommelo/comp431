
import * as Actions from './actions'
import { combineReducers } from 'redux'

export const currentPageReducer = (state = 'AUTH_PAGE', action) => {
    switch (action.type) {
        case Actions.NAVIGATE:
            return action.currentPage;
        case Actions.LOG_OUT:
            return 'AUTH_PAGE';
        case Actions.LOG_IN:
            return 'MAIN_PAGE';
        default:
            return state;
    }
};

export const accountReducer = (state = {}, action) => {
    switch (action.type) {
        case Actions.UPDATE:
            let newAccount = {...state}
            newAccount[action.field] = action.newVal
            return newAccount
        case Actions.LOG_OUT:
            return {}
        case Actions.LOG_IN:
            return {
                ...state,
                username: action.name
            }
        default:
            return state
    }
}

export const messageReducer = (state = '', action) => {
    switch (action.type) {
        case Actions.LOG_IN:
            return 'Login Successful! Welcome, ' + action.name;
        case Actions.REGISTER:
            return 'Register Successful! Welcome, ' + action.name;
        case Actions.LOG_OUT:
            return 'Logout Successful!';
        case Actions.NAVIGATE:
            return '';
        case Actions.FOLLOW:
            return 'User Followed!';
        case Actions.UNFOLLOW:
            return 'User Unfollowed!';
        case Actions.SUCCESS:
        case Actions.ERROR:
            return action.message;
        default:
            return state;
    }
};

export const followReducer = (state = [], action) => {
    switch (action.type) {
        case Actions.INIT_FOLLOWS:
            return action.follows
        case Actions.FOLLOW:
            return [
                action.name,
                ...state
            ];
        case Actions.UNFOLLOW:
            return state.filter((profile) => profile != action.name);
        case Actions.LOG_OUT:
            return []
        default:
            return state;
    }
};

export const articleReducer = (state = [], action) => {
    switch (action.type) {
        case Actions.INIT_ARTICLES:
            return action.articles
        case Actions.FILTER:
            return state.filter((article) => {
                if (article.text) {
                    return article.text.indexOf(action.text) != -1 || article.author.indexOf(action.text) != -1
                }
                if (article.author) {
                    return article.author.indexOf(action.text) != -1
                }
                return false
            });
        case Actions.NEW_ARTICLE:
           return  [
                ...action.post,
                ...state
            ];
        case Actions.REMOVE_ARTICLE:
           return state.filter((article) => article.author != action.name)
        case Actions.LOG_OUT:
            return []
        default: return state;
    }
};

export const keywordReducer = (state = '', action) => {
    switch (action.type) {
        case Actions.FILTER:
            return action.text
        default:
            return ''
    }
}

const Reducer = combineReducers({
    currentPage: currentPageReducer,
    account: accountReducer,
    message: messageReducer,
    followers: followReducer,
    articles: articleReducer,
    keyword: keywordReducer
});

export default Reducer