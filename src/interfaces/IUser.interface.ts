import { IUserModel } from './IUserTypes.interface';

export interface IUser {
    get(): IUserModel;
    getAdditionalAttributeNames(): string[];
}
