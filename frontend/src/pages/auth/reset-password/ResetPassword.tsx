import { AUTH_BASE_ROUTE } from '@/routes/AuthRoutes';
import AuthLayout from '../components/auth-layout/AuthLayout';
import ResetPasswordForm from './ResetPasswordForm';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useParams();

  const email = new URLSearchParams(location.search).get('email');

  if (!token || !email) {
    navigate(`${AUTH_BASE_ROUTE}/login`);
  }

  return (
    <AuthLayout title="title.reset_password">
      {!!token && !!email && <ResetPasswordForm token={token} email={email} />}
    </AuthLayout>
  );
};

export default ResetPassword;
