import { useGSAP } from "@gsap/react"
import { icons } from "./assets/icons"
import { useRef, useState } from "react";
import gsap from 'gsap';
import { SplitText } from 'gsap/all';

function Skills() {
  const skillItems = useRef<HTMLLIElement[]>([]);
  useGSAP(() => {
    const skillTextSplit = new SplitText(".skill_head_text",{type: "chars, words"});
    skillTextSplit.chars.forEach((char)=> char.classList.add('text-gradient'));
    
    gsap.from(skillTextSplit.chars, {
      yPercent: 100,
      duration: 1.8,
      ease: 'expo.out',
      stagger: 0.06,
    });
    
    gsap.from(skillItems.current, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: 'expo.out',
      stagger: 0.06,
      delay: 0.08,
    });
  }, []);

  const addToRefs = (el:HTMLLIElement, idx:number)=> { 
    if (el) {
      skillItems.current[idx] = el;
    }
  }

  const [stacks, setStacks] = useState<string[]>([]);
  
  const handleStacks = (stack:string) =>{
    if(stacks.includes(stack)){
      const filterArr = stacks.filter(t => t !== stack)
      setStacks(filterArr) 
    }else{
      setStacks(prev=> ([...prev, stack]))
    }
  }

  return (
    <article className="skill_section">
      <h1 className="skill_head_text">Skills</h1>
      <ul className="skill_list">
        {icons.map((item,index) => {
          return <li 
          ref={(el:HTMLLIElement) => addToRefs(el, index)}  
          key={item.iconName} 
          className={`skill_item ${stacks.includes(item.iconName) ? "active" : ""}` }
          onClick={()=>handleStacks(item.iconName)}>{item.icon} <span>{item.iconName}</span></li>
        })}
      </ul>
    </article >
  )
}

export default Skills
