import { IUserModel } from '../../UserModel/interfaces/IUserModel.interface';
import { IFirebaseArgs } from './IFirebaseArgs.interface';
import { IUserAdditionalDetails } from './IUserAdditionalDetails.interface';

export interface IBackendLoginAppInput {
    authString: string;
    mongooseObj: any;
    firebaseArgs?: IFirebaseArgs;
    userAdditionalDetails?: IUserAdditionalDetails[];
};

export interface IBackendLoginApp {
    init(data: IBackendLoginAppInput): void;
    getUserModel(): IUserModel;
}
