import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { Formik } from 'formik';
import { EMAIL_PATTERN } from '@/utils/regex';
import { LoginType } from '../../types/login.type';
import InputField from '@/components/form/input-field';
import { AUTH_BASE_ROUTE } from '../../routes';
import { useAuth } from '@/providers/auth-provider';
import { useState } from 'react';
import PrimaryButton from '@/components/buttons/primay-btn';
import LinkButton from '@/components/buttons/link-btn';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Email is invalid')
    .matches(EMAIL_PATTERN, 'Email is invalid')
    .required('Email is required')
    .trim(),
  password: yup.string().required('Password is required'),
});

const initialValues: LoginType = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [isError, setIsError] = useState<boolean>(false);

  const handleSubmit = async (values: LoginType) => {
    try {
      await auth.login(values);
      navigate('/');
    } catch (error) {
      setIsError(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
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
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <InputField
            name="email"
            label="Email Address"
            type="email"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email}
            error={errors.email}
            touched={touched.email}
          />

          <InputField
            name="password"
            label="Password"
            type="password"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password}
            error={errors.password}
            touched={touched.password}
          />

          <div className="flex items-center justify-end">
            <button
              onClick={() => navigate(`${AUTH_BASE_ROUTE}/forgot-password`)}
              type="button"
              className="text-sm font-medium hover:underline text-primary-500">
              Forgot password?
            </button>
          </div>

          <PrimaryButton
            title="Sign in"
            type="submit"
            isLoading={isSubmitting && !isError}
            isDisabled={!(dirty && isValid)}
          />

          <p className="text-sm font-light text-gray-400">
            Don’t have an account yet?
            <LinkButton
              handleClick={() => navigate(`${AUTH_BASE_ROUTE}/register`)}
              title="Sign up"
            />
          </p>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
