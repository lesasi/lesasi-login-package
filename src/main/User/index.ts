import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

import { IUserAdditionalDetails, IUserModel, IUserInstance } from '../../interfaces/IUserTypes.interface';
import { IUser } from '../../interfaces/IUser.interface';

export class User implements IUser {
    protected UserModel: IUserModel;
    protected additionalAttributes: IUserAdditionalDetails[];

    constructor(
        authString: string,
        mongooseConnection: mongoose.Connection,
        additionalAttributes?: IUserAdditionalDetails[],
    ) {
        this.additionalAttributes = additionalAttributes || [];
        const userSchema = this.generateUserSchema(authString);
        this.UserModel = mongooseConnection.model<IUserInstance, IUserModel>('User', userSchema);
    }

    get() {
        return this.UserModel;
    }

    getAdditionalAttributeNames() {
        return this.additionalAttributes.map((attr) => attr.name);
    }

    protected generateUserSchema(authString: string): mongoose.Schema<IUserInstance, IUserModel> {
        const addnDataObj = {};
        this.additionalAttributes.map((attr) => {
            addnDataObj[_.get(attr, 'name')] = _.omit(attr, 'name');
        });

        const { userObj, options } = this.getDefaultUserObj();

        // generate user schema
        const userSchema = new mongoose.Schema<IUserInstance, IUserModel>(
            {
                ...userObj,
                ...addnDataObj,
            },
            options,
        );

        // static functions
        userSchema.statics.findUserByFirebaseId = async (firebaseId) => {
            const user: IUserInstance = await this.UserModel.findOne({ firebaseId });
            if (!user) {
                throw new Error('User not found!');
            }
            return user;
        };

        // member functions
        userSchema.methods.generateAuthToken = async function () {
            try {
                const tokenString = jwt.sign({ _id: this._id.toString() }, authString);
                this.tokens = [...this.tokens, { token_string: tokenString }];
                await this.save();
                return tokenString;
            } catch (error) {
                throw new Error(error.message);
            }
        };

        userSchema.methods.toJSON = function () {
            const user = this.toObject();
            // remove tokens attribute
            delete user.tokens;
            delete user.firebaseId;
            // return user object
            return user;
        };

        return userSchema;
    }

    protected getDefaultUserObj() {
        const userObj = {
            email: {
                type: String,
                required: true,
            },
            firebaseId: {
                type: String,
                required: true,
            },
            tokens: [
                {
                    token_string: {
                        type: String,
                    },
                },
            ],
        };

        const options = {
            timestamps: true,
        };

        return { userObj, options };
    }
}
