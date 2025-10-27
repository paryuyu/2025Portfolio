import { forwardRef, useLayoutEffect, useState } from "react"
import { gsap } from "gsap"
import { Draggable } from "gsap/Draggable"
import { networkingEvents } from "../utils/networking"

gsap.registerPlugin(Draggable)

interface NetworkingWindowProps {
  size: "full" | 120
  onClose: () => void
  onToggleSize: () => void
  isMobile?: boolean
}

const NetworkingWindow = forwardRef<HTMLDivElement, NetworkingWindowProps>(({ size, onClose, onToggleSize, isMobile }, ref) => {
  const [selectedEvent, setSelectedEvent] = useState(networkingEvents[0])
  const [isResizing, setIsResizing] = useState(false)
  // 모바일 최대화 상태에서만 사이드바 토글 상태 사용 (기본적으로 메인 컨텐츠가 보임)
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false)

  // 드래그 및 리사이즈 기능 초기화
  useLayoutEffect(() => {
    if (ref && typeof ref === 'object' && ref.current && size !== "full") {
      const element = ref.current
      const dragHandle = element.querySelector('.drag-handle')
      
      // Window dragging
      const dragInstance = Draggable.create(element, {
        type: "x,y",
        bounds: window,
        allowContextMenu: true,
        trigger: dragHandle,
      })[0]

      // Resize functionality - 우측 하단 핸들만 사용
      const resizeHandle = element.querySelector('.resize-handle') as HTMLElement
      
      if (resizeHandle) {
        let startWidth = 0
        let startHeight = 0
        let startX = 0
        let startY = 0

        const handleMouseDown = (e: MouseEvent) => {
          e.preventDefault()
          e.stopPropagation()
          setIsResizing(true)
          
          const rect = element.getBoundingClientRect()
          startWidth = rect.width
          startHeight = rect.height
          startX = e.clientX
          startY = e.clientY
          
          document.body.style.cursor = 'nwse-resize'
          
          const handleMouseMove = (e: MouseEvent) => {
            const deltaX = e.clientX - startX
            const deltaY = e.clientY - startY
            
            const newWidth = Math.max(400, Math.min(window.innerWidth - 100, startWidth + deltaX))
            const newHeight = Math.max(300, Math.min(window.innerHeight - 100, startHeight + deltaY))
            
            element.style.width = `${newWidth}px`
            element.style.height = `${newHeight}px`
          }
          
          const handleMouseUp = () => {
            setIsResizing(false)
            document.body.style.cursor = ''
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
          }
          
          document.addEventListener('mousemove', handleMouseMove)
          document.addEventListener('mouseup', handleMouseUp)
        }

        resizeHandle.addEventListener('mousedown', handleMouseDown)

        return () => {
          dragInstance.kill()
          resizeHandle.removeEventListener('mousedown', handleMouseDown)
        }
      }

      return () => {
        dragInstance.kill()
      }
    }
  }, [ref, size, isResizing])

  // 전체화면/일반 크기 전환 애니메이션
  useLayoutEffect(() => {
    if (ref && typeof ref === 'object' && ref.current) {
      if (size === "full") {
        gsap.to(ref.current, {
          duration: 0.3,
          left: 0,
          top: 0,
          x: 0,
          y: '40px',
          padding: 0,
          width: "100vw",
          height: `calc(100vh - ${isMobile ? 86 : 44}px)`,
          ease: "power2.out"
        })
      } else {
        gsap.to(ref.current, {
          duration: 0.3,
          left: "16px",
          top: "16px",
          x: 0,
          y: 0,
          padding: "24px",
          width: "700px",
          height: "600px",
          ease: "power2.out"
        })
      }
    }
  }, [ref, size])

  const handleToggleSidebar = () => {
    setSidebarIsOpen(!sidebarIsOpen)
  }

  const handleEventSelect = (event: any) => {
    setSelectedEvent(event)
    // 모바일 최대화 상태에서만 이벤트 선택 시 자동으로 사이드바 닫기
    if (isMobile && size === "full") {
      setSidebarIsOpen(false)
    }
  }

  return (
    <div
      ref={ref}
      className="absolute z-4"
      style={{
        padding: size === "full" ? "0" : "24px",
        width: size === "full" ? "100vw" : "700px",
        height: size === "full" ? `calc(100vh - ${isMobile ? 86 : 44}px)` : "600px",
        top: size === "full" ? "0" : "16px",
        left: size === "full" ? "0" : "16px",
        transform: "none"
      }}
    >
      {/* 맥 스타일 윈도우 바 */}
      <div className="drag-handle flex items-center justify-between bg-gray-100 p-3 rounded-t-lg border-b border-b-gray-200 cursor-grab active:cursor-grabbing">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-xs">
            <div
              className="bg-red-500 w-3 h-3 rounded-full cursor-pointer hover:bg-red-600 transition-colors"
              onClick={onClose}
              title="닫기"
              aria-label="네트워킹 창 닫기"
            ></div>
            <div className="bg-gray-300 w-3 h-3 rounded-full cursor-pointer hover:bg-gray-400 transition-colors" title="최소화" aria-label="최소화"></div>
            <div
              className={`${isMobile ? 'bg-gray-300' : 'bg-green-500'} w-3 h-3 rounded-full cursor-pointer hover:bg-green-600 transition-colors`}
              onClick={isMobile ? undefined : onToggleSize}
              title="크기 조절"
              aria-label="창 크기 조절"
            ></div>
          </div>
          <span className="text-black font-light text-sm">Networking Events</span>
        </div>

        {/* 모바일 최대화 시 사이드바 토글 버튼 */}
        {size === "full" && isMobile && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleToggleSidebar()
            }}
            className="sidebar-toggle-button flex items-center gap-1 px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-xs transition-all duration-200"
            title={sidebarIsOpen ? "사이드바 접기" : "사이드바 펼치기"}
            aria-label={sidebarIsOpen ? "이벤트 목록 사이드바 접기" : "이벤트 목록 사이드바 펼치기"}
            aria-expanded={sidebarIsOpen}
          >
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${sidebarIsOpen ? '' : 'rotate-180'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span>{sidebarIsOpen ? '접기' : '펼치기'}</span>
          </button>
        )}
      </div>

      {/* 네트워킹 이벤트 내용 */}
      <div className="bg-white rounded-b-lg shadow-2xl overflow-hidden" style={{ height: "calc(100% - 44px)" }}>
        {/* 모바일 최대화 상태에서 폴드형 사이드바 */}
        {size === "full" && isMobile ? (
          <div className="relative w-full h-full">
            {/* 메인 컨텐츠 (기본적으로 보임) */}
            <div
              className={`mobile-main mobile-sidebar-transition absolute inset-0 overflow-y-auto p-6 pb-[66px] ${
                !sidebarIsOpen
                  ? 'main-slide-in'
                  : 'main-slide-out pointer-events-none'
              }`}
              role="main"
              aria-label="이벤트 상세 정보"
              aria-hidden={sidebarIsOpen}
            >
              <div className="max-w-3xl">
                {/* 이벤트 헤더 */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {selectedEvent.title}
                    </h2>
                    <button
                      onClick={handleToggleSidebar}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="이벤트 목록 보기"
                      aria-label="이벤트 목록 사이드바 열기"
                    >
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">📅</span>
                      <span>{selectedEvent.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">📍</span>
                      <span>{selectedEvent.location}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{selectedEvent.description}</p>
                </div>

                {/* 주요 하이라이트 */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">주요 하이라이트</h3>
                  <ul className="space-y-2">
                    {selectedEvent.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">✓</span>
                        <span className="text-gray-700 text-sm leading-relaxed">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 추가 정보 */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-semibold text-gray-600 mb-2">네트워킹 성과</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    다양한 분야의 전문가들과 교류하며 실무 경험을 공유하고,
                    최신 기술 트렌드에 대한 인사이트를 얻었습니다.
                    이러한 네트워킹 활동을 통해 개발자로서의 시야를 넓히고
                    협업 기회를 발굴할 수 있었습니다.
                  </p>
                </div>
              </div>
            </div>

            {/* 사이드바 (열려있을 때만 표시) */}
            <div
              className={`mobile-sidebar mobile-sidebar-transition absolute inset-0 bg-gray-50 overflow-y-auto ${
                sidebarIsOpen
                  ? 'sidebar-slide-in'
                  : 'sidebar-slide-out pointer-events-none'
              }`}
              role="region"
              aria-label="이벤트 목록"
              aria-hidden={!sidebarIsOpen}
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-600">이벤트 목록</h3>
                  <button
                    onClick={handleToggleSidebar}
                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                    title="사이드바 접기"
                    aria-label="사이드바 접기"
                  >
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                </div>
                <div className="space-y-2">
                  {networkingEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`event-item p-3 rounded-lg cursor-pointer ${
                        selectedEvent.id === event.id
                          ? "bg-blue-500 text-white shadow-md"
                          : "bg-white hover:bg-gray-100 text-gray-700"
                      }`}
                      onClick={() => handleEventSelect(event)}
                      role="button"
                      tabIndex={0}
                      aria-label={`${event.title} 이벤트 선택`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          handleEventSelect(event)
                        }
                      }}
                    >
                      <div className="font-semibold text-sm mb-1">{event.title}</div>
                      <div className="text-xs opacity-80">{event.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          // 데스크톱 또는 일반 모드 - 기존 레이아웃
          <>
            {/* 이벤트 목록 */}
            <div className="w-1/3 bg-gray-50 border-r border-gray-200 overflow-y-auto">
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-600 mb-3">이벤트 목록</h3>
                <div className="space-y-2">
                  {networkingEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`event-item p-3 rounded-lg cursor-pointer ${
                        selectedEvent.id === event.id
                          ? "bg-blue-500 text-white shadow-md"
                          : "bg-white hover:bg-gray-100 text-gray-700"
                      }`}
                      onClick={() => setSelectedEvent(event)}
                      role="button"
                      tabIndex={0}
                      aria-label={`${event.title} 이벤트 선택`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          setSelectedEvent(event)
                        }
                      }}
                    >
                      <div className="font-semibold text-sm mb-1">{event.title}</div>
                      <div className="text-xs opacity-80">{event.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 이벤트 상세 정보 */}
            <div className={`flex-1 p-6 overflow-y-auto ${size === "full" && isMobile ? 'pb-[66px]' : ''}`}>
              <div className="max-w-3xl">
                {/* 이벤트 헤더 */}
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {selectedEvent.title}
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">📅</span>
                      <span>{selectedEvent.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">📍</span>
                      <span>{selectedEvent.location}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{selectedEvent.description}</p>
                </div>

                {/* 주요 하이라이트 */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">주요 하이라이트</h3>
                  <ul className="space-y-2">
                    {selectedEvent.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">✓</span>
                        <span className="text-gray-700 text-sm leading-relaxed">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 추가 정보 */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-semibold text-gray-600 mb-2">네트워킹 성과</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    다양한 분야의 전문가들과 교류하며 실무 경험을 공유하고,
                    최신 기술 트렌드에 대한 인사이트를 얻었습니다.
                    이러한 네트워킹 활동을 통해 개발자로서의 시야를 넓히고
                    협업 기회를 발굴할 수 있었습니다.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* 리사이즈 핸들 */}
      {size !== "full" && !isMobile && (
        <div
          className="resize-handle absolute w-8 h-8 cursor-se-resize flex items-center justify-center"
          style={{ 
            bottom: "-28px",
            right: "16px",
            zIndex: 100
          }}
        >
        </div>
      )}
    </div>
  )
})

NetworkingWindow.displayName = 'NetworkingWindow'

export default NetworkingWindow
