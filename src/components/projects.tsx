import React, { useState } from 'react';
import AltConsole from './projects/altConsole';
import Skills from './skills';
import { projectInformation } from '../utils/projects';
import { icons } from './assets/icons';

function Projects() {
  type menu = 'altGate' | 'altConsole' | 'altaHomepage' | 'portfolio';
  const [menu, setMenu] = useState<menu>('altConsole');

  const handleMenu = (evt: React.MouseEvent<HTMLDivElement>) => {
    const value = evt.currentTarget.dataset.value as menu;
    setMenu(value);
  };


  return (
    <>
      {/* <Skills /> */}
      <section className="project_wrapper">
        {projectInformation.map((projectItem) => {
          return <React.Fragment key={projectItem.projectName}>
            <div className="project_item">
              <div className="text-sm mb-2 flex-1 flex flex-col">
                <span>project-00{projectItem?.projectNo}</span>
                <span>{projectItem?.description}</span>
                <span>{projectItem?.projectName}</span>

                <div className="bg-red-50 mr-6 p-2 rounded-lg mt-4">
                  <span className="text-lg">사용스택</span>
                  <div className="flex gap-2 flex-wrap w-full">
                    {icons.map((iconItem) => {
                      if (
                        projectItem.usedStack.some(
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
                src={projectItem.projectVideoResources[0]}
                autoPlay
                muted
                loop
                playsInline
                className="project_video"
              />
            </div>
          </React.Fragment>
        })}
      </section>
    </>
  );
}

export default Projects;
