import { IAttributeType, IAttributeTypeAndRequired } from "./ITypes.interface";


interface ITokenString {
    token_string: IAttributeType;
}

export interface IUserDefault {
    email: IAttributeTypeAndRequired;
    firebaseId: IAttributeTypeAndRequired;
    tokens: ITokenString[];
}