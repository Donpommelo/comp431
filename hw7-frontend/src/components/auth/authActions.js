import * as Actions from '../../actions'
import { initialize } from '../../actions'

export const loginAuth = (username, password) => (dispatch) => {
    Actions.resource('POST', 'login', { username , password })
    .then(r => {
            if (r) {
                dispatch({type: 'LOG_IN', name: username, pw: password, id: 0})
            } else {
                Actions.error('Invalid login credentials!')(dispatch)
            }
    })
    .catch(r => Actions.error('Error occurred when logging in!')(dispatch))
}

export const regisAuth = (username, password, passwordConf, email, phone, zipcode, dob) => (dispatch) => {
    
    if (!username) {
        Actions.error('Invalid Username Entered!')(dispatch)
    }

    if (!password) {
        Actions.error('Invalid Password Entered!')(dispatch)

    }
    if (!dob) {
        Actions.error('Invalid Birthday Entered!')(dispatch)
    }

    if (!email.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/g)) {
        Actions.error("Invalid Email Entered! Must follow pattern: 'numbers and/or letters' @ 'numbers and/or letters' . 'letters'")(dispatch)            
    }

    if (!phone.match(/\d{3}-\d{3}-\d{4}/g)) {
        Actions.error("Invalid Phone Number Entered! Must follow pattern: '3 numbers' - '3 numbers' - '4 numbers'")(dispatch)            
    }

    if (!zipcode.match(/^[0-9]{5}(?:-[0-9]{4})?$/g)) {
        Actions.error("Invalid Zip Code Entered! Must follow pattern: '5 to 9 Numbers'")(dispatch)
    }

    if (password != passwordConf) {
        Actions.error('Passwords do not match!')(dispatch)
    }

    Actions.resource('POST', 'register', { username, email, dob, zipcode, password })
    .then(r => {
        dispatch({type: 'REGISTER', id: 0, name: username, password: password, email: email, phone: phone,
        zipcode: zipcode, dob: dob})
        Actions.success('Registration Successful! Welcome ' + username)
    })
    .catch(r => Actions.error('Invalid registration information!')(dispatch))
      
}

export const logoutAuth = () => (dispatch) => {
    Actions.resource('PUT', 'logout')
    .then(r => {
        dispatch({type: 'LOG_OUT'})
    })
    .catch(r => Actions.error('Error occurred when logging out')(dispatch))
};

export const refreshLogin = () => (dispatch) => {
    Actions.resource('GET', 'refresh')
    .then(r => {
        if (r) {
            if(r.isLoggedin) {
                dispatch({type: 'NAVIGATE', currentPage:"MAIN_PAGE"})
                initialize()(dispatch)
                dispatch({type: 'UPDATE', field: 'username', newVal: r.username})
            }
        }
    })
}
