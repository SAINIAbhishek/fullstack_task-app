import { model, Schema, Types } from 'mongoose';
import Joi from 'joi';

export const DOCUMENT_NAME = 'User';
export const COLLECTION_NAME = 'users';

export default interface User {
  _id: Types.ObjectId;
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<User>(
  {
    firstname: {
      type: Schema.Types.String,
      trim: true,
      maxlength: 200,
    },
    lastname: {
      type: Schema.Types.String,
      trim: true,
      maxlength: 200,
    },
    email: {
      type: Schema.Types.String,
      unique: true,
      sparse: true, // allows null
      trim: true,
      select: false,
      minlength: 5,
      maxlength: 50,
    },
    password: {
      type: Schema.Types.String,
      select: false,
      minlength: 8,
      maxlength: 255,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

UserSchema.index({ email: 1 });

export const USER_JOI_REGISTER_SCHEMA: Joi.ObjectSchema = Joi.object({
  firstname: Joi.string().max(200),
  lastname: Joi.string().max(200),
  email: Joi.string().min(5).max(255).email().required(),
  password: Joi.string().min(8).max(255).required(),
});

export const USER_JOI_LOGIN_SCHEMA: Joi.ObjectSchema = Joi.object({
  email: Joi.string().min(5).max(255).email().required(),
  password: Joi.string().min(8).required(),
});

export const UserModel = model<User>(
  DOCUMENT_NAME,
  UserSchema,
  COLLECTION_NAME
);
