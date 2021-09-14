import { IExpressNextFunction, IExpressRequest, IExpressResponse } from './IRouterTypes';

export type IAuth = (req: IExpressRequest, res: IExpressResponse, next: IExpressNextFunction) => Promise<void>; 