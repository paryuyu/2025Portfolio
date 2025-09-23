import { Link, Outlet } from "react-router-dom"
import { routes } from "../utils/routes"

function Layout() {
    // const { pathname } = useLocation()


    return (
        <div>
            {/* <header>header</header> */}
            <nav className="flex justify-evenly w-full h-[48px] items-center">
                <Link to={routes.home}>home</Link>
                <Link to={routes.projects}>projects</Link>
                <Link to={routes.about}>about</Link>
                <Link to={routes.contact}>contact</Link>
                <Link to={routes.skills}>skills</Link>
            </nav>
            <Outlet />
            {/* <footer>footer</footer> */}
        </div>
    )
}

export default Layout
