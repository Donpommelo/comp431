import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { navigate } from '../../actions'
import { logoutAuth } from '../auth/authActions'

export const Nav = ({ update, navigate }) => {

    const _logout = () => {
        update()
    };

    const _profile = () => {
        navigate('PROFILE_PAGE')
    };

    return (<div id="navigation">
        <button onClick={_logout}>Log Out</button>
        <br/>
        <button onClick={_profile}>Profile</button>
    </div>)
};

Nav.propTypes = {
    update: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired
};

export default connect(
    (state) => ({ }),
    (dispatch) => ({
        update: () => logoutAuth()(dispatch),
        navigate : (loc) => navigate(loc)(dispatch)
    })
)(Nav)