import { model, Schema, Types } from 'mongoose';
import Joi from 'joi';
import { JoiObjectId } from '../helpers/Validator';

export const TASK_DOCUMENT_NAME = 'Task';
export const TASK_COLLECTION_NAME = 'tasks';

export default interface Task {
  _id?: Types.ObjectId;
  title?: string;
  description?: string;
  user?: string;
  important?: boolean;
  completed?: boolean;
  createdAt?: string;
  updatedAt?: string;
  date?: string;
}

const TaskSchema = new Schema<Task>(
  {
    title: {
      type: Schema.Types.String,
      trim: true,
      required: true,
      index: true,
      maxlength: 200,
    },
    description: {
      type: Schema.Types.String,
      trim: true,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    important: {
      type: Schema.Types.Boolean,
      default: false,
      index: true,
    },
    completed: {
      type: Schema.Types.Boolean,
      default: false,
      index: true,
    },
    date: {
      type: Schema.Types.Date,
      required: true,
      index: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

TaskSchema.index({ createdAt: 1 });
TaskSchema.index({ updatedAt: 1 });

export const JOI_TASK_CREATE_SCHEMA: Joi.ObjectSchema = Joi.object({
  title: Joi.string().max(200).required(),
  description: Joi.string().required(),
  important: Joi.boolean().optional(),
  completed: Joi.boolean().optional(),
  user: JoiObjectId().required(),
  date: Joi.date().required(),
});

export const TaskModel = model<Task>(
  TASK_DOCUMENT_NAME,
  TaskSchema,
  TASK_COLLECTION_NAME
);
