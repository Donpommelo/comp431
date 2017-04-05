import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { removeFollow } from './followingActions'

export const Followers = ({ name, unfollow }) => {

    return (<div className="follower" id="follow">
        <p className="followerName">Name: {name}</p>
        <button className="unfollow" onClick={unfollow}>Unfollow</button>
    </div>)
};

Followers.propTypes = {
    name: PropTypes.string.isRequired,
    unfollow: PropTypes.func.isRequired
};

export default connect(null, (dispatch, ownProps) => {
    return {
        unfollow: () => removeFollow(ownProps.name)(dispatch),
    }
})(Followers)