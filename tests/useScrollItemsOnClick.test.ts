import { renderHook } from '@testing-library/react';
import useScrollItemsOnClick from '../src/hooks/useScrollItemsOnClick';
import { act } from 'react';

describe('useScrollItemsOnClick', () => {
  let mockContainerElement: HTMLDivElement;
  let mockChildElements: HTMLDivElement[];

  beforeEach(() => {
    mockContainerElement = document.createElement('div');
    mockChildElements = Array.from({ length: 3 }, () =>
      document.createElement('div'),
    );

    mockChildElements.forEach(child => {
      mockContainerElement.appendChild(child);
    });

    mockChildElements.forEach(child => {
      Object.defineProperty(child, 'offsetWidth', { value: 200 });
    });

    mockContainerElement.scrollTo = jest.fn();
  });

  test('should initialize with a container ref', () => {
    const { result } = renderHook(() => useScrollItemsOnClick());

    expect(result.current.containerRef).toBeDefined();
    expect(result.current.containerRef.current).toBeNull();
  });

  test('should provide handleCardClick function', () => {
    const { result } = renderHook(() => useScrollItemsOnClick());

    expect(typeof result.current.handleCardClick).toBe('function');
  });

  test('should not scroll when containerRef is null', () => {
    const { result } = renderHook(() => useScrollItemsOnClick());

    act(() => {
      result.current.handleCardClick(1);
    });

    expect(mockContainerElement.scrollTo).not.toHaveBeenCalled();
  });

  test('should scroll to correct position when valid index is provided', () => {
    const { result } = renderHook(() => useScrollItemsOnClick());

    act(() => {
      result.current.containerRef.current = mockContainerElement;
    });

    act(() => {
      result.current.handleCardClick(1);
    });

    expect(mockContainerElement.scrollTo).toHaveBeenCalledWith({
      left: 200,
      behavior: 'smooth',
    });
  });

  test('should not scroll when index is out of bounds (negative)', () => {
    const { result } = renderHook(() => useScrollItemsOnClick());

    act(() => {
      result.current.containerRef.current = mockContainerElement;
    });

    act(() => {
      result.current.handleCardClick(-1);
    });

    expect(mockContainerElement.scrollTo).not.toHaveBeenCalled();
  });

  test('should not scroll when index is out of bounds (too large)', () => {
    const { result } = renderHook(() => useScrollItemsOnClick());

    act(() => {
      result.current.containerRef.current = mockContainerElement;
    });

    act(() => {
      result.current.handleCardClick(10);
    });

    expect(mockContainerElement.scrollTo).not.toHaveBeenCalled();
  });

  test('should maintain the same function reference on re-renders', () => {
    const { result, rerender } = renderHook(() => useScrollItemsOnClick());

    const initialHandleClick = result.current.handleCardClick;

    rerender();

    expect(result.current.handleCardClick).toBe(initialHandleClick);
  });
});
