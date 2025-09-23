import React, { useState } from 'react';
import AltaHomepage from './projects/altaHomepage';
import AltConsole from './projects/altConsole';
import AltGate from './projects/altGate';

function Projects() {
  const [menu, setMenu] = useState<'altGate' | 'altConsole' | 'altaHomepage'>(
    'altConsole',
  );

  const handleMenu = (evt: React.MouseEvent<HTMLDivElement>) => {
    const value = evt.currentTarget.dataset.value as
      | 'altGate'
      | 'altConsole'
      | 'altaHomepage';
    setMenu(value);
  };

  return (
    <>
      <div className="project_menu_wrap">
        <div
          className={`project_menu ${menu === 'altConsole' ? 'active' : ''}`}
          onClick={handleMenu}
          data-value={'altConsole'}
        >
          알트콘솔 V2
        </div>
        <div
          className={`project_menu ${menu === 'altaHomepage' ? 'active' : ''}`}
          onClick={handleMenu}
          data-value={'altaHomepage'}
        >
          알트에이 홈페이지
        </div>
        <div
          className={`project_menu ${menu === 'altGate' ? 'active' : ''}`}
          onClick={handleMenu}
          data-value={'altGate'}
        >
          알트게이트
        </div>
      </div>
      <section className="project_wrapper">
        {menu === 'altConsole' && <AltConsole />}
        {menu === 'altaHomepage' && <AltaHomepage />}
        {menu === 'altGate' && <AltGate />}
      </section>
    </>
  );
}

export default Projects;
