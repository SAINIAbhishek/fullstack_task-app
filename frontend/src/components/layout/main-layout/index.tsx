import React from 'react';

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <main>
      <section className="min-h-screen text-slate-600 bg-slate-900 xl:text-base sm:text-sm text-xs">
        {children}
      </section>
    </main>
  );
};

export default MainLayout;
