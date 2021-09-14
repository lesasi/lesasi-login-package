import mongoose from 'mongoose';

interface ITokenString {
    token_string: string;
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

export interface IUserDefault extends mongoose.Document {
    email: string;
    firebaseId: string;
    tokens: ITokenString[];
}

export interface IUserInstance extends IUserDefault {
    generateAuthToken(): Promise<string>;
    toJSON();
}

export interface IUserModel extends mongoose.Model<IUserInstance> {
    findUserByFirebaseId(firebaseId: string): IUserInstance;
}

export type IMongooseConnection = mongoose.Connection;