import { NavLink } from 'react-router-dom';
import { routes } from '../utils/routes';
import gsap from "gsap";
import { SplitText } from 'gsap/all';
import Menu from './menu';
import { Portal } from './portal';
import { atom, useAtom } from 'jotai';
import { deviceAtom, menuAtom } from '../utils/atoms';
import { useDevice } from '../utils/mediaQuery';

const Nav = () => {
  useDevice()
  const [menu, setMenu] = useAtom(menuAtom);
  const [device,] = useAtom(deviceAtom);

  const handleEnterEvent = (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const target = evt.target as HTMLElement;
    const splitNavText = new SplitText(target, { type: "chars" });
    const chars = splitNavText.chars;

    gsap.from(chars, {
      yPercent: 40,
      stagger: 0.06,
      ease: "back.out",
      duration: 1,
    })
  };

  return (
    <>
      <NavLink to={routes.home} className='main_self_branding'><span className='nav_logo_text'>유유</span> <div className='green_ball' /></NavLink>
      <nav>
        <NavLink to={routes.projects} onMouseEnter={handleEnterEvent}>
          projects
        </NavLink>
        <NavLink to={routes.about} onMouseEnter={handleEnterEvent}>
          about
        </NavLink>
        <NavLink to={routes.connect} onMouseEnter={handleEnterEvent}>
          connect
        </NavLink>

        <div className='menu_icon' onClick={() => setMenu(!menu)}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
          </svg>
        </div>
        {menu && <Menu />}
      </nav>

    </>
  );
};

export default Nav;
