import React from 'react';

/**
 * CountUp component
 * Props:
 *  - value: target number (Number)
 *  - duration: ms for animation (default 1800)
 *  - formatter: optional (n)=>string to format display
 *  - startOnVisible: boolean (default true) uses IntersectionObserver
 *  - suffix: string appended after number (e.g., 'M')
 *  - decimal: number of decimal places (optional)
 */
export default function CountUp({ value, duration = 1800, formatter, startOnVisible = true, suffix = '', decimal, className }) {
  const ref = React.useRef(null);
  const [display, setDisplay] = React.useState(0);
  const [hasRun, setHasRun] = React.useState(false);

  React.useEffect(() => {
    if (!startOnVisible) {
      start();
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasRun) {
          start();
          setHasRun(true);
        }
      });
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, duration, startOnVisible, hasRun]);

  function start() {
    const startTime = performance.now();
    const from = 0;
    const to = value;
    function frame(now) {
      const progress = Math.min(1, (now - startTime) / duration);
      const eased = easeOutCubic(progress);
      const current = from + (to - from) * eased;
      setDisplay(current);
      if (progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  function format(val) {
    if (formatter) return formatter(val);
    if (decimal != null) return val.toFixed(decimal) + suffix;
    // Abbreviate: assume values may be large (M denotes millions) if suffix provided
    return Math.round(val) + suffix;
  }

  return <span ref={ref} className={className}>{format(display)}</span>;
}
