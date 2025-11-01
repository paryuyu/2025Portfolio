import { useState, useLayoutEffect, useRef, useEffect, useCallback } from "react"
import { gsap } from "gsap"
import { Draggable } from "gsap/Draggable"
import { apps } from "../utils/apps"
import ImageWithSkeleton from "./ImageWithSkeleton"

gsap.registerPlugin(Draggable)

interface DesktopAppsProps {
  onAppDoubleClick: (appName: string) => void
}

function DesktopApps({ onAppDoubleClick }: DesktopAppsProps) {
  const [selectedApp, setSelectedApp] = useState<string | null>(null)
  const appRefs = useRef<(HTMLDivElement | null)[]>([])
  const dragInstances = useRef<Draggable[][]>([])
  const lastTapTimes = useRef<{ [key: string]: { time: number; x: number; y: number } }>({})
  const tapTimeouts = useRef<{ [key: string]: ReturnType<typeof setTimeout> }>({})

  // 더블탭 핸들러 (모바일용)
  const handleDoubleTap = useCallback((appName: string, touchEvent?: TouchEvent) => {
    const now = Date.now()
    const DOUBLE_TAP_DELAY = 300 // 더블탭 감지 시간 (300ms)
    const DOUBLE_TAP_RADIUS = 30 // 더 엄격한 위치 확인 (30px)

    let touch: Touch | null = null
    if (touchEvent && touchEvent.touches.length > 0) {
      touch = touchEvent.touches[0]
    }

    // 이전 탭 정보 확인
    const lastTap = lastTapTimes.current[appName]
    if (lastTap && (now - lastTap.time) < DOUBLE_TAP_DELAY) {
      // 위치도 확인 (이전 탭과 30px 이내)
      if (touch) {
        const distance = Math.sqrt(
          Math.pow(touch.clientX - lastTap.x, 2) +
          Math.pow(touch.clientY - lastTap.y, 2)
        )
        if (distance <= DOUBLE_TAP_RADIUS) {
          // 더블탭 감지됨 - 타임아웃 취소하고 앱 실행
          if (tapTimeouts.current[appName]) {
            clearTimeout(tapTimeouts.current[appName])
            delete tapTimeouts.current[appName]
          }
          // 더블탭 실행 - 선택 상태는 변경하지 않음
          onAppDoubleClick(appName)
          delete lastTapTimes.current[appName]
          return
        }
      }
    }

    // 첫 번째 탭 - 타임아웃 설정
    lastTapTimes.current[appName] = {
      time: now,
      x: touch?.clientX || 0,
      y: touch?.clientY || 0
    }

    tapTimeouts.current[appName] = setTimeout(() => {
      // 타임아웃 내에 두 번째 탭이 없으면 일반 클릭으로 처리
      delete lastTapTimes.current[appName]
      delete tapTimeouts.current[appName]
      // 일반 클릭은 선택만 하고 드래그와 충돌하지 않도록 즉시 실행
      setSelectedApp(appName)
    }, DOUBLE_TAP_DELAY)
  }, [onAppDoubleClick]);

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
          force3D: false,
          onPress: function() {
            // 더블탭 감지 (300ms 내에 이전 탭이 있었는지 확인)
            const now = Date.now()
            const lastTap = lastTapTimes.current[apps[index].name]

            if (lastTap && (now - lastTap.time) < 300) {
              // 더블탭 감지됨 - 드래그 시작하지 않음
              return
            }

            // 일반 클릭/드래그 - 선택 상태로 만들기
            setSelectedApp(apps[index].name)
          },
          onDragStart: function() {
            // 드래그 시작 시 트랜지션 제거
            gsap.set(this.target, { transition: 'none' })
          },
          onDrag: function() {
            // 드래그 중에도 z-index 변경 방지
            gsap.set(this.target, { zIndex: 1 })
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
    <div className="absolute" style={{ width: '100px', height: '100%', top: '56px', left: '16px', zIndex: 1 }}>
      {apps.map((app, index) => (
        <div
          key={app.name}
          ref={(el) => { appRefs.current[index] = el }}
          className={`flex flex-col items-center rounded-lg cursor-move ${
            selectedApp === app.name ? "" : "hover:bg-white/10"
          }`}
          onClick={(e) => {
            // 더블탭이 발생했다면 클릭 이벤트 무시
            if (e.detail === 0) return
            setSelectedApp(app.name)
          }}
          onDoubleClick={(e) => {
            // 더블탭이 최근에 발생했는지 확인
            const now = Date.now()
            const lastTap = lastTapTimes.current[app.name]
            if (lastTap && (now - lastTap.time) < 300) { // 더블탭 감지 시간과 맞춤 (300ms)
              e.preventDefault()
              return
            }
            onAppDoubleClick(app.name)
          }}
          onTouchStart={(e) => {
            handleDoubleTap(app.name, e.nativeEvent as TouchEvent)
          }}
          style={{
            width: '52px',
            position: 'absolute',
            top: `${index * 92}px`,
            left: 8,
            willChange: 'transform',
            zIndex: 1
          }}
        >
          <div className="pointer-events-none">
            <ImageWithSkeleton
              src={app.image}
              alt={app.name}
              className={`${selectedApp === app.name ? "grayscale-50" : ""} w-full h-full object-cover`}
              wrapperClassName="w-full h-full"
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

