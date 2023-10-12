import LoginForm from './login-form';

const Login = () => {
  return (
    <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
          Sign in to your account
        </h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
