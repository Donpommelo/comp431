import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { unFollow } from './followingActions'

export const Followers = ({ name, status, avatar, update }) => {

    return (<div id="follow">
        <img src={avatar}/>
        <p>Name: {name}</p>
        <p>Status: {status}</p>
        <button onClick={update}>Unfollow</button>
    </div>)
};

Followers.propTypes = {
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    update: PropTypes.func.isRequired
};

export default connect(null, (dispatch, ownProps) => {
    return {
        update: () => dispatch(unFollow(ownProps.name)),
    }
})(Followers)