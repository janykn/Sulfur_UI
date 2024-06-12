import { useState, useEffect } from 'react';

const useScroll = () => {
  const [scrollPosition, setScrollPosition] = useState({ scrollX: 0, scrollY: 0 });

  const handleScroll = () => {
    setScrollPosition({
      scrollX: window.scrollX,
      scrollY: window.scrollY,
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollPosition;
};

export default useScroll;
