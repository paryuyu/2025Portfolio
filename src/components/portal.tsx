import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface PortalProps {
  children: React.ReactNode
  customId: string
}

export const Portal = ({ children, customId }: PortalProps) => {
   const [isMounted, setIsMounted] = useState(false);  
   // 컴포넌트가 클라이언트에서 마운트되었는지 여부를 확인하기 위한 상태를 정의.
 
   useEffect(() => {  // 컴포넌트가 마운트되었을 때 실행되는 useEffect 훅
     setIsMounted(true);  // 마운트가 완료되면 isMounted를 true로 설정하여 클라이언트에서만 렌더링되도록 함
   }, []); 
 
   if (!isMounted) return null;  
   // 클라이언트에서만 렌더링을 하도록 보장. 서버사이드 렌더링 중에는 null을 반환하여 아무것도 렌더링되지 않게 함
 
   const el = document.getElementById(customId);  
   // customId로 전달된 id를 가진 DOM 요소를 찾음
 
   return el ? ReactDOM.createPortal(children, el) : null;  
   // 해당 id가 존재하면 React Portal을 사용하여 children을 해당 DOM 요소에 렌더링. 없으면 null 반환
 };