import { NextFunction, Request, Response } from 'express';

type AsyncFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

/**
 * A middleware function that's designed to handle asynchronous route
 * handlers in Express. It's a common pattern to ensure that errors from
 * asynchronous operations within the route handlers are properly caught and
 * forwarded to Express's error handling middleware, allowing us to manage
 * errors centrally and keep your route handler code cleaner.
 * @param execution
 */

export default (execution: AsyncFunction) =>
  (req: Request, res: Response, next: NextFunction) => {
    execution(req, res, next).catch(next);
  };
