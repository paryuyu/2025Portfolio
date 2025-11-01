import { useRef, useState, useLayoutEffect, useEffect, useCallback } from "react"
import { gsap } from "gsap"
import { Draggable } from "gsap/Draggable"
import ConnectForm from "./ConnectForm"
import ProjectsWindow from "./ProjectsWindow"
import AboutMeWindow from "./AboutMeWindow"
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
    { id: "about-me", name: "about me", isOpen: false, isMinimized: false, size: 120, zIndex: 1 }
  ])

  const [stickyNote, setStickyNote] = useState<StickyNote>({
    id: "sticky-note",
    x: 0,
    y: 60, // 기본값 (useLayoutEffect에서 즉시 올바른 위치로 업데이트)
    width: 320,
    height: 280,
    zIndex: 1
  })

  // 스티커 위치 업데이트 - isMobile 변경 시에만 실행
  useLayoutEffect(() => {
    if (typeof window === 'undefined' || !window.innerWidth) return

    if (isMobile) {
      // 모바일: 하단 중앙에 위치, footer 위쪽에 배치
      setStickyNote(prev => ({
        ...prev,
        x: Math.max(0, (window.innerWidth - 280) / 2), // 중앙 정렬 (음수 방지)
        y: Math.max(60, window.innerHeight - 400), // footer 위쪽에 배치
        width: 280,
        height: 100 
      }))
    } else {
      // 데스크톱: 우측 상단에 위치
      setStickyNote(prev => ({
        ...prev,
        x: Math.max(0, window.innerWidth - 360),
        y: 60,
        width: 320,
        height: 280
      }))
    }
  }, [isMobile]) // isMobile 변경 시에만 실행

  const connectFormRef = useRef<HTMLDivElement | null>(null)
  const projectsWindowRef = useRef<HTMLDivElement | null>(null)
  const aboutMeWindowRef = useRef<HTMLDivElement | null>(null)
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
  }, [openWindows]) // stickyNote.zIndex 제거

  const connectFormWindow = openWindows.find(w => w.id === "connect-form")
  const projectsWindow = openWindows.find(w => w.id === "projects")
  const aboutMeWindow = openWindows.find(w => w.id === "about-me")
  
  const activeAppNames = openWindows.filter(w => w.isOpen).map(w => w.name)
  const hasMaximizedWindow = openWindows.some(w => w.isOpen && w.size === "full")

  // 스티커 메모 드래그 기능
  useLayoutEffect(() => {
    if (stickyNoteRef.current && typeof window !== 'undefined') {
      const dragInstance = Draggable.create(stickyNoteRef.current, {
        type: "x,y",
        bounds: window, // 항상 window bounds 사용
        edgeResistance: 0.5,
        throwProps: true,
        zIndexBoost: false,
        inertia: true,
        onDragStart: function() {
          bringToFront("sticky-note")
        }
      })[0]

      return () => {
        if (dragInstance) {
          dragInstance.kill()
        }
      }
    }
  }, [bringToFront]) // isMobile 제거 - bounds가 window로 통일됨

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

            // 모바일과 데스크톱에 따라 다른 크기 제한
            const minWidth = isMobile ? 200 : 250
            const minHeight = isMobile ? 120 : 200 // 모바일에서 더 작게
            const maxWidth = isMobile ? window.innerWidth - 40 : window.innerWidth - 100
            const maxHeight = isMobile ? window.innerHeight - 100 : window.innerHeight - 100 // footer 고려

            const newWidth = Math.max(minWidth, Math.min(maxWidth, startWidth + deltaX))
            const newHeight = Math.max(minHeight, Math.min(maxHeight, startHeight + deltaY))

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
  }, [isMobile])

  return (
    <div className="fixed inset-0 w-full h-screen text-black overflow-hidden bg-gradient-to-br from-gray-100 via-gray-100 to-gray-50">
      {/* 바탕화면 앱 아이콘 (왼쪽 세로 정렬) */}
      <DesktopApps onAppDoubleClick={handleAppDoubleClick} />

      {/* 스티커 메모 */}
      <div
        ref={stickyNoteRef}
        onMouseDown={() => bringToFront("sticky-note")}
        className="absolute cursor-move transition-all duration-300 ease-out"
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
        <div onMouseDownCapture={() => bringToFront("connect-form")} style={{ zIndex: connectFormWindow.zIndex }}>
          <ConnectForm
            ref={connectFormRef}
            size={connectFormWindow.size}
            zIndex={connectFormWindow.zIndex}
            onClose={() => toggleWindow("connect-form")}
            onToggleSize={() => toggleSize("connect-form")}
            isMobile={isMobile}
          />
        </div>
      )}

      {/* ProjectsWindow 윈도우 */}
      {projectsWindow?.isOpen && !projectsWindow.isMinimized && (
        <div onMouseDownCapture={() => bringToFront("projects")} style={{ zIndex: projectsWindow.zIndex }}>
          <ProjectsWindow
            ref={projectsWindowRef}
            size={projectsWindow.size}
            zIndex={projectsWindow.zIndex}
            onFocusCapture={() => bringToFront("projects")}
            onClose={() => toggleWindow("projects")}
            onToggleSize={() => toggleSize("projects")}
            isMobile={isMobile}
          />
        </div>
      )}

      {/* AboutMeWindow 윈도우 */}
      {aboutMeWindow?.isOpen && !aboutMeWindow.isMinimized && (
        <div onMouseDownCapture={() => bringToFront("about-me")} style={{ zIndex: aboutMeWindow.zIndex }}>
          <AboutMeWindow
            ref={aboutMeWindowRef}
            size={aboutMeWindow.size}
            zIndex={aboutMeWindow.zIndex}
            onClose={() => toggleWindow("about-me")}
            onToggleSize={() => toggleSize("about-me")}
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
