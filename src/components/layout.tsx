import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Nav from './nav';
import LoadingOverlay from './LoadingOverlay';
import { formatDate } from 'date-fns';

function Layout() {
  useEffect(() => {
    const handleResize = () => {
      // Device detection logic for layout adjustments if needed
      console.log('Layout resize:', window.innerWidth)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])
  const [currentTime, setCurrentTime] = useState(new Date())
  const [appLoading, setAppLoading] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      const minDelay = new Promise((res) => setTimeout(res, 600))
      const fontsReady = (document as any).fonts?.ready || Promise.resolve()
      await Promise.all([minDelay, fontsReady])
      if (!cancelled) setAppLoading(false)
    }
    run()
    return () => { cancelled = true }
  }, [])

  return (
    <>
      <LoadingOverlay visible={appLoading} text="포트폴리오 로딩 중..." />
      <header className="flex items-center justify-between w-full font-mono px-4 z-10 fixed">
        <Nav />
        <span className="text-xs font-light text-gray-700">{formatDate(currentTime, 'yyyy-MM-dd HH:mm:ss')}</span>
      </header>
      <Outlet />
    </>
  );
}

export default Layout;
