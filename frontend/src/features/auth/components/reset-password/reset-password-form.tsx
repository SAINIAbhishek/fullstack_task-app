import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { EMAIL_PATTERN } from '@/utils/regex';
import { ResetPasswordType } from '@/features/auth/types/reset-password.type';
import { API_RESET_PASSWORD } from '@/api/auth.api';
import { AUTH_BASE_ROUTE } from '@/features/auth/routes';
import InputField from '@/components/form/input-field';
import Spinner from '@/components/spinner';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Email is invalid')
    .matches(EMAIL_PATTERN, 'Email is invalid')
    .required('Email is required'),
});

type Props = {
  email: string;
  token: string;
};

const ResetPasswordForm = ({ email, token }: Props) => {
  const navigate = useNavigate();

  const initialValues: ResetPasswordType = {
    email,
    token,
    password: '',
  };

  const { mutate, isError } = useMutation(API_RESET_PASSWORD, {
    onSuccess: (response) => {
      toast.success(response.message);
      navigate(`${AUTH_BASE_ROUTE}/login`);
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
        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-6">
          <InputField
            name="email"
            label="Email Address"
            type="email"
            value={values.email}
            readOnly
          />

          <InputField
            name="password"
            label="New Password"
            type="password"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password}
            error={errors.password}
            touched={touched.password}
          />

          <button
            type="submit"
            disabled={!(dirty && isValid)}
            className={`w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm text-center bg-primary-600 hover:bg-primary-700 px-5 ${
              isSubmitting && !isError ? '' : 'py-2.5'
            } ${!(dirty && isValid) ? 'cursor-not-allowed' : ''}`}>
            {isSubmitting && !isError ? (
              <Spinner size="sm" color="border-white" />
            ) : (
              'Reset password'
            )}
          </button>

          <p className="text-sm font-light text-gray-400">
            Already have an account?
            <button
              type="button"
              onClick={() => navigate(`${AUTH_BASE_ROUTE}/login`)}
              className="font-medium hover:underline text-primary-500 ml-1">
              Login here
            </button>
          </p>
        </form>
      )}
    </Formik>
  );
};

export default ResetPasswordForm;
