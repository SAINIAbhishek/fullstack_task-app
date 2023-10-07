import RegisterForm from './register-form';

const Register = () => {
  return (
    <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-lg xl:p-0 bg-gray-800 border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
          Create an account
        </h1>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
