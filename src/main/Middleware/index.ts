import jwt from 'jsonwebtoken';
import express from 'express';

import { IMiddleware } from "../../interfaces/IMiddleware.interface";
import { IUser } from '../../interfaces/IDefinedTypes.interface';

export class Middleware implements IMiddleware{
    protected User: IUser;
    protected authString: string;
    protected authCookieName: string;


    constructor(UserObj: IUser, authString: string, authCookieName?: string) {
        this.User = UserObj;
        this.authString = authString;
        this.authCookieName = authCookieName || 'AUTH_TOKEN';
    }

    auth = async (req: any, res: express.Response, next: express.NextFunction) => {
        try {
            // get auth token off of request object
            const token = req.cookies[this.authCookieName];
            // get id from token using auth_string
            const decoded = jwt.verify(token, this.authString);
            // get user with this id and with this token - if no token present in user, don't log in
            const user = await this.User.findOne({ _id: decoded._id, 'tokens.token_string': token });
            if(!user){  
                throw new Error('User or token not found');
            }
            // setting new user in req object
            req.user = user;
            req.token = token;
            next();
        } catch (error) {
            res.status(403).send({ error: error.message })
        }   
    }
};