import { IFirebaseAuth } from "./IFirebaseTypes.interface";

export interface IFirebase {
    getAuth(): IFirebaseAuth;
};