import express from 'express';
import { IFirebase } from '../../interfaces/IFirebase.interface';
import { IFirebaseAuth } from '../../interfaces/IFirebaseTypes.interface';
import { IMiddleware } from '../../interfaces/IMiddleware.interface';
import { IRouter } from "../../interfaces/IRouter.interface";
import { IExpressRequest, IExpressResponse, IExpressRouter } from '../../interfaces/IRouterTypes';
import { IUser } from '../../interfaces/IUser.interface';
import { GenerateErrorMessage } from '../utils/GenerateErrorMessage';

export class Router implements IRouter {
    protected router: IExpressRouter;

    constructor(UserModel: IUser, authMiddleware: IMiddleware, firebase: IFirebase, authCookieName?: string) {
        // thisateUserRouter();
        const router = express.Router();
        const User = UserModel.get();
        const auth = authMiddleware.auth;
        const firebaseAuth = firebase.getAuth();
        const generateErrMessage = GenerateErrorMessage
            .setAdditionalKeys(UserModel.getAdditionalAttributeNames())
            .generateErrMessage;

        // make new user
        router.post('/new-user', async (req: IExpressRequest, res: IExpressResponse) => {
            try {
                // Receive token from Frontend with Firebase Token, and user details
                const token = req.body.token;
                const result = await firebaseAuth.verifyIdToken(token);
                req.body.firebaseId = result.uid;

                // Now, create user object using the request body
                const user = new User(req.body);
                const authToken = await user.generateAuthToken();

                // Send to user
                res.cookie(authCookieName, authToken);
                res.status(201).send({ user });
            } catch(error){
                res.status(400).send({ error: generateErrMessage(error.message) });
            }
        });

        router.post('/login', async (req: IExpressRequest, res: IExpressResponse) => {
            try {
                const token = req.body.token;
                const result = await firebaseAuth.verifyIdToken(token);
        
                // get user object and generate token
                const user = await User.findUserByFirebaseId(result.uid);
                const authToken = await user.generateAuthToken();
        
                // Send the user details to client
                res.cookie(authCookieName, authToken);
                res.send({ user });
            } catch(error){
                res.status(400).send({error: generateErrMessage(error.message)});
            }
        });

        // get current user details(using token)
        router.get('/users/me', auth, async (req: IExpressRequest, res: IExpressResponse) => {
            res.send({ user: req.user });
        }); 

        // edit user
        router.post('/users/me/edit', auth, async (req: IExpressRequest, res: IExpressResponse) => {
            const allowedUpdates = UserModel.getAdditionalAttributeNames();
            const user = req.user;
            const updatesArr = Object.keys(req.body);
            try {
                for (const updateKey of updatesArr) {
                    if(!allowedUpdates.includes(updateKey)) {
                        throw new Error(`Can't modify updateKey: [${updateKey}]!`);
                    }
                    user[updateKey] = req.body[updateKey];
                }
                await user.save();
                res.send({ user });
            } catch (error) {
                res.status(403).send({error: generateErrMessage(error.message)});
            }
        }); 

        // log out of current account
        router.post('/logout', auth, async (req: IExpressRequest, res: IExpressResponse) => {
            try{
                req.user.tokens = req.user.tokens.filter(token => token.token_string !== req.token);
                await req.user.save();
                res.send();
            }catch(error){
                res.status(400).send({error: error.message});
            } 
        });

        // log out of all accounts
        router.post('/logout/all', auth, async (req: IExpressRequest, res: IExpressResponse) => {
            try{
                req.user.tokens = [];
                await req.user.save();
                res.send();
            }catch(error){
                res.status(400).send({error: error.message});
            } 
        });

        // delete a firebase account alone - using token
        router.post('/users/firebaseDelete', async (req: IExpressRequest, res: IExpressResponse) => {
            try {
                const token = req.body.token;
                const result = await firebaseAuth.verifyIdToken(token);
                
                // delete from google auth
                await firebaseAuth.deleteUser(result.uid);
                res.send({ success: true });
            } catch (error) {
                return res.status(400).send(error);
            } 
        });

        // delete user
        router.post('/users/me/delete', auth, async (req: IExpressRequest, res: IExpressResponse) => {
            try {
                await req.user.remove();
                // delete from google auth
                if(!!req.user.firebaseId) {
                    await firebaseAuth.deleteUser(req.user.firebaseId);
                }
                res.send({ user: req.user });
            } catch (error) {
                return res.status(400).send(error);
            } 
        });

    }

    get() {
        return this.router;
    }
};