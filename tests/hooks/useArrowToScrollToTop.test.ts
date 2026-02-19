import { renderHook } from '@testing-library/react';
import { act } from 'react';
import useArrowToScrollToTop from '../../src/hooks/useArrowToScrollToTop';

describe('useArrowToScrollToTop', () => {
  let originalScrollTo: typeof window.scrollTo;

  beforeEach(() => {
    originalScrollTo = window.scrollTo;
    window.scrollTo = jest.fn(
      (options?: ScrollToOptions | number, y?: number) => {
        if (
          typeof options === 'object' &&
          options &&
          typeof options.top === 'number'
        ) {
          Object.defineProperty(window, 'scrollY', {
            value: options.top,
            writable: true,
            configurable: true,
          });
        } else if (typeof options === 'number' && typeof y === 'number') {
          Object.defineProperty(window, 'scrollY', {
            value: y,
            writable: true,
            configurable: true,
          });
        }
      },
    ) as typeof window.scrollTo;
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    window.scrollTo = originalScrollTo;
    jest.resetAllMocks();
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: false,
      configurable: true,
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should initialize isVisible to false', () => {
    const { result } = renderHook(() => useArrowToScrollToTop());
    expect(result.current.isVisible).toBe(false);
  });

  it('should set isVisible to true when scrollY is greater than 300', () => {
    const { result } = renderHook(() => useArrowToScrollToTop());

    act(() => {
      window.scrollTo(0, 500);
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current.isVisible).toBe(true);
  });

  it('should set isVisible to false when scrollY is less than or equal to 300', () => {
    const { result } = renderHook(() => useArrowToScrollToTop());

    act(() => {
      window.scrollTo(0, 200);
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current.isVisible).toBe(false);
  });

  it('should scroll to top when scrollTop is called', () => {
    window.scrollTo = jest.fn();
    const { result } = renderHook(() => useArrowToScrollToTop());

    act(() => {
      window.scrollTo(0, 500);
      window.dispatchEvent(new Event('scroll'));
    });

    act(() => {
      result.current.scrollTop();
    });

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  });

  it('should add and remove scroll event listener', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    const { unmount } = renderHook(() => useArrowToScrollToTop());

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
      { passive: true },
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
    );

    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  it('should correctly handle multiple renders', () => {
    const { result, rerender } = renderHook(() => useArrowToScrollToTop());

    act(() => {
      window.scrollTo(0, 500);
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current.isVisible).toBe(true);

    rerender();

    expect(result.current.isVisible).toBe(true);
  });
});
