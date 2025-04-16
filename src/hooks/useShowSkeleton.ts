import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const useShowSkeleton = () => {
  const [showSkeleton, setShowSkeleton] = useState(true);

  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return showSkeleton;
};

export default useShowSkeleton;
