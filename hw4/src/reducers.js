
import * as Actions from './actions'
import{ combineReducers } from 'redux'

const currentPageReducer = (state = 'AUTH_PAGE', action) => {
    switch (action.type) {
        case Actions.NAVIGATE:
            return action.currentPage;
        case Actions.LOG_IN:
        case Actions.REGISTER:
            return 'MAIN_PAGE';
        case Actions.LOG_OUT:
            return 'AUTH_PAGE';
        default:
            return state;
    }
};

//This manages a single int id that represents the current account. '0' indicates a tentative guest account that is
//designated in a json file. This account serves as the current account even when the user is on the Landing page.
const currentAccountReducer = (state = '0', action) => {
  switch (action.type) {
      case Actions.LOG_IN:
      case Actions.REGISTER:
            return action.id;
      case Actions.LOG_OUT:
            return 0;
      default:
          return state;
  }
};

const defaultAvatar = "http://68.media.tumblr.com/1333c6c893e86a97e378647778d5b75f/tumblr_olcqvbYKgt1sfui3ho1_1280.jpg";
const initialProfile = require('./data/profile.json');
const accountBankReducer = (state = initialProfile
, action) => {
    switch (action.type) {
        case Actions.LOG_IN:
            //For the purpose of the draft, logging in will always log in as the guest account with id 0 and default info
            //except for user's input name and password. The final version will not change the account bank upon log in.
            return [
                {
                    ...state[0],
                    name: action.name,
                    password: action.pw
                }
            ];
        case Actions.REGISTER:
            return [
                ...state,
                {
                    id: action.id,
                    name: action.name,
                    password: action.pw,
                    email: action.email,
                    phone: action.phone,
                    zip: action.zip,
                    bday: action.bday,
                    avatar: defaultAvatar,
                    status: 'I just registered for an account on this website.'
                }
            ];
        case Actions.UPDATE:
            return [
                ...state.filter((profile) => profile.id != action.id),
                {
                    id: action.id,
                    name: action.name,
                    password: action.pw,
                    email: action.email,
                    phone: action.phone,
                    zip: action.zip,
                    bday: action.bday,
                    avatar: defaultAvatar,
                    status: action.status
                }
            ];
        default:
            return state
    }
};

const messageReducer = (state = '', action) => {
    switch (action.type) {
        case Actions.LOG_IN:
            return 'Login Successful! Welcome, ' + action.name;
        case Actions.REGISTER:
            return 'Register Successful! Welcome, ' + action.name;
        case Actions.NAVIGATE:
            return '';
        case Actions.FOLLOW:
            return 'User Followed!';
        case Actions.UNFOLLOW:
            return 'User Unfollowed!';
        case Actions.NEW_POST:
            return 'Article successfully posted!';
        case Actions.UPDATE:
        case Actions.ERROR:
            return action.message;
        default:
            return state;
    }
};

const initialFollows = require('./data/followers.json');
const followReducer = (state = initialFollows, action) => {
    switch (action.type) {
        case Actions.FOLLOW:
            return [
                {
                    name: action.name,
                    status: action.status,
                    avatar: action.avatar
                },
                ...state
            ];
        case Actions.UNFOLLOW:
            return state.filter((profile) => profile.name != action.name);
        default:
            return state;
    }
};

const initialArticles = require('./data/articles.json');
const articleReducer = (state = initialArticles, action) => {
    switch (action.type) {
        case Actions.FILTER:
            return state.map((article) => {
                if (article.text.indexOf(action.name) != -1 || article.author.indexOf(action.name) != -1) {
                    return {
                        ...article,
                        visible: true
                    }
                } else {
                    return {
                        ...article,
                        visible: false
                    }
                }
            });
        case Actions.NEW_POST:
           return  [
               {
                   pic: action.pic,
                   text: action.text,
                   date: action.date,
                   author: action.author,
                   id: action.id,
                   visible: action.visible
               },
                ...state
            ];
        default: return state;
    }
};

const Reducer = combineReducers({
    currentPage: currentPageReducer,
    currentAccount: currentAccountReducer,
    accountBank: accountBankReducer,
    message: messageReducer,
    followers: followReducer,
    articles: articleReducer
});

export default Reducer