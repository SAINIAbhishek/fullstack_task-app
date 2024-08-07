import { useEffect } from 'react';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import { NODE_ENV } from '@/config';

const useDisableReactDevTools = () => {
  useEffect(() => {
    if (NODE_ENV === 'production') {
      disableReactDevTools();
    }
  }, []);
};

export default useDisableReactDevTools;
