import { Toaster } from 'react-hot-toast';
import AppRoutes from './routes';

const App = () => {
  return (
    <main>
      <Toaster position="bottom-left" />
      <section className="min-h-screen text-slate-600 bg-slate-900 xl:text-base sm:text-sm text-xs">
        <AppRoutes />
      </section>
    </main>
  );
};

export default App;
