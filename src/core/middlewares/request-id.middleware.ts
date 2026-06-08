import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    req['requestId'] = req.headers['x-request-id'] || '';
    res.setHeader('x-request-id', req['requestId']);
    next();
  }
}
