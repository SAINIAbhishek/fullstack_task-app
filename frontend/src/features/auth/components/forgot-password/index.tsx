import AuthLayout from '@/features/auth/layout';
import ForgotPasswordForm from '@/features/auth/components/forgot-password/forgot-password-form';

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
