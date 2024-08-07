import React from 'react';
import { APP_NAME } from '@/config';
import { useTranslation } from 'react-i18next';

type Props = {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
};

const AuthLayout = ({ children, title, subtitle }: Props) => {
  const { t } = useTranslation();

  return (
    <section className="flex flex-col items-center justify-center px-6 py-8">
      <div className="flex items-center mt-10 mb-6 text-2xl font-semibold text-white">
        <img src="/vite.svg" className="h-8 mr-3" alt="Logo" />
        {APP_NAME}
      </div>
      <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-lg xl:p-0 bg-gray-800 border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            className={`text-xl font-bold leading-tight tracking-tight md:text-2xl text-white ${
              subtitle ? 'mb-1' : ''
            }`}>
            {t(title)}
          </h1>
          {!!subtitle && (
            <p
              style={{ marginTop: 0 }}
              className="font-light text-gray-500 dark:text-gray-400">
              {t(subtitle)}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
