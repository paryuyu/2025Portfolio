import { useLayoutEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Draggable } from "gsap/Draggable"
import ConnectForm from "./ConnectForm"

gsap.registerPlugin(Draggable)
function Connect() {
  const [contactBox, setContactBox] = useState(true)
  const [size, setSize] = useState<"full" | 120>("full")
  const [hover, setHover] = useState(false)

  const boxRef = useRef<HTMLDivElement | null>(null)
  const dragInstance = useRef<Draggable[]>([])

  const handleWide = () => setSize(size === "full" ? 120 : "full")
  const handleToggle = () => setContactBox(p => !p)

  useLayoutEffect(() => {
    if (boxRef.current) {
      dragInstance.current.forEach(d => d.kill())
      dragInstance.current = []
      dragInstance.current = Draggable.create(boxRef.current, {
        type: "x,y",
        bounds: window,
        allowContextMenu: true,
        onPress: function (e) {
          const target = e.target as HTMLElement
          if (
            target.tagName === "INPUT" ||
            target.tagName === "TEXTAREA" ||
            target.isContentEditable
          ) {
            this.disable()
          }
        },
        onRelease: function () {
          this.enable()
        },
      })
    }
  }, [contactBox, size])

  const handleHover = () => {
    setHover(p => !p)
  }

  return (
    <div className="relative w-full h-dvh text-black overflow-hidden">
      {/* 우측 연결 버튼 */}
      <div className={`right-24 absolute bottom-1/2 z-0 flex flex-col justify-center items-center cursor-pointer`} onClick={handleHover}>
        <div
          className={`bg-green-400 w-fit p-2 rounded-xl shadow-2xl transition-all duration-200 ${hover ? "outline-offset-3 outline-2 outline-blue-500 grayscale-50" : ""}`}
          onDoubleClick={() => setContactBox(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            className="fill-white"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z" />
          </svg>
        </div>
        <div className={`text-xs mt-2 text-center text-white transition-all duration-200 ${hover ? "bg-blue-500 px-1 py-[0.5] rounded-md" : ""}`}>
          connect
        </div>
      </div>

      {/* ConnectForm 컴포넌트 */}
      {contactBox && (
        <ConnectForm 
          ref={boxRef}
          size={size} 
          onClose={handleToggle} 
          onToggleSize={handleWide} 
        />
      )}

      {/* 하단 푸터 */}
      <footer className="bg-white/80 shadow-gray-500 shadow-xs rounded-xl p-2 fixed bottom-4 left-1/2 transform -translate-x-1/2 w-1/3">
        <div className="mx-auto w-fit">
          <div
            className="bg-green-400 w-fit p-2 rounded-xl shadow-2xl cursor-pointer hover:bg-green-500 transition-colors"
            onClick={handleToggle}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              className="fill-white"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z" />
            </svg>
          </div>
          {contactBox && <div className="bg-gray-100 w-1 h-1 rounded-full mx-auto mt-1"></div>}
        </div>
      </footer>
    </div>
  );
}

export default Connect;
