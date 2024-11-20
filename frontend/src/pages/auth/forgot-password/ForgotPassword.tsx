import AuthLayout from '../components/auth-layout/AuthLayout';
import ForgotPasswordForm from './ForgotPasswordForm';

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
