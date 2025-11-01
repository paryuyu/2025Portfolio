import { useState } from "react"

type ImageWithSkeletonProps = {
  src: string
  alt: string
  className?: string
  wrapperClassName?: string
  imgProps?: React.ImgHTMLAttributes<HTMLImageElement>
}

function ImageWithSkeleton({ src, alt, className, wrapperClassName, imgProps }: ImageWithSkeletonProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={wrapperClassName}>
      {!loaded && (
        <div className="skeleton w-full h-full" aria-hidden="true"></div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${className || ""} ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
        loading="lazy"
        {...imgProps}
      />
    </div>
  )
}

export default ImageWithSkeleton


