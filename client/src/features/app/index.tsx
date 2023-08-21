import React from 'react';
import AppRoutes from './routes';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster position="bottom-left" />
      <div className="min-h-screen text-slate-600 bg-slate-900 xl:text-base sm:text-sm text-xs">
        <AppRoutes />
      </div>
    </>
  );
}

export default App;
