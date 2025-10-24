import { useState, useLayoutEffect, useRef, useEffect } from "react"
import { gsap } from "gsap"
import { Draggable } from "gsap/Draggable"
import { apps } from "../utils/apps"

gsap.registerPlugin(Draggable)

interface DesktopAppsProps {
  onAppDoubleClick: (appName: string) => void
}

function DesktopApps({ onAppDoubleClick }: DesktopAppsProps) {
  const [selectedApp, setSelectedApp] = useState<string | null>(null)
  const appRefs = useRef<(HTMLDivElement | null)[]>([])
  const dragInstances = useRef<Draggable[][]>([])

  // 외부 클릭 시 선택 해제
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      const isAppClick = appRefs.current.some(ref => ref?.contains(target))

      if (!isAppClick) {
        setSelectedApp(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useLayoutEffect(() => {
    // 모든 기존 드래그 인스턴스 정리
    dragInstances.current.forEach(instances => {
      instances.forEach(instance => instance.kill())
    })
    dragInstances.current = []

    // 각 앱 아이콘에 드래그 기능 추가
    appRefs.current.forEach((appRef, index) => {
      if (appRef) {
        const dragInstance = Draggable.create(appRef, {
          type: "x,y",
          bounds: window,
          edgeResistance: 0.65,
          throwProps: true,
          zIndexBoost: false,
          onPress: function() {
            // 드래그 시작 시 선택 상태로 만들기
            setSelectedApp(apps[index].name)
          },
          onDragStart: function() {
            // 드래그 시작 시 트랜지션 제거
            gsap.set(this.target, { transition: 'none' })
          }
        })
        dragInstances.current[index] = dragInstance
      }
    })

    return () => {
      // 컴포넌트 언마운트 시 정리
      dragInstances.current.forEach(instances => {
        instances.forEach(instance => instance.kill())
      })
    }
  }, [])

  return (
    <div className="absolute z-0" style={{ width: '100px', height: '100%', top: '56px', left: '16px' }}>
      {apps.map((app, index) => (
        <div
          key={app.name}
          ref={(el) => { appRefs.current[index] = el }}
          className={`flex flex-col items-center gap-1 p-2 rounded-lg cursor-move ${
            selectedApp === app.name ? "bg-blue-500/30" : "hover:bg-white/10"
          }`}
          onClick={() => setSelectedApp(app.name)}
          onDoubleClick={() => onAppDoubleClick(app.name)}
          style={{
            width: '80px',
            position: 'absolute',
            top: `${index * 116}px`,
            left: 0,
            willChange: 'transform'
          }}
        >
          <div className="pointer-events-none">
            <img
              src={app.image}
              alt={app.name}
              className={`${selectedApp === app.name ? "grayscale-50" : ""} w-full h-full object-cover`}
            />
          </div>
          <span className={`${selectedApp === app.name ? "font-semibold" : ""} text-xs text-center leading-tight pointer-events-none`}>
            {app.name}
          </span>
        </div>
      ))}
    </div>
  )
}

export default DesktopApps

