import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { EMAIL_PATTERN } from '@/helpers/RegexHelper';
import { API_FORGOT_PASSWORD } from '@/api/AuthApi';
import InputField from '@/components/form/input-field/InputField';
import PrimaryButton from '@/components/buttons/primary-btn/PrimaryButton';
import LinkButton from '@/components/buttons/link-btn/LinkButton';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { AUTH_BASE_ROUTE } from '@/routes/AuthRoutes';
import type { ForgotPasswordType } from '@/types/ForgotPasswordType';

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
        const { data, message } = response;
        toast.success(message);
        if (data && data.passwordResetToken) {
          navigate({
            pathname: `${AUTH_BASE_ROUTE}/reset-password/${data.passwordResetToken}`,
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
            readOnly
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
