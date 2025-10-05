import { useAtom } from "jotai";
import { menuAtom } from "../utils/atoms";
import { NavLink, useLocation } from "react-router-dom";
import { routes } from "../utils/routes";
import { useLayoutEffect } from "react";

const Menu = () => {

   const [menu, setMenu] = useAtom(menuAtom);
   const { pathname } = useLocation()

   return <div className=" menu_wrap">
      <div className="close_icon" onClick={() => setMenu(false)}>
         <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
      </div>
      <div className="flex flex-col mt-[80px] mx-[42px] text-6xl gap-[42px]">
         <NavLink to={routes.home} className="hover:underline"
            onClick={() => setMenu(false)}>
            home
         </NavLink>
         <NavLink to={routes.projects} className="hover:underline" onClick={() => setMenu(false)}>
            projects
         </NavLink>
         <NavLink to={routes.about} className="hover:underline" onClick={() => setMenu(false)}>
         about
         </NavLink>
         <NavLink to={routes.connect} className="hover:underline" onClick={() => setMenu(false)}>
            connect
         </NavLink>
      </div>
   </div>;
};

export default Menu;
