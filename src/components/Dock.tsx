import { useState } from "react"
import { apps } from "../utils/apps"

interface DockProps {
  activeApps: string[]
  onAppClick: (appName: string) => void
}

function Dock({ activeApps, onAppClick }: DockProps) {
  const [hoveredApp, setHoveredApp] = useState<string | null>(null)

  return (
    <footer className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-3 fixed bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
      {apps.map((app) => {
        const isAppOpen = activeApps.includes(app.name)
        const isHovered = hoveredApp === app.name
        
        return (
          <div key={app.name} className="flex flex-col items-center gap-1">
            <div
              className="relative w-14 h-14 rounded-xl cursor-pointer hover:scale-110 transition-transform duration-200 overflow-hidden"
              onClick={() => onAppClick(app.name)}
              onMouseEnter={() => setHoveredApp(app.name)}
              onMouseLeave={() => setHoveredApp(null)}
            >
              <img 
                src={app.image} 
                alt={app.name}
                className="w-full h-full object-cover"
              />
              {isHovered && (
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
                  {app.name}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              )}
            </div>
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

