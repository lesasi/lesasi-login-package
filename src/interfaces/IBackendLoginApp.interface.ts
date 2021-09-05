import { IFirebaseArgs } from './IFirebaseArgs.interface';
import { IUserAdditionalDetails } from './IUserAdditionalDetails.interface';
import { IUserModel } from './IUserModel.interface';

export interface IBackendLoginAppInput {
    authString: string;
    mongooseObj: any;
    firebaseArgs?: IFirebaseArgs;
    userAdditionalDetails?: IUserAdditionalDetails[];
};

export interface IBackendLoginApp {
    getUserModel(): IUserModel;
}
