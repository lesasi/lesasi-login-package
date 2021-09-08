import mongoose from 'mongoose';
import { IUserAdditionalDetails } from './IUserAdditionalDetails.interface';
import { IUserDefault } from './IUserDefault.interface';

export interface IUserModel {
    get(): mongoose.Model<IUserDefault>;
    getAdditionalAttributes(): IUserAdditionalDetails[];
}