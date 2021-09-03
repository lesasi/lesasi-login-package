import { IFirebaseArgs } from './IFirebaseArgs.interface';
import { IUserAdditionalDetails } from './IUserAdditionalDetails.interface';

export interface IBackendLoginAppInput {
    firebaseArgs: IFirebaseArgs;
    userAdditionalDetails: IUserAdditionalDetails;
    authString: string;
}
