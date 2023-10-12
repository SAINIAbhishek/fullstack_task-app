import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';
import ForgotPassword from '../features/forgot-password';

const ForgotPasswordPage = () => {
  return (
    <section className="flex flex-col items-center justify-center px-6 py-8">
      <div className="flex items-center mt-10 mb-6 text-2xl font-semibold text-white">
        <FontAwesomeIcon icon={faClipboardList} className="mr-3" size="xl" />
        Task App
      </div>
      <ForgotPassword />
    </section>
  );
};

export default ForgotPasswordPage;
