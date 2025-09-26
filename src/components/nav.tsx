import { routes } from '../utils/routes';
import {  NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <nav>
      <NavLink to={routes.home} className="">
        <span> [ home ] </span>
      </NavLink>
      <NavLink to={routes.projects}>[ projects ]</NavLink>
      <NavLink to={routes.about}>[ about ]</NavLink>
    </nav>
  );
};

export default Nav;
