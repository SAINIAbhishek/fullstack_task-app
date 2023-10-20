import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { EMAIL_PATTERN } from '@/utils/regex';
import { ResetPasswordType } from '../../types/reset-password.type';
import { API_RESET_PASSWORD } from '@/api/auth.api';
import { AUTH_BASE_ROUTE } from '../../routes';
import InputField from '@/components/form/input-field';
import PrimaryButton from '@/components/buttons/primay-btn';
import LinkButton from '@/components/buttons/link-btn';

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

          <PrimaryButton
            title="Reset password"
            type="submit"
            isLoading={isSubmitting && !isError}
            isDisabled={!(dirty && isValid)}
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

export default ResetPasswordForm;
