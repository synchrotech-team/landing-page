'use client';

import { motion, useScroll, useTransform, useMotionValue, useMotionValueEvent, useSpring, MotionValue } from 'framer-motion';
import { useIsMobile } from './use-is-mobile';

interface ScrollFillWordsProps {
  words: string[];
  /** Scroll distance (px) needed to fully fill one word. */
  stepPx?: number;
  className?: string;
}

// Paints each word purple as the page scrolls, left-to-right, one word per
// scroll step — unfilled text stays the same color as the background.
// Fill only ratchets forward: scrolling back up never un-fills a word.
export function ScrollFillWords({ words, stepPx = 80, className = '' }: ScrollFillWordsProps) {
  const isMobile = useIsMobile();
  const { scrollY } = useScroll();
  const maxScrollY = useMotionValue(0);
  const smoothScrollY = useSpring(maxScrollY, { stiffness: 120, damping: 24, mass: 0.5 });

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest > maxScrollY.get()) maxScrollY.set(latest);
  });

  if (isMobile) {
    return (
      <span className={className} style={{ color: 'var(--color-purple-electric)' }}>
        {words.join(' ')}
      </span>
    );
  }

  return (
    <span className={className}>
      {words.map((word, i) => (
        <FillWord
          key={word + i}
          word={word}
          scrollY={smoothScrollY}
          start={i * stepPx}
          end={(i + 1) * stepPx}
          trailingSpace={i < words.length - 1}
        />
      ))}
    </span>
  );
}

function FillWord({
  word,
  scrollY,
  start,
  end,
  trailingSpace,
}: {
  word: string;
  scrollY: MotionValue<number>;
  start: number;
  end: number;
  trailingSpace: boolean;
}) {
  const fill = useTransform(scrollY, [start, end], ['0%', '100%']);

  return (
    <>
      <motion.span
        style={{
          '--fill': fill,
          backgroundImage:
            'linear-gradient(to right, var(--color-purple-electric) var(--fill), var(--color-background) var(--fill))',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          color: 'transparent',
        } as React.CSSProperties}
      >
        {word}
      </motion.span>
      {trailingSpace ? ' ' : ''}
    </>
  );
}
