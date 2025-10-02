import { Outlet } from 'react-router-dom';
import Nav from './nav';
import Contact from './contact';
import { useDevice } from '../utils/mediaQuery';
import { useAtom } from 'jotai';
import { deviceAtom } from '../utils/atoms';

function Layout() {
  useDevice()
  const [device] = useAtom(deviceAtom)
  return (
    <>
      <header>
        <Nav />
       {device === "pc" &&  <Contact/>}
      </header>
      <Outlet />
    </>
  );
}

export default Layout;
