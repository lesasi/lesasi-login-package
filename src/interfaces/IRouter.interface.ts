import { IExpressRouter } from "./IRouterTypes";

export interface IRouter {
    get(): IExpressRouter;
};