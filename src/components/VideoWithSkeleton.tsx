import { useState } from "react"

type VideoWithSkeletonProps = {
  src: string
  label?: string
  className?: string
}

function VideoWithSkeleton({ src, label, className }: VideoWithSkeletonProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">프로젝트 데모</h3>
      <div className="rounded-lg overflow-hidden shadow-lg relative">
        {!loaded && <div className="skeleton w-full aspect-video" aria-hidden="true"></div>}
        <video
          src={src}
          controls
          className={`${className || "w-full"} ${loaded ? "opacity-100" : "opacity-0"}`}
          aria-label={label}
          onCanPlay={() => setLoaded(true)}
          onLoadedMetadata={() => setLoaded(true)}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  )
}

export default VideoWithSkeleton


