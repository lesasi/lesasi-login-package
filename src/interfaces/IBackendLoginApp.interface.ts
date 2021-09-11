import { IFirebaseArgs } from './IFirebaseArgs.interface';
import { IAuth, IFirebaseAuth } from './IDefinedTypes.interface';
import { IMongooseConnection, IUserAdditionalDetails, IUserModel } from './IUserDefault.interface';

export interface IBackendLoginAppInput {
    authString: string;
    mongooseConnection: IMongooseConnection;
    authCookieName?: string,
    firebaseArgs?: IFirebaseArgs;
    userAdditionalDetails?: IUserAdditionalDetails[];
};

export interface IBackendLoginApp {
    getUserModel(): IUserModel;
    getAuthMiddleware(): IAuth;
    getFirebaseAuth(): IFirebaseAuth;
}
