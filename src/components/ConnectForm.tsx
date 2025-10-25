import { useState, forwardRef, useLayoutEffect } from "react"
import { gsap } from "gsap"
import { Draggable } from "gsap/Draggable"
import ky from "ky"

gsap.registerPlugin(Draggable)

interface ConnectFormProps {
  size: "full" | 120
  onClose: () => void
  onToggleSize: () => void
  isMobile?: boolean
}

const ConnectForm = forwardRef<HTMLDivElement, ConnectFormProps>(({ size, onClose, onToggleSize, isMobile }, ref) => {
  const [values, setValues] = useState({
    company: "",
    name: "",
    mail: "",
    phone: "",
    content: ""
  })

  const [isResizing, setIsResizing] = useState(false)

  const handleText = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = evt.target.value
    const name = evt.target.name

    setValues(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault()
    const url = import.meta.env.VITE_GOOGLE_CHAT

    const message = `
📩 새 문의가 도착했습니다!
🏢 소속: ${values.company || "소속없음"}
👤 성함: ${values.name || "성함없음"}
📧 메일: ${values.mail || "메일없음"}
📱 연락처: ${values.phone || "연락처없음"}
💬 문의 내용:
${values.content || "문의내용없음"}
`

    try {
      await ky
        .post(url, {
          json: { text: message },
          headers: { "Content-Type": "application/json; charset=UTF-8" },
        })
        .json()

      alert("전송되었습니다!")
    } catch (err) {
      alert("문의내용을 작성해주세요.")
    }
  }

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
          x:  0,
          y: '40px',
          padding: 0,
          width: "100vw",
          height: `calc(100vh - ${isMobile ? 122 : 80}px)`,
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
          height: "600px",
          ease: "power2.out"
        })
      }
    }
  }, [ref, size])

  return (
    <div
      ref={ref}
      className="absolute z-4 "
      style={{
        padding: size === "full" ? "0" : "24px",
        width: size === "full" ? "100vw" : "600px",
        height: size === "full" ? `calc(100vh - ${isMobile ? 132 : 90}px)` : "600px",
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
        <span className="text-black font-light text-sm">Connect Yuyu</span>
      </div>
   
      {/* 폼 내용 */}
      <div className={`bg-white p-[24px] rounded-b-lg shadow-2xl h-full flex flex-col ${size === "full" && isMobile ? 'pb-[66px]' : ''}`}>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Contact yuyu</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input 
            type="text" 
            className="QnA_input" 
            placeholder="소속" 
            value={values.company} 
            onChange={handleText} 
            name="company" 
          />
          <input 
            type="text" 
            className="QnA_input" 
            placeholder="성함" 
            value={values.name} 
            onChange={handleText} 
            name="name" 
          />
          <input 
            type="email" 
            className="QnA_input" 
            placeholder="메일" 
            value={values.mail} 
            onChange={handleText} 
            name="mail" 
          />
          <input 
            type="tel" 
            className="QnA_input" 
            placeholder="연락처" 
            value={values.phone} 
            onChange={handleText} 
            name="phone" 
          />
        </div>
        <textarea 
          className="QnA_input QnA_content" 
          placeholder="문의 내용" 
          value={values.content} 
          onChange={handleText} 
          name="content" 
        />
        <button 
          className="text-sm bg-gray-200 w-full p-3 rounded-lg cursor-pointer hover:bg-gray-300 mt-4" 
          type="submit"
          onClick={handleSubmit}
        >
          전송하기
        </button>
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

ConnectForm.displayName = 'ConnectForm'

export default ConnectForm
