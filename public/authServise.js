import {User} from './User.js'

let currentUser = null;

export function restoreUser() {
    const userData = localStorage.getItem('currentUser');

    if (!userData) return;

    currentUser = Object.assign(new User(), JSON.parse(userData));
}

export function saveUser(currentUserObject) {
    localStorage.setItem('currentUser', JSON.stringify(currentUserObject));
    currentUser = Object.assign(new User(), currentUserObject);
}

export function getCurrentUser() {
    return currentUser;
}

export function clearCurrentUser() {
    localStorage.removeItem('currentUser');
    currentUser = null;
}