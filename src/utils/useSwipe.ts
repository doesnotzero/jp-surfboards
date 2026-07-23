import { useRef } from 'react';

/**
 * Hook simples de swipe horizontal para touch (mobile).
 * Retorna handlers para colocar em um elemento; chama onSwipeLeft/onSwipeRight
 * quando o arrasto horizontal for maior que o threshold e mais horizontal
 * do que vertical (evita conflito com scroll vertical da página).
 */
export function useSwipe(onSwipeLeft: () => void, onSwipeRight: () => void, threshold = 40) {
  const startX = useRef(0);
  const startY = useRef(0);
  const tracking = useRef(false);

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
    tracking.current = true;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!tracking.current) return;
    tracking.current = false;
    const dx = e.changedTouches[0].clientX - startX.current;
    const dy = e.changedTouches[0].clientY - startY.current;
    if (Math.abs(dx) < threshold || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) onSwipeLeft();
    else onSwipeRight();
  };

  return { onTouchStart, onTouchEnd };
}
