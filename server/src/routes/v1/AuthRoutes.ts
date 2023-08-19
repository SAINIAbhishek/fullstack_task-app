import express from 'express';
import UserController from '../../controllers/UserController';
import validator from '../../helpers/Validator';
import {
  USER_JOI_LOGIN_SCHEMA,
  USER_JOI_REGISTER_SCHEMA,
} from '../../models/UserModel';

const router = express.Router();

router.post(
  '/register',
  validator(USER_JOI_REGISTER_SCHEMA),
  UserController.register
);

router.post('/login', validator(USER_JOI_LOGIN_SCHEMA), UserController.login);

router.post('/test', UserController.login);

export default router;
