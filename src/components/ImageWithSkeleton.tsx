import { useEffect, useState } from "react"

type ImageWithSkeletonProps = {
  src: string
  alt: string
  className?: string
  wrapperClassName?: string
  imgProps?: React.ImgHTMLAttributes<HTMLImageElement>
}

function ImageWithSkeleton({ src, alt, className, wrapperClassName, imgProps }: ImageWithSkeletonProps) {
  const [loaded, setLoaded] = useState(false)

  // Reset loading state on src change to show skeleton immediately
  useEffect(() => {
    setLoaded(false)
  }, [src])

  return (
    <div className={`relative ${wrapperClassName || ""}`} aria-busy={!loaded}>
      {!loaded && (
        <div className="absolute inset-0 skeleton" aria-hidden="true"></div>
      )}
      <img
        key={src}
        src={src}
        alt={alt}
        className={`${className || ""} ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        loading="lazy"
        decoding="async"
        {...imgProps}
      />
    </div>
  )
}

export default ImageWithSkeleton


