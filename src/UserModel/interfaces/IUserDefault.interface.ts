import { IAllowedDetailTypes } from "../../BackendLoginApp/interfaces/IUserAdditionalDetails.interface";

export interface IAttributeRequired {
    required: boolean;
}

// Fix later
export interface IAttributeType {
    type: any;
}

interface IAttributeTypeAndRequired extends IAttributeRequired, IAttributeType {}

interface ITokenString {
    token_string: IAttributeType;
}

export interface IUserDefault {
    email: IAttributeTypeAndRequired;
    firebaseId: IAttributeTypeAndRequired;
    tokens: ITokenString[];
}