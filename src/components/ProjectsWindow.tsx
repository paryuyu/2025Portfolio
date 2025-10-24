import { useState, forwardRef, useLayoutEffect } from "react"
import { gsap } from "gsap"
import { Draggable } from "gsap/Draggable"
import { projectInformation } from "../utils/projects"

gsap.registerPlugin(Draggable)

interface ProjectsWindowProps {
  size: "full" | 120
  onClose: () => void
  onToggleSize: () => void
}

const ProjectsWindow = forwardRef<HTMLDivElement, ProjectsWindowProps>(({ size, onClose, onToggleSize }, ref) => {
  const [selectedProject, setSelectedProject] = useState(projectInformation[0])
  const [isResizing, setIsResizing] = useState(false)

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
          y: 0,
          padding: 0,
          width: "100vw",
          height: "calc(100vh - 44px)",
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
          width: "600px",
          height: "500px",
          ease: "power2.out"
        })
      }
    }
  }, [ref, size])

  return (
    <div
      ref={ref}
      className="absolute z-4"
      style={{
        padding: size === "full" ? "0" : "24px",
        width: size === "full" ? "100vw" : "600px",
        height: size === "full" ? "calc(100vh - 44px)" : "500px",
        top: size === "full" ? "0" : "16px",
        left: size === "full" ? "0" : "16px",
        transform: "none"
      }}
    >
      {/* 맥 스타일 윈도우 바 */}
      <div className="drag-handle flex items-center gap-2 bg-gray-100 p-3 rounded-t-lg border-b border-b-gray-200 cursor-grab active:cursor-grabbing">
        <div className="flex items-center gap-2 text-xs">
          <div
            className="bg-red-500 w-3 h-3 rounded-full cursor-pointer hover:bg-red-600 transition-colors"
            onClick={onClose}
            title="닫기"
          ></div>
          <div className="bg-gray-300 w-3 h-3 rounded-full cursor-pointer hover:bg-gray-400 transition-colors" title="최소화"></div>
          <div
            className="bg-green-500 w-3 h-3 rounded-full cursor-pointer hover:bg-green-600 transition-colors"
            onClick={onToggleSize}
            title="크기 조절"
          ></div>
        </div>
        <span className="text-black font-light text-sm">Projects</span>
      </div>

      {/* 프로젝트 내용 */}
      <div className="bg-white rounded-b-lg shadow-2xl flex overflow-hidden" style={{ height: "calc(100% - 44px)" }}>
        {/* 왼쪽 사이드바 - 프로젝트 목록 */}
        <div className="w-64 bg-gray-50 border-r border-gray-200 overflow-y-auto">
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-600 mb-3">프로젝트 목록</h3>
            <div className="space-y-2">
              {projectInformation.map((project) => (
                <div
                  key={project.projectNo}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedProject.projectNo === project.projectNo
                      ? "bg-blue-500 text-white shadow-md"
                      : "bg-white hover:bg-gray-100 text-gray-700"
                  }`}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="font-semibold text-sm mb-1">{project.projectName}</div>
                  <div className="text-xs opacity-80">
                    {typeof project.period.start === 'string' 
                      ? project.period.start 
                      : project.period.start.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit' })}
                    {' ~ '}
                    {typeof project.period.end === 'string' 
                      ? project.period.end 
                      : project.period.end.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit' })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 오른쪽 - 프로젝트 상세 정보 */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl">
            {/* 프로젝트 헤더 */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {selectedProject.projectName}
              </h2>
              <p className="text-gray-600 mb-4">{selectedProject.description}</p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="font-semibold">주요 역할:</span>
                <span>{selectedProject.mainRole}</span>
              </div>
            </div>

            {/* 썸네일 */}
            {selectedProject.thumnail && (
              <div className="mb-6 rounded-lg overflow-hidden shadow-md">
                <img 
                  src={selectedProject.thumnail} 
                  alt={selectedProject.projectName}
                  className="w-full max-h-[400px] object-contain p-8"
                />
              </div>
            )}

            {/* 사용 기술 스택 */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">기술 스택</h3>
              <div className="flex flex-wrap gap-2">
                {selectedProject.usedStack.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* 주요 기여 */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">주요 기여</h3>
              <ul className="space-y-2">
                {selectedProject.contribution.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 프로젝트 비디오 */}
            {selectedProject.projectVideoResources && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">프로젝트 데모</h3>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <video 
                    src={selectedProject.projectVideoResources} 
                    controls
                    className="w-full"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            )}

            {/* 프로젝트 기간 */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-600 mb-2">프로젝트 기간</h3>
              <p className="text-gray-700">
                {typeof selectedProject.period.start === 'string' 
                  ? selectedProject.period.start 
                  : selectedProject.period.start.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
                {' ~ '}
                {typeof selectedProject.period.end === 'string' 
                  ? selectedProject.period.end 
                  : selectedProject.period.end.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 리사이즈 핸들 */}
      {size !== "full" && (
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

ProjectsWindow.displayName = 'ProjectsWindow'

export default ProjectsWindow
