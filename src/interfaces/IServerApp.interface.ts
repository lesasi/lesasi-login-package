import { IFirebaseArgs, IFirebaseAuth } from './IFirebaseTypes.interface';
import { IAuth } from './IMiddlewareTypes.interface';
import { IExpressRouter } from './IRouterTypes';
import { IMongooseConnection, IUserAdditionalDetails, IUserModel } from './IUserTypes.interface';

export interface IServerAppInput {
    authString: string;
    mongooseConnection: IMongooseConnection;
    authCookieName?: string;
    firebaseArgs?: IFirebaseArgs;
    userAdditionalDetails?: IUserAdditionalDetails[];
}

export interface IServerApp {
    getUserModel(): IUserModel;
    getAuthMiddleware(): IAuth;
    getFirebaseAuth(): IFirebaseAuth;
    getRouter(): IExpressRouter;
}
