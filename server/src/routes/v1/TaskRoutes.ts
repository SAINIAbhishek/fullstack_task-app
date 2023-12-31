import express from 'express';
import validator, {
  JOI_AUTHORIZATION_SCHEMA,
  JOI_ID_SCHEMA,
  ValidationSource,
} from '../../helpers/Validator';
import AuthController from '../../controllers/AuthController';
import { JOI_TASK_CREATE_SCHEMA } from '../../models/TaskModel';
import TaskController from '../../controllers/TaskController';

const router = express.Router();

router.use(
  validator(JOI_AUTHORIZATION_SCHEMA, ValidationSource.HEADER),
  AuthController.isAuthorized
);

router
  .route('/')
  .get(TaskController.getAll)
  .post(
    validator(JOI_TASK_CREATE_SCHEMA, ValidationSource.BODY),
    TaskController.create
  );

router.use('/:id', validator(JOI_ID_SCHEMA, ValidationSource.PARAM));

router
  .route('/:id')
  .get(TaskController.get)
  .put(TaskController.update)
  .delete(TaskController.delete);

export default router;
