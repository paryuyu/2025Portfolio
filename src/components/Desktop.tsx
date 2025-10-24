import { useRef, useState } from "react"
import ConnectForm from "./ConnectForm"
import ProjectsWindow from "./ProjectsWindow"
import AboutMeWindow from "./AboutMeWindow"
import NetworkingWindow from "./NetworkingWindow"
import Dock from "./Dock"
import DesktopApps from "./DesktopApps"

interface AppWindow {
  id: string
  name: string
  isOpen: boolean
  isMinimized: boolean
  size: "full" | 120
  zIndex: number
}

function Desktop() {
  const [openWindows, setOpenWindows] = useState<AppWindow[]>([
    { id: "connect-form", name: "connect", isOpen: false, isMinimized: false, size: 120, zIndex: 10 },
    { id: "projects", name: "projects", isOpen: false, isMinimized: false, size: 120, zIndex: 10 },
    { id: "about-me", name: "about me", isOpen: false, isMinimized: false, size: 120, zIndex: 10 },
    { id: "networking", name: "networking", isOpen: false, isMinimized: false, size: 120, zIndex: 10 }
  ])

  const connectFormRef = useRef<HTMLDivElement | null>(null)
  const projectsWindowRef = useRef<HTMLDivElement | null>(null)
  const aboutMeWindowRef = useRef<HTMLDivElement | null>(null)
  const networkingWindowRef = useRef<HTMLDivElement | null>(null)

  const handleAppDoubleClick = (appName: string) => {
    setOpenWindows(prev =>
      prev.map(win =>
        win.name === appName ? { ...win, isOpen: true, isMinimized: false } : win
      )
    )
  }

  const handleDockAppClick = (appName: string) => {
    setOpenWindows(prev =>
      prev.map(win =>
        win.name === appName ? { ...win, isOpen: true } : win
      )
    )
  }

  const toggleWindow = (windowId: string) => {
    setOpenWindows(prev => 
      prev.map(win => 
        win.id === windowId ? { ...win, isOpen: !win.isOpen } : win
      )
    )
  }

  const toggleSize = (windowId: string) => {
    setOpenWindows(prev =>
      prev.map(win =>
        win.id === windowId ? { ...win, size: win.size === "full" ? 120 : "full" } : win
      )
    )
  }

  const bringToFront = (windowId: string) => {
    setOpenWindows(prev => {
      const maxZ = Math.max(...prev.map(w => w.zIndex))
      return prev.map(win =>
        win.id === windowId ? { ...win, zIndex: maxZ + 1 } : win
      )
    })
  }

  const connectFormWindow = openWindows.find(w => w.id === "connect-form")
  const projectsWindow = openWindows.find(w => w.id === "projects")
  const aboutMeWindow = openWindows.find(w => w.id === "about-me")
  const networkingWindow = openWindows.find(w => w.id === "networking")
  const activeAppNames = openWindows.filter(w => w.isOpen).map(w => w.name)

  return (
    <div className="fixed inset-0 w-full h-screen text-black overflow-hidden bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400">
      {/* 바탕화면 앱 아이콘 (왼쪽 세로 정렬) */}
      <DesktopApps onAppDoubleClick={handleAppDoubleClick} />

      {/* ConnectForm 윈도우 */}
      {connectFormWindow?.isOpen && !connectFormWindow.isMinimized && (
        <div onMouseDown={() => bringToFront("connect-form")} style={{ zIndex: connectFormWindow.zIndex }}>
          <ConnectForm 
            ref={connectFormRef}
            size={connectFormWindow.size} 
            onClose={() => toggleWindow("connect-form")} 
            onToggleSize={() => toggleSize("connect-form")} 
          />
        </div>
      )}

      {/* ProjectsWindow 윈도우 */}
      {projectsWindow?.isOpen && !projectsWindow.isMinimized && (
        <div onMouseDown={() => bringToFront("projects")} style={{ zIndex: projectsWindow.zIndex }}>
          <ProjectsWindow 
            ref={projectsWindowRef}
            size={projectsWindow.size} 
            onClose={() => toggleWindow("projects")} 
            onToggleSize={() => toggleSize("projects")} 
          />
        </div>
      )}

      {/* AboutMeWindow 윈도우 */}
      {aboutMeWindow?.isOpen && !aboutMeWindow.isMinimized && (
        <div onMouseDown={() => bringToFront("about-me")} style={{ zIndex: aboutMeWindow.zIndex }}>
          <AboutMeWindow 
            ref={aboutMeWindowRef}
            size={aboutMeWindow.size} 
            onClose={() => toggleWindow("about-me")} 
            onToggleSize={() => toggleSize("about-me")} 
          />
        </div>
      )}

      {/* NetworkingWindow 윈도우 */}
      {networkingWindow?.isOpen && !networkingWindow.isMinimized && (
        <div onMouseDown={() => bringToFront("networking")} style={{ zIndex: networkingWindow.zIndex }}>
          <NetworkingWindow 
            ref={networkingWindowRef}
            size={networkingWindow.size} 
            onClose={() => toggleWindow("networking")} 
            onToggleSize={() => toggleSize("networking")} 
          />
        </div>
      )}

      {/* 맥 스타일 독(Dock) */}
      <Dock activeApps={activeAppNames} onAppClick={handleDockAppClick} />
    </div>
  );
}

export default Desktop;
