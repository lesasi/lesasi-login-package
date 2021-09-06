import firebase from 'firebase-admin';

export interface IFirebase {
    getAuth(): firebase.auth.Auth
};