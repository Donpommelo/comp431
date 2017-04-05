import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { loginAuth } from './authActions'

export const Login = ({ update }) => {

    let username;
    let pw;

    const _update = () => {
        if (username && pw) {
            update(username.value, pw.value)
        }
    };

    return (<div>
        <h1>Login</h1>
        <p>Username: <input type="text" id="username" placeholder="Enter Username" ref={(node) => username = node} /></p>
        <p>Password: <input type="password" id="password" placeholder="Enter Password" ref={(node) => pw = node} /></p>
        <button id="loginAttempt" onClick={_update}>Log In</button>
    </div>)
};

Login.propTypes = {
    update: PropTypes.func.isRequired,
};

export default connect(
    (state) => ({ }),
    (dispatch) => ({
        update: (name, pw) => loginAuth(name, pw)(dispatch)
     })
)(Login)
