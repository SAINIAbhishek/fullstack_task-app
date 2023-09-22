import Joi from 'joi';
import { JoiAuthBearer } from './Validator';
import User from '../models/UserModel';
import jwt from 'jsonwebtoken';
import { InternalError } from '../middleware/ApiError';
import { TOKEN_INFO } from '../config';
import UserHelper from './UserHelper';
import crypto from 'crypto';

const generateTokenKey = () => {
  return crypto.randomBytes(64).toString('hex');
};

const createTokens = (
  user: User,
  accessTokenKey: string,
  refreshTokenKey: string
): Tokens => {
  const payload = {
    email: user.email,
    name: UserHelper.fullName(user.firstname, user.lastname),
    iss: TOKEN_INFO.issuer,
    iat: Math.floor(Date.now() / 1000),
  };

  const options = {
    issuer: TOKEN_INFO.issuer,
    audience: TOKEN_INFO.audience,
  };

  const accessToken = jwt.sign(
    {
      ...payload,
      exp: TOKEN_INFO.accessTokenValidity,
    },
    accessTokenKey,
    {
      ...options,
      expiresIn: TOKEN_INFO.accessTokenValidity,
    }
  );

  if (!accessToken) throw new InternalError();

  const refreshToken = jwt.sign(
    {
      ...payload,
      exp: TOKEN_INFO.refreshTokenValidity,
    },
    refreshTokenKey,
    {
      ...options,
      expiresIn: TOKEN_INFO.refreshTokenValidity,
    }
  );
  if (!refreshToken) throw new InternalError();

  return {
    accessToken,
    refreshToken,
  } as Tokens;
};

export const AUTH_JOI_REFRESH_TOKEN_SCHEMA: Joi.ObjectSchema = Joi.object({
  refreshToken: Joi.string().required().min(1),
});

export const AUTH_JOI_SCHEMA: Joi.ObjectSchema = Joi.object({
  authorization: JoiAuthBearer().required(),
}).unknown(true);

export default {
  createTokens,
  generateTokenKey,
};
