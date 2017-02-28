import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Landing from './auth/landing'
import Main from './main/main'
import Profile from './profile/profile'

export const App = ({ currentPage }) => {

    switch(currentPage) {
        case 'AUTH_PAGE':
            return <Landing/>;
        case 'MAIN_PAGE':
            return <Main/>;
        case 'PROFILE_PAGE':
            return <Profile/>
    }
};

App.propTypes = {
    currentPage: PropTypes.string.isRequired,
};

export default connect(
    (state) => ({ currentPage: state.currentPage }),
    (dispatch) => ({ })
)(App)
