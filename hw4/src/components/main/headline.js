import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateStatus } from './followingActions'

export const Headline = ({ id, accountBank, update }) => {

    let myAccount, newStatus;
    const accounts = accountBank.filter((account) => account.id == id);
    if (accounts && accounts.length > 0) {
        myAccount = accounts[0];
    }

    const _getAvatar = () => {
        const accounts = accountBank.filter((account) => account.id == id);
        if (accounts && accounts.length > 0) {
            return accounts[0].avatar;
        }
    };

    const _update = () => {
      if (newStatus) {
          update(myAccount, newStatus.value);
          newStatus.value = '';
      }
    };

    return (<div id="headline">
        <img src={_getAvatar()} />
        <p>{myAccount.name}</p>
        <p>{myAccount.status}</p>
        <input type="text" placeholder="Enter New Status" ref={(node) => newStatus = node} />
        <button onClick={_update}>Update</button>
    </div>)
};

Headline.propTypes = {
    id: PropTypes.number.isRequired,
    accountBank: PropTypes.array.isRequired,
    update: PropTypes.func.isRequired
};

export default connect(
    (state) => ({ id: state.currentAccount, accountBank: state.accountBank }),
    (dispatch) => ({ update: (myAccount, newStatus) => dispatch(updateStatus(myAccount, newStatus))})
)(Headline)