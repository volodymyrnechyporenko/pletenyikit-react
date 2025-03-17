import { useEffect, useState } from 'react';
import { shuffleArray } from '../utils/shuffleArray';
import { careConditionsImages } from '../constants/conditions';

const useRandomImages = () => {
  const [imageSet, setImageSet] = useState<string[]>([]);

  useEffect(() => {
    setImageSet(shuffleArray(careConditionsImages));
  }, []);

  return imageSet;
};

export default useRandomImages;
