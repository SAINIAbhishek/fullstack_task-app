import { DB } from './index';
import Logger from '../middleware/Logger';
import * as mongoose from 'mongoose';
import initializeRoles from '../scripts/roles';

// Build the connection string
const MONGO_URL = `${DB.uri}${DB.name}`;

const MONGO_CONFIG = {
  autoIndex: true,
  minPoolSize: DB.minPoolSize, // Maintain up to x socket connections
  maxPoolSize: DB.maxPoolSize, // Maintain up to x socket connections
  connectTimeoutMS: DB.connectTimeoutMS, // Give up initial connection after 10 seconds
  socketTimeoutMS: DB.socketTimeoutMS, // Close sockets after 45 seconds of inactivity
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

Logger.debug('Mongodb connection string : ' + MONGO_URL);

// Create the database connection
mongoose
  .connect(MONGO_URL, MONGO_CONFIG)
  .then(async () => {
    Logger.info('Mongoose connection established successfully!');
    await initializeRoles();
  })
  .catch((err) => {
    Logger.info('Mongoose connection failed!');
    Logger.error(err);
  });

export const connection = mongoose.connection;
