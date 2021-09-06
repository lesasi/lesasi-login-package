import { UserModel } from './UserModel';
import { IBackendLoginApp, IBackendLoginAppInput } from '../interfaces/IBackendLoginApp.interface';
import { IUserModel } from '../interfaces/IUserModel.interface';
import { IMiddleware } from '../interfaces/IMiddleware.interface';
import { Middleware } from './Middleware';
import { Firebase } from './Firebase';
import { IFirebase } from '../interfaces/IFirebase.interface';

export class BackendLoginApp implements IBackendLoginApp {
    protected userModel: IUserModel;
    protected middleware: IMiddleware;
    protected firebaseObj: IFirebase;
    protected userRouter;

    constructor(data: IBackendLoginAppInput) {
        this.userModel = new UserModel(
            data.authString, 
            data.mongooseConnection,
            data.userAdditionalDetails
        );
        this.middleware = new Middleware(this.userModel, data.authString, data.authCookieName);
        this.firebaseObj = new Firebase(data.firebaseArgs);
    }

    getUserModel() {
        return this.userModel.get();
    }

    getAuthMiddleware() {
        return this.middleware.auth;
    }

    getFirebaseAuth() {
        return this.firebaseObj.getAuth();
    }
    
}
