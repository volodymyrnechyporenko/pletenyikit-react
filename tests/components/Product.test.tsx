import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Product, { ProductItem } from '../../src/components/Product/Product';

describe('Product Component', () => {
  const mockProduct: ProductItem = {
    id: 1,
    name: 'Test Product',
    price: 99,
    link: 'test-product',
    images: ['product-image.jpg', 'product-image-2.jpg'],
  };

  describe('Rendering with type "product"', () => {
    it('renders all elements correctly', () => {
      render(<Product product={mockProduct} type='product' />);

      expect(screen.getByTestId('price')).toBeInTheDocument();
      expect(screen.getByTestId('name')).toBeInTheDocument();
      expect(screen.getByTestId('skeleton')).toBeInTheDocument();
      expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('displays product name correctly', () => {
      render(<Product product={mockProduct} type='product' />);

      const nameElement = screen.getByTestId('name');
      expect(nameElement).toHaveTextContent('Test Product');
    });

    it('displays product price correctly', () => {
      render(<Product product={mockProduct} type='product' />);

      const priceElement = screen.getByTestId('price');
      expect(priceElement).toHaveTextContent('99');
    });

    it('applies correct CSS classes for product type', () => {
      render(<Product product={mockProduct} type='product' />);

      expect(screen.getByTestId('price')).toHaveClass('product-price');
      expect(screen.getByTestId('name')).toHaveClass('product-title');
    });

    it('renders image with correct src and alt attributes', () => {
      render(<Product product={mockProduct} type='product' />);

      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', '/img/product-image.jpg');
      expect(image).toHaveAttribute('alt', 'Test Product');
      expect(image).toHaveClass('product-image');
    });

    it('sets lazy loading on image', () => {
      render(<Product product={mockProduct} type='product' />);

      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('loading', 'lazy');
    });
  });

  describe('Rendering with type "category"', () => {
    it('applies correct CSS classes for category type', () => {
      render(<Product product={mockProduct} type='category' />);

      expect(screen.getByTestId('price')).toHaveClass('category-price');
      expect(screen.getByTestId('name')).toHaveClass('category-title');
    });

    it('renders all elements correctly with category type', () => {
      render(<Product product={mockProduct} type='category' />);

      expect(screen.getByTestId('price')).toBeInTheDocument();
      expect(screen.getByTestId('name')).toBeInTheDocument();
      expect(screen.getByTestId('skeleton')).toBeInTheDocument();
      expect(screen.getByRole('img')).toBeInTheDocument();
    });
  });

  describe('Price handling', () => {
    it('displays price when price is provided', () => {
      const productWithPrice = { ...mockProduct, price: 150 };
      render(<Product product={productWithPrice} type='product' />);

      const priceElement = screen.getByTestId('price');
      expect(priceElement).toHaveTextContent('150');
    });

    it('displays empty string when price is undefined', () => {
      const productWithoutPrice = { ...mockProduct };
      delete productWithoutPrice.price;

      render(<Product product={productWithoutPrice} type='product' />);

      const priceElement = screen.getByTestId('price');
      expect(priceElement).toHaveTextContent('');
      expect(priceElement).toBeEmptyDOMElement();
    });

    it('displays zero price correctly', () => {
      const productWithZeroPrice = { ...mockProduct, price: 0 };
      render(<Product product={productWithZeroPrice} type='product' />);

      const priceElement = screen.getByTestId('price');
      expect(priceElement).toHaveTextContent('0');
    });
  });

  describe('Image handling', () => {
    it('uses first image from images array', () => {
      const productWithMultipleImages = {
        ...mockProduct,
        images: ['first-image.jpg', 'second-image.jpg', 'third-image.jpg'],
      };

      render(<Product product={productWithMultipleImages} type='product' />);

      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', '/img/first-image.jpg');
    });

    it('handles single image in array', () => {
      const productWithSingleImage = {
        ...mockProduct,
        images: ['single-image.jpg'],
      };

      render(<Product product={productWithSingleImage} type='product' />);

      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', '/img/single-image.jpg');
    });

    it('uses product name as alt text', () => {
      const productWithCustomName = {
        ...mockProduct,
        name: 'Custom Product Name',
      };

      render(<Product product={productWithCustomName} type='product' />);

      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('alt', 'Custom Product Name');
    });
  });

  describe('Container and skeleton elements', () => {
    it('renders main product container with correct class', () => {
      const { container } = render(
        <Product product={mockProduct} type='product' />,
      );

      const productContainer = container.querySelector('.product');
      expect(productContainer).toBeInTheDocument();
    });

    it('renders skeleton element with correct class', () => {
      render(<Product product={mockProduct} type='product' />);

      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('product-image-skeleton');
    });
  });

  describe('Edge cases and data validation', () => {
    it('handles product with empty name', () => {
      const productWithEmptyName = { ...mockProduct, name: '' };
      render(<Product product={productWithEmptyName} type='product' />);

      const nameElement = screen.getByTestId('name');
      expect(nameElement).toHaveTextContent('');
    });

    it('handles product with special characters in name', () => {
      const productWithSpecialName = {
        ...mockProduct,
        name: 'Product & Co. "Special" <Item>',
      };
      render(<Product product={productWithSpecialName} type='product' />);

      const nameElement = screen.getByTestId('name');
      expect(nameElement).toHaveTextContent('Product & Co. "Special" <Item>');

      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('alt', 'Product & Co. "Special" <Item>');
    });

    it('handles very long product names', () => {
      const longName = 'A'.repeat(200);
      const productWithLongName = { ...mockProduct, name: longName };
      render(<Product product={productWithLongName} type='product' />);

      const nameElement = screen.getByTestId('name');
      expect(nameElement).toHaveTextContent(longName);
    });

    it('handles large price values', () => {
      const productWithLargePrice = { ...mockProduct, price: 999999.99 };
      render(<Product product={productWithLargePrice} type='product' />);

      const priceElement = screen.getByTestId('price');
      expect(priceElement).toHaveTextContent('999999.99');
    });

    it('handles negative price values', () => {
      const productWithNegativePrice = { ...mockProduct, price: -50 };
      render(<Product product={productWithNegativePrice} type='product' />);

      const priceElement = screen.getByTestId('price');
      expect(priceElement).toHaveTextContent('-50');
    });
  });

  describe('Component props validation', () => {
    it('renders correctly with minimal required props', () => {
      const minimalProduct: ProductItem = {
        id: 1,
        name: 'Minimal Product',
        link: 'minimal',
        images: ['minimal.jpg'],
      };

      render(<Product product={minimalProduct} type='category' />);

      expect(screen.getByTestId('name')).toHaveTextContent('Minimal Product');
      expect(screen.getByTestId('price')).toHaveTextContent('');
      expect(screen.getByRole('img')).toHaveAttribute(
        'src',
        '/img/minimal.jpg',
      );
    });

    it('applies different styling based on type prop', () => {
      const { rerender } = render(
        <Product product={mockProduct} type='product' />,
      );

      expect(screen.getByTestId('price')).toHaveClass('product-price');
      expect(screen.getByTestId('name')).toHaveClass('product-title');

      rerender(<Product product={mockProduct} type='category' />);

      expect(screen.getByTestId('price')).toHaveClass('category-price');
      expect(screen.getByTestId('name')).toHaveClass('category-title');
    });
  });

  describe('Accessibility', () => {
    it('provides meaningful alt text for screen readers', () => {
      render(<Product product={mockProduct} type='product' />);

      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('alt', 'Test Product');
    });

    it('maintains semantic structure with proper div elements', () => {
      const { container } = render(
        <Product product={mockProduct} type='product' />,
      );

      const divElements = container.querySelectorAll('div');
      expect(divElements).toHaveLength(4);
    });

    it('uses data-testid attributes for testing accessibility', () => {
      render(<Product product={mockProduct} type='product' />);

      expect(screen.getByTestId('price')).toBeInTheDocument();
      expect(screen.getByTestId('name')).toBeInTheDocument();
      expect(screen.getByTestId('skeleton')).toBeInTheDocument();
    });
  });
});
