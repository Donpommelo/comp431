import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { loginAuth} from './authActions'

export let Login = ({ dispatch }) => {

    let username;
    let pw;

    const _update = () => {
        if (username && pw) {
            dispatch(loginAuth(username.value, pw.value));
        }
    };

    return (<div>
        <h1>Login</h1>
        <p>Username: <input type="text" placeholder="Enter Username" ref={(node) => username = node} /></p>
        <p>Password: <input type="password" placeholder="Enter Password" ref={(node) => pw = node} /></p>
        <button onClick={_update}>Log In</button>
    </div>)
};
Login = connect()(Login);
