import useScrollToAnchor from '../src/hooks/useScrollToAnchor';
import { useLocation } from 'react-router-dom';
import { renderHook } from '@testing-library/react';
import { act } from 'react';

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
}));

describe('useScrollToAnchor', () => {
  let mockElement: HTMLElement;
  let mockGetElementById: jest.SpyInstance;
  let mockScrollTo: jest.SpyInstance;

  beforeEach(() => {
    jest.useFakeTimers();

    mockElement = document.createElement('div');

    mockGetElementById = jest
      .spyOn(document, 'getElementById')
      .mockImplementation(id => (id === 'test-anchor' ? mockElement : null));

    mockElement.getBoundingClientRect = jest.fn().mockReturnValue({
      top: 500,
      left: 0,
      right: 0,
      bottom: 0,
      width: 0,
      height: 0,
    });

    mockScrollTo = jest.spyOn(window, 'scrollTo').mockImplementation(jest.fn());

    Object.defineProperty(window, 'scrollY', {
      value: 100,
      configurable: true,
    });

    (useLocation as jest.Mock).mockReturnValue({ hash: '' });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  test('should scroll to element when hash exists and element exists', () => {
    (useLocation as jest.Mock).mockReturnValue({ hash: '#test-anchor' });

    renderHook(() => useScrollToAnchor(100));

    jest.runAllTimers();

    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 500,
      behavior: 'smooth',
    });
  });

  test('should not scroll when there is no hash in location', () => {
    (useLocation as jest.Mock).mockReturnValue({ hash: '' });

    renderHook(() => useScrollToAnchor(100));

    expect(mockScrollTo).not.toHaveBeenCalled();
  });

  test('should not scroll when element with hash id does not exist', () => {
    (useLocation as jest.Mock).mockReturnValue({ hash: '#nonexistent' });
    mockGetElementById.mockReturnValue(null);

    renderHook(() => useScrollToAnchor(100));

    expect(mockScrollTo).not.toHaveBeenCalled();
  });

  test('scrollToAnchor function should work correctly', () => {
    (useLocation as jest.Mock).mockReturnValue({ hash: '' });

    const { result } = renderHook(() => useScrollToAnchor(100));

    expect(mockScrollTo).not.toHaveBeenCalled();

    act(() => {
      result.current.scrollToAnchor('test-anchor');
    });

    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 500,
      behavior: 'smooth',
    });
  });

  test('should clean up timeout on unmount', () => {
    jest.useRealTimers();
    const clearTimeoutSpy = jest.spyOn(window, 'clearTimeout');

    (useLocation as jest.Mock).mockReturnValue({ hash: '#test-anchor' });

    const { unmount } = renderHook(() => useScrollToAnchor(100));

    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();

    jest.useFakeTimers();
  });
});
