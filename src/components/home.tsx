import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/all';
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin"
function Home() {
  // gsap text animation
  useGSAP(() => {
    const heroSplit = new SplitText('.subtext', { type: 'chars, words' });
    const paragraphSplit = new SplitText('.paragraph', { type: 'lines' });

    heroSplit.chars.forEach((char) => char.classList.add('text-gradient'));
    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 1.8,
      ease: 'expo.out',
      stagger: 0.06,
    });

    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: 'expo.out',
      stagger: 0.06,
      delay: 0.08,
    });

    gsap.registerPlugin(ScrambleTextPlugin, useGSAP);

    gsap.to(".home_section_title", {
      duration: 1.8,
      scrambleText: {
        text: "Creative Frontend Engineer",
        chars: "0000&*",
        speed: 0.001
      },
    });

    gsap.from(".x-move", {
      opacity: 0,
      duration:2,
      xPercent:-100,
      ease: 'expo.out',
      // stagger: 0.06,
      // delay: 0.08,
    });

    gsap.from(".fade", {
      opacity: 0,
      // yPercent: 100,
      duration: 1.8,
      ease: 'expo.out',
      stagger: 0.06,
      delay: 0.08,
    });

  }, []);





  return (
    <main className='home_main'>
      <span className='main_bg_text'>유유 / yuyu</span>
      <section className='home_section'>
        <h4 className='home_section_title'>Creative Frontend Engineer</h4>
        <div className='home_name fade'>( 사용자를 먼저 생각하는 개발자 유유유 )</div>
        <div className='power_line x-move'>
          단순한 기능 구현을 넘어서, 기술적 깊이와 실용적 감각을 갖춘 개발자로서
          사용자 경험, 성능, 그리고 완성도까지 책임지는 웹을 만듭니다.
        </div>
        <div className='signiture_box'>
          <span className="paragraph">
            저는 꾸준히 학습하며 성장하는 프론트엔드 개발자로, React 및 Next.js
            기반 SPA 구축을 주로 담당하며 사용자 경험 향상과 데이터/UI 최적화를
            중심으로 실천해왔습니다.
          </span>
          <span className="paragraph">
            최신 프론트엔드 트렌드와 컴퓨터 공학 지식을 지속적으로 학습하며,
            레거시 시스템 개선 경험을 통해 안정적인 서비스 운영 능력까지 겸비하고
            있습니다.
          </span>
          <span className="paragraph">
            단순히 기능을 구현하는 것을 넘어, 기술적 깊이와 서비스 완성도를 겸비한
            개발자로서 더 나은 사용자 경험과 성능을 제공하는 웹 서비스를 만드는 데
            기여하고 싶습니다.
          </span>
          <img src="/images/signiture_b.png" alt="ss" className='signiture_img' />
        </div>
        <span className='float-end mt-4 font-ligh uppercase mr-4'>signiture</span>

      </section>
    </main>
  );
}

export default Home;
