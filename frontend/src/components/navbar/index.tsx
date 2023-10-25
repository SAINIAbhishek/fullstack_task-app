import { APP_NAME } from '@/config';
import { TASKS_BASE_ROUTE } from '@/features/tasks/routes';
import { NavLink, useLocation } from 'react-router-dom';
import ContentLayout from '@/components/layout/content-layout';
import DropdownUser from './dropdown-user';

const menuLinks = [
  {
    name: 'All tasks',
    path: '/dashboard',
  },
  {
    name: "Today's tasks",
    path: `${TASKS_BASE_ROUTE}/today`,
  },
  {
    name: 'Important tasks',
    path: `${TASKS_BASE_ROUTE}/important`,
  },
  {
    name: 'Completed tasks',
    path: `${TASKS_BASE_ROUTE}/completed`,
  },
  {
    name: 'Uncompleted tasks',
    path: `${TASKS_BASE_ROUTE}/uncompleted`,
  },
];

const Navbar = () => {
  const route = useLocation();
  const currentPath = route.pathname;

  return (
    <nav className="border-gray-200 w-full bg-slate-800">
      <ContentLayout className="flex-wrap items-center justify-between p-4">
        <div className="flex items-center">
          <img src="/vite.svg" className="h-8 mr-3" alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            {APP_NAME}
          </span>
        </div>

        <div className="md:order-2">
          <DropdownUser />
        </div>

        <div
          className="items-center justify-between flex w-auto order-1 mt-4 md:mt-0"
          id="navbar-user">
          <ul className="flex flex-wrap font-medium p-0 rounded-lg flex-row mt-0 border-0 bg-gray-900 border-gray-700">
            {menuLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  className={`block py-2 pl-3 pr-4 rounded transition ${
                    currentPath === link.path
                      ? 'text-blue-500'
                      : 'text-white hover:text-blue-500'
                  }`}
                  to={link.path}>
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </ContentLayout>
    </nav>
  );
};

export default Navbar;
