import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateInfo, linkAccount, unlinkAccount } from './profileActions'

export const ProfileForm = ({ account, update, link, unlink }) => {
    let username, pwNew1, pwNew2, email, phone, zip, locusername, locpw;

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

    const _linkAccount = () => {
        if (locusername && locpw) {
            link(locusername.value, locpw.value)
            locusername.value = ''
            locpw.value = ''
        }
    }

    const _unlinkAccount = () => {
        unlink()
    }

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

            <h1>Link Accounts</h1>
            <p>Username: <input type="text" id="username" placeholder="Enter Rice Username" ref={(node) => locusername = node} /></p>
            <p>Password: <input type="password" id="password" placeholder="Enter Rice Password" ref={(node) => locpw = node} /></p>
            <button onClick={_linkAccount}>Link To Rice Account</button>
            <button onClick={_unlinkAccount}>Unlink To Rice Account</button>
        </div>
    </span>)
};

ProfileForm.propTypes = {
    update: PropTypes.func.isRequired,
    link: PropTypes.func.isRequired,
    unlink: PropTypes.func.isRequired
};

export default connect(
    (state) => ({ account: state.account }),
    (dispatch) => ({
        update: (myAccount, username, id, pw1, pw2, email, phone, zip, bday) =>
            updateInfo(myAccount, username, id, pw1, pw2, email, phone, zip, bday)(dispatch),
        link: (username, pw) => linkAccount(username, pw)(dispatch),
        unlink: () => unlinkAccount()(dispatch)
        })
)(ProfileForm)