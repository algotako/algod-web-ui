import { lazy } from 'solid-js';
import { Outlet } from 'solid-start';
import Sidebar from './Sidebar';

const Header = lazy(() => import('./Header'));

const Layout = () => {

return (
    <div class='flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden'>
      <Sidebar />
      <div class='flex-1 bg-gray-200 dark:bg-gray-900'>
        <Header />
        <div class="p-4">{<Outlet />}</div>
      </div>
    </div>
  )
}

export default Layout;