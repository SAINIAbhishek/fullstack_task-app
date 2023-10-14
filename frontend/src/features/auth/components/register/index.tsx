import AuthLayout from '@/features/auth/layout';
import RegisterForm from '@/features/auth/components/register/register-form';

const Register = () => {
  return (
    <AuthLayout title="Create an account">
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;
