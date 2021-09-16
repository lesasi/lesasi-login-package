import { IServerApp, IServerAppInput } from '../interfaces/IServerApp.interface';
import { IUser } from '../interfaces/IUser.interface';
import { User } from './User';
import { IMiddleware } from '../interfaces/IMiddleware.interface';
import { Middleware } from './Middleware';
import { IFirebase } from '../interfaces/IFirebase.interface';
import { Firebase } from './Firebase';
import { IRouter } from '../interfaces/IRouter.interface';
import { Router } from './Router';

export class ServerApp implements IServerApp {
    protected userModel: IUser;
    protected middleware: IMiddleware;
    protected firebaseObj: IFirebase;
    protected userRouter: IRouter;

    constructor(data: IServerAppInput) {
        this.userModel = new User(
            data.authString, 
            data.mongooseConnection,
            data.userAdditionalDetails
        );
        this.middleware = new Middleware(this.userModel, data.authString, data.authCookieName);
        this.firebaseObj = new Firebase(data.firebaseArgs);
        this.userRouter = new Router(this.userModel, this.middleware, this.firebaseObj, data.authCookieName);
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

    getRouter() {
        return this.userRouter.get();
    }
    
}
