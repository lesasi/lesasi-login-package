import { IAuth, IExpressRouter, IFirebaseAuth, IUser } from "../../interfaces/IDefinedTypes.interface";
import { IRouter } from "../../interfaces/IRouter.interface";

export class Router implements IRouter {
    protected User: IUser;
    protected auth: IAuth;
    protected firebaseAuth: IFirebaseAuth;
    protected router: IExpressRouter;

    constructor(UserObj: IUser, AuthObj: IAuth, FirebaseAuthObj: IFirebaseAuth) {
        this.User = UserObj;
        this.auth = AuthObj;
        this.firebaseAuth = FirebaseAuthObj;
    }

    get() {
        return this.router;
    }
};