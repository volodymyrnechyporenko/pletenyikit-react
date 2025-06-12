import { shuffleArray } from '../../src/utils/shuffleArray';

describe('shuffleArray', () => {
  it('should shuffle the array', () => {
    const originalArray = ['a', 'b', 'c', 'd', 'e'];
    const shuffledArray = shuffleArray([...originalArray]);

    expect(shuffledArray).not.toEqual(originalArray);

    expect(shuffledArray.sort()).toEqual(originalArray.sort());
  });

  it('should handle an empty array', () => {
    const emptyArray: string[] = [];
    const shuffledEmptyArray = shuffleArray(emptyArray);
    expect(shuffledEmptyArray).toEqual(emptyArray);
  });

  it('should handle an array with one element', () => {
    const singleElementArray = ['a'];
    const shuffledSingleElementArray = shuffleArray([...singleElementArray]);
    expect(shuffledSingleElementArray).toEqual(singleElementArray);
  });

  it('should shuffle the array multiple times and check for different results', () => {
    const originalArray = ['a', 'b', 'c', 'd'];
    const shuffled1 = shuffleArray([...originalArray]);
    const shuffled2 = shuffleArray([...originalArray]);

    expect(shuffled1).not.toEqual(shuffled2);
    expect(shuffled1.sort()).toEqual(originalArray.sort());
    expect(shuffled2.sort()).toEqual(originalArray.sort());
  });
});
