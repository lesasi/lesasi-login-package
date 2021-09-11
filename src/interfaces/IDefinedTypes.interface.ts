import firebase from 'firebase-admin';
import express from 'express';

export type IFirebaseAuth = firebase.auth.Auth;

export type IAuth = (req: any, res: express.Response, next: express.NextFunction) => Promise<void>; 

export type IExpressRouter = express.Router;
