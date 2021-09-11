
export interface IAttributeRequired {
    required: boolean;
}

// Fix later
export interface IAttributeType {
    type: any;
}

export interface IAttributeTypeAndRequired extends IAttributeRequired, IAttributeType {}