/** @jsxImportSource @emotion/react */
import { useHistory } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { css } from '@emotion/react/macro';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ActiveCardContext } from 'ActiveCardContext';

const Overlay = () => {
  const { activeCard, setActiveCard } = useContext(ActiveCardContext);

  const element = activeCard.element;
  let history = useHistory();

  function dismiss() {
    gsap.set(`#${element.id}`, {
      clearProps: true,
    });
    document.body.style.position = 'static';
    window.scrollTo(0, activeCard.offsetFromTop);
    let triggers = ScrollTrigger.getAll();
    triggers.forEach((trigger) => {
      trigger.kill();
    });
    setActiveCard({ ...activeCard, show: false });
  }

  document.body.style.position = 'fixed';
  document.body.style.top = -activeCard.offsetFromTop + 'px';

  gsap.registerPlugin(ScrollTrigger);
  useEffect(() => {
    if (element) {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: document.getElementById('modal-overlay'),
          scroller: document.getElementById('modal-overlay-wrapper'),
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          onLeave: () => {
            dismiss();
            history.push(element.dataset.link);
          },
          onLeaveBack: () => dismiss(),
          // markers: true,
        },
      });
      // prettier-ignore
      const scaleTo =
        (document.documentElement.clientWidth-15) / activeCard.elementWidth;

      timeline.to(element, {
        scale: scaleTo,
      });
    }
    return () => {
      dismiss();
    };
  }, [element]);

  const overlayCss = css`
    background: rgba(0, 0, 0, 0.6);
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    position: fixed;
    z-index: 3;
    transition: 1s;
    overflow: auto;
    overscroll-behavior: contain;
    #modal-overlay {
      height: 200vh; // 2x the current screen height to allow GSAP scroll trigger
    }
  `;

  return (
    <div css={overlayCss} id='modal-overlay-wrapper' onClick={dismiss}>
      <div id='modal-overlay'></div>
    </div>
  );
};

export default Overlay;
