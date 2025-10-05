import { Outlet } from 'react-router-dom';
import Nav from './nav';
import { useDevice } from '../utils/mediaQuery';

function Layout() {
  useDevice()
  return (
    <>
      <header>
        <Nav />
      </header>
      <Outlet />
    </>
  );
}

export default Layout;
