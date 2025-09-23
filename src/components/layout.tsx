import { Outlet } from 'react-router-dom';
import Nav from './nav';
import Contact from './contact';

function Layout() {
  return (
    <>
      <header>
        <Nav />
        <Contact/>
      </header>
      <Outlet />
    </>
  );
}

export default Layout;
