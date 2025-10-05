import React, { useState } from 'react';
import { projectInformation } from '../utils/projects';
import { formatDate } from 'date-fns';

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
        {/* <div className='bg-yellow-500 flex flex-col justify-center items-center h-full text-[var(--point-color)] '> */}
          {projectInformation.map((projectItem) => {
            return <React.Fragment key={projectItem.projectName}>
              <div className='project_ticket'>
                <div className='small_area_header'>
                  <div className='text-xs'>{projectItem.description}</div>
                  <div className='text-xl '>{projectItem.projectName}</div>
                </div>
                <div className='absolute right-0 bg-black/50 h-[60px] w-[70%] py-2 pr-6 text-end'>
                  <div className='text-xs'>{projectItem.description}</div>
                  <div className='text-xl '>
                    <span className='uppercase text-sm font-light mr-4'>project</span> {projectItem.projectName}</div>
                </div>
                <div className='h-full w-[30%] border-r border-dashed p-6 pt-[76px] '>
                  <h6 className='text-start justify-between flex text-2xl'>
                    <span className='text-sm self-end uppercase'>office seat</span><span>A열</span><span>1번</span>
                  </h6>
                  <div className='grid mt-4'>
                    <span className='mt-4'>장 소 : 사무실</span>
                  </div>
                </div>
                <div className='w-[70%] absolute top-0 right-0 py-4 px-8 pt-[76px] h-full'>
                  <h6 className='text-2xl flex justify-between w-[90%] mx-auto'>
                    <span className='uppercase'>project-00{projectItem.projectNo}</span>
                    <span>{projectItem.projectName}</span>
                  </h6>
                  <div className='mt-4 w-[90%] mx-auto flex justify-end flex-col items-end'>
                    <span>역할 : {projectItem.mainRole}</span>
                    <span>시 작 일 : {formatDate(projectItem.period.start, "yyyy-MM-dd")}</span>
                    <span>종 료 일 : {formatDate(projectItem.period.start, "yyyy-MM-dd")}</span>
                  </div>
                </div>
              </div>
            </React.Fragment>
          })}

        {/* </div> */}

      </section>
    </>
  );
}

export default Projects;
