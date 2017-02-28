import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { navigate } from '../../actions'

export let Nav = ({ dispatch }) => {

    const _logout = () => {
        dispatch(navigate('AUTH_PAGE'))
    };

    const _profile = () => {
        dispatch(navigate('PROFILE_PAGE'))
    };

    return (<div id="navigation">
        <button onClick={_logout}>Log Out</button>
        <br/>
        <button onClick={_profile}>Profile</button>
    </div>)
};
Nav = connect()(Nav);
