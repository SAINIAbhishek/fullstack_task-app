import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { Formik } from 'formik';
import { EMAIL_PATTERN } from '@/utils/regex';
import { LoginType } from '../../types/login.type';
import InputField from '@/components/form/input-field';
import Spinner from '@/components/spinner';
import { AUTH_BASE_ROUTE } from '../../routes';
import { useAuth } from '@/providers/auth-provider';
import { useState } from 'react';

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

          <button
            type="submit"
            disabled={!(dirty && isValid)}
            className={`w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm text-center bg-primary-600 hover:bg-primary-700 px-5 ${
              isSubmitting && !isError ? '' : 'py-2.5'
            } ${!(dirty && isValid) ? 'cursor-not-allowed' : ''}`}>
            {isSubmitting && !isError ? (
              <Spinner size="sm" color="border-white" />
            ) : (
              'Sign in'
            )}
          </button>

          <p className="text-sm font-light text-gray-400">
            Don’t have an account yet?
            <button
              type="button"
              onClick={() => navigate(`${AUTH_BASE_ROUTE}/register`)}
              className="font-medium hover:underline text-primary-500 ml-1">
              Sign up
            </button>
          </p>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
