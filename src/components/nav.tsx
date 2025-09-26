import { NavLink } from 'react-router-dom';
import { routes } from '../utils/routes';

const Nav = () => {
  return (
    <nav>
      <NavLink to={routes.home} className="">
        <span> [ home ] </span>
      </NavLink>
      <NavLink to={routes.projects}>[ projects ]</NavLink>
      <NavLink to={routes.about}>[ about ]</NavLink>
      <NavLink to={routes.connect}>[ connect ]</NavLink>
    </nav>
  );
};

export default Nav;
