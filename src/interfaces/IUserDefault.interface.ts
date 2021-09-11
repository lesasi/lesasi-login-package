import mongoose from 'mongoose';
import { IAttributeType, IAttributeTypeAndRequired } from "./ITypes.interface";

interface ITokenString {
    token_string: IAttributeType;
}

export type IAllowedDetailTypes = string | number | boolean;

// the final requirement will be an array of these
export interface IUserAdditionalDetails {
    name: string;
    type: IAllowedDetailTypes;
    trim?: boolean;
    required?: boolean;
    // check the below ones later
    default: any;
    valdiate?(): any;
}

export interface IUserDefault {
    email: IAttributeTypeAndRequired;
    firebaseId: IAttributeTypeAndRequired;
    tokens: ITokenString[];
}

export interface IUserSchema extends IUserDefault {
    generateAuthToken(): Promise<string>;
    toJSON();
}

export interface IUserModel extends mongoose.Model<IUserSchema> {
    findUserByFirebaseId();
}

export type IMongooseConnection = mongoose.Connection;