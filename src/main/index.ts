import { UserModel } from './UserModel';
import { IBackendLoginApp, IBackendLoginAppInput } from '../interfaces/IBackendLoginApp.interface';
import { IUserModel } from '../interfaces/IUserModel.interface';

export class BackendLoginApp implements IBackendLoginApp {
    protected userModel: IUserModel;
    protected userRouter;
    protected firebaseObj;

    constructor(data: IBackendLoginAppInput) {
        this.userModel = new UserModel(
            data.authString, 
            data.mongooseObj,
            data.userAdditionalDetails || []);
        this.firebaseObj = data.firebaseArgs;
    }

    getUserModel() {
        return this.userModel;
    }
}
