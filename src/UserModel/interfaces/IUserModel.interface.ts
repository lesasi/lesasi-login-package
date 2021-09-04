import mongoose from 'mongoose';
import { IUserDefault } from './IUserDefault.interface';

export interface IUserModel {
    get(): mongoose.Model<IUserDefault>;
}