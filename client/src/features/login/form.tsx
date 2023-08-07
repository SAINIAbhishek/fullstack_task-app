import React from 'react';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const navigate = useNavigate();

  return (
    <form className="space-y-4 md:space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-white">
          Your email
        </label>
        <input
          type="email"
          name="email"
          autoComplete="false"
          id="email"
          className="border sm:text-sm rounded-lg focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500"
          placeholder="youremail@gmail.com"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-white">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800">
        Sign in
      </button>
      <p className="text-sm font-light text-gray-400">
        Don’t have an account yet?
        <button
          onClick={() => navigate('/register')}
          className="font-medium hover:underline text-primary-500 ml-1">
          Sign up
        </button>
      </p>
    </form>
  );
};

export default Form;
