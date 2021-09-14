import { IFirebaseArgs, IFirebaseAuth } from './IFirebaseTypes.interface';
import { IAuth } from './IMiddlewareTypes.interface';
import { IMongooseConnection, IUserAdditionalDetails, IUserModel } from './IUserTypes.interface';

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
