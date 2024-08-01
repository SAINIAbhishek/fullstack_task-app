import PrimaryButton from '@/components/buttons/primary-btn';
import { Formik } from 'formik';
import { TaskType } from '../../types/task.type';
import * as yup from 'yup';
import InputField from '@/components/form/input-field';
import TextareaField from '@/components/form/textarea-field';
import { DATE_FORMAT } from '@/config';
import { todayDate } from '@/utils/date';
import CheckboxField from '@/components/form/checkbox-field';

const validationSchema = yup.object().shape({
  title: yup
    .string()
    .max(200, 'Title cannot exceed 200 characters')
    .required('Title is required'),
  description: yup.string().required('Description is required'),
  date: yup
    .date()
    .min(todayDate(), "Date must be equal to or greater than today's date")
    .required('Date is required'),
});

type Props = {
  initialValues: TaskType;
  handleSubmit: (values: TaskType) => void;
  isError: boolean;
  isSubmitting: boolean;
  btnLabel: string;
  title: string;
};

export const TaskForm = ({
  handleSubmit,
  initialValues,
  isError,
  isSubmitting,
  title,
  btnLabel,
}: Props) => {
  return (
    <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-lg xl:p-0 bg-gray-800 border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h3 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
          {title}
        </h3>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}>
          {({
            handleSubmit,
            errors,
            touched,
            values,
            dirty,
            isValid,
            handleBlur,
            handleChange,
          }) => (
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <InputField
                name="title"
                label="Title"
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                error={errors.title}
                touched={touched.title}
                placeholder="Enter the title"
              />

              <TextareaField
                name="description"
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                error={errors.description}
                touched={touched.description}
                placeholder="Enter the description"
              />

              <InputField
                name="date"
                label="Date"
                type="date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.date}
                error={errors.date}
                touched={touched.date}
                placeholder={DATE_FORMAT}
              />

              <CheckboxField
                name="important"
                label="Mark as important"
                checked={values.important}
                value={values.important}
                onChange={handleChange}
                touched={touched.important}
              />

              <CheckboxField
                name="completed"
                label="Mark as completed"
                checked={values.completed}
                onChange={handleChange}
                value={values.completed}
                touched={touched.completed}
              />

              <PrimaryButton
                title={btnLabel}
                type="submit"
                isLoading={isSubmitting && !isError}
                isDisabled={!(dirty && isValid)}
              />
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default TaskForm;
