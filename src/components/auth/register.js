import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { regisAuth } from './authActions'

export let Register = ({ dispatch }) => {
    let username, pw1, pw2, email, phone, zip, bday;

    const _update = () => {
        if (username && pw1 && pw2 && email && phone && zip && bday) {
            dispatch(regisAuth(username.value, pw1.value, pw2.value, email.value, phone.value, zip.value, bday.value));
        }
    };

    return (<div>
        <h1>Register</h1>
        <p>Username: <input type="text" placeholder="Enter Username" ref={(node) => username = node} /></p>
        <p>Password: <input type="password" placeholder="Enter Password" ref={(node) => pw1 = node} /></p>
        <p>Password Confirmation: <input type="password" placeholder="Confirm Password" ref={(node) => pw2 = node} /></p>
        <p>Email: <input type="text" placeholder="Enter Email" ref={(node) => email = node} /></p>
        <p>Phone Number: <input type="text" placeholder="Enter Phone Number" ref={(node) => phone = node} /></p>
        <p>Zip Code: <input type="text" placeholder="Enter Zip Code" ref={(node) => zip = node} /></p>
        <p>Date of Birth: <input type="date" placeholder="Enter Date of Birth" ref={(node) => bday = node} /></p>
        <button onClick={_update}>Register</button>
    </div>)
};
Register = connect()(Register);
