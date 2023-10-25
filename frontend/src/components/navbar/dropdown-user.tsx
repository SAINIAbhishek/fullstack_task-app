import { useAuth } from '@/providers/auth-provider';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DropdownUser = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error while logging out');
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex mr-3 text-sm rounded-full bg-gray-600 md:mr-0 focus:ring-4 focus:ring-gray-600">
        <img
          className="w-8 rounded-full"
          src="/user-default.png"
          alt="user photo"
        />
      </button>

      <div
        className={`z-50 absolute my-4 text-base list-none divide-y rounded-lg 
        shadow bg-gray-200 divide-gray-600 right-0 top-6 w-40 ${
          showDropdown ? 'block' : 'hidden'
        }`}>
        <div className="px-4 py-3">
          <span className="block text-sm text-gray-900">{user?.name}</span>
          <span className="block text-sm text-gray-500 truncate">
            {user?.email}
          </span>
        </div>
        <ul className="py-2">
          <li
            onClick={handleLogout}
            className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-400 cursor-pointer">
            Sign out
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DropdownUser;
