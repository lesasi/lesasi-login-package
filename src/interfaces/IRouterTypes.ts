import express from 'express';
import { IUserInstance } from './IUserTypes.interface';

// using types for all 3 to be consistent
export type IExpressRequest = express.Request & {
    token?: string;
    user?: IUserInstance;
};

export type IExpressResponse = express.Response;

export type IExpressNextFunction = express.NextFunction;

export type IExpressRouter = express.Router;
