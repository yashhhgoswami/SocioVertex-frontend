import { useEffect } from 'react';

/**
 * useScrollReveal
 * Adds 'is-visible' class to any element with the 'reveal' class when it enters the viewport.
 * Optional data attributes:
 *  data-reveal="left|right|up|down|zoom|flip" (animation direction/type)
 *  data-reveal-delay="ms" (number e.g. 150)
 *  data-reveal-once (boolean presence => only animate first time)
 */
export function useScrollReveal(deps = []) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.reveal'));
    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const el = entry.target;
        if (entry.isIntersecting) {
          const delay = el.dataset.revealDelay;
          if (delay) {
            el.style.transitionDelay = `${parseInt(delay,10)}ms`;
          }
          el.classList.add('is-visible');
          if (el.hasAttribute('data-reveal-once')) observer.unobserve(el);
        } else if (!el.hasAttribute('data-reveal-once')) {
          // allow repeat animations
          el.classList.remove('is-visible');
          el.style.transitionDelay = '';
        }
      });
    }, { threshold: 0.25, rootMargin: '0px 0px -10% 0px' });

    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
