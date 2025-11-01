import { useState } from "react"
import { apps } from "../utils/apps"
import ImageWithSkeleton from "./ImageWithSkeleton"

interface DockProps {
  activeApps: string[]
  onAppClick: (appName: string) => void
  hasMaximizedWindow?: boolean
}

function Dock({ activeApps, onAppClick, hasMaximizedWindow }: DockProps) {
  const [hoveredApp, setHoveredApp] = useState<string | null>(null)

  const handleMouseEnter = (appName: string) => {
    setHoveredApp(appName)
  }

  return (
    <footer className={hasMaximizedWindow ? 'hidden' : ''}>
      {apps.map((app) => {
        const isAppOpen = activeApps.includes(app.name)
        const isHovered = hoveredApp === app.name
        
        return (
          <div key={app.name} className="app_wrapper">
            <div
              className={`app_icon ${isHovered ? 'animate-bounce-once' : ''}`}
              onClick={() => onAppClick(app.name)}
              onMouseEnter={() => handleMouseEnter(app.name)}
              onMouseLeave={() => setHoveredApp(null)}
            >
              <ImageWithSkeleton
                src={app.image}
                alt={app.name}
                className="w-full h-full object-cover"
                wrapperClassName="w-full h-full"
              />
            </div>
            {isHovered && (
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-100 text-xs font-mono p-2 rounded-lg whitespace-nowrap z-20">
                {app.name}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-gray-100"></div>
              </div>
            )}
            {isAppOpen && (
              <div className="w-1 h-1 rounded-full bg-gray-700"></div>
            )}
          </div>
        )
      })}
    </footer>
  )
}

export default Dock

