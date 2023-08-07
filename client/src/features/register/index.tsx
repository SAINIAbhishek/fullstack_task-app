import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';
import RegisterForm from './RegisterForm';

const Register = () => {
  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
        <div className="flex items-center mb-6 text-2xl font-semibold text-white">
          <FontAwesomeIcon icon={faClipboardList} className="mr-3" size="xl" />
          Task App
        </div>

        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-lg xl:p-0 bg-gray-800 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
              Create an account
            </h1>
            <RegisterForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
