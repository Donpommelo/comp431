import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateInfo } from './profileActions'

export const ProfileForm = ({ account, update }) => {
    let username, pwNew1, pwNew2, email, phone, zip;

    const _update = () => {
        if (username && pwNew1 && email && phone && zip) {
            update(account, username.value, pwNew1.value, pwNew2.value, email.value, phone.value, zip.value);
            username.value = '';
            pwNew1.value = '';
            pwNew2.value = '';
            email.value = '';
            phone.value = '';
            zip.value = '';
        }
    };

    return (<span>

        <div id="currentInfo">
            <h1>Current Info</h1>
            <p id="currentName">Name: {account.username}</p>
            <p id="currentEmail">Email: {account.email}</p>
            <p id="currentPhone">Phone Number: {account.phone}</p>
            <p id="currentZip">Zip Code: {account.zipcode}</p>
            <p id="currentBirth">Date of Birth: {account.dob}</p>
        </div>

        <div id="updateInfo">
            <h1>Update Info</h1>
            <p>Username: <input type="text" id="newName" placeholder="Enter Username" ref={(node) => username = node} /></p>
            <p>Email: <input type="text" id="newEmail" placeholder="Enter Email" ref={(node) => email = node} /></p>
            <p>Phone Number: <input type="text" id="newPhone" placeholder="Enter Phone Number" ref={(node) => phone = node} /></p>
            <p>Zip Code: <input type="text" id="newZip" placeholder="Enter Zip Code" ref={(node) => zip = node} /></p>
            <p>Password: <input type="password" id="newPw1" placeholder="Enter New Password" ref={(node) => pwNew1 = node} /></p>
            <p>Password Confirm: <input type="password" id="newPw2" placeholder="Confirm Password" ref={(node) => pwNew2 = node} /></p>
            <button id="newProfileInfo" onClick={_update}>Update</button>
        </div>
    </span>)
};

ProfileForm.propTypes = {
    update: PropTypes.func.isRequired
};

export default connect(
    (state) => ({ account: state.account }),
    (dispatch) =>
        ({update: (myAccount, username, id, pw1, pw2, email, phone, zip, bday) =>
            updateInfo(myAccount, username, id, pw1, pw2, email, phone, zip, bday)(dispatch) })
)(ProfileForm)