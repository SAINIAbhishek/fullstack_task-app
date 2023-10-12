import ForgotPasswordForm from './forgot-password-form';

const ForgotPassword = () => {
  return (
    <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl mb-1 text-white">
          Forgot your password?
        </h1>
        <p
          style={{ marginTop: 0 }}
          className="font-light text-gray-500 dark:text-gray-400">
          Don't fret! Just type in your email and we will send you a code to
          reset your password!
        </p>
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default ForgotPassword;
