import { IExpressRouter } from "./IDefinedTypes.interface";

export interface IRouter {
    get(): IExpressRouter;
};