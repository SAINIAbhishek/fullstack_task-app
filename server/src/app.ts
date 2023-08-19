import express, { NextFunction, Request, Response } from 'express';
import Logger from './middleware/Logger';
import { API_VERSION, CORS_URL, ENVIRONMENT } from './config';
import cors from 'cors';
import helmet from 'helmet';
import './config/DatabaseConfig'; // initialize database
import {
  ApiError,
  ErrorType,
  InternalError,
  NotFoundError,
} from './middleware/ApiError';
import routes from './routes/v1';

process.on('uncaughtException', (e) => {
  Logger.error(e);
});

const app = express();

// This middleware is a collection of security-related HTTP headers that help
// protect application against common web vulnerabilities
app.use(helmet());

// This middleware is used to parse incoming JSON payloads in HTTP requests.
app.use(express.json({ limit: '10mb' }));

// This middleware is used to parse incoming request bodies with urlencoded
// payloads, such as data submitted through HTML forms.
app.use(
  express.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 })
);

// This middleware is used to enable Cross-Origin Resource Sharing (CORS)
// in application.
app.use(cors({ origin: CORS_URL, optionsSuccessStatus: 200 }));

// Api Routes
app.use(`/api/${API_VERSION}`, routes);

// The middleware function is executed for all incoming requests that don't
// match any of the routes defined earlier.
app.use((req, res, next) => next(new NotFoundError()));

// Middleware Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    ApiError.handle(err, res);

    if (err.type === ErrorType.INTERNAL)
      Logger.error(
        `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
      );
  } else {
    Logger.error(
      `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );

    Logger.error(err);

    if (ENVIRONMENT === 'development') {
      return res.status(500).send(err);
    }

    ApiError.handle(new InternalError(), res);
  }
});

export default app;
