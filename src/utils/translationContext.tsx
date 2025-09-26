import gsap from 'gsap';
import { atom, useAtom } from 'jotai';
import { useLocation } from 'react-router-dom';
import { SwitchTransition, Transition } from 'react-transition-group';

interface TransitionComponentProps {
  children: React.ReactNode;
}

const TransitionComponent: React.FC<TransitionComponentProps> = ({
  children,
}) => {
  const transitionCompletedAtom = atom<boolean>(false);
  const location = useLocation();
  const [, setTransitionCompleted] = useAtom(transitionCompletedAtom);

  return (
    <SwitchTransition>
      <Transition
        key={location.pathname}
        timeout={500}
        onEnter={(node: HTMLElement) => {
          setTransitionCompleted(false);
          gsap.set(node, { autoAlpha: 0, scale: 0.8, xPercent: -100 });
          gsap
            .timeline({
              paused: true,
              onComplete: () => setTransitionCompleted(true),
            })
            .to(node, { autoAlpha: 1, xPercent: 0, duration: 0.25 })
            .to(node, { scale: 1, duration: 0.25 })
            .play();
        }}
        onExit={(node: HTMLElement) => {
          gsap
            .timeline({ paused: true })
            .to(node, { scale: 0.8, duration: 0.2 })
            .to(node, { xPercent: 100, autoAlpha: 0, duration: 0.2 })
            .play();
        }}
      >
        {children}
      </Transition>
    </SwitchTransition>
  );
};

export default TransitionComponent;
