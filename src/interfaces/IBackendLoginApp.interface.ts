import mongoose from 'mongoose';
import express from 'express';
import firebase from 'firebase-admin';

import { IFirebaseArgs } from './IFirebaseArgs.interface';
import { IUserAdditionalDetails } from './IUserAdditionalDetails.interface';
import { IUserDefault } from './IUserDefault.interface';

export interface IBackendLoginAppInput {
    authString: string;
    mongooseConnection: mongoose.Connection;
    authCookieName?: string,
    firebaseArgs?: IFirebaseArgs;
    userAdditionalDetails?: IUserAdditionalDetails[];
};

export interface IBackendLoginApp {
    getUserModel(): mongoose.Model<IUserDefault>;
    getAuthMiddleware(): (req: any, res: express.Response, next: express.NextFunction) => Promise<void>;
    getFirebaseAuth(): firebase.auth.Auth
}
