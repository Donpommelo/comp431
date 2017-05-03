import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Login from './login';
import Register from './register';
import { refreshLogin } from './authActions'


export const Landing = ({ message, refreshLogin }) => {

    refreshLogin()

    return (
        <div>
            <h1>Welcome</h1>
            <div id="login"><Login /></div>
            <div id="register"><Register /></div>
            <b id="message">{message}</b>
        </div>
    )
};

Landing.propTypes = {
    message: PropTypes.string.isRequired,
    refreshLogin : PropTypes.func.isRequired,
};

export default connect(
    (state) => ({ message: state.message }),
    (dispatch) => ({ 
        refreshLogin: () => refreshLogin()(dispatch),
    })
)(Landing)