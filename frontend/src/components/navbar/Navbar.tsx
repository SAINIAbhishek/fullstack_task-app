import { CONFIG } from '@/config/Config';
import { NavLink, useLocation } from 'react-router-dom';
import ContentLayout from '@/components/layout/content-layout/ContentLayout';
import DropdownUser from './DropdownUser';
import { useTranslation } from 'react-i18next';
import { TASKS_BASE_ROUTE } from '@/routes/TasksRoutes';

const menuLinks = [
  {
    name: 'menu.all_tasks',
    path: '/dashboard',
  },
  {
    name: 'menu.today_tasks',
    path: `${TASKS_BASE_ROUTE}/today`,
  },
  {
    name: 'menu.important_tasks',
    path: `${TASKS_BASE_ROUTE}/important`,
  },
  {
    name: 'menu.completed_tasks',
    path: `${TASKS_BASE_ROUTE}/completed`,
  },
  {
    name: 'menu.uncompleted_tasks',
    path: `${TASKS_BASE_ROUTE}/uncompleted`,
  },
];

const Navbar = () => {
  const route = useLocation();
  const currentPath = route.pathname;
  const { t } = useTranslation();

  return (
    <nav className="border-gray-200 w-full bg-slate-800">
      <ContentLayout className="flex-wrap items-center justify-between p-4">
        <div className="flex items-center">
          <img src="/vite.svg" className="h-8 mr-3" alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            {CONFIG.APP_NAME}
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
                  {t(link.name)}
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
