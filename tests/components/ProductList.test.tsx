import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import '@testing-library/jest-dom';
import useDetectDataType from '../../src/hooks/useDetectDataType';
import ProductList from '../../src/components/ProductList/ProductList';
import { ItemDetails } from '../../src/interfaces/interfaces';

jest.mock('../../src/hooks/useDetectDataType');

jest.mock('../../src/components/Product/Product', () => {
  return function MockProduct({
    product,
    type,
  }: {
    product: ItemDetails;
    type: string;
  }) {
    return (
      <div data-testid={`product-${product.id}`}>
        <span>{product.name}</span>
        <span>${product.price || 0}</span>
        <span>{type}</span>
      </div>
    );
  };
});

jest.mock('../../src/constants/texts', () => ({
  filterTitle: 'Сортування',
}));

jest.mock('../../src/components/ProductList/ProductList.module.scss', () => ({
  'filter-heading': 'filter-heading',
  'filter-button-wrap': 'filter-button-wrap',
  'filter-button': 'filter-button',
}));

const mockUseDetectDataType = useDetectDataType as jest.MockedFunction<
  typeof useDetectDataType
>;

const mockSetProducts = jest.fn();

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <HelmetProvider>
    <BrowserRouter>{children}</BrowserRouter>
  </HelmetProvider>
);

const sortByCheapTestId = 'sort-by-cheap';
const sortByExpensiveTestId = 'sort-by-expensive';

describe('ProductList Component', () => {
  const mockProducts = [
    {
      id: 1,
      name: 'Product 1',
      price: 100,
      link: 'product-1',
      images: ['image1.jpg'],
    },
    {
      id: 2,
      name: 'Product 2',
      price: 50,
      link: 'product-2',
      images: ['image2.jpg'],
    },
    {
      id: 3,
      name: 'Product 3',
      price: 200,
      link: 'product-3',
      images: ['image3.jpg'],
    },
  ] as ItemDetails[];

  const defaultMockReturnValue = {
    category: 'toys',
    heading: 'Іграшки',
    products: mockProducts as ItemDetails[],
    setProducts: mockSetProducts,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseDetectDataType.mockReturnValue(defaultMockReturnValue);
  });

  describe('Rendering', () => {
    it('renders the heading correctly', () => {
      const screen = render(
        <TestWrapper>
          <ProductList />
        </TestWrapper>,
      );

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Іграшки',
      );
    });

    it('renders the sorting title', () => {
      const screen = render(
        <TestWrapper>
          <ProductList />
        </TestWrapper>,
      );

      expect(screen.getByText('Сортування')).toBeInTheDocument();
    });

    it('renders sorting buttons', () => {
      const screen = render(
        <TestWrapper>
          <ProductList />
        </TestWrapper>,
      );

      expect(screen.getByTestId(sortByCheapTestId)).toBeInTheDocument();
      expect(screen.getByTestId(sortByExpensiveTestId)).toBeInTheDocument();
    });

    it('renders products with correct links', () => {
      const screen = render(
        <TestWrapper>
          <ProductList />
        </TestWrapper>,
      );

      const links = screen.getAllByRole('link');
      expect(links).toHaveLength(3);

      expect(links[0]).toHaveAttribute('href', '/toys/product-1');
      expect(links[1]).toHaveAttribute('href', '/toys/product-2');
      expect(links[2]).toHaveAttribute('href', '/toys/product-3');
    });

    it('passes correct props to Product components', () => {
      const screen = render(
        <TestWrapper>
          <ProductList />
        </TestWrapper>,
      );

      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Product 2')).toBeInTheDocument();
      expect(screen.getByText('Product 3')).toBeInTheDocument();
      expect(screen.getAllByText('product')).toHaveLength(3);
    });
  });

  describe('Sorting Functionality', () => {
    it('sorts products by price high to low when expensive filter is clicked', () => {
      const screen = render(
        <TestWrapper>
          <ProductList />
        </TestWrapper>,
      );

      const sortByExpensiveButton = screen.getByTestId(sortByExpensiveTestId);
      fireEvent.click(sortByExpensiveButton);

      expect(mockSetProducts).toHaveBeenCalledWith([
        {
          id: 3,
          images: ['image3.jpg'],
          link: 'product-3',
          name: 'Product 3',
          price: 200,
        },
        {
          id: 1,
          images: ['image1.jpg'],
          link: 'product-1',
          name: 'Product 1',
          price: 100,
        },
        {
          id: 2,
          images: ['image2.jpg'],
          link: 'product-2',
          name: 'Product 2',
          price: 50,
        },
      ]);
    });

    it('sorts products by price low to high when cheap filter is clicked', () => {
      const screen = render(
        <TestWrapper>
          <ProductList />
        </TestWrapper>,
      );

      const sortByCheapButton = screen.getByTestId(sortByCheapTestId);
      fireEvent.click(sortByCheapButton);

      expect(mockSetProducts).toHaveBeenCalledWith([
        {
          id: 2,
          images: ['image2.jpg'],
          link: 'product-2',
          name: 'Product 2',
          price: 50,
        },
        {
          id: 1,
          images: ['image1.jpg'],
          link: 'product-1',
          name: 'Product 1',
          price: 100,
        },
        {
          id: 3,
          images: ['image3.jpg'],
          link: 'product-3',
          name: 'Product 3',
          price: 200,
        },
      ]);
    });

    it('does not mutate the original products array when sorting', () => {
      const screen = render(
        <TestWrapper>
          <ProductList />
        </TestWrapper>,
      );

      const originalProducts = [...mockProducts];
      const cheapFilterButton = screen.getByTestId(sortByCheapTestId);

      fireEvent.click(cheapFilterButton);

      expect(mockProducts).toEqual(originalProducts);
    });
  });

  describe('Edge Cases', () => {
    it('renders correctly with empty products array', () => {
      mockUseDetectDataType.mockReturnValue({
        ...defaultMockReturnValue,
        products: [],
      });

      const screen = render(
        <TestWrapper>
          <ProductList />
        </TestWrapper>,
      );

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Іграшки',
      );
      expect(screen.getByText('Сортування')).toBeInTheDocument();
      expect(screen.queryByTestId(/^product-/)).not.toBeInTheDocument();
    });

    it('renders correctly with single product', () => {
      const singleProduct = [mockProducts[0]] as ItemDetails[];
      mockUseDetectDataType.mockReturnValue({
        ...defaultMockReturnValue,
        products: singleProduct,
      });

      const screen = render(
        <TestWrapper>
          <ProductList />
        </TestWrapper>,
      );

      const productElements = screen.getAllByTestId(/^product-/);
      expect(productElements).toHaveLength(1);
      expect(productElements[0]).toHaveAttribute('data-testid', 'product-1');
    });

    it('handles products with same price correctly', () => {
      const samePrice = [
        {
          id: 1,
          name: 'Product 1',
          price: 100,
          link: 'product-1',
          images: ['image1.jpg'],
        },
        {
          id: 2,
          name: 'Product 2',
          price: 100,
          link: 'product-2',
          images: ['image2.jpg'],
        },
      ] as ItemDetails[];

      mockUseDetectDataType.mockReturnValue({
        ...defaultMockReturnValue,
        products: samePrice,
      });

      const screen = render(
        <TestWrapper>
          <ProductList />
        </TestWrapper>,
      );

      const cheapFilterButton = screen.getByTestId(sortByCheapTestId);
      fireEvent.click(cheapFilterButton);

      expect(mockSetProducts).toHaveBeenCalledWith(samePrice);
    });
  });
});

describe('CSS Classes', () => {
  it('applies correct CSS classes', () => {
    const screen = render(
      <TestWrapper>
        <ProductList />
      </TestWrapper>,
    );

    expect(screen.getByText('Сортування')).toHaveClass('filter-heading');
    expect(screen.getByTestId(sortByCheapTestId).parentElement).toHaveClass(
      'filter-button-wrap',
    );
    expect(screen.getByTestId(sortByCheapTestId)).toHaveClass('filter-button');
    expect(screen.getByTestId(sortByExpensiveTestId)).toHaveClass(
      'filter-button',
    );
  });
});

describe('Accessibility', () => {
  it('has proper heading structure', () => {
    const screen = render(
      <TestWrapper>
        <ProductList />
      </TestWrapper>,
    );

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Іграшки');
  });

  it('filter buttons are clickable', () => {
    const screen = render(
      <TestWrapper>
        <ProductList />
      </TestWrapper>,
    );

    const cheapButton = screen.getByTestId(sortByCheapTestId);
    const expensiveButton = screen.getByTestId(sortByExpensiveTestId);

    expect(cheapButton).toBeInTheDocument();
    expect(expensiveButton).toBeInTheDocument();

    fireEvent.click(cheapButton);
    fireEvent.click(expensiveButton);

    expect(mockSetProducts).toHaveBeenCalledTimes(3);
  });
});
