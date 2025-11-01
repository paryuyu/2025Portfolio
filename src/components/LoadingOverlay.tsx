import { useEffect, useState } from "react"

type LoadingOverlayProps = {
  visible: boolean
  text?: string
}

function LoadingOverlay({ visible, text }: LoadingOverlayProps) {
  const [mount, setMount] = useState(visible)

  useEffect(() => {
    if (visible) {
      setMount(true)
      return
    }
    const t = setTimeout(() => setMount(false), 200)
    return () => clearTimeout(t)
  }, [visible])

  if (!mount) return null

  return (
    <div
      className={`fixed inset-0 z-[99999] flex items-center justify-center transition-opacity duration-200 ${
        visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      aria-live="polite"
      aria-busy={visible}
    >
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" />
      <div className="relative flex flex-col items-center gap-3">
        <div className="loader-spinner" aria-hidden="true" />
        <span className="text-sm text-gray-700">{text || "Loading..."}</span>
      </div>
    </div>
  )
}

export default LoadingOverlay


