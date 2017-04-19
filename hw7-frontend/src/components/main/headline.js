import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateStatus } from '../profile/profileActions'

export const Headline = ({ myAccount, update }) => {

    let newStatus

    const _update = () => {
        if (newStatus) {
            update(newStatus.value);
            newStatus.value = '';
        }
    };

    return (<div id="headline">
        <p>{myAccount.name}</p>
        <p id="currentHeadline">{myAccount.headline}</p>
        <input type="text" id="newHeadline" placeholder="Enter New Status" ref={(node) => newStatus = node} />
        <button id="headlineChange" onClick={_update}>Update</button>
    </div>)
};

Headline.propTypes = {
    myAccount: PropTypes.object.isRequired,
    update: PropTypes.func.isRequired
};

export default connect(
    (state) => ({ myAccount: state.account }),
    (dispatch) => ({ update: (newStatus) => updateStatus(newStatus)(dispatch)})
)(Headline)