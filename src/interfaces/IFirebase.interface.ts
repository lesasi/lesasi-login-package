import firebase from 'firebase-admin';
import { IFirebaseAuth } from './IDefinedTypes.interface';

export interface IFirebase {
    getAuth(): IFirebaseAuth;
};