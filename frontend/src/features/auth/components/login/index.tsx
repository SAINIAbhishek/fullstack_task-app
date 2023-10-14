import LoginForm from './login-form.tsx';
import AuthLayout from '@/features/auth/layout';

const Login = () => {
  return (
    <AuthLayout title="Sign in to your account">
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
