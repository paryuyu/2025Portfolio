
const AltConsole = () => {

  // const generateUrls = useMemo(() => {
  //   return Array.from({ length: 42 }, (_, i) =>
  //     `/images/altconsole/altconsole2_pc_${i + 1}.png`
  //   );
  // }, [])

  return (
    <>
      <div className="flex flex-col justify-center items-start w-full border-b pb-4 mb-4">
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
      <div className="flex flex-col justify-start items-start w-full ">
      <div className="text-sm font-thin mb-2">project-003 알트에이 회사 홈페이지</div>
        <video
          src="/images/altgate/altgate.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="altconsole_video"
        /> 
        <h1 className="text-6xl">Alt-a Homepage</h1>
      </div>
    </>
  )
}

export default AltConsole