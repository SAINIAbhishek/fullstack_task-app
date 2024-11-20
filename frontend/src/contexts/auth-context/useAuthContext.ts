import { useContext } from 'react';
import { AuthContextType } from './AuthContextType';
import AuthContext from './AuthContext';

const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return useContext(AuthContext);
};

export default useAuthContext;
