import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Nav from './nav';
import { useDevice } from '../utils/mediaQuery';
import { formatDate } from 'date-fns';

function Layout() {
  useDevice()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <header className="flex items-center justify-between font-mono px-4">
        <Nav />
        <span className="text-xs font-light text-gray-700">{formatDate(currentTime, 'yyyy-MM-dd HH:mm:ss')}</span>
      </header>
      <Outlet />
    </>
  );
}

export default Layout;
