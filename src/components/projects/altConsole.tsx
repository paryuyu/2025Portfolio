
const AltConsole = () => {

  // const generateUrls = useMemo(() => {
  //   return Array.from({ length: 42 }, (_, i) =>
  //     `/images/altconsole/altconsole2_pc_${i + 1}.png`
  //   );
  // }, [])

  return (
    <>
      <div className="flex flex-col justify-center items-start w-full pb-4 mb-4">
        <div className="text-sm font-thin mb-2">project-001 교통 관제 모니터링 플랫폼</div>
        <video
          src="/images/altconsole/altconsole.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="altconsole_video"
        />
        <h1 className="text-6xl">Alt Console V2</h1>
      </div>
    </>
  )
}

export default AltConsole