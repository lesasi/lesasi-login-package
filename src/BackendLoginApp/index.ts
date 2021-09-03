import { IBackendLoginAppInput } from './interfaces/IBackendLoginApp.interface';

export class BackendLoginApp {
    private userModel;
    private userRouter;
    private firebaseObj;

    init(data: IBackendLoginAppInput) {
        this.userModel = data.userAdditionalDetails;
        this.firebaseObj = data.firebaseArgs;
    }
}
