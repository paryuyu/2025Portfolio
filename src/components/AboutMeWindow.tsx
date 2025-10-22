import { forwardRef, useLayoutEffect, useState } from "react"
import { gsap } from "gsap"
import { Draggable } from "gsap/Draggable"

gsap.registerPlugin(Draggable)

interface AboutMeWindowProps {
  size: "full" | 120
  onClose: () => void
  onToggleSize: () => void
}

const AboutMeWindow = forwardRef<HTMLDivElement, AboutMeWindowProps>(({ size, onClose, onToggleSize }, ref) => {
  const [isResizing, setIsResizing] = useState(false)

  // 더미 커리어 데이터
  const careerData = [
    {
      company: "Tech Corp",
      position: "Senior Frontend Developer",
      period: "2022.03 - Present",
      description: "React, TypeScript 기반 웹 애플리케이션 개발 및 팀 리딩"
    },
    {
      company: "Digital Agency",
      position: "Frontend Developer",
      period: "2020.01 - 2022.02",
      description: "Vue.js를 활용한 다양한 클라이언트 프로젝트 수행"
    },
    {
      company: "Startup Inc",
      position: "Junior Developer",
      period: "2018.06 - 2019.12",
      description: "웹 서비스 개발 및 유지보수"
    }
  ]

  const skills = [
    { category: "Frontend", items: ["React", "TypeScript", "Vue.js", "Next.js", "Tailwind CSS"] },
    { category: "Backend", items: ["Node.js", "Express", "NestJS", "PostgreSQL"] },
    { category: "DevOps", items: ["Docker", "AWS", "Github Actions", "Vercel"] },
    { category: "Tools", items: ["Git", "Figma", "Notion", "Slack"] }
  ]

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

      // Resize functionality
      let startWidth = 0
      let startHeight = 0
      let startX = 0
      let startY = 0

      const handleMouseDown = (e: MouseEvent) => {
        const rect = element.getBoundingClientRect()
        const edge = 10
        
        const isRight = e.clientX >= rect.right - edge
        const isBottom = e.clientY >= rect.bottom - edge
        
        if (isRight || isBottom) {
          e.preventDefault()
          e.stopPropagation()
          setIsResizing(true)
          
          startWidth = rect.width
          startHeight = rect.height
          startX = e.clientX
          startY = e.clientY
          
          document.body.style.cursor = isRight && isBottom ? 'nwse-resize' : 
                                       isRight ? 'ew-resize' : 'ns-resize'
          
          const handleMouseMove = (e: MouseEvent) => {
            const deltaX = e.clientX - startX
            const deltaY = e.clientY - startY
            
            if (isRight) {
              const newWidth = Math.max(400, Math.min(window.innerWidth - 100, startWidth + deltaX))
              element.style.width = `${newWidth}px`
            }
            if (isBottom) {
              const newHeight = Math.max(300, Math.min(window.innerHeight - 100, startHeight + deltaY))
              element.style.height = `${newHeight}px`
            }
          }
          
          const handleMouseUp = () => {
            setIsResizing(false)
            document.body.style.cursor = ''
            element.style.cursor = ''
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
          }
          
          document.addEventListener('mousemove', handleMouseMove)
          document.addEventListener('mouseup', handleMouseUp)
        }
      }

      const handleMouseMove = (e: MouseEvent) => {
        if (isResizing) return
        
        const rect = element.getBoundingClientRect()
        const edge = 10
        
        const isRight = e.clientX >= rect.right - edge
        const isBottom = e.clientY >= rect.bottom - edge
        
        if (isRight && isBottom) {
          element.style.cursor = 'nwse-resize'
        } else if (isRight) {
          element.style.cursor = 'ew-resize'
        } else if (isBottom) {
          element.style.cursor = 'ns-resize'
        } else {
          element.style.cursor = ''
        }
      }

      element.addEventListener('mousedown', handleMouseDown)
      element.addEventListener('mousemove', handleMouseMove)

      return () => {
        dragInstance.kill()
        element.removeEventListener('mousedown', handleMouseDown)
        element.removeEventListener('mousemove', handleMouseMove)
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
          top: "40px",
          x: 0,
          y: 0,
          padding: 0,
          width: "100vw",
          height: "calc(100vh - 40px - 96px)",
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

  return (
    <div
      ref={ref}
      className="absolute z-4"
      style={{
        padding: size === "full" ? "0" : "24px",
        width: size === "full" ? "100vw" : "700px",
        height: size === "full" ? "calc(100vh - 40px - 96px)" : "600px",
        top: size === "full" ? "40px" : "16px",
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
        <span className="text-black font-light text-sm">About Me</span>
      </div>

      {/* 컨텐츠 영역 */}
      <div className="bg-white p-6 rounded-b-lg shadow-2xl overflow-y-auto" style={{ height: "calc(100% - 52px)" }}>
        {/* 프로필 섹션 */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Profile</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700 mb-2"><strong>Name:</strong> Yuyu</p>
            <p className="text-gray-700 mb-2"><strong>Role:</strong> Full Stack Developer</p>
            <p className="text-gray-700 mb-2"><strong>Location:</strong> Seoul, South Korea</p>
            <p className="text-gray-700"><strong>Email:</strong> yuyu@example.com</p>
          </div>
        </div>

        {/* 커리어 섹션 */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Career</h2>
          <div className="space-y-4">
            {careerData.map((career, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="text-lg font-semibold text-gray-800">{career.company}</h3>
                <p className="text-sm text-gray-600">{career.position}</p>
                <p className="text-xs text-gray-500 mb-2">{career.period}</p>
                <p className="text-sm text-gray-700">{career.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 스킬 섹션 */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.map((skillGroup, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((item, idx) => (
                    <span
                      key={idx}
                      className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 border border-gray-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
})

AboutMeWindow.displayName = 'AboutMeWindow'

export default AboutMeWindow
