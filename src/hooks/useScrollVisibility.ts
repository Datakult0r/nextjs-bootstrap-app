import { useState, useEffect, useCallback } from "react";

export function useScrollVisibility(scrollThreshold = 0) {
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    setIsVisible(currentScrollY <= lastScrollY);
    setIsAtTop(currentScrollY <= scrollThreshold);
    setLastScrollY(currentScrollY);
  }, [lastScrollY, scrollThreshold]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return { isVisible, isAtTop };
}
