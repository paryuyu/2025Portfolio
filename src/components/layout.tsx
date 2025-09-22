import { Link, Outlet, useLocation } from "react-router-dom"
import { routes } from "../utils/routes"

function Layout() {
    const { pathname } = useLocation()


    return (
        <div>
            <header>header</header>
            <nav>
                <Link to={routes.home}>home</Link>
                <Link to={routes.projects}>projects</Link>
                <Link to={routes.about}>about</Link>
                <Link to={routes.contact}>contact</Link>
                <Link to={routes.skills}>skills</Link>
            </nav>
            <Outlet />
            <footer>footer</footer>
        </div>
    )
}

export default Layout
