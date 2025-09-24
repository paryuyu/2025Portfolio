import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/all';

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
  }, []);

  return (
    <main>
      <h1>
        <div className="subtext">
          hi, <br />
          I'm a Front-end Engineer.
        </div>
      </h1>
      <article className="">
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
      </article>
    </main>
  );
}

export default Home;
