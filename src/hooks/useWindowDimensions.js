import { useState, useEffect } from 'react';

function getWindowDimensions() {
  const {innerWidth: width} = window;
  return {width};
}

function useWindowDimensions() {

  const [windowDimensions, setWindowDimensions] = useState('');

  useEffect(() => {
    function handleResize() {
      clearTimeout();
      setTimeout(setWindowDimensions(getWindowDimensions()), 1000);
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return windowDimensions;
};

export default useWindowDimensions;