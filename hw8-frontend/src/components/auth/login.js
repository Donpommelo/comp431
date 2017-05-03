import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { loginAuth } from './authActions'

export const Login = ({ loginAuth }) => {

    let username;
    let pw;

    const _login = () => {
        if (username && pw) {
            loginAuth(username.value, pw.value)
        }
    };
    
    return (
    <div>
        <h1>Login</h1>
        <p>Username: <input type="text" id="username" placeholder="Enter Username" ref={(node) => username = node} /></p>
        <p>Password: <input type="password" id="password" placeholder="Enter Password" ref={(node) => pw = node} /></p>
        <button id="loginAttempt" onClick={_login}>Log In</button>
        <a id="loginfbAttempt" href="https://fathomless-scrubland-85774.herokuapp.com/auth/facebook/callback">Log In with Facebook</a>
    </div>)
};

Login.propTypes = {
    loginAuth: PropTypes.func.isRequired,
};

export default connect(
    (state) => ({ }),
    (dispatch) => ({
        loginAuth: (name, pw) => loginAuth(name, pw)(dispatch),
     })
)(Login)
