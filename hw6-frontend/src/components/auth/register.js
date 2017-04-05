import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { regisAuth } from './authActions'

export const Register = ({ update }) => {
    let username, pw1, pw2, email, phone, zip, bday;

    const _update = () => {
        if (username && pw1 && pw2 && email && phone && zip && bday) {
            update(username.value, pw1.value, pw2.value, email.value, phone.value, zip.value, bday.value);
        }
    };

    return (<div>
        <h1>Register</h1>
        <p>Username: <input type="text" id="regisName" placeholder="Enter Username" ref={(node) => username = node} /></p>
        <p>Password: <input type="password" id="regisPw1" placeholder="Enter Password" ref={(node) => pw1 = node} /></p>
        <p>Password Confirmation: <input type="password" id="regisPw2" placeholder="Confirm Password" ref={(node) => pw2 = node} /></p>
        <p>Email: <input type="text" id="regisEmail" placeholder="Enter Email" ref={(node) => email = node} /></p>
        <p>Phone Number: <input type="text" id="regisPhone" placeholder="Enter Phone Number" ref={(node) => phone = node} /></p>
        <p>Zip Code: <input type="text" id="regisZip" placeholder="Enter Zip Code" ref={(node) => zip = node} /></p>
        <p>Date of Birth: <input type="date" id="regisBirth" placeholder="Enter Date of Birth" ref={(node) => bday = node} /></p>
        <button id="regisAttempt" onClick={_update}>Register</button>
    </div>)
};

Register.propTypes = {
    update: PropTypes.func.isRequired,
};

export default connect(
    (state) => ({ }),
    (dispatch) => ({
        update: (name, pw1, pw2, email, phone, zip, bday) => 
        regisAuth(name, pw1, pw2, email, phone, zip, bday)(dispatch)
        })
)(Register)