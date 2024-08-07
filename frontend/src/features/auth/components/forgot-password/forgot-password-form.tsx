import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { EMAIL_PATTERN } from '@/utils/regex';
import { API_FORGOT_PASSWORD } from '@/api/auth.api';
import InputField from '@/components/form/input-field';
import { ForgotPasswordType } from '../../types/forgot-password.type';
import { AUTH_BASE_ROUTE } from '../../routes';
import PrimaryButton from '@/components/buttons/primary-btn';
import LinkButton from '@/components/buttons/link-btn';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

const initialValues: ForgotPasswordType = {
  email: '',
};

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email(t('error.email_invalid'))
      .matches(EMAIL_PATTERN, t('error.email_invalid'))
      .required(t('error.email_required')),
  });

  const { mutate, isError, isPending } = useMutation({
    mutationFn: API_FORGOT_PASSWORD,
  });

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
            label="label.email_address"
            type="email"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email}
            error={errors.email}
            touched={touched.email}
          />

          <PrimaryButton
            title="button.reset_password"
            type="submit"
            isLoading={isSubmitting && !isError && isPending}
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

export default ForgotPasswordForm;
