import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

import { IUserDefault } from '../../interfaces/IUserDefault.interface';
import { IUserModel } from '../../interfaces/IUserModel.interface';
import { IUserAdditionalDetails } from '../../interfaces/IUserAdditionalDetails.interface';

export class UserModel implements IUserModel{
    protected User: mongoose.Model<IUserDefault>;

    constructor(
        authString: string, 
        mongooseConnection: mongoose.Connection,
        additionalAttributes?: IUserAdditionalDetails[],
    ) {
        const userSchema = this.generateUserSchema(authString, additionalAttributes || []);
        this.User = mongooseConnection.model('User', userSchema);
    }

    get() {
        return this.User;
    }

    protected generateUserSchema(
        authString: string,
        additionalAttributes?: IUserAdditionalDetails[],
    ): mongoose.Schema<IUserDefault> {
        const addnDataObj = {};
        additionalAttributes.map(attr => {
            addnDataObj[_.get(attr, 'name')] = _.omit(attr, 'name');
        });
        
        const { userObj, options } = this.getDefaultUserObj();

        // generate user schema
        const userSchema = new mongoose.Schema<IUserDefault>({
            ...userObj,
            ...addnDataObj
        }, options);

        // static functions
        userSchema.statics.findUserByFirebaseId = async(firebaseId) => {
            const user = await this.User.findOne({ firebaseId });
            if(!user) {
                throw new Error('User not found!');
            }
            return user;
        }
        
        // member functions
        userSchema.methods.generateAuthToken = async function() {
            try {
                const tokenString = jwt.sign({ _id: this._id.toString() }, authString);
                this.tokens = [...this.tokens, { token_string: tokenString }];
                await this.save();
                return tokenString;
            } catch(error){
                throw new Error(error.message);
            }
        }
        
        userSchema.methods.toJSON = function () {
            const user = this.toObject();
            // remove tokens attribute
            delete user.tokens;
            delete user.firebaseId;
            // return user object
            return user;
        }

        return userSchema;
    }

    protected getDefaultUserObj() {
        const userObj: IUserDefault = {
            email: {
                type: String,
                required: true,
            },
            firebaseId: {
                type: String,
                required: true
            },
            tokens: [{
                token_string: {
                    type:String
                }
            }]
        };

        const options = {
            timestamps: true
        };

        return { userObj, options };
    }
};