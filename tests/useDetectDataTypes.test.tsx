import { act, renderHook } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ReactNode } from 'react';
import useDetectDataType from 'src/hooks/useDetectDataType';
import { ItemDetails } from '../src/interfaces/interfaces';

jest.mock('../src/data/toys.json', () => [
  {
    id: 1,
    category: 'toys',
    images: ['toy1.jpg'],
    name: 'Test Toy',
    description: ['A test toy'],
    price: 100,
    link: '/toys/1',
  },
]);

jest.mock('../src/data/accessories.json', () => [
  {
    id: 2,
    category: 'accessories',
    images: ['accessory1.jpg'],
    name: 'Test Accessory',
    description: ['A test accessory'],
    price: 50,
    link: '/accessories/2',
  },
]);

jest.mock('../src/data/pillows.json', () => [
  {
    id: 3,
    category: 'pillows',
    images: ['pillow1.jpg'],
    name: 'Test Pillow',
    description: ['A test pillow'],
    price: 75,
    link: '/pillows/3',
  },
]);

jest.mock('../src/data/kitchen.json', () => [
  {
    id: 4,
    category: 'kitchen',
    images: ['kitchen1.jpg'],
    name: 'Test Kitchen Item',
    description: ['A test kitchen item'],
    price: 120,
    link: '/kitchen/4',
  },
]);

const createWrapper = (category: string) => {
  return ({ children }: { children: ReactNode }) => (
    <MemoryRouter initialEntries={[`/category/${category}`]}>
      <Routes>
        <Route path='/category/:category' element={<div>{children}</div>} />
        <Route path='*' element={<div>{children}</div>} />
      </Routes>
    </MemoryRouter>
  );
};

const createWrapperWithoutCategory = (path: string = '/') => {
  return ({ children }: { children: ReactNode }) => (
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path='/' element={<div>{children}</div>} />
        <Route path='/other' element={<div>{children}</div>} />
      </Routes>
    </MemoryRouter>
  );
};

describe('useDetectDataType', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Category Detection and Data Loading', () => {
    it('should load toys data when category is "toys"', () => {
      const wrapper = createWrapper('toys');
      const { result } = renderHook(() => useDetectDataType(), { wrapper });

      expect(result.current.category).toBe('toys');
      expect(result.current.heading).toBe('Іграшки');
      expect(result.current.products).toHaveLength(1);
      expect(result.current.products[0].name).toBe('Test Toy');
      expect(result.current.products[0].category).toBe('toys');
    });

    it('should load accessories data when category is "accessories"', () => {
      const wrapper = createWrapper('accessories');
      const { result } = renderHook(() => useDetectDataType(), { wrapper });

      expect(result.current.category).toBe('accessories');
      expect(result.current.heading).toBe('Аксесуари');
      expect(result.current.products).toHaveLength(1);
      expect(result.current.products[0].name).toBe('Test Accessory');
      expect(result.current.products[0].category).toBe('accessories');
    });

    it('should load pillows data when category is "pillows"', () => {
      const wrapper = createWrapper('pillows');
      const { result } = renderHook(() => useDetectDataType(), { wrapper });

      expect(result.current.category).toBe('pillows');
      expect(result.current.heading).toBe('Подушки');
      expect(result.current.products).toHaveLength(1);
      expect(result.current.products[0].name).toBe('Test Pillow');
      expect(result.current.products[0].category).toBe('pillows');
    });

    it('should load kitchen data when category is "kitchen"', () => {
      const wrapper = createWrapper('kitchen');
      const { result } = renderHook(() => useDetectDataType(), { wrapper });

      expect(result.current.category).toBe('kitchen');
      expect(result.current.heading).toBe('Для кухні');
      expect(result.current.products).toHaveLength(1);
      expect(result.current.products[0].name).toBe('Test Kitchen Item');
      expect(result.current.products[0].category).toBe('kitchen');
    });
  });

  describe('Invalid Category Handling', () => {
    it('should handle invalid category with empty products and default heading', () => {
      const wrapper = createWrapper('invalid');
      const { result } = renderHook(() => useDetectDataType(), { wrapper });

      expect(result.current.category).toBe('invalid');
      expect(result.current.heading).toBe('Товари');
      expect(result.current.products).toEqual([]);
    });

    it('should handle undefined category when no route parameter exists', () => {
      const wrapper = createWrapperWithoutCategory('/');
      const { result } = renderHook(() => useDetectDataType(), { wrapper });

      expect(result.current.category).toBeUndefined();
      expect(result.current.heading).toBe('Товари');
      expect(result.current.products).toEqual([]);
    });

    it('should handle routes without category parameter', () => {
      const wrapper = createWrapperWithoutCategory('/other');
      const { result } = renderHook(() => useDetectDataType(), { wrapper });

      expect(result.current.category).toBeUndefined();
      expect(result.current.heading).toBe('Товари');
      expect(result.current.products).toEqual([]);
    });
  });

  describe('Return Values and API', () => {
    it('should return all expected properties', () => {
      const wrapper = createWrapper('toys');
      const { result } = renderHook(() => useDetectDataType(), { wrapper });

      expect(result.current).toHaveProperty('category');
      expect(result.current).toHaveProperty('heading');
      expect(result.current).toHaveProperty('products');
      expect(result.current).toHaveProperty('setProducts');
      expect(typeof result.current.setProducts).toBe('function');
    });

    it('should provide setProducts function that updates products state', () => {
      const wrapper = createWrapper('toys');
      const { result } = renderHook(() => useDetectDataType(), { wrapper });

      const newProducts: ItemDetails[] = [
        {
          id: 999,
          category: 'custom',
          images: ['custom.jpg'],
          name: 'Custom Product',
          description: ['Custom description'],
          price: 200,
          link: '/custom/999',
        },
      ];

      act(() => {
        result.current.setProducts(newProducts);
      });

      expect(result.current.products).toEqual(newProducts);
      expect(result.current.products).toHaveLength(1);
      expect(result.current.products[0].name).toBe('Custom Product');

      expect(result.current.category).toBe('toys');
      expect(result.current.heading).toBe('Іграшки');
    });

    it('should allow clearing products using setProducts', () => {
      const wrapper = createWrapper('toys');
      const { result } = renderHook(() => useDetectDataType(), { wrapper });

      expect(result.current.products).toHaveLength(1);

      act(() => {
        result.current.setProducts([]);
      });

      expect(result.current.products).toEqual([]);

      expect(result.current.category).toBe('toys');
      expect(result.current.heading).toBe('Іграшки');
    });
  });

  describe('Data Immutability', () => {
    it('should create independent copies of data for different instances', () => {
      const wrapper1 = createWrapper('toys');
      const wrapper2 = createWrapper('toys');

      const { result: result1 } = renderHook(() => useDetectDataType(), {
        wrapper: wrapper1,
      });
      const { result: result2 } = renderHook(() => useDetectDataType(), {
        wrapper: wrapper2,
      });

      expect(result1.current.products).toEqual(result2.current.products);

      act(() => {
        result1.current.setProducts([]);
      });

      expect(result1.current.products).toHaveLength(0);
      expect(result2.current.products).toHaveLength(1);
    });
  });

  describe('Effect Dependencies', () => {
    it('should not re-run effect when category stays the same', () => {
      const { result, rerender } = renderHook(() => useDetectDataType(), {
        wrapper: createWrapper('toys'),
      });

      const initialProducts = result.current.products;
      const initialHeading = result.current.heading;

      rerender({ wrapper: createWrapper('toys') });

      expect(result.current.products).toEqual(initialProducts);
      expect(result.current.heading).toBe(initialHeading);
    });
  });

  describe('JSON Data Deep Copy Verification', () => {
    it('should not mutate original imported data', () => {
      const wrapper = createWrapper('toys');
      const { result } = renderHook(() => useDetectDataType(), { wrapper });

      const products = result.current.products;
      const originalLength = products.length;

      act(() => {
        result.current.setProducts([
          ...products,
          {
            id: 100,
            category: 'toys',
            images: ['modified.jpg'],
            name: 'Modified Product',
            description: ['Modified'],
            price: 999,
            link: '/modified',
          },
        ]);
      });

      expect(result.current.products).toHaveLength(originalLength + 1);

      const { result: newResult } = renderHook(() => useDetectDataType(), {
        wrapper: createWrapper('toys'),
      });

      expect(newResult.current.products).toHaveLength(originalLength);
      expect(newResult.current.products[0].name).toBe('Test Toy');
    });
  });
});
