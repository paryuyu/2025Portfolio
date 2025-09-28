import { NavLink } from 'react-router-dom';
import { routes } from '../utils/routes';
import gsap from "gsap";
import { SplitText } from 'gsap/all';

const Nav = () => {

  const handleEnterEvent = (evt) => {
    const splitNavText = new SplitText(evt.target, { type: "chars" });
    const chars = splitNavText.chars;

    gsap.from(chars, {
      yPercent: 40,
      stagger: 0.06,
      ease: "back.out",
      duration: 1,
    })
  };

  return (
    <nav>
      <NavLink to={routes.home} onMouseEnter={handleEnterEvent}>
        home
      </NavLink>
      <NavLink to={routes.projects} onMouseEnter={handleEnterEvent}>
        projects
      </NavLink>
      <NavLink to={routes.about} onMouseEnter={handleEnterEvent}>
        about
      </NavLink>
      <NavLink to={routes.connect} onMouseEnter={handleEnterEvent}>
        connect
      </NavLink>

      <div className='menu_icon'>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f">
          <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
        </svg>
      </div>
    </nav>
  );
};

export default Nav;
