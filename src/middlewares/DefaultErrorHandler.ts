import { Middleware, ExpressErrorMiddlewareInterface } from "routing-controllers";
import { Inject, Service } from 'typedi';
import { ValidationException } from "../exceptions/ValidationException";
import { LogService } from "../services/LogService";

@Service()
@Middleware({type: "after"})
export class DefaultErrorHandler implements ExpressErrorMiddlewareInterface {
  constructor(@Inject() private logger: LogService) {}

  error(error: any, request: any, response: any, next: (err?: any) => any): void {
    if (response.headersSent) {
      return next(error);
    }

    if (error instanceof ValidationException) {
      // Do something
      response.status(error.httpCode);
      response.json({
        message: error.message,
        errors: error.fieldErrors
      });
    } else {
      // Do something
      this.logger.error(error);
      response.status(500);
      response.json({
        message: error.message,
        // stack: error.stack
      });
    }

    next();
  }
}