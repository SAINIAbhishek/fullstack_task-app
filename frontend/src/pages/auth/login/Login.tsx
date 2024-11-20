import AuthLayout from '../components/auth-layout/AuthLayout';
import LoginForm from './LoginForm';

const Login = () => {
  return (
    <AuthLayout title="title.login">
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
