import { useState } from 'react';
import { shuffleArray } from '../utils/shuffleArray';
import { careConditionsImages } from '../constants/conditions';

const useRandomImages = () => {
  const [imageSet] = useState<string[]>(() =>
    shuffleArray([...careConditionsImages]),
  );

  return imageSet;
};

export default useRandomImages;
