import { User } from './User';
import { IBackendLoginApp, IBackendLoginAppInput } from '../interfaces/IBackendLoginApp.interface';
import { IMiddleware } from '../interfaces/IMiddleware.interface';
import { Middleware } from './Middleware';
import { Firebase } from './Firebase';
import { IFirebase } from '../interfaces/IFirebase.interface';
import { IUser } from '../interfaces/IUser.interface';

export class BackendLoginApp implements IBackendLoginApp {
    protected userModel: IUser;
    protected middleware: IMiddleware;
    protected firebaseObj: IFirebase;
    protected userRouter;

    constructor(data: IBackendLoginAppInput) {
        this.userModel = new User(
            data.authString, 
            data.mongooseConnection,
            data.userAdditionalDetails
        );
        this.middleware = new Middleware(this.userModel.get(), data.authString, data.authCookieName);
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
