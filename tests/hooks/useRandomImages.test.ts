import { renderHook, waitFor } from '@testing-library/react';
import { shuffleArray } from '../../src/utils/shuffleArray';
import useRandomImages from '../../src/hooks/useRandomImages';

jest.mock('../../src/utils/shuffleArray');
jest.mock('../../src/utils/shuffleArray');
jest.mock('../../src/constants/conditions', () => ({
  careConditionsImages: [
    'care-conditions-01.jpeg',
    'care-conditions-02.jpeg',
    'care-conditions-03.jpeg',
    'care-conditions-04.jpeg',
    'care-conditions-05.jpeg',
    'care-conditions-06.jpeg',
  ],
}));

const mockShuffleArray = shuffleArray as jest.MockedFunction<
  typeof shuffleArray
>;

describe('useRandomImages', () => {
  const mockImages = [
    'care-conditions-01.jpeg',
    'care-conditions-02.jpeg',
    'care-conditions-03.jpeg',
    'care-conditions-04.jpeg',
    'care-conditions-05.jpeg',
    'care-conditions-06.jpeg',
  ];

  const mockShuffledImages = [
    'care-conditions-03.jpeg',
    'care-conditions-01.jpeg',
    'care-conditions-05.jpeg',
    'care-conditions-02.jpeg',
    'care-conditions-06.jpeg',
    'care-conditions-04.jpeg',
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    mockShuffleArray.mockReturnValue(mockShuffledImages);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should call shuffleArray with careConditionsImages on mount', () => {
    renderHook(() => useRandomImages());

    expect(mockShuffleArray).toHaveBeenCalledTimes(1);
    expect(mockShuffleArray).toHaveBeenCalledWith(mockImages);
  });

  it('should return shuffled images after effect runs', async () => {
    const { result } = renderHook(() => useRandomImages());

    await waitFor(() => {
      expect(result.current).toEqual(mockShuffledImages);
    });
  });

  it('should only shuffle images once on mount', () => {
    const { rerender } = renderHook(() => useRandomImages());

    rerender();
    rerender();
    rerender();

    expect(mockShuffleArray).toHaveBeenCalledTimes(1);
  });

  it('should maintain referential stability of returned array between renders', async () => {
    const { result, rerender } = renderHook(() => useRandomImages());

    await waitFor(() => {
      expect(result.current).toEqual(mockShuffledImages);
    });

    const firstResult = result.current;

    rerender();
    const secondResult = result.current;

    expect(firstResult).toBe(secondResult);
  });

  it('should preserve the original array structure', async () => {
    const { result } = renderHook(() => useRandomImages());

    await waitFor(() => {
      expect(result.current).toEqual(mockShuffledImages);
    });

    expect(result.current).toHaveLength(mockImages.length);

    expect(result.current.sort()).toEqual(mockImages.sort());
  });

  describe('edge cases with different array inputs', () => {
    it('should handle empty array from shuffleArray', async () => {
      mockShuffleArray.mockReturnValue([]);

      const { result } = renderHook(() => useRandomImages());

      await waitFor(() => {
        expect(result.current).toEqual([]);
      });
    });

    it('should handle single item array from shuffleArray', async () => {
      const singleImage = ['care-conditions-01.jpeg'];
      mockShuffleArray.mockReturnValue(singleImage);

      const { result } = renderHook(() => useRandomImages());

      await waitFor(() => {
        expect(result.current).toEqual(singleImage);
      });
    });

    it('should handle shuffleArray returning different order', async () => {
      const differentOrder = [
        'care-conditions-06.jpeg',
        'care-conditions-01.jpeg',
        'care-conditions-04.jpeg',
        'care-conditions-02.jpeg',
        'care-conditions-05.jpeg',
        'care-conditions-03.jpeg',
      ];
      mockShuffleArray.mockReturnValue(differentOrder);

      const { result } = renderHook(() => useRandomImages());

      await waitFor(() => {
        expect(result.current).toEqual(differentOrder);
      });

      expect(result.current.sort()).toEqual(mockImages.sort());
    });
  });

  describe('integration with real dependencies', () => {
    beforeEach(() => {
      jest.restoreAllMocks();
    });

    it('should work with real shuffleArray function', async () => {
      jest.unmock('../../src/utils/shuffleArray');
      jest.unmock('../../src/constants/conditions');

      const { result } = renderHook(() => useRandomImages());

      await waitFor(() => {
        expect(result.current).toHaveLength(6);
      });

      const expectedImages = [
        'care-conditions-01.jpeg',
        'care-conditions-02.jpeg',
        'care-conditions-03.jpeg',
        'care-conditions-04.jpeg',
        'care-conditions-05.jpeg',
        'care-conditions-06.jpeg',
      ];

      expect(result.current.sort()).toEqual(expectedImages.sort());
    });
  });
});
