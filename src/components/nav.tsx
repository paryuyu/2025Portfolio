import { routes } from '../utils/routes';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav>
      <Link to={routes.home}>홈</Link>
      <Link to={routes.projects}>프로젝트</Link>
      <Link to={routes.about}>자기소개</Link>
    </nav>
  );
};

export default Nav;
