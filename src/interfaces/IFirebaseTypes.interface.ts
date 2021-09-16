import firebase from 'firebase-admin';

export interface IFirebaseArgs {
    appName: string;
    projectId: string;
    privateKeyId: string;
    privateKey: string;
    clientEmail: string;
    clientId: string;
    clientX509CertUrl: string;
}

export type IFirebaseAuth = firebase.auth.Auth;
