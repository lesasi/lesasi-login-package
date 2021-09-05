import mongoose from 'mongoose';
import { IFirebaseArgs } from './IFirebaseArgs.interface';
import { IUserAdditionalDetails } from './IUserAdditionalDetails.interface';
import { IUserDefault } from './IUserDefault.interface';

export interface IBackendLoginAppInput {
    authString: string;
    mongooseConnection: mongoose.Connection;
    firebaseArgs?: IFirebaseArgs;
    userAdditionalDetails?: IUserAdditionalDetails[];
};

export interface IBackendLoginApp {
    getUserModel(): mongoose.Model<IUserDefault>;
}
