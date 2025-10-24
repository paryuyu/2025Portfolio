import { NavLink } from 'react-router-dom';
import { routes } from '../utils/routes';

const Nav = () => {

 
  return (
    <>
      <nav>
        <NavLink to={routes.window} className={"text-xs font-mono"}>
          yu.dev
        </NavLink>
      </nav>

    </>
  );
};

export default Nav;
