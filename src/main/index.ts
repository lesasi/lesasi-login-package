import { UserModel } from './UserModel';
import { IBackendLoginApp, IBackendLoginAppInput } from '../interfaces/IBackendLoginApp.interface';
import { IUserModel } from '../interfaces/IUserModel.interface';
import { IMiddleware } from '../interfaces/IMiddleware.interface';
import { Middleware } from './Middleware';

export class BackendLoginApp implements IBackendLoginApp {
    protected userModel: IUserModel;
    protected middleware: IMiddleware;
    protected userRouter;
    protected firebaseObj;

    constructor(data: IBackendLoginAppInput) {
        this.userModel = new UserModel(
            data.authString, 
            data.mongooseConnection,
            data.userAdditionalDetails
        );
        this.middleware = new Middleware(this.userModel, data.authString, data.authCookieName);
        this.firebaseObj = data.firebaseArgs;
    }

    getUserModel() {
        return this.userModel.get();
    }

    getAuthMiddleware() {
        return this.middleware.auth;
    }
    
}
