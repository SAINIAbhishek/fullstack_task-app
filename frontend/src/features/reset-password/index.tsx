import ResetPasswordForm from './reset-password-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { token } = useParams();
  const email = new URLSearchParams(location.search).get('email');

  if (!token || !email) {
    navigate('/login');
  }

  return (
    <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
          Change Password
        </h1>
        {!!token && !!email && (
          <ResetPasswordForm token={token} email={email} />
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
