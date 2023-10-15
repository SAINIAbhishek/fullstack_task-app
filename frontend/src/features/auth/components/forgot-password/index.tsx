import AuthLayout from '../../layout';
import ForgotPasswordForm from './forgot-password-form';

const ForgotPassword = () => {
  return (
    <AuthLayout
      title="Forgot your password?"
      subtitle="Don't fret! Just type in your email and we will send you a code to
          reset your password!">
      <ForgotPasswordForm />
    </AuthLayout>
  );
};

export default ForgotPassword;
