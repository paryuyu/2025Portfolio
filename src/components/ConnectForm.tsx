import { useState, forwardRef, useLayoutEffect, useRef } from "react"
import { gsap } from "gsap"
import { Draggable } from "gsap/Draggable"
import ky from "ky"

gsap.registerPlugin(Draggable)

interface ConnectFormProps {
  size: "full" | 120
  onClose: () => void
  onToggleSize: () => void
}

const ConnectForm = forwardRef<HTMLDivElement, ConnectFormProps>(({ size, onClose, onToggleSize }, ref) => {
  const [values, setValues] = useState({
    company: "",
    name: "",
    mail: "",
    phone: "",
    content: ""
  })

  const [dimensions, setDimensions] = useState({
    width: size === "full" ? window.innerWidth - 32 : 400,
    height: size === "full" ? window.innerHeight * 0.8 : 500
  })

  const resizeHandleRef = useRef<HTMLDivElement>(null)
  const resizeInstance = useRef<Draggable[]>([])
  const startDimensionsRef = useRef({ width: 0, height: 0 })

  // 크기조절 기능 초기화
  useLayoutEffect(() => {
    if (resizeHandleRef.current && ref && typeof ref === 'object' && ref.current) {
      // 기존 resize 인스턴스 정리
      resizeInstance.current.forEach(d => d.kill())
      resizeInstance.current = []

      // 크기조절 핸들 생성
      resizeInstance.current = Draggable.create(resizeHandleRef.current, {
        type: "x,y",
        onPress: function() {
          // 드래그 시작 시 현재 크기 저장
          startDimensionsRef.current = { ...dimensions }
        },
        onDrag: function() {
          const startWidth = startDimensionsRef.current.width
          const startHeight = startDimensionsRef.current.height
          
          // x, y는 드래그 시작점으로부터의 누적 변화량
          const newWidth = Math.max(300, Math.min(window.innerWidth - 100, startWidth + this.x))
          const newHeight = Math.max(200, Math.min(window.innerHeight - 100, startHeight + this.y))
          
          setDimensions({
            width: newWidth,
            height: newHeight
          })
        },
        onDragEnd: function() {
          // 드래그 종료 시 위치 리셋
          gsap.set(this.target, { x: 0, y: 0 })
        }
      })
    }

    return () => {
      resizeInstance.current.forEach(d => d.kill())
    }
  }, [ref, dimensions])

  // size prop이 변경될 때 dimensions 업데이트
  useLayoutEffect(() => {
    if (size === "full") {
      setDimensions({
        width: window.innerWidth - 32,
        height: window.innerHeight * 0.8
      })
    } else {
      setDimensions({
        width: 400,
        height: 500
      })
    }
  }, [size])

  const handleText = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = evt.target.value;
    const name = evt.target.name;

    setValues(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    const url = import.meta.env.VITE_GOOGLE_CHAT

    // 메시지 문자열을 깔끔하게 구성
    const message = `
📩 새 문의가 도착했습니다!
🏢 소속: ${values.company || "소속없음"}
👤 성함: ${values.name || "성함없음"}
📧 메일: ${values.mail || "메일없음"}
📱 연락처: ${values.phone || "연락처없음"}
💬 문의 내용:
${values.content || "문의내용없음"}
`;

    try {
      await ky
        .post(url, {
          json: { text: message },
          headers: { "Content-Type": "application/json; charset=UTF-8" },
        })
        .json();

      alert("전송되었습니다!");
    } catch (err) {
      alert("전송 실패!");
    }
  };

  return (
    <div
      ref={ref}
      className="absolute top-4 left-4 p-[24px] cursor-grab active:cursor-grabbing z-4"
      style={{
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`
      }}
    >
      {/* 맥 스타일 윈도우 바 */}
      <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-t-lg font-light border-b border-b-gray-200">
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
        <span className="text-gray-700 font-medium">Connect Yuyu</span>
      </div>

      {/* 폼 내용 */}
      <div className="bg-white p-[24px] rounded-b-lg shadow-2xl h-full flex flex-col">
        <div className={`${dimensions.width < 600 ? "grid grid-cols-1 gap-2 mb-2" : "grid grid-cols-2 gap-4 mb-4"}`}>
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
        <p className="text-red-700 opacity-80 text-xs mb-2">
          이메일과 소속, 문의내용은 필수 값입니다. 꼭 기재부탁드립니다. 비방 및 장난 연락은 추후 법적조치가 있을 수 있습니다.
        </p>
        <button 
          className="bg-[var(--background-color)] text-sm drop-shadow-2xl font-semibold text-white w-full p-3 rounded-lg cursor-pointer hover:opacity-90 transition-opacity" 
          type="submit"
          onClick={handleSubmit}
        >
          전송하기
        </button>
      </div>

      {/* 크기조절 핸들 */}
      <div
        ref={resizeHandleRef}
        className="absolute bottom-0 right-0 w-8 h-8 cursor-se-resize opacity-50 hover:opacity-100 transition-opacity group z-50"
        style={{
          background: 'linear-gradient(-45deg, transparent 0%, transparent 40%, #666 40%, #666 45%, transparent 45%, transparent 60%, #666 60%, #666 65%, transparent 65%, transparent 80%, #666 80%, #666 85%, transparent 85%)',
          borderBottomRightRadius: '0.5rem'
        }}
        title="크기조절"
        onMouseDown={(e) => e.stopPropagation()}
      >
      </div>
    </div>
  )
})

ConnectForm.displayName = 'ConnectForm'

export default ConnectForm
