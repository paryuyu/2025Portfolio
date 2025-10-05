import { useLayoutEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Draggable } from "gsap/Draggable"
import ky from "ky"

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

  const [values, setValues] = useState({
    company: "",
    name: "",
    mail: "",
    phone: "",
    content: ""
  })

  const handleText = (evt) => {
    const value = evt.target.value;
    const name = evt.target.name;

    setValues(prev => ({ ...prev, [name]: value }))
  }

  const handleHover = () => {
    setHover(p => !p)
  }


  const handleSubmit = async (evt) => {
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
    <form className="relative w-full h-dvh text-black overflow-hidden " onSubmit={handleSubmit}>
      <div className={`right-24 absolute bottom-1/2 z-0 flex flex-col justify-center items-center cursor-pointer`} onClick={handleHover}>
        <div
          className={`bg-green-400 w-fit p-2 rounded-xl shadow-2xl  ${hover ? "outline-offset-3 outline-2 outline-blue-500 grayscale-50" : ""}`}
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
        <div className={`text-xs mt-2 text-center text-white ${hover ? "bg-blue-500 px-1 py-[0.5] rounded-md" : " "}`}>connect</div>
      </div>
      {contactBox && (
        <div
          ref={boxRef}
          className={`${size === "full" ? "w-full h-[80vh]" : "w-[400px]"
            } absolute top-4 left-4 p-[24px] cursor-grab active:cursor-grabbing z-4`}
        >
          <div className="flex items-center gap-2 bg-white p-2 rounded-t-lg font-light border-b border-b-gray-200">
            <div className="flex items-center gap-2 text-xs">
              <div
                className="bg-red-500 w-3 h-3 rounded-full cursor-pointer"
                onClick={handleToggle}
              ></div>
              <div className="bg-gray-300 w-3 h-3 rounded-full"></div>
              <div
                className="bg-green-500 w-3 h-3 rounded-full cursor-pointer"
                onClick={handleWide}
              ></div>
            </div>
            <span>Connect Yuyu</span>

          </div>

          <div className="bg-white p-[24px] rounded-b-lg shadow-2xl">
            <div className={`${size !== "full" ? "grid grid-cols-1 gap-2 mb-2" : "grid grid-cols-2 gap-4 mb-4"}`}>
              <input type="text" className="QnA_input" placeholder="소속" value={values.company} onChange={handleText} name="company" />
              <input type="text" className="QnA_input" placeholder="성함" value={values.name} onChange={handleText} name="name" />
              <input type="text" className="QnA_input" placeholder="메일" value={values.mail} onChange={handleText} name="mail" />
              <input type="text" className="QnA_input" placeholder="연락처" value={values.phone} onChange={handleText} name="phone" />
            </div>
            <textarea className="QnA_input QnA_content" placeholder="문의 내용" value={values.content} onChange={handleText} name="content" />
            <p className="text-red-700 opacity-80 text-xs mb-2">이메일과 소속, 문의내용은 필수 값입니다. 꼭 기재부탁드립니다. 비방 및 장난 연락은 추후 법적조치가 있을 수 있습니다.</p>
            <button className="bg-[var(--background-color)] text-sm drop-shadow-2xl font-semibold text-white w-full p-3 rounded-lg cursor-pointer hover:opacity-90" type="submit">
              전송하기
            </button>
          </div>
        </div>
      )}
      <footer className="bg-white/80 shadow-gray-500 shadow-xs rounded-xl p-2 fixed bottom-4 left-1/2 transform -translate-x-1/2 w-1/3">
        <div className="mx-auto w-fit">
          <div
            className="bg-green-400 w-fit p-2 rounded-xl shadow-2xl cursor-pointer"
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
    </form>
  );
}

export default Connect;
