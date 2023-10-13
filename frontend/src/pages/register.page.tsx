import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';
import Register from '../features/register';
import { APP_NAME } from '../config';

const RegisterPage = () => {
  return (
    <section className="flex flex-col items-center justify-center px-6 py-8">
      <div className="flex items-center mt-2 mb-6 text-2xl font-semibold text-white">
        <FontAwesomeIcon icon={faClipboardList} className="mr-3" size="xl" />
        {APP_NAME}
      </div>
      <Register />
    </section>
  );
};

export default RegisterPage;