type IAllowedDetailTypes = String | Number | Boolean;

// the final requirement will be an array of these
export interface IUserAdditionalDetails {
    name: string;
    type: IAllowedDetailTypes;
    trim?: boolean;
    required?: boolean;
    // check the below ones later
    default: any;
    valdiate?(): any;
}
