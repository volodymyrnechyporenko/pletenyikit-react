import { RefObject } from 'react';
import { renderHook } from '@testing-library/react';
import useDetectSliderSwipe from '../src/hooks/useDetectSliderSwipe';

describe('useDetectSliderSwipe', () => {
  let mockContainerElement: HTMLDivElement;
  let mockChildElement: HTMLDivElement;
  let mockSetCurrentIndex: jest.Mock;
  let mockContainerRef: RefObject<HTMLDivElement>;
  let addEventListenerSpy: jest.SpyInstance;
  let removeEventListenerSpy: jest.SpyInstance;

  beforeEach(() => {
    mockContainerElement = document.createElement('div');
    mockChildElement = document.createElement('div');
    mockContainerElement.appendChild(mockChildElement);

    Object.defineProperty(mockChildElement, 'offsetWidth', { value: 300 });

    Object.defineProperty(mockContainerElement, 'scrollLeft', {
      value: 0,
      writable: true,
    });

    mockContainerRef = { current: mockContainerElement };
    mockSetCurrentIndex = jest.fn();

    addEventListenerSpy = jest.spyOn(mockContainerElement, 'addEventListener');
    removeEventListenerSpy = jest.spyOn(
      mockContainerElement,
      'removeEventListener',
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should add scroll event listener when container ref is available and route has not changed', () => {
    const routeChanged = false;

    renderHook(() =>
      useDetectSliderSwipe(mockContainerRef, mockSetCurrentIndex, routeChanged),
    );

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
    );
  });

  test('should not add scroll event listener when route has changed', () => {
    const routeChanged = true;

    renderHook(() =>
      useDetectSliderSwipe(mockContainerRef, mockSetCurrentIndex, routeChanged),
    );

    expect(addEventListenerSpy).not.toHaveBeenCalled();
  });

  test('should not add scroll event listener when container ref is null', () => {
    const routeChanged = false;
    const nullContainerRef = { current: null };

    renderHook(() =>
      useDetectSliderSwipe(nullContainerRef, mockSetCurrentIndex, routeChanged),
    );

    expect(addEventListenerSpy).not.toHaveBeenCalled();
  });

  test('should remove event listener on cleanup', () => {
    const routeChanged = false;

    const { unmount } = renderHook(() =>
      useDetectSliderSwipe(mockContainerRef, mockSetCurrentIndex, routeChanged),
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
    );
  });

  test('should calculate correct index when scrolling', () => {
    const routeChanged = false;

    renderHook(() =>
      useDetectSliderSwipe(mockContainerRef, mockSetCurrentIndex, routeChanged),
    );

    const scrollHandler = addEventListenerSpy.mock.calls[0][1] as EventListener;

    Object.defineProperty(mockContainerElement, 'scrollLeft', { value: 0 });
    scrollHandler(new Event('scroll'));
    expect(mockSetCurrentIndex).toHaveBeenCalledWith(0);

    Object.defineProperty(mockContainerElement, 'scrollLeft', { value: 300 });
    scrollHandler(new Event('scroll'));
    expect(mockSetCurrentIndex).toHaveBeenCalledWith(1);

    Object.defineProperty(mockContainerElement, 'scrollLeft', { value: 450 });
    scrollHandler(new Event('scroll'));
    expect(mockSetCurrentIndex).toHaveBeenCalledWith(2);
  });

  test('should handle case when children[0] is undefined', () => {
    const routeChanged = false;
    const emptyContainerElement = document.createElement('div');
    const emptyContainerRef = { current: emptyContainerElement };

    const emptyAddEventListenerSpy = jest.spyOn(
      emptyContainerElement,
      'addEventListener',
    );

    renderHook(() =>
      useDetectSliderSwipe(
        emptyContainerRef,
        mockSetCurrentIndex,
        routeChanged,
      ),
    );

    const scrollHandler = emptyAddEventListenerSpy.mock
      .calls[0][1] as EventListener;

    Object.defineProperty(emptyContainerElement, 'scrollLeft', { value: 100 });
    scrollHandler(new Event('scroll'));

    expect(mockSetCurrentIndex).toHaveBeenCalled();
  });

  test('should re-attach event listeners when dependencies change', () => {
    const routeChanged = false;

    const { rerender } = renderHook(
      ({ routeChanged }) =>
        useDetectSliderSwipe(
          mockContainerRef,
          mockSetCurrentIndex,
          routeChanged,
        ),
      { initialProps: { routeChanged } },
    );

    expect(addEventListenerSpy).toHaveBeenCalledTimes(1);
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(0);
    
    rerender({ routeChanged });

    expect(addEventListenerSpy).toHaveBeenCalledTimes(1);
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(0);

    rerender({ routeChanged: true });

    expect(addEventListenerSpy).toHaveBeenCalledTimes(1);
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(1);
  });
});
