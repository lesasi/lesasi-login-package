import express from 'express';

export interface IMiddleware {
    auth(req: any, res: express.Response, next: express.NextFunction): Promise<void>
};