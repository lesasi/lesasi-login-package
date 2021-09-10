import mongoose from 'mongoose';
import firebase from 'firebase-admin';
import express from 'express';

import { IUserDefault } from "./IUserDefault.interface";

export type IUser = mongoose.Model<IUserDefault>;
export type IMongooseConnection = mongoose.Connection;

export type IFirebaseAuth = firebase.auth.Auth;

export type IAuth = (req: any, res: express.Response, next: express.NextFunction) => Promise<void>; 

export type IExpressRouter = express.Router;
