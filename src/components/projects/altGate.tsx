
const AltGate = () => {
  return (
    <div className="flex flex-col justify-center items-start w-full border-b pb-4 mb-4">
      <div className="text-sm font-thin mb-2">project-002 사내 모니터링 시스템</div>
      <video
        src="/images/altgate/altgate.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="altconsole_video"
      />
      <h1 className="text-6xl">Alt Gate</h1>
    </div>
  )
}

export default AltGate