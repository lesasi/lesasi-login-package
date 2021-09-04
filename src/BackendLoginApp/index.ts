import { UserModel } from '../UserModel';
import { IUserModel } from '../UserModel/interfaces/IUserModel.interface';
import { IBackendLoginApp, IBackendLoginAppInput } from './interfaces/IBackendLoginApp.interface';

export class BackendLoginApp implements IBackendLoginApp {
    protected userModel: IUserModel;
    protected userRouter;
    protected firebaseObj;

    init(data: IBackendLoginAppInput) {
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
