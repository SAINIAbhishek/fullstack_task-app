import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { Formik } from 'formik';
import { LoginType } from './login-type';
import LoadingSpinner from '../shared/loading-spinner';
import { EMAIL_PATTERN } from '../../utils/regex';
import { useMutation } from 'react-query';
import { API_LOGIN_USER } from '../../api/auth-api';
import toast from 'react-hot-toast';
import InputField from '../shared/forms/input-field';

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

  const { mutate, isError } = useMutation(API_LOGIN_USER, {
    onSuccess: () => {
      navigate('/');
    },
    onError: (err: Error) => {
      toast.error(err.message);
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
              onClick={() => navigate('/forgot-password')}
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
            }`}>
            {isSubmitting && !isError ? (
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
