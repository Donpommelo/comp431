import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateAvatar } from './profileActions'

export const Avatar = ({ account, editAvatar }) => {

    const _editAvatar = (img) => {
        editAvatar(img.target.files[0])
    }

    return (<div id="avatar">
        <img src={ account.avatar }/>
        <p>Upload new profile picture: <input id="newAva" type="file" accept="image/*" 
        onChange={(e) => _editAvatar(e)} /></p>
    </div>)
};

Avatar.propTypes = {
    editAvatar: PropTypes.func.isRequired,
};

export default connect(
    (state) => ({ account: state.account }),
    (dispatch) => ({ editAvatar : (img) => updateAvatar(img)(dispatch) })
)(Avatar)