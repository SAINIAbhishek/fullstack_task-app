import React from 'react';

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <main>
      <div className="min-h-screen flex flex-col text-slate-100 bg-slate-900 xl:text-base sm:text-sm text-xs">
        {children}
      </div>
    </main>
  );
};

export default MainLayout;
