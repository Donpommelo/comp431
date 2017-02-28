
export const updateStatus = (myAccount, newStatus) => {

    if ( newStatus ) {
        return {type: 'UPDATE', id: myAccount.id, name: myAccount.name, pw: myAccount.password, email: myAccount.email,
            phone: myAccount.phone, zip: myAccount.zip, bday: myAccount.bday, message: '', status: newStatus}
    }
    return { type: 'ERROR', message: 'Status not updated!'}
};

const randStatuses = require('../../data/randStatuses.json');
const randAvatars = require('../../data/randAvatars.json');

export const addFollow = (follow, followers) => {

    //Because I am using the follow name as the component key, I must make sure the user is not already being followed.
    //Plus, it doesn't really make sense to follow someone twice anyways.
    let alreadyFollowed = false;
    followers.map((follower) => follower.name==follow ? alreadyFollowed = true:{});
    if (alreadyFollowed) {
        return { type: 'ERROR', message: 'User is already followed!'}
    }

    if (follow) {
        return { type: 'FOLLOW', name: follow,
            status: randStatuses[Math.floor(Math.random() * randStatuses.length)],
            avatar: randAvatars[Math.floor(Math.random() * randAvatars.length)] }
    }
    return { type: 'ERROR', message: 'No user was followed!'}

};

export const unFollow = (follow) => {
    return { type: 'UNFOLLOW', name: follow};
};

export const filterArticles = (keyword) => {
    return { type: 'FILTER', name: keyword};
};

export const newPost = (text, author, id) => {
    const date = new Date();

    //pic is currently blank because the new article button does not allow for uploading of files.
    return { type: 'NEW_POST', pic: '', text: text, author: author, date: date.toDateString(), id: id, visible: true}
};