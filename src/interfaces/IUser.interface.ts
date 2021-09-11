import { IUserModel } from './IUserDefault.interface';

export interface IUser {
    get(): IUserModel;
    getAdditionalAttributeNames(): string[];
}