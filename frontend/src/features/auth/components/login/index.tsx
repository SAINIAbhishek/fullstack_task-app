import AuthLayout from '../../layout';
import LoginForm from './login-form';

const Login = () => {
  return (
    <AuthLayout title="title.login">
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
