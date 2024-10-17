import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { Formik } from 'formik';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { EMAIL_PATTERN } from '@/utils/regex';
import { RegisterType } from '../../types/register.type';
import InputField from '@/components/form/input-field';
import { API_REGISTER_USER } from '@/api/auth.api';
import CheckboxField from '@/components/form/checkbox-field';
import { AUTH_BASE_ROUTE } from '../../routes';
import PrimaryButton from '@/components/buttons/primary-btn';
import LinkButton from '@/components/buttons/link-btn';
import { useTranslation } from 'react-i18next';

const initialValues: RegisterType = {
  email: '',
  password: '',
  firstname: '',
  lastname: '',
  terms: false,
};

const RegisterForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const validationSchema = yup.object().shape({
    firstname: yup.string().required(t('error.first_name_required')),
    lastname: yup.string().required(t('error.last_name_required')),
    email: yup
      .string()
      .email(t('error.email_invalid'))
      .matches(EMAIL_PATTERN, t('error.email_invalid'))
      .required(t('error.email_required')),
    password: yup
      .string()
      .required(t('error.password_required'))
      .min(8, t('error.password_short')),
    terms: yup.boolean().oneOf([true], t('error.terms')),
  });

  const { mutate, isError } = useMutation({
    mutationFn: API_REGISTER_USER,
    onSuccess: (response) => {
      toast.success(response.message);
      navigate(`${AUTH_BASE_ROUTE}/login`);
    },
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => mutate(values)}
      validationSchema={validationSchema}>
      {({
        values,
        handleBlur,
        errors,
        touched,
        handleChange,
        handleSubmit,
        dirty,
        isValid,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-6">
          <div className="flex space-x-4">
            <div className="w-1/2">
              <InputField
                name="firstname"
                label="label.first_name"
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstname}
                error={errors.firstname}
                touched={touched.firstname}
              />
            </div>

            <div className="w-1/2">
              <InputField
                name="lastname"
                label="label.last_name"
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastname}
                error={errors.lastname}
                touched={touched.lastname}
              />
            </div>
          </div>

          <InputField
            name="email"
            label="label.email_address"
            type="email"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email}
            error={errors.email}
            touched={touched.email}
          />

          <InputField
            name="password"
            label="label.password"
            type="password"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password}
            error={errors.password}
            touched={touched.password}
          />

          <CheckboxField
            name="terms"
            label="label.terms_conditions"
            checked={values.terms}
            onChange={handleChange}
            error={errors.terms}
            touched={touched.terms}
          />

          <PrimaryButton
            title="button.create_account"
            type="submit"
            isLoading={isSubmitting && !isError}
            isDisabled={!(dirty && isValid)}
            className="w-full"
          />

          <p className="text-sm font-light text-gray-400">
            {t('already_account')}
            <LinkButton
              handleClick={() => navigate(`${AUTH_BASE_ROUTE}/login`)}
              title="button.login_here"
            />
          </p>
        </form>
      )}
    </Formik>
  );
};

export default RegisterForm;
