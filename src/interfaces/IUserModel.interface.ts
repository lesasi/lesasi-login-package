import { IUser } from './IDefinedTypes.interface';
import { IUserAdditionalDetails } from './IUserAdditionalDetails.interface';

export interface IUserModel {
    get(): IUser;
    getAdditionalAttributes(): IUserAdditionalDetails[];
}