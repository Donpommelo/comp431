import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateInfo } from './profileActions'

export const ProfileForm = ({ id, accountBank, update }) => {
    let username, pwNew1, pwNew2, email, phone, zip;

    let myAccount;
    const accounts = accountBank.filter((account) => account.id == id);
    if (accounts && accounts.length > 0) {
        myAccount = accounts[0];
    }

    const _update = () => {
        if (username && pwNew1 && email && phone && zip) {
            update(myAccount, username.value, id, pwNew1.value, pwNew2.value, email.value, phone.value,
                zip.value, myAccount.bday);
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
            <p>Name: {myAccount.name}</p>
            <p>Email: {myAccount.email}</p>
            <p>Phone Number: {myAccount.phone}</p>
            <p>Zip Code: {myAccount.zip}</p>
            <p>Date of Birth: {myAccount.bday}</p>
        </div>

        <div id="updateInfo">
            <h1>Update Info</h1>
            <p>Username: <input type="text" placeholder="Enter Username" ref={(node) => username = node} /></p>
            <p>Email: <input type="text" placeholder="Enter Email" ref={(node) => email = node} /></p>
            <p>Phone Number: <input type="text" placeholder="Enter Phone Number" ref={(node) => phone = node} /></p>
            <p>Zip Code: <input type="text" placeholder="Enter Zip Code" ref={(node) => zip = node} /></p>
            <p>Password: <input type="password" placeholder="Enter New Password" ref={(node) => pwNew1 = node} /></p>
            <p>Password Confirm: <input type="password" placeholder="Confirm Password" ref={(node) => pwNew2 = node} /></p>
            <button onClick={_update}>Update</button>
        </div>
    </span>)
};

ProfileForm.propTypes = {
    id: PropTypes.number.isRequired,
    accountBank: PropTypes.array.isRequired,
    update: PropTypes.func.isRequired
};

export default connect(
    (state) => ({ id: state.currentAccount, accountBank: state.accountBank }),
    (dispatch) =>
        ({update: (myAccount, username, id, pw1, pw2, email, phone, zip, bday) =>
            dispatch(updateInfo(myAccount, username, id, pw1, pw2, email, phone, zip, bday)) })
)(ProfileForm)