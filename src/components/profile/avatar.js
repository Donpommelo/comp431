import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

export const Avatar = ({ currentAccount, accountBank }) => {

    const _getAvatar = () => {
        const accounts = accountBank.filter((account) => account.id == currentAccount);
        if (accounts && accounts.length > 0) {
            return accounts[0].avatar;
        }
    };

    return (<div id="avatar">
        <img src={_getAvatar()}/>
        <p>Upload new profile picture: <input id="newAva" type="file" /></p>
    </div>)
};

Avatar.propTypes = {
    currentAccount: PropTypes.number.isRequired,
    accountBank: PropTypes.array.isRequired,
};

export default connect(
    (state) => ({ currentAccount: state.currentAccount, accountBank: state.accountBank }),
    (dispatch) => ({ })
)(Avatar)