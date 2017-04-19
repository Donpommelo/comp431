import * as Actions from '../../actions'

export const updateStatus = (newStatus) => {
    return (dispatch) => {
        Actions.resource('PUT', 'headline', { 'headline': newStatus })
        .then(r => dispatch({type: 'UPDATE', field: 'headline', newVal: newStatus}))
        .catch(r => dispatch({ type: 'ERROR', message: 'Status not updated!'}))
    }
}

export const updateZipcode = (newZipcode) => {
    return (dispatch) => {
        Actions.resource('PUT', 'zipcode', { 'zipcode': newZipcode })
        .then(r => dispatch({type: 'UPDATE', field: 'zipcode', newVal: newZipcode}))
        .catch(r => dispatch({ type: 'ERROR', message: 'Zipcode not updated!'}))
    }
}

export const updateEmail = (newEmail) => {
    return (dispatch) => {
        Actions.resource('PUT', 'email', { 'email': newEmail })
        .then(r => dispatch({type: 'UPDATE', field: 'email', newVal: newEmail}))
        .catch(r => dispatch({ type: 'ERROR', message: 'Email not updated!'}))
    }
}

export const updatePassword = (newPassword) => {
    return (dispatch) => {
        Actions.resource('PUT', 'password', { 'password': newPassword })
        .then(r => dispatch({type: 'UPDATE', field: 'password', newVal: newPassword}))
        .catch(r => dispatch({ type: 'ERROR', message: 'Password not updated!'}))
    }
}

export const updateInfo = (myAccount, username, password, passwordConf, email, phone, zip) => {

    return (dispatch) => {
        let message = '';

        let id = myAccount.id

        if (username) {
            message=message.concat('Username updated. ')
            dispatch({type: 'UPDATE', field: 'username', newVal: username})
        }

        if (password) {
            if (password == passwordConf) {
                message=message.concat('Password updated. ')
                updatePassword(password)(dispatch)
            } else {
                message=message.concat('New passwords do not match. ')
            }
        }
        if (email) {
            if (email.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/g)) {
                message=message.concat('Email updated. ')
                updateEmail(email)(dispatch)
            } else {
                message=message.concat("New email is not valid. Must follow pattern: 'numbers and/or letters' @ 'numbers and/or letters' . 'letters' ")
            }
        }
        if (phone) {
            if (phone.match(/\d{3}-\d{3}-\d{4}/g)) {
                message=message.concat('Phone Number updated. ')
                dispatch({type: 'UPDATE', field: 'phone', newVal: phone})
            } else {
                message=message.concat("New email is not valid. Must follow pattern: '3 numbers' - '3 numbers' - '4 numbers' ")
            }
        }
        if (zip) {
            if (zip.match(/^[0-9]{5}(?:-[0-9]{4})?$/g)) {
               message=message.concat('Zip Code updated. ')
               updateZipcode(zip)(dispatch)
            } else {
                message=message.concat("New zip code is not valid. Must follow pattern: '5-9 numbers' ")
            }
        }
        dispatch({type: 'SUCCESS', message: message})
    }    
};

export const getInfo = () => (dispatch) => {
    Actions.resource('GET', 'email')
    .then(r => dispatch({type: 'UPDATE', field: 'email', newVal: r.email}))

    Actions.resource('GET', 'zipcode')
    .then(r => dispatch({type: 'UPDATE', field: 'zipcode', newVal: r.zipcode}))

    Actions.resource('GET', 'dob')
    .then(r => dispatch({type: 'UPDATE', field: 'dob', newVal: r.dob}))

    Actions.resource('GET', 'avatars')
    .then(r => dispatch({type: 'UPDATE', field: 'avatar', newVal: r.avatars[0].avatar}))
}

export const updateAvatar = (newAvatar) => {    
    return (dispatch) => {
        
        const fd = new FormData()
        fd.append('image', newAvatar)

        Actions.resource('PUT', 'avatar', fd, true)
        .then(r => dispatch({type: 'UPDATE', field: 'avatar', newVal: r.avatar}))
        .catch(r => dispatch({ type: 'ERROR', message: 'Avatar not updated!'}))
    }
}