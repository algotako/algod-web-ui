import { lazy } from 'solid-js';
import { Outlet } from 'solid-start';
import Sidebar from './Sidebar';

const Header = lazy(() => import('./Header'));

const Layout = () => {

return (
    <div class='flex flex-row h-screen w-screen overflow-hidden'>
      <Sidebar />
      <div class='flex flex-col flex-1 h-screen overflow-hidden bg-gray-200 dark:bg-gray-900'>
        <Header />
        <div class="p-6 text-lg leading-8 min-h-0 overflow-auto">{<Outlet />}</div>
      </div>
    </div>
  )
}

export default Layout;