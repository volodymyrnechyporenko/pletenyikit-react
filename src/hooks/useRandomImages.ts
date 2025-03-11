import accessories from '@data/accessories';
import kitchen from '@data/kitchen';
import pillows from '@data/pillows';
import toys from '@data/toys';
import { useEffect, useMemo, useState } from 'react';
import { shuffleArray } from '@utils/shuffleArray';
import { ImagePaths } from '@interfaces/interfaces';

const useRandomImages = () => {
  const [imageSet, setImageSet] = useState<string[]>([]);

  const arrayToShuffle = useMemo(() => {
    const dataArrays: ImagePaths[][] = [
      accessories,
      kitchen,
      pillows,
      toys,
    ];

    return dataArrays.flatMap((array) =>
      array.slice(-3).map((item) => item.images[0])
    );
  }, []);

  useEffect(() => {
    setImageSet(shuffleArray(arrayToShuffle))
  }, [arrayToShuffle]);

  return imageSet
}

export default useRandomImages;
