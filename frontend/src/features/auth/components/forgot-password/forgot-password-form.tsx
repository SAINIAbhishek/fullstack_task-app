import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { EMAIL_PATTERN } from '@/utils/regex';
import { API_FORGOT_PASSWORD } from '@/api/auth.api';
import InputField from '@/components/form/input-field';
import { ForgotPasswordType } from '../../types/forgot-password.type';
import { AUTH_BASE_ROUTE } from '../../routes';
import PrimaryButton from '@/components/buttons/primay-btn';
import LinkButton from '@/components/buttons/link-btn';

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
            pathname: `${AUTH_BASE_ROUTE}/reset-password/${response.data.passwordResetToken}`,
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

          <PrimaryButton
            title="Reset password"
            type="submit"
            isLoading={isSubmitting && !isError}
            isDisabled={!(dirty && isValid)}
            className="w-full"
          />

          <p className="text-sm font-light text-gray-400">
            Already have an account?
            <LinkButton
              handleClick={() => navigate(`${AUTH_BASE_ROUTE}/login`)}
              title="Login here"
            />
          </p>
        </form>
      )}
    </Formik>
  );
};

export default ForgotPasswordForm;
