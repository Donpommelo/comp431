import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Login from './login';
import Register from './register';

export const Landing = ({ message }) => {

    return (
        <div>
            <h1>Welcome</h1>
            <div id="login"><Login /></div>
            <div id="register"><Register /></div>
            <b id="message">{message}</b>
        </div>
    )
};

Landing.propTypes = {
    message: PropTypes.string.isRequired,
};

export default connect(
    (state) => ({ message: state.message }),
    (dispatch) => ({ })
)(Landing)