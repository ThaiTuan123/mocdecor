import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { animationState } from '@/recoil/atoms/feedbackScrollableAtom';

export function useFeedbackScrollerAnimation(scrollInterval: number) {
  const setAnimationState = useSetRecoilState(animationState);

  useEffect(() => {
    const scrollers =
      document.querySelectorAll<HTMLDivElement>('.feedback-scroller');

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      scrollers.forEach(scroller => {
        scroller.setAttribute('data-animated', 'true');

        const scrollerInner = scroller.querySelector(
          '.feedback-scroller__inner'
        );
        if (scrollerInner) {
          const scrollerContent = Array.from(scrollerInner.children);

          scrollerContent.forEach(item => {
            const duplicatedItem = item.cloneNode(true) as HTMLElement;
            duplicatedItem.setAttribute('aria-hidden', 'true');
            scrollerInner.appendChild(duplicatedItem);
          });

          setAnimationState(true);
        }
      });
    } else {
      setAnimationState(false);
    }
  }, [scrollInterval, setAnimationState]);
}
