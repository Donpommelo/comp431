
export const loginAuth = (username, password) => {

    //Atm code just checks if strings were input. In the future, this function will check if the accountBank contains
    //the input username and if so, if the account with that name has the input password as a password.
    if (!username) {
        return { type: 'ERROR', message: 'No username was entered!'}
    }

    if (!password) {
        return { type: 'ERROR', message: 'No password was entered!'}
    }

    //id is always 0 for the purpose of this draft. Users will always be logged in as the 'guest' account with id 0.
    return {type: 'LOG_IN', name: username, pw: password, id: 0, message: 'Log In Successful!'}
};

let accountNum = 1;
export const regisAuth = (username, password, passwordConf, email, phone, zip, bday) => {

    if (!username) {
        return { type: 'ERROR', message: 'Invalid Username Entered!'}
    }

    if (!password) {
        return { type: 'ERROR', message: 'Invalid Password Entered!'}
    }
    if (!bday) {
        return { type: 'ERROR', message: 'Invalid Birthday Entered!'}
    }

    if (!email.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/g)) {
        return { type: 'ERROR', message: "Invalid Email Entered! " +
        "Must follow pattern: 'numbers and/or letters' @ 'numbers and/or letters' . 'letters'"}
    }

    if (!phone.match(/\d{3}-\d{3}-\d{4}/g)) {
        return { type: 'ERROR', message: "Invalid Phone Number Entered! " +
        "Must follow pattern: '3 numbers' - '3 numbers' - '4 numbers'"}
    }
    if (!zip.match(/^[0-9]{5}(?:-[0-9]{4})?$/g)) {
        return { type: 'ERROR', message: "Invalid Zip Code Entered! " +
        "Must follow pattern: '5  or 9 Numbers'"}
    }

    if (password != passwordConf) {
        return { type: 'ERROR', message: 'Passwords do not match!'}
    }

    //Account id increments when accounts are created. This ensures that every account has a unique id.
    return {type: 'REGISTER', id: accountNum++, name: username, pw: password, email: email, phone: phone,
        zip: zip, bday: bday}
};