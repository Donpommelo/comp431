
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const REGISTER = 'REGISTER';
export const NAVIGATE = 'NAVIGATE';
export const UPDATE = 'UPDATE';
export const FOLLOW = 'FOLLOW';
export const UNFOLLOW = 'UNFOLLOW';
export const FILTER = 'FILTER';
export const NEW_POST = 'NEW_POST';
export const ERROR = 'ERROR';

export const ActionTypes = {
    LOG_IN: 'LOG_IN',
    LOG_OUT: 'LOG_OUT',
    REGISTER: 'REGISTER',
    NAVIGATE: 'NAVIGATE',
    UPDATE: 'UPDATE',
    FOLLOW: 'FOLLOW',
    UNFOLLOW: 'UNFOLLOW',
    FILTER: 'FILTER',
    NEW_POST: 'NEW_POST'
};

//This file was intended for actions that would be called by multiple different pages of the website.
//For the current draft, there are not many actions that fit this.
export const navigate = (newPath) => {
    return {type: 'NAVIGATE', currentPage: newPath}
};