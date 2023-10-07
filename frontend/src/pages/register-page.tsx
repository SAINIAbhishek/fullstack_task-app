import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';
import Register from '../features/register';

const RegisterPage = () => {
  return (
    <section className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
      <div className="flex items-center mb-6 text-2xl font-semibold text-white">
        <FontAwesomeIcon icon={faClipboardList} className="mr-3" size="xl" />
        Task App
      </div>
      <Register />
    </section>
  );
};

export default RegisterPage;
