import express from 'express';
import UserController from '../../controllers/UserController';
import validator from '../../helpers/Validator';
import {
  USER_JOI_LOGIN_SCHEMA,
  USER_JOI_REGISTER_SCHEMA,
} from '../../models/UserModel';

const router = express.Router();

router
  .route('/register')
  .post(validator(USER_JOI_REGISTER_SCHEMA), UserController.register);

router
  .route('/login')
  .post(validator(USER_JOI_LOGIN_SCHEMA), UserController.login);

// http://localhost:3001/api/v1/oauth/test
router.get('/test', UserController.login);

export default router;
