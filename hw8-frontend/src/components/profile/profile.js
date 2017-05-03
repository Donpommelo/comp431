import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { navigate } from '../../actions'
import  ProfileForm from './profileForms'
import  Avatar from './avatar'

export const Profile = ({ message, update }) => {

    const _main = () => {
        update('MAIN_PAGE')
    };

    return (
        <div>
            <button id="navigation" onClick={_main}>Main Page</button>
            <div><Avatar /></div>
            <div id="profileForm"><ProfileForm /></div>
            <b id="message">{message}</b>
        </div>
    )
};

Profile.propTypes = {
    message: PropTypes.string.isRequired,
    update: PropTypes.func.isRequired,
};

export default connect(
    (state) => ({ message: state.message }),
    (dispatch) => ({ update: (message) => navigate(message)(dispatch) })
)(Profile)