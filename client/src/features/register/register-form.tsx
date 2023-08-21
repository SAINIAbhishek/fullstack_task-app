import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { RegisterType } from './register-type';
import { ErrorMessage, Field, Formik } from 'formik';
import LoadingSpinner from '../ui/loading-spinner';

const validationSchema = yup.object().shape({
  firstname: yup.string().required('First name is required'),
  lastname: yup.string().required('Last name is required'),
  email: yup.string().email('Email is invalid').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password is too short - should be 8 characters minimum'),
});

const initialValues: RegisterType = {
  email: '',
  password: '',
  firstname: '',
  lastname: '',
};

const RegisterForm = () => {
  const navigate = useNavigate();

  const handleFormSubmit = (values: RegisterType) => {
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
        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-6">
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label
                htmlFor="firstname"
                className="block mb-2 text-sm font-medium text-white">
                First Name
              </label>
              <Field
                type="text"
                name="firstname"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstname}
                id="firstname"
                className={`border sm:text-sm rounded-lg placeholder-gray-400 border-gray-600 p-2.5 bg-gray-700 text-white block w-full ${
                  errors.firstname && touched.firstname
                    ? 'border-red-500'
                    : 'focus:ring-blue-500'
                }`}
                placeholder="Enter your first name"
              />
              <ErrorMessage
                name="firstname"
                component="div"
                className="text-red-500 text-sm pt-1"
              />
            </div>

            <div className="w-1/2">
              <label
                htmlFor="lastname"
                className="block mb-2 text-sm font-medium text-white">
                Last Name
              </label>
              <Field
                type="text"
                name="lastname"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastname}
                id="lastname"
                className={`border sm:text-sm rounded-lg placeholder-gray-400 border-gray-600 p-2.5 bg-gray-700 text-white block w-full ${
                  errors.lastname && touched.lastname
                    ? 'border-red-500'
                    : 'focus:ring-blue-500'
                }`}
                placeholder="Enter your last name"
              />
              <ErrorMessage
                name="lastname"
                component="div"
                className="text-red-500 text-sm pt-1"
              />
            </div>
          </div>

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

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <Field
                type="checkbox"
                id="terms"
                name="terms"
                className="w-4 h-4 border rounded focus:ring-3 bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="font-light text-gray-300">
                I accept the
                <button
                  type="button"
                  className="font-medium hover:underline text-primary-500 ml-1">
                  Terms and Conditions
                </button>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={!(dirty && isValid)}
            className={`w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm text-center bg-primary-600 hover:bg-primary-700 px-5 ${
              isSubmitting ? 'py-1' : 'py-2.5'
            }`}>
            {isSubmitting ? (
              <LoadingSpinner size="sm" color="border-white" />
            ) : (
              'Create an account'
            )}
          </button>

          <p className="text-sm font-light text-gray-400">
            Already have an account?
            <button
              onClick={() => navigate('/login')}
              className="font-medium hover:underline text-primary-500 ml-1">
              Login here
            </button>
          </p>
        </form>
      )}
    </Formik>
  );
};

export default RegisterForm;
