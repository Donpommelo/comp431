import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

export const Avatar = ({ }) => {

    return (<div id="avatar">
        <p>Upload new profile picture: <input id="newAva" type="file" /></p>
    </div>)
};

export default connect(
    (state) => ({ }),
    (dispatch) => ({ })
)(Avatar)