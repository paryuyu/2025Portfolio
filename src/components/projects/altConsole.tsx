import { icons } from '../assets/icons';

const AltConsole = () => {
  // const generateUrls = useMemo(() => {
  //   return Array.from({ length: 42 }, (_, i) =>
  //     `/images/altconsole/altconsole2_pc_${i + 1}.png`
  //   );
  // }, [])
  const usedStacks = [
    'nextjs',
    'react-query',
    'zustand',
    'typeScript',
    'tailwindcss',
    'react-query',
    'axios',
  ];

  return (
    <>
      <div className="flex justify-center items-start w-full">
        <div className="text-sm mb-2 flex-1 flex flex-col">
          <span>project-001</span>
          <span>교통 관제 모니터링 플랫폼</span>
          <span className="text-6xl">Alt Console V2</span>

          <div className="bg-red-50 mr-6 p-2 rounded-lg mt-4">
            <span className="text-lg">사용스택</span>
            <div className="flex gap-2">
              {icons.map((iconItem) => {
                if (
                  usedStacks.some(
                    (stackName) => iconItem.iconName === stackName,
                  )
                ) {
                  return (
                    <div className="skill_item">
                      {iconItem.icon}
                      {iconItem.iconName}
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
        <video
          src="/images/altconsole/altconsole.mp4"
          autoPlay
          muted
          loop
          playsInline
          className=" flex-1 max-w-[800px]"
        />
      </div>
    </>
  );
};

export default AltConsole;
