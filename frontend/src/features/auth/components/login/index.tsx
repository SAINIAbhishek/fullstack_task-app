import AuthLayout from '../../layout';
import LoginForm from './login-form';

const Login = () => {
  return (
    <AuthLayout title="Sign in to your account">
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
