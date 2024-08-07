import AuthLayout from '../../layout';
import ForgotPasswordForm from './forgot-password-form';

const ForgotPassword = () => {
  return (
    <AuthLayout
      title="title.forgot_password"
      subtitle="subtitle.forgot_password">
      <ForgotPasswordForm />
    </AuthLayout>
  );
};

export default ForgotPassword;
