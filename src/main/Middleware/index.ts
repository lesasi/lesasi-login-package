import jwt from 'jsonwebtoken';

import { IMiddleware } from "../../interfaces/IMiddleware.interface";
import { IUserModel } from '../../interfaces/IUserTypes.interface';
import { IExpressNextFunction, IExpressRequest, IExpressResponse } from '../../interfaces/IRouterTypes';
import { IUser } from '../../interfaces/IUser.interface';

export class Middleware implements IMiddleware {
    protected User: IUserModel;
    protected authString: string;
    protected authCookieName: string;


    constructor(UserObj: IUser, authString: string, authCookieName?: string) {
        this.User = UserObj.get();
        this.authString = authString;
        this.authCookieName = authCookieName || 'AUTH_TOKEN';
    }

    auth = async (req: IExpressRequest, res: IExpressResponse, next: IExpressNextFunction) => {
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