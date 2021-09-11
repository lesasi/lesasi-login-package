import { IFirebaseAuth } from './IDefinedTypes.interface';

export interface IFirebase {
    getAuth(): IFirebaseAuth;
};