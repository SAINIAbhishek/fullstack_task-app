import Joi from 'joi';
import { JoiAuthBearer } from './Validator';

export const AUTH_JOI_REFRESH_TOKEN_SCHEMA: Joi.ObjectSchema = Joi.object({
  refreshToken: Joi.string().required().min(1),
});

export const AUTH_JOI_SCHEMA: Joi.ObjectSchema = Joi.object({
  authorization: JoiAuthBearer().required(),
}).unknown(true);
