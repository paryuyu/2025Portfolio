import { atom, useAtom } from "jotai"
import { deviceAtom } from "./atoms";
import { useEffect } from "react";

export const useDevice = () => {
   const [ , setDevice] = useAtom<"mobile" | "tablet" | "pc">(deviceAtom);
   const width = {
      mobile: 699,
      tablet: 1199,
   }
   useEffect(() => {
      console.log('working----!')
      if (typeof window !== undefined) {
         const handleResize = () => {
            const innerWidth = window.innerWidth;
            if (innerWidth <= width.mobile) {
               setDevice("mobile");
               console.log("mobile - useEffect")
            } else if (innerWidth >= width.mobile + 1 && innerWidth < width.tablet) {
               setDevice("tablet")
               console.log("tb - useEffect")

            } else if (innerWidth > width.tablet + 1) {
               setDevice("pc")
               console.log('pc - useEffect')
            }
         }

         handleResize();

         window.addEventListener("resize", handleResize);
         return ()=> window.removeEventListener("resize", handleResize)
      }
   }, [])
}