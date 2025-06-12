import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
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
  filterCheap: 'від дешевших',
  filterExpensive: 'від дорожчих',
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
  <BrowserRouter>{children}</BrowserRouter>
);

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
      render(
        <TestWrapper>
          <ProductList />
        </TestWrapper>,
      );

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Іграшки',
      );
    });

    it('renders the filter title', () => {
      render(
        <TestWrapper>
          <ProductList />
        </TestWrapper>,
      );

      expect(screen.getByText('Сортування')).toBeInTheDocument();
    });

    it('renders filter buttons', () => {
      render(
        <TestWrapper>
          <ProductList />
        </TestWrapper>,
      );

      expect(screen.getByText('від дешевших')).toBeInTheDocument();
      expect(screen.getByText('від дорожчих')).toBeInTheDocument();
    });

    it('renders all products in reverse order', () => {
      render(
        <TestWrapper>
          <ProductList />
        </TestWrapper>,
      );

      const productElements = screen.getAllByTestId(/^product-/);
      expect(productElements).toHaveLength(3);

      expect(productElements[0]).toHaveAttribute('data-testid', 'product-3');
      expect(productElements[1]).toHaveAttribute('data-testid', 'product-2');
      expect(productElements[2]).toHaveAttribute('data-testid', 'product-1');
    });

    it('renders products with correct links', () => {
      render(
        <TestWrapper>
          <ProductList />
        </TestWrapper>,
      );

      const links = screen.getAllByRole('link');
      expect(links).toHaveLength(3);

      expect(links[0]).toHaveAttribute('href', '/toys/product-3');
      expect(links[1]).toHaveAttribute('href', '/toys/product-2');
      expect(links[2]).toHaveAttribute('href', '/toys/product-1');
    });

    it('passes correct props to Product components', () => {
      render(
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

  describe('Filtering Functionality', () => {
    it('sorts products by price low to high when cheap filter is clicked', () => {
      render(
        <TestWrapper>
          <ProductList />
        </TestWrapper>,
      );

      const cheapFilterButton = screen.getByText('від дешевших');
      fireEvent.click(cheapFilterButton);

      expect(mockSetProducts).toHaveBeenCalledWith([
        {
          id: 2,
          name: 'Product 2',
          price: 50,
          link: 'product-2',
          images: ['image2.jpg'],
        },
        {
          id: 1,
          name: 'Product 1',
          price: 100,
          link: 'product-1',
          images: ['image1.jpg'],
        },
        {
          id: 3,
          name: 'Product 3',
          price: 200,
          link: 'product-3',
          images: ['image3.jpg'],
        },
      ]);
    });

    it('sorts products by price high to low when expensive filter is clicked', () => {
      render(
        <TestWrapper>
          <ProductList />
        </TestWrapper>,
      );

      const expensiveFilterButton = screen.getByText('від дорожчих');
      fireEvent.click(expensiveFilterButton);

      expect(mockSetProducts).toHaveBeenCalledWith([
        {
          id: 3,
          name: 'Product 3',
          price: 200,
          link: 'product-3',
          images: ['image3.jpg'],
        },
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
      ]);
    });

    it('does not mutate the original products array when sorting', () => {
      render(
        <TestWrapper>
          <ProductList />
        </TestWrapper>,
      );

      const originalProducts = [...mockProducts];
      const cheapFilterButton = screen.getByText('від дешевших');

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

      render(
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

      render(
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

      render(
        <TestWrapper>
          <ProductList />
        </TestWrapper>,
      );

      const cheapFilterButton = screen.getByText('від дешевших');
      fireEvent.click(cheapFilterButton);

      expect(mockSetProducts).toHaveBeenCalledWith(samePrice);
    });
  });
});

describe('CSS Classes', () => {
  it('applies correct CSS classes', () => {
    render(
      <TestWrapper>
        <ProductList />
      </TestWrapper>,
    );

    expect(screen.getByText('Сортування')).toHaveClass('filter-heading');
    expect(screen.getByText('від дешевших').parentElement).toHaveClass(
      'filter-button-wrap',
    );
    expect(screen.getByText('від дешевших')).toHaveClass('filter-button');
    expect(screen.getByText('від дорожчих')).toHaveClass('filter-button');
  });
});

describe('Accessibility', () => {
  it('has proper heading structure', () => {
    render(
      <TestWrapper>
        <ProductList />
      </TestWrapper>,
    );

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Іграшки');
  });

  it('filter buttons are clickable', () => {
    render(
      <TestWrapper>
        <ProductList />
      </TestWrapper>,
    );

    const cheapButton = screen.getByText('від дешевших');
    const expensiveButton = screen.getByText('від дорожчих');

    expect(cheapButton).toBeInTheDocument();
    expect(expensiveButton).toBeInTheDocument();

    fireEvent.click(cheapButton);
    fireEvent.click(expensiveButton);

    expect(mockSetProducts).toHaveBeenCalledTimes(3);
  });
});
