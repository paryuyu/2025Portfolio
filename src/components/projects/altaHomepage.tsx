import React from 'react'

const AltaHomepage = () => {
  return (
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
  )
}

export default AltaHomepage