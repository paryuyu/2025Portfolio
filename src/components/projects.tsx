import React, { useState } from 'react';
import AltaHomepage from './projects/altaHomepage';
import AltConsole from './projects/altConsole';
import AltGate from './projects/altGate';
import Portfolio from './projects/portfolio';
import Skills from './skills';

function Projects() {
  type menu = 'altGate' | 'altConsole' | 'altaHomepage' | 'portfolio'
  const [menu, setMenu] = useState<menu>(
    'altConsole',
  );

  const handleMenu = (evt: React.MouseEvent<HTMLDivElement>) => {
    const value = evt.currentTarget.dataset.value as menu;
    setMenu(value);
  };

  return (
    <>
      <Skills />
      {/* <div className="project_menu_wrap">
        <div
          className={`project_menu ${menu === 'altConsole' ? 'active' : ''}`}
          onClick={handleMenu}
          data-value={'altConsole'}
        >
          <span>01</span>
          <span>알트콘솔 V2</span>

        </div>
        <div
          className={`project_menu ${menu === 'altaHomepage' ? 'active' : ''}`}
          onClick={handleMenu}
          data-value={'altaHomepage'}
        >
          <span>02</span>
          <span>알트에이 홈페이지</span>


        </div>
        <div
          className={`project_menu ${menu === 'altGate' ? 'active' : ''}`}
          onClick={handleMenu}
          data-value={'altGate'}
        >
          <span>03</span>
          <span>알트게이트</span>
        </div>
        <div
          className={`project_menu ${menu === 'portfolio' ? 'active' : ''}`}
          onClick={handleMenu}
          data-value={'portfolio'}
        >
          <span>04</span>
          <span>포트폴리오</span>
        </div>
      </div> */}
      <section className="project_wrapper">
        {menu === 'altConsole' && <AltConsole />}
        {/* {menu === 'altaHomepage' && <AltaHomepage />}
        {menu === 'altGate' && <AltGate />}
        {menu === 'portfolio' && <Portfolio />} */}

      </section>
    </>
  );
}

export default Projects;
