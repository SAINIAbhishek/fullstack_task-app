import { useEffect } from 'react';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import { CONFIG } from '@/config/Config';

const useDisableReactDevTools = () => {
  useEffect(() => {
    if (CONFIG.NODE_ENV === 'production') {
      disableReactDevTools();
    }
  }, []);
};

export default useDisableReactDevTools;
