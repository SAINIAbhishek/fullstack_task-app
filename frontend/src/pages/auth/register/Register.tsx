import AuthLayout from '../components/auth-layout/AuthLayout';
import RegisterForm from './RegisterForm';

const Register = () => {
  return (
    <AuthLayout title="title.register">
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;
