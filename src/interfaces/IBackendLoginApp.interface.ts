import { IFirebaseArgs } from './IFirebaseArgs.interface';
import { IUserAdditionalDetails } from './IUserAdditionalDetails.interface';
import { IAuth, IFirebaseAuth, IMongooseConnection, IUser } from './IDefinedTypes.interface';

export interface IBackendLoginAppInput {
    authString: string;
    mongooseConnection: IMongooseConnection;
    authCookieName?: string,
    firebaseArgs?: IFirebaseArgs;
    userAdditionalDetails?: IUserAdditionalDetails[];
};

export interface IBackendLoginApp {
    getUserModel(): IUser;
    getAuthMiddleware(): IAuth;
    getFirebaseAuth(): IFirebaseAuth;
}
