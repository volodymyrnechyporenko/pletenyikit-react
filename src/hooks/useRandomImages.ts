import { useEffect, useState } from 'react';
import { shuffleArray } from '@utils/shuffleArray';
import { careConditions } from '../data/conditions';

const useRandomImages = () => {
  const [imageSet, setImageSet] = useState<string[]>([]);

  useEffect(() => {
    setImageSet(shuffleArray(careConditions));
  }, []);

  return imageSet;
};

export default useRandomImages;
