

export const updateInfo = (myAccount, username, id, password, passwordConf, email, phone, zip, bday) => {

    let message = '';

    let newName = myAccount.name;
    let newId = myAccount.id;
    let newPassword = myAccount.password;
    let newEmail = myAccount.email;
    let newPhoneNumber = myAccount.phone;
    let newZipCode = myAccount.zip;

    if (username) { newName = username; message=message.concat('Username updated. ')}
    if (id) { newId = id; }
    if (password) {
        if (password == passwordConf) {
            newEmail = email;
            message=message.concat('Password updated. ')
        } else {
            message=message.concat('New passwords do not match. ')
        }
    }
    if (email) {
        if (email.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/g)) {
            newEmail = email;
            message=message.concat('Email updated. ')
        } else {
            message=message.concat("New email is not valid. Must follow pattern: 'numbers and/or letters' @ 'numbers and/or letters' . 'letters' ")
        }
    }
    if (phone) {
        if (phone.match(/\d{3}-\d{3}-\d{4}/g)) {
            newPhoneNumber = phone;
            message=message.concat('Phone Number updated. ')
        } else {
            message=message.concat("New email is not valid. Must follow pattern: '3 numbers' - '3 numbers' - '4 numbers' ")
        }
    }
    if (zip) {
        if (zip.match(/^[0-9]{5}(?:-[0-9]{4})?$/g)) {
            newZipCode = zip;
            message=message.concat('Zip Code updated. ')
        } else {
            message=message.concat("New zip code is not valid. Must follow pattern: '5-9 numbers' ")
        }
    }

    return {type: 'UPDATE', id: newId, name: newName, pw: newPassword, email: newEmail, phone: newPhoneNumber,
        zip: newZipCode, bday: bday, message: message, status: myAccount.status}
};

