import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { EMAIL_PATTERN } from '@/helpers/RegexHelper';
import { API_RESET_PASSWORD } from '@/api/AuthApi';
import PrimaryButton from '@/components/buttons/primary-btn/PrimaryButton';
import LinkButton from '@/components/buttons/link-btn/LinkButton';
import { useTranslation } from 'react-i18next';
import InputField from '@/components/form/input-field/InputField';
import { AUTH_BASE_ROUTE } from '@/routes/AuthRoutes';
import { ResetPasswordType } from '@/types/ResetPasswordType';

type Props = {
  email: string;
  token: string;
};

const ResetPasswordForm = ({ email, token }: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email(t('error.email_invalid'))
      .matches(EMAIL_PATTERN, t('error.email_invalid'))
      .required(t('error.email_required')),
  });

  const initialValues: ResetPasswordType = {
    email,
    token,
    password: '',
  };

  const { mutate, isError } = useMutation({
    mutationFn: API_RESET_PASSWORD,
    onSuccess: (response) => {
      toast.success(response.message);
      navigate(`${AUTH_BASE_ROUTE}/login`);
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
            label="label.email_address"
            type="email"
            value={values.email}
            readOnly
          />

          <InputField
            name="password"
            label="label.new_password"
            type="password"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password}
            error={errors.password}
            touched={touched.password}
          />

          <PrimaryButton
            title="button.reset_password"
            type="submit"
            isLoading={isSubmitting && !isError}
            isDisabled={!(dirty && isValid)}
            className="w-full"
          />

          <p className="text-sm font-light text-gray-400">
            {t('already_account')}
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
