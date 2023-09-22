import asyncHandler from 'express-async-handler';
import Logger from '../middleware/Logger';
import { SuccessResponse } from '../middleware/ApiResponse';
import UserHelper from '../helpers/UserHelper';
import { AuthFailureError, BadRequestError } from '../middleware/ApiError';
import bcrypt from 'bcrypt';

class AuthController {
  test = asyncHandler(async (req, res) => {
    Logger.info('User test');

    new SuccessResponse('Test successfully!', {}).send(res);
  });

  login = asyncHandler(async (req, res) => {
    const user = await UserHelper.findByEmail(req.body.email);
    if (!user)
      throw new BadRequestError(
        'Your email address or your password is incorrect'
      );
    if (!user.password)
      throw new BadRequestError(
        'Your email address or your password is incorrect'
      );

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new AuthFailureError('Your credentials are incorrect');

    Logger.info('User logged in successfully!');
  });

  register = asyncHandler(async (req, res) => {
    Logger.info('User registration');
  });

  logout = asyncHandler(async (req, res) => {
    Logger.info('User logged out successfully!');
  });

  refreshToken = asyncHandler(async (req, res) => {
    Logger.info('User logged out successfully!');
  });
}

export default new AuthController();
