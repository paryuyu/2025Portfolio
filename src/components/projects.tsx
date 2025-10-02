import React, { useState } from 'react';
import { projectInformation } from '../utils/projects';

function Projects() {
  type menu = 'altGate' | 'altConsole' | 'altaHomepage' | 'portfolio';
  const [menu, setMenu] = useState<menu>('altConsole');

  const handleMenu = (evt: React.MouseEvent<HTMLDivElement>) => {
    const value = evt.currentTarget.dataset.value as menu;
    setMenu(value);
  };

  //TODO: Portal 만들기 -> project 전체화면 모달
  //옆으로 슬라이드 효과
  return (
    <>
      <section className="project_wrapper">
        <div className='flex flex-wrap gap-8 justify-center items-center h-full text-center text-[var(--point-color)] '>
          {projectInformation?.map((projectItem) => {
            return <React.Fragment key={projectItem.projectName}>
              <div className='w-[160px] h-[160px] rounded-lg border shadow-sm'>
                <img src={projectItem.thumnail} alt={`${projectItem.projectName + "-" + "thumbnail"}`} className='w-full h-full object-contain p-6' />
                <div className='mt-2 p-2 rounded-lg shadow-sm border text-xs '>{projectItem.projectName}</div>
              </div>
            </React.Fragment>
          })}
        </div>
      </section>
    </>
  );
}

export default Projects;
