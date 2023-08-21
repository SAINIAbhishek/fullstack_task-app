import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { ErrorMessage, Field, Formik } from 'formik';
import { LoginType } from './login-type';
import LoadingSpinner from '../ui/loading-spinner';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Email is invalid')
    .required('Email is required')
    .trim(),
  password: yup.string().required('Password is required'),
});

const initialValues: LoginType = {
  email: '',
  password: '',
  rememberMe: false,
};

const LoginForm = () => {
  const navigate = useNavigate();

  const handleFormSubmit = (values: LoginType) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleFormSubmit}
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
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-white">
              Email Address
            </label>
            <Field
              type="email"
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              id="email"
              className={`border sm:text-sm rounded-lg placeholder-gray-400 border-gray-600 p-2.5 bg-gray-700 text-white block w-full ${
                errors.email && touched.email
                  ? 'border-red-500'
                  : 'focus:ring-blue-500'
              }`}
              placeholder="Enter your email address"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm pt-1"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-white">
              Password
            </label>
            <Field
              type="password"
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              id="password"
              placeholder="••••••••"
              className={`border sm:text-sm rounded-lg placeholder-gray-400 border-gray-600 p-2.5 bg-gray-700 text-white block w-full ${
                errors.password && touched.password
                  ? 'border-red-500'
                  : 'focus:ring-blue-500'
              }`}
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm pt-1"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <Field
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  className="w-4 h-4 border rounded focus:ring-3 bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800"
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="rememberMe"
                  className="text-gray-500 dark:text-gray-300">
                  Remember me
                </label>
              </div>
            </div>
            <button
              type="button"
              className="text-sm font-medium hover:underline text-primary-500">
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={!(dirty && isValid)}
            className={`w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm text-center bg-primary-600 hover:bg-primary-700 px-5 ${
              isSubmitting ? '' : 'py-2.5'
            }`}>
            {isSubmitting ? (
              <LoadingSpinner size="sm" color="border-white" />
            ) : (
              'Sign in'
            )}
          </button>

          <p className="text-sm font-light text-gray-400">
            Don’t have an account yet?
            <button
              type="button"
              onClick={() => navigate('/register')}
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
