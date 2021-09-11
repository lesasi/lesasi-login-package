import express from 'express';
import { IAuth, IExpressRouter, IFirebaseAuth } from "../../interfaces/IDefinedTypes.interface";
import { IRouter } from "../../interfaces/IRouter.interface";
import { IUser } from '../../interfaces/IUser.interface';
import { GenerateErrorMessage } from '../utils/GenerateErrorMessage';

export class Router implements IRouter {
    protected router: IExpressRouter;

    constructor(UserModel: IUser, auth: IAuth, firebaseAuth: IFirebaseAuth) {
        // thisateUserRouter();
        const router = express.Router();
        const User = UserModel.get();
        const generateErrMessage = GenerateErrorMessage
            .setAdditionalKeys(UserModel.getAdditionalAttributeNames())
            .generateErrMessage;

        // make new user
        router.post('/new-user', async (req, res) => {
            try {
                // Receive token from Frontend with Firebase Token, and user details
                const token = req.body.token;
                const result = await firebaseAuth.verifyIdToken(token);
                req.body.firebaseId = result.uid;

                // Now, create user object using the request body
                const user = new User(req.body);
                const authToken = await user.generateAuthToken();

                // Send to user
                res.cookie(process.env.AUTH_COOKIE, authToken);
                res.status(201).send({ user });
            } catch(error){
                res.status(400).send({ error: generateErrMessage(error.message) });
            }
        });
    }

    get() {
        return this.router;
    }
};