import { NextFunction, Request, Response } from 'express';
import { ExpressErrorMiddlewareInterface, HttpError, InternalServerError, Middleware } from 'routing-controllers';

@Middleware({ type: 'after' })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {

  public error(error: Error, request: Request, response: Response, next: NextFunction) {
    // in case the controllers throw invalid http error
    if (!(error instanceof HttpError)) {
      const internalError = new InternalServerError('Internal Server Error');
      return response.status(500).send(internalError);
    }
    return response.send(error);
  }
}
