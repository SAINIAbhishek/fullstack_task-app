import PrimaryButton from '@/components/buttons/primary-btn/PrimaryButton';
import { Formik } from 'formik';
import { TaskType } from '../../../../types/TaskType';
import * as yup from 'yup';
import InputField from '@/components/form/input-field/InputField';
import TextareaField from '@/components/form/textarea-field/TextareaField';
import { todayDate } from '@/helpers/DateHelper';
import CheckboxField from '@/components/form/checkbox-field/CheckboxField';
import { useTranslation } from 'react-i18next';

type Props = {
  initialValues: TaskType;
  handleSubmit: (values: TaskType) => void;
  isError: boolean;
  isSubmitting: boolean;
  btnLabel: string;
  title: string;
};

const TaskForm = ({
  handleSubmit,
  initialValues,
  isError,
  isSubmitting,
  title,
  btnLabel,
}: Props) => {
  const { t } = useTranslation();

  const validationSchema = yup.object().shape({
    title: yup
      .string()
      .max(200, t('error.title_max_200'))
      .required(t('error.title_required')),
    description: yup.string().required(t('error.description_required')),
    date: yup
      .date()
      .min(todayDate(), t('error.date_equal_greater_today'))
      .required(t('error.date_required')),
  });

  return (
    <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-lg xl:p-0 bg-gray-800 border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h3 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
          {t(title)}
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
                label="label.title"
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                error={errors.title}
                touched={touched.title}
                placeholder="placeholder.title"
              />

              <TextareaField
                name="description"
                label="label.description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                error={errors.description}
                touched={touched.description}
                placeholder="placeholder.description"
              />

              <InputField
                name="date"
                label="label.date"
                type="date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.date}
                error={errors.date}
                touched={touched.date}
              />

              <CheckboxField
                name="important"
                label="label.mark_important"
                checked={values.important}
                value={values.important}
                onChange={handleChange}
                touched={touched.important}
              />

              <CheckboxField
                name="completed"
                label="label.mark_completed"
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
