import InputField from '../shared/forms/input-field';
import LoadingSpinner from '../shared/loading-spinner';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { API_FORGOT_PASSWORD } from '../../api/auth.api';
import * as yup from 'yup';
import { EMAIL_PATTERN } from '../../utils/regex';
import { ForgotPasswordType } from './forgot-password.type';
import toast from 'react-hot-toast';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Email is invalid')
    .matches(EMAIL_PATTERN, 'Email is invalid')
    .required('Email is required'),
});

const initialValues: ForgotPasswordType = {
  email: '',
};

const ForgotPasswordForm = () => {
  const navigate = useNavigate();

  const { mutate, isError } = useMutation(API_FORGOT_PASSWORD);

  const handleSubmit = (value: ForgotPasswordType) => {
    mutate(value, {
      onSuccess: (response) => {
        toast.success(response.message);
        if (response && response.data?.passwordResetToken) {
          navigate({
            pathname: `/reset-password/${response.data.passwordResetToken}`,
            search: `?email=${value.email}`,
          });
        }
      },
      onError: (err: any) => {
        toast.error(err.message);
      },
    });
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
        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-6">
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

          <button
            type="submit"
            disabled={!(dirty && isValid)}
            className={`w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm text-center bg-primary-600 hover:bg-primary-700 px-5 ${
              isSubmitting && !isError ? '' : 'py-2.5'
            } ${!(dirty && isValid) ? 'cursor-not-allowed' : ''}`}>
            {isSubmitting && !isError ? (
              <LoadingSpinner size="sm" color="border-white" />
            ) : (
              'Reset password'
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

export default ForgotPasswordForm;
