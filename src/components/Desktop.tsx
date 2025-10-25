import { useRef, useState, useLayoutEffect, useEffect, useCallback } from "react"
import { gsap } from "gsap"
import { Draggable } from "gsap/Draggable"
import ConnectForm from "./ConnectForm"
import ProjectsWindow from "./ProjectsWindow"
import AboutMeWindow from "./AboutMeWindow"
import NetworkingWindow from "./NetworkingWindow"
import Dock from "./Dock"
import DesktopApps from "./DesktopApps"
import { stickerMemo } from "../utils/stickerMemo"

gsap.registerPlugin(Draggable)

interface AppWindow {
  id: string
  name: string
  isOpen: boolean
  isMinimized: boolean
  size: "full" | 120
  zIndex: number
}

interface StickyNote {
  id: string
  x: number
  y: number
  width: number
  height: number
  zIndex: number
}

function Desktop() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      const mobile = typeof window !== 'undefined' && window.innerWidth <= 699
      setIsMobile(mobile)
      console.log("Mobile check:", mobile, "Window width:", window.innerWidth)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  const [openWindows, setOpenWindows] = useState<AppWindow[]>([
    { id: "connect-form", name: "connect", isOpen: false, isMinimized: false, size: 120, zIndex: 1 },
    { id: "projects", name: "projects", isOpen: false, isMinimized: false, size: 120, zIndex: 1 },
    { id: "about-me", name: "about me", isOpen: false, isMinimized: false, size: 120, zIndex: 1 },
    { id: "networking", name: "networking", isOpen: false, isMinimized: false, size: 120, zIndex: 1 }
  ])

  const [stickyNote, setStickyNote] = useState<StickyNote>({
    id: "sticky-note",
    x: 0,
    y: 60,
    width: 320,
    height: 280,
    zIndex: 1
  })

  // 스티커 초기 위치 설정
  useEffect(() => {
    setStickyNote(prev => ({
      ...prev,
      x: window.innerWidth - 360
    }))
  }, [])

  const connectFormRef = useRef<HTMLDivElement | null>(null)
  const projectsWindowRef = useRef<HTMLDivElement | null>(null)
  const aboutMeWindowRef = useRef<HTMLDivElement | null>(null)
  const networkingWindowRef = useRef<HTMLDivElement | null>(null)
  const stickyNoteRef = useRef<HTMLDivElement | null>(null)

  const handleAppDoubleClick = (appName: string) => {
    console.log("handleAppDoubleClick - isMobile:", isMobile, "appName:", appName)

    if (isMobile) {
      console.log("Mobile mode - maximizing window")
      // 모바일에서는 최대화 + 맨 위로
      setOpenWindows(prev =>
        prev.map(win =>
          win.name === appName
            ? { ...win, isOpen: true, isMinimized: false, size: "full", zIndex: 9999 }
            : win
        )
      )
    } else {
      console.log("Desktop mode - normal window")
      // 데스크톱에서는 기본 설정
      setOpenWindows(prev =>
        prev.map(win =>
          win.name === appName ? { ...win, isOpen: true, isMinimized: false, size: 120 } : win
        )
      )
    }
  }

  const handleDockAppClick = (appName: string) => {
    console.log("handleDockAppClick - isMobile:", isMobile, "appName:", appName)
    if (isMobile) {
      console.log("Mobile mode - maximizing window from dock")
      // 모바일에서는 최대화 + 맨 위로
      setOpenWindows(prev =>
        prev.map(win =>
          win.name === appName
            ? { ...win, isOpen: true, isMinimized: false, size: "full", zIndex: 9999 }
            : win
        )
      )
    } else {
      console.log("Desktop mode - normal window from dock")
      // 데스크톱에서는 기본 설정
      setOpenWindows(prev =>
        prev.map(win =>
          win.name === appName ? { ...win, isOpen: true, isMinimized: false, size: 120 } : win
        )
      )
    }
  }

  const toggleWindow = (windowId: string) => {
    setOpenWindows(prev =>
      prev.map(win => {
        if (win.id === windowId) {
          const willOpen = !win.isOpen
          if (willOpen && isMobile) {
            // 모바일에서 열 때 최대화 + 맨 위로
            return { ...win, isOpen: true, size: "full", zIndex: 1000 }
          } else if (willOpen) {
            // 데스크톱에서 열 때 기본 크기
            return { ...win, isOpen: true, size: 120 }
          } else {
            // 닫을 때
            return { ...win, isOpen: false }
          }
        }
        return win
      })
    )
  }

  const toggleSize = (windowId: string) => {
    setOpenWindows(prev =>
      prev.map(win => {
        if (win.id === windowId) {
          const newSize: "full" | 120 = win.size === "full" ? 120 : "full"
          if (isMobile && newSize === "full") {
            // 모바일에서 최대화될 때 맨 위로
            return { ...win, size: "full", zIndex: 1000 }
          } else {
            // 그 외에는 기본 z-index
            return { ...win, size: newSize }
          }
        }
        return win
      })
    )
  }

  const bringToFront = useCallback((windowId: string) => {
    const maxZ = Math.max(
      ...openWindows.map(w => w.zIndex),
      stickyNote.zIndex
    )

    if (windowId === "sticky-note") {
      setStickyNote(prev => ({ ...prev, zIndex: maxZ + 1 }))
    } else {
      setOpenWindows(prev =>
        prev.map(win =>
          win.id === windowId ? { ...win, zIndex: maxZ + 1 } : win
        )
      )
    }
  }, [openWindows, stickyNote.zIndex])

  const connectFormWindow = openWindows.find(w => w.id === "connect-form")
  const projectsWindow = openWindows.find(w => w.id === "projects")
  const aboutMeWindow = openWindows.find(w => w.id === "about-me")
  const networkingWindow = openWindows.find(w => w.id === "networking")
  const activeAppNames = openWindows.filter(w => w.isOpen).map(w => w.name)
  const hasMaximizedWindow = openWindows.some(w => w.isOpen && w.size === "full")

  // 스티커 메모 드래그 기능
  useLayoutEffect(() => {
    if (stickyNoteRef.current) {
      const dragInstance = Draggable.create(stickyNoteRef.current, {
        type: "x,y",
        bounds: window,
        edgeResistance: 0.65,
        throwProps: true,
        zIndexBoost: false,
        onDragStart: function() {
          bringToFront("sticky-note")
        }
      })[0]

      return () => {
        dragInstance.kill()
      }
    }
  }, [])

  // 스티커 메모 리사이즈 기능
  useLayoutEffect(() => {
    if (stickyNoteRef.current) {
      const element = stickyNoteRef.current
      const resizeHandle = element.querySelector('.resize-handle') as HTMLElement

      if (resizeHandle) {
        let startWidth = 0
        let startHeight = 0
        let startX = 0
        let startY = 0

        const handleMouseDown = (e: MouseEvent) => {
          e.preventDefault()
          e.stopPropagation()

          const rect = element.getBoundingClientRect()
          startWidth = rect.width
          startHeight = rect.height
          startX = e.clientX
          startY = e.clientY

          document.body.style.cursor = 'nwse-resize'

          const handleMouseMove = (e: MouseEvent) => {
            const deltaX = e.clientX - startX
            const deltaY = e.clientY - startY

            const newWidth = Math.max(250, Math.min(window.innerWidth - 100, startWidth + deltaX))
            const newHeight = Math.max(200, Math.min(window.innerHeight - 100, startHeight + deltaY))

            setStickyNote(prev => ({
              ...prev,
              width: newWidth,
              height: newHeight
            }))
          }

          const handleMouseUp = () => {
            document.body.style.cursor = ''
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
          }

          document.addEventListener('mousemove', handleMouseMove)
          document.addEventListener('mouseup', handleMouseUp)
        }

        resizeHandle.addEventListener('mousedown', handleMouseDown)

        return () => {
          resizeHandle.removeEventListener('mousedown', handleMouseDown)
        }
      }
    }
  }, [])

  return (
    <div className="fixed inset-0 w-full h-screen text-black overflow-hidden bg-gradient-to-br from-gray-100 via-gray-100 to-gray-50">
      {/* 바탕화면 앱 아이콘 (왼쪽 세로 정렬) */}
      <DesktopApps onAppDoubleClick={handleAppDoubleClick} />

      {/* 스티커 메모 */}
      <div
        ref={stickyNoteRef}
        onMouseDown={() => bringToFront("sticky-note")}
        className="absolute cursor-move transition-shadow duration-200"
        style={{
          left: stickyNote.x,
          top: stickyNote.y,
          width: stickyNote.width,
          height: stickyNote.height,
          zIndex: stickyNote.zIndex
        }}
      >
        {/* 스티커 내용 */}
        <div
          className="bg-blue-50 p-3 border border-blue-100 text-xs text-gray-700 leading-relaxed whitespace-pre-line no-select"
        >
          {stickerMemo}
        </div>

      </div>

      {/* ConnectForm 윈도우 */}
      {connectFormWindow?.isOpen && !connectFormWindow.isMinimized && (
        <div onMouseDown={() => bringToFront("connect-form")} style={{ zIndex: connectFormWindow.zIndex }}>
          <ConnectForm
            ref={connectFormRef}
            size={connectFormWindow.size}
            onClose={() => toggleWindow("connect-form")}
            onToggleSize={() => toggleSize("connect-form")}
            isMobile={isMobile}
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
            isMobile={isMobile}
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
            isMobile={isMobile}
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
            isMobile={isMobile}
          />
        </div>
      )}

      {/* 맥 스타일 독(Dock) */}
      <div style={{ zIndex: 1 }}>
        <Dock activeApps={activeAppNames} onAppClick={handleDockAppClick} hasMaximizedWindow={hasMaximizedWindow} />
      </div>
    </div>
  );
}

export default Desktop;
