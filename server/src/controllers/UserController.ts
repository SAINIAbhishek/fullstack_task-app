import asyncHandler from 'express-async-handler';
import Logger from '../middleware/Logger';
import { SuccessResponse } from '../middleware/ApiResponse';

class UserController {
  register = asyncHandler(async (req, res) => {
    Logger.info('User registration');
  });

  login = asyncHandler(async (req, res) => {
    Logger.info('User login');

    new SuccessResponse('User logged in successfully!', {}).send(res);
  });
}

export default new UserController();
